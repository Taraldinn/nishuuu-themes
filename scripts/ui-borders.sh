#!/bin/bash

# Nishuuu Themes - Remove All Active Borders
# Removes tab borders, active borders, and other UI borders for a cleaner look

echo "🚫 Removing All Active Borders from Themes"
echo "=========================================="

# Get all theme files (excluding icon themes)
theme_files=(themes/tara-*.json)

# Function to remove borders from a theme
remove_borders() {
    local theme_file="$1"
    
    if [[ ! -f "$theme_file" || "$theme_file" == *"icons"* ]]; then
        return
    fi
    
    echo "🔧 Processing: $(basename "$theme_file")"
    
    # Use Node.js to safely modify the JSON
    node -e "
    const fs = require('fs');
    const theme = JSON.parse(fs.readFileSync('$theme_file', 'utf8'));
    
    if (theme.colors) {
        // Remove all border-related colors
        const borderProperties = [
            'tab.activeBorder',
            'tab.activeModifiedBorder', 
            'tab.unfocusedActiveBorder',
            'tab.activeBorderTop',
            'tab.unfocusedActiveBorderTop',
            'tab.border',
            'contrastActiveBorder',
            'inputOption.activeBorder',
            'panelTitle.activeBorder',
            'activityBar.activeBorder',
            'activityBarTop.activeBorder',
            'commandCenter.activeBorder',
            'notebook.inactiveFocusedCellBorder',
            'focusBorder',
            'widget.border',
            'input.border',
            'dropdown.border',
            'button.border',
            'checkbox.border',
            'editorWidget.border',
            'editorGroup.border',
            'panel.border',
            'sideBar.border',
            'statusBar.border',
            'titleBar.border',
            'menu.border',
            'menubar.selectionBorder',
            'breadcrumb.focusForeground',
            'breadcrumb.activeSelectionForeground'
        ];
        
        // Set all border properties to transparent
        borderProperties.forEach(prop => {
            if (theme.colors[prop] !== undefined) {
                theme.colors[prop] = '#00000000'; // Fully transparent
            }
        });
        
        // Also ensure tab backgrounds are clean without borders
        theme.colors['tab.activeBackground'] = theme.colors['tab.activeBackground'] || theme.colors['editor.background'];
        theme.colors['tab.inactiveBackground'] = theme.colors['tab.inactiveBackground'] || theme.colors['editorGroupHeader.tabsBackground'];
    }
    
    fs.writeFileSync('$theme_file', JSON.stringify(theme, null, 4));
    "
    
    echo "   ✅ Removed borders from $(basename "$theme_file")"
}

# Process all theme files
for theme_file in themes/tara-*.json; do
    if [[ -f "$theme_file" && "$theme_file" != *"icons"* ]]; then
        remove_borders "$theme_file"
    fi
done

echo ""
echo "🎯 Border Removal Complete"
echo "=========================="
echo "✅ Removed all tab borders and active borders"
echo "✅ Set all border properties to transparent"
echo "✅ Clean, borderless UI experience"
echo ""
echo "📝 Changes applied to:"
echo "   • Tab borders (active, inactive, unfocused)"
echo "   • Activity bar borders"
echo "   • Panel borders"
echo "   • Input field borders"
echo "   • Widget borders"
echo "   • All other UI element borders"
