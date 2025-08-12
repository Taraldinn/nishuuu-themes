#!/bin/bash

echo "🔧 Removing left and right borders from file tabs in all Vira themes..."
echo "=================================================================="

# Directory containing the themes
THEMES_DIR="/home/aldinn/Documents/code/webstrom theme plugin/themes/nishuuu-themes/themes"

# Counter for modified files
modified_count=0

# Process all Vira theme files
for theme_file in "$THEMES_DIR"/vira-*.json "$THEMES_DIR"/Vira-*.json; do
    if [ -f "$theme_file" ]; then
        filename=$(basename "$theme_file")
        echo "Processing: $filename"
        
        # Create backup
        cp "$theme_file" "$theme_file.backup"
        
        # Remove tab borders by setting them to transparent
        sed -i 's/"tab\.border":"[^"]*"/"tab.border":"#00000000"/g' "$theme_file"
        sed -i 's/"tab\.activeBorder":"[^"]*"/"tab.activeBorder":"#00000000"/g' "$theme_file"
        sed -i 's/"tab\.activeModifiedBorder":"[^"]*"/"tab.activeModifiedBorder":"#00000000"/g' "$theme_file"
        sed -i 's/"tab\.unfocusedActiveBorder":"[^"]*"/"tab.unfocusedActiveBorder":"#00000000"/g' "$theme_file"
        
        # Check if file was actually modified
        if ! cmp -s "$theme_file" "$theme_file.backup"; then
            echo "  ✅ Modified: $filename"
            modified_count=$((modified_count + 1))
            rm "$theme_file.backup"
        else
            echo "  ℹ️  No changes needed: $filename"
            rm "$theme_file.backup"
        fi
    fi
done

echo ""
echo "🎉 Complete! Modified $modified_count Vira theme files."
echo "   All file tabs now have no left/right borders."
echo ""
