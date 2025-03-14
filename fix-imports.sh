#!/bin/bash

# Script to identify and fix component import inconsistencies
# This helps standardize imports across the project

echo "Starting import consistency check..."

# Function to check and fix imports in a file
check_file_imports() {
  local file=$1
  echo "Checking file: $file"
  
  # Check for UI component imports from components/ui
  if grep -q "from \"@/components/ui/" "$file" || grep -q "from '@/components/ui/" "$file"; then
    echo "  Found UI component imports"
    
    # Replace any ui-temp imports with ui
    sed -i 's|from "@/components/ui-temp/|from "@/components/ui/|g' "$file"
    sed -i "s|from '@/components/ui-temp/|from '@/components/ui/|g" "$file"
    
    echo "  Fixed any temporary component imports"
  fi
}

# Find all TypeScript and JavaScript files
find . -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.js" \) -not -path "./node_modules/*" -not -path "./.next/*" | while read file; do
  check_file_imports "$file"
done

echo "Import consistency check completed!" 