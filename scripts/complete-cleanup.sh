#!/bin/bash

# Nishuuu Themes - Complete Project Cleanup
# Organizes, removes duplicates, and optimizes the entire project

echo "🧹 Nishuuu Themes - Complete Project Cleanup"
echo "============================================="
echo ""

# Get current directory
PROJECT_DIR=$(pwd)
echo "📂 Working in: $PROJECT_DIR"
echo ""

# 1. Remove duplicate and backup files
echo "🗑️  Step 1: Removing duplicate and backup files"
echo "================================================"
find . -name "*.backup" -type f -delete 2>/dev/null && echo "   ✅ Removed .backup files"
find . -name "*.old" -type f -delete 2>/dev/null && echo "   ✅ Removed .old files"
find . -name "*.new" -type f -delete 2>/dev/null && echo "   ✅ Removed .new files"
find . -name "*~" -type f -delete 2>/dev/null && echo "   ✅ Removed temp files"

# Remove specific duplicate files
rm -f README.new.md 2>/dev/null && echo "   ✅ Removed README.new.md"
rm -f package.json.new 2>/dev/null && echo "   ✅ Removed package.json.new"
rm -f TESTING_GUIDE_NEW.md 2>/dev/null && echo "   ✅ Removed TESTING_GUIDE_NEW.md"

# 2. Organize loose files into appropriate directories
echo ""
echo "📁 Step 2: Organizing loose files"
echo "=================================="

# Move scripts to scripts/ directory
mkdir -p scripts
for file in *.sh; do
    if [[ -f "$file" && "$file" != "cleanup.sh" ]]; then
        mv "$file" scripts/ 2>/dev/null && echo "   📄 Moved $file → scripts/"
    fi
done

# Move documentation files to docs/
mkdir -p docs
for file in CONTRIBUTING.md INSTALLATION.md PUBLISHING_GUIDE.md TESTING_GUIDE.md ICON_GUIDE.md; do
    if [[ -f "$file" ]]; then
        mv "$file" docs/ 2>/dev/null && echo "   📄 Moved $file → docs/"
    fi
done

# Move utility files to scripts/
for file in convert-icon.js create-logo.sh publish.sh setup.sh show-all-colors.sh test-accent-colors.sh test-folder-icons.sh; do
    if [[ -f "$file" ]]; then
        mv "$file" scripts/ 2>/dev/null && echo "   📄 Moved $file → scripts/"
    fi
done

# Move HTML files to docs/
for file in logo-generator.html; do
    if [[ -f "$file" ]]; then
        mv "$file" docs/ 2>/dev/null && echo "   📄 Moved $file → docs/"
    fi
done

# 3. Clean up package.json
echo ""
echo "📦 Step 3: Cleaning package.json"
echo "================================="

# Remove any stray properties and ensure clean structure
node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// Clean up any duplicate or unnecessary fields
delete pkg.homepage;
delete pkg.bugs;

// Ensure proper structure
pkg.name = 'nishuuu-themes';
pkg.displayName = 'Nishuuu Themes';
pkg.description = 'Beautiful dark themes with Tara color schemes, dynamic accent colors, folder icon sync, and enhanced italic/bold font styling. 24 themes + 6 icon sets with comprehensive syntax highlighting.';
pkg.publisher = 'taraldinn';
pkg.engines = { vscode: '^1.74.0' };

// Clean up scripts
pkg.scripts = {
  'vscode:prepublish': 'echo \"No compilation needed\"',
  'package': 'vsce package',
  'publish': 'vsce publish'
};

// Ensure clean devDependencies
pkg.devDependencies = {
  '@types/vscode': '^1.74.0',
  '@vscode/vsce': '^3.2.0'
};

fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
console.log('   ✅ Cleaned package.json structure');
" && echo "   ✅ Package.json optimized"

# 4. Update .vscodeignore
echo ""
echo "🚫 Step 4: Updating .vscodeignore"
echo "=================================="

cat > .vscodeignore << 'EOF'
# Development files
**/.git/**
**/.github/**
**/node_modules/**
**/.vscode/**
**/.gitignore

