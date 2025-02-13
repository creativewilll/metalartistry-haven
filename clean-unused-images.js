#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';

// Use the current working directory (project root)
const projectRoot = process.cwd();

// Use "--dry-run" so you can see what files would be deleted before actually removing them.
const dryRun = process.argv.includes('--dry-run');

console.log(`Running clean-unused-images script in ${dryRun ? 'dry run' : 'delete'} mode.`);

// Define the file patterns to search for image references in our codebase.
// This covers JavaScript, TypeScript, JSX, TSX, and HTML files.
const codeFilePatterns = [
  '**/*.js',
  '**/*.jsx',
  '**/*.ts',
  '**/*.tsx',
  '**/*.html',
];

// Exclude common folders that don't contain references (like node_modules, dist, and gallery-images).
const codeFiles = codeFilePatterns.flatMap(pattern =>
  globSync(pattern, {
    cwd: projectRoot,
    ignore: ['node_modules/**', 'dist/**', 'gallery-images/**']
  }).map(filename => path.join(projectRoot, filename))
);

let referencesContent = '';

// Read the content of every code file so we can search for image file usage.
codeFiles.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf-8');
    referencesContent += content;
  } catch (err) {
    console.error(`Error reading file ${file}: ${err}`);
  }
});

console.log(`Scanned ${codeFiles.length} code files for image references.`);

// Specify the directories that contain the images to check.
// For images under "gallery-images" we assume they are referenced in code as "/gallery-images/<filename>".
// For "dist" we just check for the file's name.
const directoriesToCheck = [
  { folder: 'gallery-images', refPrefix: '/gallery-images/' },
  { folder: 'dist', refPrefix: '' }
];

directoriesToCheck.forEach(({ folder, refPrefix }) => {
  const dirPath = path.join(projectRoot, folder);
  if (!fs.existsSync(dirPath)) {
    console.warn(`Directory ${dirPath} does not exist. Skipping.`);
    return;
  }
  // List all files (recursively) in the folder.
  const files = globSync('**/*.*', { cwd: dirPath });
  files.forEach(file => {
    // Create a full relative reference that we expect to appear in the code.
    // (On Windows, we replace backslashes with forward slashes.)
    const fullRelativePath = refPrefix ? refPrefix + file.replace(/\\/g, '/') : file;
    // Also grab just the base file name as a fallback.
    const baseName = path.basename(file);
    // If our combined code content does NOT include the expected reference, we consider it unused.
    if (referencesContent.includes(fullRelativePath) || referencesContent.includes(baseName)) {
      console.log(`Keeping: ${path.join(dirPath, file)} (in use)`);
    } else {
      const filePath = path.join(dirPath, file);
      console.log(`Unused found: ${filePath}`);
      if (!dryRun) {
        try {
          fs.unlinkSync(filePath);
          console.log(`Deleted: ${filePath}`);
        } catch (err) {
          console.error(`Error deleting file ${filePath}: ${err}`);
        }
      }
    }
  });
});

console.log("Clean-up completed.");