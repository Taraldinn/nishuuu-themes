#!/bin/bash

echo "🔧 Fixing folder/file tab focus borders and foreground colors..."
echo "================================================================"

# Directory containing the themes
THEMES_DIR="/home/aldinn/Documents/code/webstrom theme plugin/themes/nishuuu-themes/themes"

# Counter for modified files
modified_count=0

# Function to get accent color for each theme
get_accent_color() {
    local theme_name="$1"
    case "$theme_name" in
        *teal*|*Teal*) echo "#80CBC4" ;;
        *ocean*|*Ocean*) echo "#6EBAD7" ;;
        *palenight*|*Palenight*) echo "#A178C4" ;;
        *graphene*|*Graphene*) echo "#6A90D0" ;;
        *carbon*|*Carbon*) echo "#D9D9D9" ;;
        *deepforest*|*Deepforest*) echo "#A3C679" ;;
        *) echo "#FFFFFF" ;;
    esac
}

# Process all color theme files (exclude icon themes)
for theme_file in "$THEMES_DIR"/*.json; do
    if [ -f "$theme_file" ] && [[ ! "$(basename "$theme_file")" =~ Icons ]]; then
        filename=$(basename "$theme_file")
        echo "Processing: $filename"
        
        # Get the accent color for this theme
        accent_color=$(get_accent_color "$filename")
        
        # Create backup
        cp "$theme_file" "$theme_file.backup"
        
        # Remove focus borders completely
        # For compressed JSON (single line files like Vira-Theme-*)
        if grep -q '"colors":{' "$theme_file"; then
            # Remove focus borders
            sed -i 's/"focusBorder":"[^"]*"/"focusBorder":"#00000000"/g' "$theme_file"
            # Update list/tree selection colors with accent
            sed -i "s/\"list\.activeSelectionForeground\":\"[^\"]*\"/\"list.activeSelectionForeground\":\"$accent_color\"/g" "$theme_file"
            sed -i "s/\"list\.inactiveSelectionForeground\":\"[^\"]*\"/\"list.inactiveSelectionForeground\":\"$accent_color\"/g" "$theme_file"
            sed -i "s/\"list\.highlightForeground\":\"[^\"]*\"/\"list.highlightForeground\":\"$accent_color\"/g" "$theme_file"
            sed -i "s/\"list\.activeSelectionIconForeground\":\"[^\"]*\"/\"list.activeSelectionIconForeground\":\"$accent_color\"/g" "$theme_file"
            sed -i "s/\"list\.inactiveSelectionIconForeground\":\"[^\"]*\"/\"list.inactiveSelectionIconForeground\":\"$accent_color\"/g" "$theme_file"
        else
            # For properly formatted JSON files
            sed -i 's/"focusBorder": "[^"]*"/"focusBorder": "#00000000"/g' "$theme_file"
            # Update list/tree selection colors with accent
            sed -i "s/\"list\.activeSelectionForeground\": \"[^\"]*\"/\"list.activeSelectionForeground\": \"$accent_color\"/g" "$theme_file"
            sed -i "s/\"list\.inactiveSelectionForeground\": \"[^\"]*\"/\"list.inactiveSelectionForeground\": \"$accent_color\"/g" "$theme_file"
            sed -i "s/\"list\.highlightForeground\": \"[^\"]*\"/\"list.highlightForeground\": \"$accent_color\"/g" "$theme_file"
            sed -i "s/\"list\.activeSelectionIconForeground\": \"[^\"]*\"/\"list.activeSelectionIconForeground\": \"$accent_color\"/g" "$theme_file"
            sed -i "s/\"list\.inactiveSelectionIconForeground\": \"[^\"]*\"/\"list.inactiveSelectionIconForeground\": \"$accent_color\"/g" "$theme_file"
        fi
        
        # Check if file was actually modified
        if ! cmp -s "$theme_file" "$theme_file.backup"; then
            echo "  ✅ Modified: $filename (accent: $accent_color)"
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
echo "   Focus borders removed and foreground colors updated with accent colors."
echo ""
