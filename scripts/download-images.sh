#!/bin/bash

# Script to download professional images for the LOTA website
# This script downloads high-quality images from Unsplash and other free sources

# Create directories if they don't exist
mkdir -p public/images/hero/new
mkdir -p public/images/leadership
mkdir -p public/images/networking
mkdir -p public/images/mentorship

echo "Downloading professional images for LOTA website..."

# Download leadership images
echo "Downloading leadership images..."
curl -L "https://images.unsplash.com/photo-1552664730-d307ca884978" -o public/images/hero/new/leadership-team-meeting.jpg
curl -L "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c" -o public/images/hero/new/leadership-presentation.jpg
curl -L "https://images.unsplash.com/photo-1542744173-8e7e53415bb0" -o public/images/hero/new/leadership-discussion.jpg

# Download networking images
echo "Downloading networking images..."
curl -L "https://images.unsplash.com/photo-1556761175-5973dc0f32e7" -o public/images/hero/new/networking-event.jpg
curl -L "https://images.unsplash.com/photo-1556157382-97eda2f9e2bf" -o public/images/hero/new/networking-conference.jpg
curl -L "https://images.unsplash.com/photo-1528605248644-14dd04022da1" -o public/images/hero/new/networking-group.jpg

# Download mentorship images
echo "Downloading mentorship images..."
curl -L "https://images.unsplash.com/photo-1516321318423-f06f85e504b3" -o public/images/hero/new/mentorship-meeting.jpg
curl -L "https://images.unsplash.com/photo-1573497491765-55a64cc0144c" -o public/images/hero/new/mentorship-discussion.jpg
curl -L "https://images.unsplash.com/photo-1522202176988-66273c2fd55f" -o public/images/hero/new/mentorship-team.jpg

# Download diverse professional images
echo "Downloading diverse professional images..."
curl -L "https://images.unsplash.com/photo-1568992687947-868a62a9f521" -o public/images/hero/new/diverse-professionals-1.jpg
curl -L "https://images.unsplash.com/photo-1600880292203-757bb62b4baf" -o public/images/hero/new/diverse-professionals-2.jpg
curl -L "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2" -o public/images/hero/new/diverse-professionals-3.jpg

echo "All images downloaded successfully!"
echo "New images are available in the public/images/hero/new directory."
echo "Please update the image paths in the code to use these new images."
