#!/bin/bash

# Nishuuu Themes - Development Setup Script

echo "🎨 Setting up Nishuuu Themes development environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

echo "🔧 Installing VSCE (VS Code Extension CLI)..."
npm install -g @vscode/vsce

echo "✨ Validating theme files..."
for theme in themes/*.json; do
    if ! node -pe "JSON.parse(require('fs').readFileSync('$theme', 'utf8'))" > /dev/null 2>&1; then
        echo "❌ Invalid JSON in $theme"
        exit 1
    fi
done

echo "📦 Packaging extension..."
vsce package

echo "✅ Development setup complete!"
echo ""
echo "🚀 Available commands:"
echo "  npm run package  - Package the extension"
echo "  npm run publish  - Publish to marketplace"
echo ""
echo "🔧 To install locally:"
echo "  code --install-extension nishuuu-themes-*.vsix"
echo ""
echo "💡 To test themes:"
echo "  1. Install the extension"
echo "  2. Press Ctrl+Shift+P (Cmd+Shift+P on Mac)"
echo "  3. Type 'Color Theme' and select a Tara theme"
