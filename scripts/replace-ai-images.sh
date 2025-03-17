#!/bin/bash

# Script to replace AI-generated images with professional images
# This maintains both sets of images but updates the website to use professional ones

set -e

# Create backup directory for AI images if it doesn't exist
mkdir -p public/images/aipic-backup

# Move AI images to backup directory
echo "Backing up AI-generated images..."
mv public/images/aipic/*.webp public/images/aipic-backup/ 2>/dev/null || true

# Copy professional workshop images to replace AI workshop images
echo "Replacing workshop images with professional alternatives..."
cp public/images/professional/workshops/collaborative-workshop.jpg public/images/aipic/workshop-collaborative.jpg
cp public/images/professional/workshops/leadership-workshop.jpg public/images/aipic/workshop-leadership.jpg
cp public/images/professional/workshops/team-workshop.jpg public/images/aipic/workshop-team.jpg

# Create symlinks for easy reference
ln -sf ../professional/workshops/collaborative-workshop.jpg public/images/aipic/workshop-1.jpg
ln -sf ../professional/workshops/leadership-workshop.jpg public/images/aipic/workshop-2.jpg
ln -sf ../professional/workshops/team-workshop.jpg public/images/aipic/workshop-3.jpg

echo "AI images have been backed up to public/images/aipic-backup/"
echo "Professional workshop images are now available in public/images/aipic/"
