#!/bin/bash

# Script to update image references in the codebase
echo "Starting image reference updates..."

# Function to search and replace in files
search_replace() {
    local search="$1"
    local replace="$2"
    local file_pattern="$3"
    
    echo "Searching for '$search' and replacing with '$replace' in $file_pattern files"
    
    # Find all matching files and perform the replacement
    find . -type f -name "$file_pattern" -not -path "./node_modules/*" -not -path "./.git/*" | while read file; do
        if grep -q "$search" "$file"; then
            echo "Updating $file"
            sed -i "s|$search|$replace|g" "$file"
        fi
    done
}

# Update hero image references
search_replace "lota-leadership-workshop-diverse-professionals.jpg" "diverse-professionals.jpg" "*.{js,jsx,ts,tsx,html,css}"
search_replace "lota-leadership-workshop-diverse-professionals.webp" "diverse-professionals.webp" "*.{js,jsx,ts,tsx,html,css}"
search_replace "lota-leadership-workshop-diverse-professionals.svg" "leadership-workshop.svg" "*.{js,jsx,ts,tsx,html,css}"

# Update brand image references
search_replace "LOTA logo SVG.svg" "lota-logo-full.svg" "*.{js,jsx,ts,tsx,html,css}"
search_replace "lota logo 2x2 transparent background.svg" "lota-logo-square-transparent.svg" "*.{js,jsx,ts,tsx,html,css}"
search_replace "LOTA LOGO transparent background.svg" "lota-logo-horizontal-transparent.svg" "*.{js,jsx,ts,tsx,html,css}"

# Update impact image references
search_replace "/images/impact/1.svg" "/images/impact/impact-stat-1.svg" "*.{js,jsx,ts,tsx,html,css}"
search_replace "/images/impact/2.svg" "/images/impact/impact-stat-2.svg" "*.{js,jsx,ts,tsx,html,css}"
search_replace "/images/impact/3.svg" "/images/impact/impact-stat-3.svg" "*.{js,jsx,ts,tsx,html,css}"

# Update director image references by removing underscores
find . -type f -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" -o -name "*.html" -o -name "*.css" | while read file; do
    if grep -q "directors/" "$file"; then
        echo "Checking director references in $file"
        # Find all director references with underscores and replace them
        grep -o "/images/directors/[^\"']*_[^\"']*" "$file" | while read match; do
            # Remove underscore from the match
            new_match=$(echo "$match" | sed 's/_//g')
            echo "Replacing $match with $new_match in $file"
            sed -i "s|$match|$new_match|g" "$file"
        done
    fi
done

echo "Image reference updates complete!" 