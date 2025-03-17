#!/bin/bash

# Script to download professional images for LOTA Canada website
# Uses Unsplash API for royalty-free professional images

set -e

# Create directories if they don't exist
mkdir -p public/images/professional/hero
mkdir -p public/images/professional/leadership
mkdir -p public/images/professional/networking
mkdir -p public/images/professional/mentorship
mkdir -p public/images/professional/events
mkdir -p public/images/professional/avatars
mkdir -p public/images/professional/workshops
mkdir -p public/images/professional/knowledge

# Function to download an image if it doesn't exist
download_image() {
  local url=$1
  local output_path=$2
  
  if [ ! -f "$output_path" ]; then
    echo "Downloading: $output_path"
    curl -s -L "$url" -o "$output_path"
    # Optimize the image
    if command -v convert &> /dev/null; then
      echo "Optimizing: $output_path"
      convert "$output_path" -strip -quality 85% "$output_path"
    fi
  else
    echo "File already exists: $output_path"
  fi
}

# Professional business images from Unsplash (royalty-free)

# Hero images
download_image "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1920" "public/images/professional/hero/leadership-conference.jpg"
download_image "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1920" "public/images/professional/hero/business-meeting.jpg"
download_image "https://images.unsplash.com/photo-1573164574001-518958d9baa2?q=80&w=1920" "public/images/professional/hero/networking-event.jpg"

# Leadership images
download_image "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1080" "public/images/professional/leadership/team-leader.jpg"
download_image "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1080" "public/images/professional/leadership/presentation.jpg"
download_image "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1080" "public/images/professional/leadership/leadership-development.jpg"

# Networking images
download_image "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1080" "public/images/professional/networking/business-networking.jpg"
download_image "https://images.unsplash.com/photo-1560439514-4e9645039924?q=80&w=1080" "public/images/professional/networking/professional-handshake.jpg"
download_image "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1080" "public/images/professional/networking/diverse-networking.jpg"

# Mentorship images
download_image "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1080" "public/images/professional/mentorship/mentorship-session.jpg"
download_image "https://images.unsplash.com/photo-1573497491765-55a64cc0144c?q=80&w=1080" "public/images/professional/mentorship/career-guidance.jpg"
download_image "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1080" "public/images/professional/mentorship/professional-advice.jpg"

# Events images
download_image "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1080" "public/images/professional/events/conference-hall.jpg"
download_image "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=1080" "public/images/professional/events/business-event.jpg"
download_image "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1080" "public/images/professional/events/speaker-event.jpg"

# Professional avatars
download_image "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=400" "public/images/professional/avatars/professional-woman-1.jpg"
download_image "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=400" "public/images/professional/avatars/professional-man-1.jpg"
download_image "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400" "public/images/professional/avatars/professional-woman-2.jpg"
download_image "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400" "public/images/professional/avatars/professional-man-2.jpg"
download_image "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=400" "public/images/professional/avatars/professional-woman-3.jpg"
download_image "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400" "public/images/professional/avatars/professional-man-3.jpg"

# Workshops images
download_image "https://images.unsplash.com/photo-1558403194-611308249627?q=80&w=1080" "public/images/professional/workshops/leadership-workshop.jpg"
download_image "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1080" "public/images/professional/workshops/team-workshop.jpg"
download_image "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1080" "public/images/professional/workshops/collaborative-workshop.jpg"

# Knowledge section images
download_image "https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?q=80&w=1080" "public/images/professional/knowledge/emotional-intelligence.jpg"
download_image "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1080" "public/images/professional/knowledge/career-transition.jpg"
download_image "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1080" "public/images/professional/knowledge/professional-development.jpg"

# Create a professional placeholder image
download_image "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1080" "public/images/placeholder-professional.jpg"

echo "Professional images downloaded successfully!"
echo "Images are located in public/images/professional/"
