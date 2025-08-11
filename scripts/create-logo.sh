#!/bin/bash

echo "🎨 Nishuuu Themes Logo Creator"
echo "=============================="
echo ""

echo "✅ Created icon.svg with beautiful logo design"
echo ""

echo "📋 To create icon.png (required for VS Code extension):"
echo ""
echo "Option 1 - Online Converter:"
echo "1. Go to: https://convertio.co/svg-png/"
echo "2. Upload: icon.svg"
echo "3. Set size: 128x128 pixels"
echo "4. Download as: icon.png"
echo ""

echo "Option 2 - Browser Method:"
echo "1. Open: logo-generator.html in your browser"
echo "2. Right-click the logo"
echo "3. Save image as icon.png"
echo ""

echo "Option 3 - Install ImageMagick:"
echo "1. Run: sudo apt install imagemagick"
echo "2. Run: convert icon.svg -resize 128x128 icon.png"
echo ""

echo "🎯 Logo Design Features:"
echo "• Dark gradient background (theme colors)"
echo "• Stylized 'N' for Nishuuu (accent gradient)"
echo "• 5 colored dots (theme variants)"
echo "• 128x128 pixels (VS Code requirement)"
echo "• Professional, modern design"
echo ""

if [ -f "icon.png" ]; then
    echo "✅ icon.png already exists!"
    ls -la icon.png
else
    echo "⏳ Please create icon.png using one of the methods above"
fi

echo ""
echo "📦 After creating icon.png, run: npm run package"
echo "🚀 Then publish with: vsce publish"
