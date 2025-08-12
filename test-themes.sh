#!/bin/bash

echo "🎨 Testing Nishuuu Themes Locally"
echo "=================================="

# Check if themes directory exists
if [ ! -d "themes" ]; then
    echo "❌ Themes directory not found!"
    exit 1
fi

echo "📁 Theme Files Found:"
theme_count=$(ls themes/*.json | wc -l)
echo "   Total JSON files: $theme_count"

echo ""
echo "🎯 Tara Themes:"
ls themes/tara-*.json | sed 's/themes\//   /' | sed 's/\.json//'

echo ""
echo "🌟 Vira Themes:"
ls themes/vira-*.json | sed 's/themes\//   /' | sed 's/\.json//'

echo ""
echo "🎨 Vira-Theme Variants:"
ls themes/Vira-Theme-*.json | sed 's/themes\//   /' | sed 's/\.json//'

echo ""
echo "🎯 Icon Themes:"
ls themes/*Icons*.json | sed 's/themes\//   /' | sed 's/\.json//'

echo ""
echo "✅ All themes are ready for testing!"
echo ""
echo "🚀 To test locally:"
echo "   1. Press F5 to launch Extension Development Host"
echo "   2. In the new window: Ctrl+K Ctrl+T to open theme selector"
echo "   3. Browse through all Tara and Vira themes"
echo "   4. Test accent color picker: Ctrl+Shift+P → 'Nishuuu: Select Accent Color'"
echo ""
