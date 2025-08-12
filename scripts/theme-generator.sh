#!/bin/bash

# Nishuuu Themes - Italic/Bold Theme Generator
# Creates enhanced versions of existing themes with more italic and bold styles

echo "🎨 Creating Italic/Bold Enhanced Themes"
echo "======================================="

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

# Function to enhance theme with italic/bold styles
enhance_theme() {
    local theme_name="$1"
    local input_file="themes/${theme_name}.json"
    local output_file="themes/${theme_name}-italic.json"
    
    if [[ ! -f "$input_file" ]]; then
        echo "❌ Theme file not found: $input_file"
        return 1
    fi
    
    echo "🔧 Processing: $theme_name"
    
    # Copy original theme
    cp "$input_file" "$output_file"
    
    # Update theme name
    sed -i "s/\"name\": \"${theme_name^}\"/\"name\": \"${theme_name^} Italic\"/" "$output_file"
    
    # Add enhanced italic/bold styles using Node.js for precise JSON manipulation
    node -e "
    const fs = require('fs');
    const theme = JSON.parse(fs.readFileSync('$output_file', 'utf8'));
    
    // Update theme name
    theme.name = theme.name.replace(/Italic$/, '') + ' Italic';
    
    // Enhanced font styles for various language constructs
    const enhancements = [
        {
            name: 'Keywords Enhanced',
            scope: [
                'keyword',
                'keyword.control',
                'keyword.operator.new',
                'keyword.other.using',
                'keyword.other.directive.using',
                'storage.type',
                'storage.modifier'
            ],
            settings: {
                fontStyle: 'bold'
            }
        },
        {
            name: 'Functions Enhanced',
            scope: [
                'entity.name.function',
                'meta.function-call',
                'support.function',
                'entity.name.method'
            ],
            settings: {
                fontStyle: 'italic'
            }
        },
        {
            name: 'Classes Enhanced',
            scope: [
                'entity.name.class',
                'entity.name.type.class',
                'support.class',
                'entity.other.inherited-class'
            ],
            settings: {
                fontStyle: 'bold italic'
            }
        },
        {
            name: 'Variables Enhanced',
            scope: [
                'variable.parameter',
                'variable.other.readwrite',
                'meta.definition.variable'
            ],
            settings: {
                fontStyle: 'italic'
            }
        },
        {
            name: 'Constants Enhanced',
            scope: [
                'constant.language',
                'constant.numeric',
                'constant.character',
                'constant.other'
            ],
            settings: {
                fontStyle: 'bold'
            }
        },
        {
            name: 'Imports Enhanced',
            scope: [
                'keyword.control.import',
                'keyword.control.from',
                'entity.name.import',
                'entity.name.namespace'
            ],
            settings: {
                fontStyle: 'italic'
            }
        },
        {
            name: 'Types Enhanced',
            scope: [
                'entity.name.type',
                'support.type',
                'storage.type.primitive',
                'meta.type'
            ],
            settings: {
                fontStyle: 'bold'
            }
        },
        {
            name: 'Decorators Enhanced',
            scope: [
                'entity.name.function.decorator',
                'meta.decorator',
                'punctuation.decorator'
            ],
            settings: {
                fontStyle: 'italic'
            }
        },
        {
            name: 'JSX/TSX Enhanced',
            scope: [
                'support.class.component',
                'entity.name.tag.tsx',
                'entity.name.tag.jsx'
            ],
            settings: {
                fontStyle: 'bold'
            }
        },
        {
            name: 'Properties Enhanced',
            scope: [
                'variable.other.property',
                'variable.other.object.property',
                'meta.object-literal.key'
            ],
            settings: {
                fontStyle: 'italic'
            }
        }
    ];
    
    // Remove existing similar rules and add enhancements
    theme.tokenColors = theme.tokenColors.filter(rule => 
        !enhancements.some(enhancement => 
            enhancement.name === rule.name || 
            (Array.isArray(rule.scope) && Array.isArray(enhancement.scope) && 
             rule.scope.some(s => enhancement.scope.includes(s)))
        )
    );
    
    // Add all enhancements
    theme.tokenColors.push(...enhancements);
    
    fs.writeFileSync('$output_file', JSON.stringify(theme, null, 4));
    "
    
    echo "✅ Created: $output_file"
}

# Create enhanced themes directory if it doesn't exist
mkdir -p themes

# Process each theme
for theme in "${themes[@]}"; do
    enhance_theme "$theme"
done

echo ""
echo "🎯 Summary:"
echo "==========="
echo "✅ Created ${#themes[@]} italic/bold enhanced themes"
echo "📁 Location: themes/*-italic.json"
echo ""
echo "📋 Next: Update package.json to register new themes"
