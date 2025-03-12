#!/bin/bash

# Script to optimize images in the public directory
echo "Starting image optimization..."

# Check if svgo is installed
if ! command -v svgo &> /dev/null; then
    echo "SVGO is not installed. Installing..."
    npm install -g svgo
fi

# Check if imagemagick is installed
if ! command -v convert &> /dev/null; then
    echo "ImageMagick is not installed. Please install it for raster image optimization."
    echo "On Ubuntu/Debian: sudo apt-get install imagemagick"
    echo "On macOS: brew install imagemagick"
    echo "On Windows: choco install imagemagick"
fi

# Optimize SVG files
echo "Optimizing SVG files..."
find public/images -name "*.svg" -type f -exec echo "Optimizing {}" \; -exec svgo --multipass {} \;

# Optimize JPG files if ImageMagick is installed
if command -v convert &> /dev/null; then
    echo "Optimizing JPG files..."
    find public/images -name "*.jpg" -type f -exec echo "Optimizing {}" \; -exec convert {} -sampling-factor 4:2:0 -strip -quality 85 -interlace JPEG -colorspace RGB {} \;
fi

# Create WebP versions of JPG files if cwebp is installed
if command -v cwebp &> /dev/null; then
    echo "Creating WebP versions of JPG files..."
    find public/images -name "*.jpg" -type f | while read file; do
        webp_file="${file%.jpg}.webp"
        echo "Creating $webp_file"
        cwebp -q 80 "$file" -o "$webp_file"
    done
else
    echo "cwebp is not installed. Cannot create WebP versions."
    echo "On Ubuntu/Debian: sudo apt-get install webp"
    echo "On macOS: brew install webp"
    echo "On Windows: choco install webp"
fi

echo "Image optimization complete!" 