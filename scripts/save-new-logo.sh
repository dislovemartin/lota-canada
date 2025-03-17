#!/bin/bash

# Script to save the new LOTA logo
# This script creates SVG versions of the logo based on the design shared

echo "Creating new LOTA logo files..."

# Create directories if they don't exist
mkdir -p public/images/brand/new

# Create the SVG file for the full logo
cat > public/images/brand/new/lota-logo-full.svg << 'EOL'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 300">
  <!-- Background -->
  <rect width="600" height="300" fill="#1A1A1A" rx="10" ry="10"/>

  <!-- Hexagon Shape -->
  <polygon points="300,80 360,110 360,190 300,220 240,190 240,110" fill="#1A1A1A" stroke="#D4AF37" stroke-width="4"/>

  <!-- T Symbol -->
  <path d="M270,120 L330,120 L330,140 L310,140 L310,190 L290,190 L290,140 L270,140 Z" fill="#D4AF37"/>

  <!-- Decorative Lines -->
  <line x1="240" y1="110" x2="220" y2="90" stroke="#D4AF37" stroke-width="2"/>
  <line x1="360" y1="110" x2="380" y2="90" stroke="#D4AF37" stroke-width="2"/>
  <line x1="240" y1="190" x2="220" y2="210" stroke="#D4AF37" stroke-width="2"/>
  <line x1="360" y1="190" x2="380" y2="210" stroke="#D4AF37" stroke-width="2"/>

  <!-- Circles -->
  <circle cx="300" cy="80" r="6" fill="none" stroke="#D4AF37" stroke-width="2"/>
  <circle cx="240" cy="110" r="6" fill="none" stroke="#D4AF37" stroke-width="2"/>
  <circle cx="240" cy="190" r="6" fill="none" stroke="#D4AF37" stroke-width="2"/>
  <circle cx="300" cy="220" r="6" fill="none" stroke="#D4AF37" stroke-width="2"/>
  <circle cx="360" cy="190" r="6" fill="none" stroke="#D4AF37" stroke-width="2"/>
  <circle cx="360" cy="110" r="6" fill="none" stroke="#D4AF37" stroke-width="2"/>

  <!-- Small Circles -->
  <circle cx="220" cy="90" r="4" fill="#D4AF37"/>
  <circle cx="380" cy="90" r="4" fill="#D4AF37"/>
  <circle cx="220" cy="210" r="4" fill="#D4AF37"/>
  <circle cx="380" cy="210" r="4" fill="#D4AF37"/>

  <!-- Text -->
  <text x="300" y="260" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#FFFFFF" text-anchor="middle">LEADERS OF TOMORROW</text>
  <text x="300" y="285" font-family="Arial, sans-serif" font-size="20" fill="#D4AF37" text-anchor="middle">ASSOCIATION</text>
</svg>
EOL

# Create the SVG file for the square logo
cat > public/images/brand/new/lota-logo-square.svg << 'EOL'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
  <!-- Background -->
  <rect width="300" height="300" fill="#1A1A1A" rx="10" ry="10"/>

  <!-- Hexagon Shape -->
  <polygon points="150,60 210,90 210,170 150,200 90,170 90,90" fill="#1A1A1A" stroke="#D4AF37" stroke-width="4"/>

  <!-- T Symbol -->
  <path d="M120,100 L180,100 L180,120 L160,120 L160,170 L140,170 L140,120 L120,120 Z" fill="#D4AF37"/>

  <!-- Decorative Lines -->
  <line x1="90" y1="90" x2="70" y2="70" stroke="#D4AF37" stroke-width="2"/>
  <line x1="210" y1="90" x2="230" y2="70" stroke="#D4AF37" stroke-width="2"/>
  <line x1="90" y1="170" x2="70" y2="190" stroke="#D4AF37" stroke-width="2"/>
  <line x1="210" y1="170" x2="230" y2="190" stroke="#D4AF37" stroke-width="2"/>

  <!-- Circles -->
  <circle cx="150" cy="60" r="6" fill="none" stroke="#D4AF37" stroke-width="2"/>
  <circle cx="90" cy="90" r="6" fill="none" stroke="#D4AF37" stroke-width="2"/>
  <circle cx="90" cy="170" r="6" fill="none" stroke="#D4AF37" stroke-width="2"/>
  <circle cx="150" cy="200" r="6" fill="none" stroke="#D4AF37" stroke-width="2"/>
  <circle cx="210" cy="170" r="6" fill="none" stroke="#D4AF37" stroke-width="2"/>
  <circle cx="210" cy="90" r="6" fill="none" stroke="#D4AF37" stroke-width="2"/>

  <!-- Small Circles -->
  <circle cx="70" cy="70" r="4" fill="#D4AF37"/>
  <circle cx="230" cy="70" r="4" fill="#D4AF37"/>
  <circle cx="70" cy="190" r="4" fill="#D4AF37"/>
  <circle cx="230" cy="190" r="4" fill="#D4AF37"/>

  <!-- Text -->
  <text x="150" y="240" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#FFFFFF" text-anchor="middle">LOTA</text>
