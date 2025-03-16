#!/usr/bin/env node

/**
 * Image Optimization Script
 * 
 * This script optimizes images in the public/images directory:
 * 1. Converts images to WebP format
 * 2. Creates responsive versions of images
 * 3. Compresses images for better performance
 * 
 * Usage: node scripts/optimize-images.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Check if Sharp is installed
try {
  require.resolve('sharp');
} catch (e) {
  console.error('Sharp is not installed. Installing now...');
  execSync('npm install sharp --save-dev');
  console.log('Sharp installed successfully.');
}

const sharp = require('sharp');

// Configuration
const config = {
  inputDir: path.join(__dirname, '../public/images'),
  outputDir: path.join(__dirname, '../public/images/optimized'),
  sizes: [320, 640, 960, 1280, 1920],
  quality: 80,
  formats: ['webp', 'jpg'],
};

// Create output directory if it doesn't exist
if (!fs.existsSync(config.outputDir)) {
  fs.mkdirSync(config.outputDir, { recursive: true });
}

// Get all image files recursively
function getImageFiles(dir) {
  let results = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const itemPath = path.join(dir, item);
    const stat = fs.statSync(itemPath);

    if (stat.isDirectory()) {
      results = results.concat(getImageFiles(itemPath));
    } else {
      const ext = path.extname(item).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.gif'].includes(ext)) {
        results.push(itemPath);
      }
    }
  }

  return results;
}

// Process an image
async function processImage(imagePath) {
  const filename = path.basename(imagePath, path.extname(imagePath));
  const relativePath = path.relative(config.inputDir, path.dirname(imagePath));
  const outputSubDir = path.join(config.outputDir, relativePath);
  
  // Create output subdirectory if it doesn't exist
  if (!fs.existsSync(outputSubDir)) {
    fs.mkdirSync(outputSubDir, { recursive: true });
  }

  // Load the image
  const image = sharp(imagePath);
  const metadata = await image.metadata();

  // Process each size
  for (const size of config.sizes) {
    // Skip if the requested size is larger than the original
    if (size > metadata.width) continue;

    // Resize the image
    const resized = image.clone().resize(size);

    // Save in each format
    for (const format of config.formats) {
      const outputPath = path.join(
        outputSubDir,
        `${filename}-${size}.${format}`
      );

      await resized[format]({ quality: config.quality }).toFile(outputPath);
      console.log(`Created: ${outputPath}`);
    }
  }

  return {
    original: imagePath,
    name: filename,
    width: metadata.width,
    height: metadata.height,
    relativePath,
  };
}

// Main function
async function main() {
  console.log('Starting image optimization...');
  
  const imageFiles = getImageFiles(config.inputDir);
  console.log(`Found ${imageFiles.length} images to process.`);
  
  const imageData = [];
  
  for (const [index, imagePath] of imageFiles.entries()) {
    console.log(`Processing image ${index + 1}/${imageFiles.length}: ${imagePath}`);
    try {
      const data = await processImage(imagePath);
      imageData.push(data);
    } catch (error) {
      console.error(`Error processing ${imagePath}:`, error);
    }
  }
  
  // Generate a manifest file
  const manifestPath = path.join(config.outputDir, 'image-manifest.json');
  fs.writeFileSync(
    manifestPath,
    JSON.stringify({ images: imageData, sizes: config.sizes, formats: config.formats }, null, 2)
  );
  
  console.log(`Image optimization complete. Processed ${imageData.length} images.`);
  console.log(`Image manifest saved to: ${manifestPath}`);
}

main().catch(console.error); 