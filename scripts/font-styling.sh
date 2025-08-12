#!/bin/bash

# Nishuuu Themes - Refined Bold Styling
# Updates italic themes to only bold actual keywords, not everything

echo "🎨 Refining Bold Styling - Keywords Only"
echo "========================================"

# Define theme variants
themes=(
    "tara-carbon"
    "tara-carbon-high-contrast"
    "tara-deepforest"
    "tara-deepforest-high-contrast"
    "tara-graphene"
    "tara-graphene-high-contrast"
    "tara-ocean"
    "tara-ocean-high-contrast"
    "tara-palenight"
    "tara-palenight-high-contrast"
    "tara-teal"
    "tara-teal-high-contrast"
)

# Function to refine theme with keyword-only bold styles
refine_theme() {
    local theme_name="$1"
    local input_file="themes/${theme_name}.json"
    local italic_file="themes/${theme_name}-italic.json"
    
    if [[ ! -f "$input_file" ]]; then
        echo "❌ Theme file not found: $input_file"
        return 1
    fi
    
    if [[ ! -f "$italic_file" ]]; then
        echo "❌ Italic theme file not found: $italic_file"
        return 1
    fi
    
    echo "🔧 Refining: $theme_name"
    
    # Refine italic theme with keyword-only bold styles using Node.js
    node -e "
    const fs = require('fs');
    const theme = JSON.parse(fs.readFileSync('$italic_file', 'utf8'));
    
    // Remove all enhanced rules first
    theme.tokenColors = theme.tokenColors.filter(rule => 
        !rule.name || !rule.name.includes('Enhanced')
    );
    
    // Add refined font styles - ONLY keywords get bold
    const refinedEnhancements = [
        {
            name: 'Keywords Bold Only',
            scope: [
                'keyword.control',
                'keyword.control.flow',
                'keyword.control.conditional',
                'keyword.control.loop',
                'keyword.control.import',
                'keyword.control.export',
                'keyword.control.from',
                'keyword.control.as',
                'keyword.operator.new',
                'keyword.operator.typeof',
                'keyword.operator.instanceof',
                'storage.type',
                'storage.modifier'
            ],
            settings: {
                fontStyle: 'bold'
            }
        },
        {
            name: 'Function Names Italic',
            scope: [
                'entity.name.function',
                'support.function'
            ],
            settings: {
                fontStyle: 'italic'
            }
        },
        {
            name: 'Variables Italic',
            scope: [
                'variable.parameter',
                'variable.other.readwrite',
                'variable.other.property'
            ],
            settings: {
                fontStyle: 'italic'
            }
        },
        {
            name: 'Comments Italic',
            scope: [
                'comment',
                'comment.line',
                'comment.block'
            ],
            settings: {
                fontStyle: 'italic'
            }
        }
    ];
    
    // Add refined enhancements
    theme.tokenColors.push(...refinedEnhancements);
    
    fs.writeFileSync('$italic_file', JSON.stringify(theme, null, 4));
    "
    
    echo "✅ Refined: $italic_file"
}

# Process each theme
for theme in "${themes[@]}"; do
    refine_theme "$theme"
done

echo ""
echo "🎯 Refinement Complete:"
echo "======================="
echo "✅ Bold styling now ONLY applies to actual keywords"
echo "✅ Functions, variables, properties remain italic"
echo "✅ Removed excessive bold styling from constants, classes, etc."
echo "📁 Location: themes/*-italic.json"
