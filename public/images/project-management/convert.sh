#!/bin/bash

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "ImageMagick is not installed. Please install it first."
    exit 1
fi

# Convert dashboard preview
convert -background white -density 300 dashboard-preview.svg dashboard-preview.jpg

# Convert avatars
convert -background white -density 300 avatar-1.svg avatar-1.jpg
convert -background white -density 300 avatar-2.svg avatar-2.jpg
convert -background white -density 300 avatar-3.svg avatar-3.jpg

echo "Conversion completed successfully!" 