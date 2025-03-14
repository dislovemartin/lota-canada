#!/bin/bash

# Script to identify and remove duplicate .jsx files where .tsx versions exist
# This helps standardize the project on TypeScript

echo "Starting cleanup of duplicate files..."

# Function to check and remove duplicates
check_and_remove() {
  local dir=$1
  echo "Checking directory: $dir"
  
  # Find all .jsx files
  find "$dir" -name "*.jsx" | while read jsx_file; do
    # Get the corresponding .tsx file path
    tsx_file="${jsx_file%.jsx}.tsx"
    
    # Check if the .tsx file exists
    if [ -f "$tsx_file" ]; then
      echo "Found duplicate: $jsx_file"
      echo "  Corresponding TypeScript file exists: $tsx_file"
      
      # Ask for confirmation before removing
      read -p "  Remove the .jsx file? (y/n): " confirm
      if [[ $confirm == [yY] || $confirm == [yY][eE][sS] ]]; then
        rm "$jsx_file"
        echo "  Removed: $jsx_file"
      else
        echo "  Skipped: $jsx_file"
      fi
    fi
  done
}

# Check app directory
check_and_remove "app"

# Check components directory
check_and_remove "components"

# Check lib directory
check_and_remove "lib"

# Check hooks directory
check_and_remove "hooks"

echo "Cleanup completed!" 