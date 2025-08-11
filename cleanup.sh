#!/bin/bash

echo "🧹 Cleaning up Nishuuu Themes folder structure..."
echo "================================================="
echo ""

# Files to remove (backups, duplicates, temp files)
CLEANUP_FILES=(
    "README.md.backup"
    "README.new.md" 
    "package.json.backup"
    "package.json.new"
    "TESTING_GUIDE_NEW.md"
    "icon-placeholder.txt"
    "convert-icon.js"
    "logo-generator.html"
    "nishuuu-themes-1.0.0.vsix"
)

# Create docs folder for documentation
echo "📁 Creating organized folder structure..."
mkdir -p docs
mkdir -p scripts

echo ""
echo "🗑️  Removing unnecessary files..."

for file in "${CLEANUP_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "   Removing: $file"
        rm "$file"
    fi
done

echo ""
echo "📋 Moving documentation to docs/ folder..."

# Move documentation files
DOC_FILES=(
    "PUBLISHING_GUIDE.md"
    "INSTALLATION.md"
    "TESTING_GUIDE.md"
    "CONTRIBUTING.md"
    "ICON_GUIDE.md"
)

for file in "${DOC_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "   Moving: $file → docs/"
        mv "$file" "docs/"
    fi
done

echo ""
echo "🔧 Moving scripts to scripts/ folder..."

# Move script files
SCRIPT_FILES=(
    "setup.sh"
    "publish.sh"
    "show-all-colors.sh"
    "test-accent-colors.sh"
    "test-folder-icons.sh"
    "create-logo.sh"
)

for file in "${SCRIPT_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "   Moving: $file → scripts/"
        mv "$file" "scripts/"
    fi
done

echo ""
echo "📦 Current folder structure:"
echo ""
echo "nishuuu-themes/"
echo "├── 📁 .git/"
echo "├── 📁 .github/"
echo "├── 📁 docs/           # Documentation"
echo "├── 📁 icons/          # Icon theme assets"
echo "├── 📁 node_modules/   # Dependencies"
echo "├── 📁 scripts/        # Utility scripts"
echo "├── 📁 src/            # Extension source code"
echo "├── 📁 themes/         # Color & icon themes"
echo "├── 📄 .gitignore"
echo "├── 📄 .vscodeignore"
echo "├── 📄 CHANGELOG.md"
echo "├── 📄 LICENSE"
echo "├── 📄 README.md"
echo "├── 📄 icon.svg        # Logo source"
echo "├── 📄 package.json"
echo "└── 📄 package-lock.json"
echo ""

echo "✅ Cleanup complete!"
echo ""
echo "📝 Summary:"
echo "   • Removed $(echo ${CLEANUP_FILES[@]} | wc -w) unnecessary files"
echo "   • Organized documentation in docs/ folder"
echo "   • Organized scripts in scripts/ folder"
echo "   • Clean, professional folder structure"
echo ""

echo "🚀 Next steps:"
echo "   1. Create icon.png from icon.svg"
echo "   2. Run: npm run package"
echo "   3. Run: vsce publish"
