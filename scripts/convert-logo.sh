#!/bin/bash

# Nishuuu Themes Logo Converter
# This script helps convert the SVG logo to PNG format required by VS Code

echo "🎨 Nishuuu Themes Logo Converter"
echo "================================"
echo ""

# Check if we're in the right directory
if [[ ! -f "icon.svg" ]]; then
    echo "❌ Error: icon.svg not found. Please run this from the extension root directory."
    exit 1
fi

echo "📂 Current directory: $(pwd)"
echo "✅ Found icon.svg"
echo ""

echo "🌐 Opening logo generator in browser..."
echo ""

# Method 1: Browser-based conversion (recommended)
echo "METHOD 1: Browser Conversion (Recommended)"
echo "==========================================="
echo "1. The logo generator should now be open in VS Code's Simple Browser"
echo "2. Right-click on the logo image"
echo "3. Select 'Save image as...' or 'Copy image'"
echo "4. Save as 'icon.png' in this directory (128x128 pixels)"
echo ""

# Method 2: Command line conversion (if available)
echo "METHOD 2: Command Line Conversion"
echo "================================="

# Check for ImageMagick
if command -v convert &> /dev/null; then
    echo "✅ ImageMagick found - Converting now..."
    convert icon.svg -resize 128x128 icon.png
    if [[ -f "icon.png" ]]; then
        echo "✅ Successfully created icon.png!"
        ls -la icon.png
    else
        echo "❌ Conversion failed"
    fi
elif command -v inkscape &> /dev/null; then
    echo "✅ Inkscape found - Converting now..."
    inkscape icon.svg --export-type=png --export-filename=icon.png --export-width=128 --export-height=128
    if [[ -f "icon.png" ]]; then
        echo "✅ Successfully created icon.png!"
        ls -la icon.png
    else
        echo "❌ Conversion failed"
    fi
else
    echo "⚠️  No command-line tools found (ImageMagick/Inkscape)"
    echo "   Please use the browser method above"
fi

echo ""
echo "📋 Next Steps After Creating icon.png:"
echo "======================================"
echo "1. Verify icon.png exists (128x128 pixels)"
echo "2. Run: npm run package"
echo "3. Run: vsce publish"
echo ""

# Check if icon.png exists
if [[ -f "icon.png" ]]; then
    echo "✅ icon.png found!"
    file_size=$(ls -la icon.png | awk '{print $5}')
    echo "   Size: $file_size bytes"
    
    # Check dimensions if possible
    if command -v identify &> /dev/null; then
        dimensions=$(identify icon.png 2>/dev/null | awk '{print $3}')
        echo "   Dimensions: $dimensions"
    fi
    
    echo ""
    echo "🚀 Ready to package the extension!"
    echo "   Run: npm run package"
else
    echo "⏳ Waiting for icon.png to be created..."
fi
