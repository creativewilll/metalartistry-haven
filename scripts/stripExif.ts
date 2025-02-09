import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';

const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.tiff'];

async function processImage(filePath: string): Promise<void> {
  try {
    const image = sharp(filePath);
    
    // Get the current metadata
    const metadata = await image.metadata();
    
    // Preserve orientation while stripping other EXIF data
    await image
      .rotate() // Automatically rotate based on EXIF orientation
      .withMetadata({ orientation: metadata.orientation || 1 }) // Preserve orientation or default to 1
      .toBuffer()
      .then(async (buffer) => {
        await fs.writeFile(filePath, buffer);
        console.log(`✓ Stripped EXIF from: ${path.basename(filePath)}`);
      });
  } catch (error) {
    // Log error but don't fail the build
    console.error(`✗ Error processing ${path.basename(filePath)}:`, error);
    // Create a log file for Netlify to track errors
    await fs.appendFile('exif-strip-errors.log', `Error processing ${filePath}: ${error}\n`);
  }
}

async function walkDirectory(dir: string): Promise<string[]> {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const files: string[] = [];

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        files.push(...(await walkDirectory(fullPath)));
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (SUPPORTED_EXTENSIONS.includes(ext)) {
          files.push(fullPath);
        }
      }
    }

    return files;
  } catch (error) {
    console.error(`✗ Error accessing directory ${dir}:`, error);
    return [];
  }
}

async function main() {
  try {
    console.log('🔍 Searching for images...');
    
    // Process both public and src directories
    const publicImages = await walkDirectory('public');
    const srcImages = await walkDirectory('src');
    const allImages = [...publicImages, ...srcImages];

    if (allImages.length === 0) {
      console.log('ℹ️ No images found to process.');
      return;
    }

    console.log(`📸 Found ${allImages.length} images to process...`);
    
    // Process images sequentially to avoid memory issues on Netlify
    for (const image of allImages) {
      await processImage(image);
    }
    
    console.log('✨ EXIF stripping complete!');
  } catch (error) {
    console.error('❌ Error:', error);
    // Create a log file for Netlify to track errors
    await fs.appendFile('exif-strip-errors.log', `Fatal error: ${error}\n`);
    // Don't exit with error code to prevent build failure
    console.log('⚠️ Completed with some errors. Check exif-strip-errors.log for details.');
  }
}

// Ensure unhandled rejections don't crash the build
process.on('unhandledRejection', (error) => {
  console.error('Unhandled rejection:', error);
});

main(); 