# Build and package files
**/*.vsix
**/package-lock.json

# Documentation (keep only essential)
**/docs/**
**/scripts/**
**/*.md
!README.md
!CHANGELOG.md
!LICENSE

# Development utilities
**/convert-icon.js
**/cleanup.sh
**/logo-generator.html
**/icon-placeholder.txt

# Source files (keep only compiled)
**/src/*.backup
**/src/*.new

# Test files
**/test-*
**/demo-*

# Temporary files
**/*~
**/*.backup
**/*.old
**/*.new
**/tmp-*
EOF

echo "   ✅ Updated .vscodeignore"

# 5. Validate theme files
echo ""
echo "🎨 Step 5: Validating theme files"
echo "=================================="

THEME_COUNT=0
INVALID_THEMES=0

for theme_file in themes/*.json; do
    if [[ -f "$theme_file" ]]; then
        if node -e "JSON.parse(require('fs').readFileSync('$theme_file', 'utf8'))" 2>/dev/null; then
            THEME_COUNT=$((THEME_COUNT + 1))
        else
            echo "   ❌ Invalid JSON: $theme_file"
            INVALID_THEMES=$((INVALID_THEMES + 1))
        fi
    fi
done

echo "   ✅ Validated $THEME_COUNT theme files"
if [[ $INVALID_THEMES -gt 0 ]]; then
    echo "   ⚠️  Found $INVALID_THEMES invalid theme files"
fi

# 6. Clean up old package files
echo ""
echo "📦 Step 6: Cleaning old packages"
echo "================================="

# Keep only the latest package
LATEST_VERSION=$(grep '"version"' package.json | cut -d'"' -f4)
for vsix_file in *.vsix; do
    if [[ -f "$vsix_file" && "$vsix_file" != "nishuuu-themes-$LATEST_VERSION.vsix" ]]; then
        rm -f "$vsix_file" && echo "   🗑️  Removed old package: $vsix_file"
    fi
done

# 7. Generate project summary
echo ""
echo "📊 Step 7: Project Summary"
echo "=========================="

echo "📁 Directory Structure:"
echo "   ├── 📄 README.md, CHANGELOG.md, LICENSE"
echo "   ├── 📄 package.json, .vscodeignore"
echo "   ├── 🖼️  icon.png, icon.svg"
echo "   ├── 📁 themes/ ($(ls themes/*.json 2>/dev/null | wc -l) files)"
echo "   ├── 📁 icons/ ($(find icons -name "*.svg" 2>/dev/null | wc -l) files)"
echo "   ├── 📁 src/ ($(ls src/*.js 2>/dev/null | wc -l) files)"
echo "   ├── 📁 docs/ ($(ls docs/ 2>/dev/null | wc -l) files)"
echo "   └── 📁 scripts/ ($(ls scripts/ 2>/dev/null | wc -l) files)"

echo ""
echo "🎨 Theme Breakdown:"
echo "   • Regular themes: $(ls themes/tara-*.json 2>/dev/null | grep -v italic | grep -v icons | wc -l)"
echo "   • Italic themes: $(ls themes/tara-*-italic.json 2>/dev/null | wc -l)"
echo "   • Icon themes: $(ls themes/tara-icons-*.json 2>/dev/null | wc -l)"
echo "   • Total: $(ls themes/tara-*.json 2>/dev/null | wc -l)"

echo ""
echo "📦 Package Info:"
echo "   • Name: nishuuu-themes"
echo "   • Version: $LATEST_VERSION"
echo "   • Size: $(ls -lh nishuuu-themes-$LATEST_VERSION.vsix 2>/dev/null | awk '{print $5}' || echo 'Not packaged')"

echo ""
echo "✨ Cleanup Complete!"
echo "===================="
echo "🎯 Project is now clean, organized, and optimized"
echo "🚀 Ready for packaging and publishing"
echo ""
echo "Next steps:"
echo "   1. npm run package"
echo "   2. Test the extension locally"
echo "   3. vsce publish (when ready)"