</svg>
EOL

# Create the SVG file for the horizontal logo
cat > public/images/brand/new/lota-logo-horizontal.svg << 'EOL'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 200">
  <!-- Background -->
  <rect width="600" height="200" fill="#1A1A1A" rx="10" ry="10"/>

  <!-- Hexagon Shape -->
  <polygon points="100,40 140,60 140,110 100,130 60,110 60,60" fill="#1A1A1A" stroke="#D4AF37" stroke-width="3"/>

  <!-- T Symbol -->
  <path d="M80,65 L120,65 L120,80 L110,80 L110,110 L90,110 L90,80 L80,80 Z" fill="#D4AF37"/>

  <!-- Decorative Lines -->
  <line x1="60" y1="60" x2="45" y2="45" stroke="#D4AF37" stroke-width="1.5"/>
  <line x1="140" y1="60" x2="155" y2="45" stroke="#D4AF37" stroke-width="1.5"/>
  <line x1="60" y1="110" x2="45" y2="125" stroke="#D4AF37" stroke-width="1.5"/>
  <line x1="140" y1="110" x2="155" y2="125" stroke="#D4AF37" stroke-width="1.5"/>

  <!-- Circles -->
  <circle cx="100" cy="40" r="4" fill="none" stroke="#D4AF37" stroke-width="1.5"/>
  <circle cx="60" cy="60" r="4" fill="none" stroke="#D4AF37" stroke-width="1.5"/>
  <circle cx="60" cy="110" r="4" fill="none" stroke="#D4AF37" stroke-width="1.5"/>
  <circle cx="100" cy="130" r="4" fill="none" stroke="#D4AF37" stroke-width="1.5"/>
  <circle cx="140" cy="110" r="4" fill="none" stroke="#D4AF37" stroke-width="1.5"/>
  <circle cx="140" cy="60" r="4" fill="none" stroke="#D4AF37" stroke-width="1.5"/>

  <!-- Small Circles -->
  <circle cx="45" cy="45" r="3" fill="#D4AF37"/>
  <circle cx="155" cy="45" r="3" fill="#D4AF37"/>
  <circle cx="45" cy="125" r="3" fill="#D4AF37"/>
  <circle cx="155" cy="125" r="3" fill="#D4AF37"/>

  <!-- Text -->
  <text x="350" y="85" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="#FFFFFF" text-anchor="middle">LEADERS OF TOMORROW</text>
  <text x="350" y="120" font-family="Arial, sans-serif" font-size="22" fill="#D4AF37" text-anchor="middle">ASSOCIATION</text>
</svg>
EOL

# Copy the new logos to the main brand directory
cp public/images/brand/new/lota-logo-full.svg public/images/brand/lota-logo-full.svg
cp public/images/brand/new/lota-logo-square.svg public/images/brand/lota-logo-square-transparent.svg
cp public/images/brand/new/lota-logo-horizontal.svg public/images/brand/lota-logo-horizontal-transparent.svg

echo "New logo files created successfully!"
echo "The logo files are available in public/images/brand/ directory."
