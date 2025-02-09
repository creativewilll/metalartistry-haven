import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';

const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.tiff'];

async function processImage(filePath: string): Promise<void> {
  try {
    const image = sharp(filePath);
    
    // Strip all metadata including EXIF
    await image
      .withMetadata({})
      .toBuffer()
      .then(async (buffer) => {
        await fs.writeFile(filePath, buffer);
        console.log(`✓ Stripped EXIF from: ${path.basename(filePath)}`);
      });
  } catch (error) {
    console.error(`✗ Error processing ${path.basename(filePath)}:`, error);
  }
}

async function walkDirectory(dir: string): Promise<string[]> {
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
    
    await Promise.all(allImages.map(processImage));
    
    console.log('✨ EXIF stripping complete!');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

main(); 