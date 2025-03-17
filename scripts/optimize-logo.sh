#!/bin/bash

# Script to optimize logo files for the LOTA website
# This script ensures all logo variants are properly formatted and optimized

echo "Optimizing logo files for LOTA website..."

# Create directory if it doesn't exist
mkdir -p public/images/brand/optimized

# Check if the logo files exist
if [ -f "public/images/brand/lota-logo-full.svg" ]; then
  echo "Optimizing full logo..."
  # Copy and optimize the SVG (using svgo if available)
  if command -v svgo &> /dev/null; then
    svgo -i public/images/brand/lota-logo-full.svg -o public/images/brand/optimized/lota-logo-full.svg
  else
    cp public/images/brand/lota-logo-full.svg public/images/brand/optimized/lota-logo-full.svg
  fi

  # Create PNG versions for fallback
  echo "Creating PNG versions..."
  if command -v convert &> /dev/null; then
    convert -background none public/images/brand/lota-logo-full.svg public/images/brand/optimized/lota-logo-full.png
  else
    echo "ImageMagick not found. Skipping PNG conversion."
  fi
else
  echo "Warning: Full logo file not found at public/images/brand/lota-logo-full.svg"
fi

# Create favicon versions
echo "Creating favicon versions..."
if command -v convert &> /dev/null; then
  convert -background none public/images/brand/lota-logo-square-transparent.svg -resize 32x32 public/favicon.ico
  convert -background none public/images/brand/lota-logo-square-transparent.svg -resize 192x192 public/icons/icon-192x192.png
  convert -background none public/images/brand/lota-logo-square-transparent.svg -resize 512x512 public/icons/icon-512x512.png
else
  echo "ImageMagick not found. Skipping favicon creation."
fi

echo "Logo optimization complete!"
echo "Optimized files are available in public/images/brand/optimized directory."
