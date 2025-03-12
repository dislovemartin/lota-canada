#!/bin/bash

# Script to organize images in the public directory
echo "Starting image organization..."

# Create directories if they don't exist
mkdir -p public/images/{hero,programs,summit,knowledge,testimonials,impact,brand,directors,assets}

# Standardize file names in hero directory
echo "Organizing hero images..."
cd public/images/hero
# Rename files to match README
if [ -f "lota-leadership-workshop-diverse-professionals.jpg" ]; then
  cp lota-leadership-workshop-diverse-professionals.jpg diverse-professionals.jpg
fi
if [ -f "lota-leadership-workshop-diverse-professionals.webp" ]; then
  cp lota-leadership-workshop-diverse-professionals.webp diverse-professionals.webp
fi
if [ -f "lota-leadership-workshop-diverse-professionals.svg" ]; then
  cp lota-leadership-workshop-diverse-professionals.svg leadership-workshop.svg
fi
cd ../../..

# Organize programs directory
echo "Organizing programs images..."
cd public/images/programs
# Ensure all required files exist
if [ ! -f "mentorship.jpg" ] && [ -f "workshop.svg" ]; then
  # Create placeholder if missing
  echo "Creating placeholder for mentorship.jpg"
  cp workshop.svg mentorship.svg
fi
cd ../../..

# Organize impact directory
echo "Organizing impact images..."
cd public/images/impact
# Move numbered files to a more descriptive name if they exist
if [ -f "1.svg" ]; then
  cp 1.svg impact-stat-1.svg
fi
if [ -f "2.svg" ]; then
  cp 2.svg impact-stat-2.svg
fi
if [ -f "3.svg" ]; then
  cp 3.svg impact-stat-3.svg
fi

# Organize sponsors directory
if [ -d "Sponsors Logo" ]; then
  mkdir -p sponsors
  cp -r "Sponsors Logo"/* sponsors/
fi
cd ../../..

# Organize brand directory
echo "Organizing brand images..."
cd public/images/brand
# Standardize logo filenames
if [ -f "LOTA logo SVG.svg" ]; then
  cp "LOTA logo SVG.svg" lota-logo-full.svg
fi
if [ -f "lota logo 2x2 transparent background.svg" ]; then
  cp "lota logo 2x2 transparent background.svg" lota-logo-square-transparent.svg
fi
if [ -f "LOTA LOGO transparent background.svg" ]; then
  cp "LOTA LOGO transparent background.svg" lota-logo-horizontal-transparent.svg
fi
cd ../../..

# Organize directors directory
echo "Organizing directors images..."
cd public/images/directors
# Standardize director filenames
for file in *.svg; do
  if [[ $file == *"_"* ]]; then
    # Remove underscore from filename
    newname=$(echo "$file" | sed 's/_//g')
    cp "$file" "$newname"
  fi
done
cd ../../..

# Create a README for the public directory
echo "Creating README for public directory..."
cat > public/README.md << 'EOF'
# Public Directory

This directory contains static assets for the LOTA Canada website.

## Structure

- `images/` - Contains all images used on the website, organized by section
  - See `images/README.md` for detailed attribution information
- `favicon.ico` - Website favicon
- `robots.txt` - Instructions for web crawlers
- `placeholder.svg` - Default placeholder image

## Image Usage Guidelines

1. Use SVG format for icons and logos
2. Use WebP format for photographs when possible, with JPG fallbacks
3. Optimize all images for web use to minimize file size
4. Follow the naming conventions in each directory
EOF

echo "Image organization complete!" 