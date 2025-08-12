#!/bin/bash

echo "🔧 Fixing tab foreground visibility issues..."
echo "=============================================="

# Directory containing the themes
THEMES_DIR="/home/aldinn/Documents/code/webstrom theme plugin/themes/nishuuu-themes/themes"

# Counter for modified files
modified_count=0

# Process all theme files
for theme_file in "$THEMES_DIR"/*.json; do
    if [ -f "$theme_file" ]; then
        filename=$(basename "$theme_file")
        echo "Processing: $filename"
        
        # Create backup
        cp "$theme_file" "$theme_file.backup"
        
        # Add hover foreground colors to ensure text is always visible
        # Also ensure active tab text has good contrast
        
        # For compressed JSON (single line files like Vira-Theme-*)
        if grep -q '"colors":{' "$theme_file"; then
            # Add tab hover foreground and make active foreground more contrasted
            sed -i 's/"tab\.activeForeground":"#FFFFFF"/"tab.activeForeground":"#FFFFFF","tab.hoverForeground":"#FFFFFF","tab.hoverBackground":"#FFFFFF10"/g' "$theme_file"
            # Also add tab.lastPinnedBorder to prevent any border issues
            sed -i 's/"tab\.border":"#00000000"/"tab.border":"#00000000","tab.lastPinnedBorder":"#00000000"/g' "$theme_file"
        else
            # For properly formatted JSON files
            # Add hover foreground after activeForeground if it doesn't exist
            if ! grep -q "tab.hoverForeground" "$theme_file"; then
                sed -i '/\"tab\.activeForeground\": \"#FFFFFF\",/a\        "tab.hoverForeground": "#FFFFFF",' "$theme_file"
                sed -i '/\"tab\.hoverForeground\": \"#FFFFFF\",/a\        "tab.hoverBackground": "#FFFFFF10",' "$theme_file"
            fi
            
            # Add lastPinnedBorder if it doesn't exist  
            if ! grep -q "tab.lastPinnedBorder" "$theme_file"; then
                sed -i '/\"tab\.border\": \"#00000000\",/a\        "tab.lastPinnedBorder": "#00000000",' "$theme_file"
            fi
        fi
        
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
echo "🎉 Complete! Modified $modified_count theme files."
echo "   Tab foreground visibility improved across all themes."
echo ""
