#!/bin/bash

echo "🔍 Nishuuu Themes Project Verification"
echo "====================================="

# Count themes
echo "📂 Themes:"
ls themes/tara-*.json 2>/dev/null | wc -l | xargs echo "  Color themes:"
ls themes/tara-icons-*.json 2>/dev/null | wc -l | xargs echo "  Icon themes:"

# Check essential files
echo ""
echo "📄 Essential Files:"
[ -f package.json ] && echo "  ✅ package.json" || echo "  ❌ package.json"
[ -f src/extension.js ] && echo "  ✅ src/extension.js" || echo "  ❌ src/extension.js"
[ -f README.md ] && echo "  ✅ README.md" || echo "  ❌ README.md"
[ -f CHANGELOG.md ] && echo "  ✅ CHANGELOG.md" || echo "  ❌ CHANGELOG.md"
[ -f LICENSE ] && echo "  ✅ LICENSE" || echo "  ❌ LICENSE"
[ -f .vscodeignore ] && echo "  ✅ .vscodeignore" || echo "  ❌ .vscodeignore"

# Check scripts
echo ""
echo "🔧 Scripts:"
ls scripts/*.sh 2>/dev/null | wc -l | xargs echo "  Shell scripts:"
ls scripts/*.js 2>/dev/null | wc -l | xargs echo "  JS scripts:"

# Check documentation
echo ""
echo "📚 Documentation:"
ls docs/*.md 2>/dev/null | wc -l | xargs echo "  Guide files:"

# Check icons
echo ""
echo "🎨 Assets:"
[ -f icon.svg ] && echo "  ✅ icon.svg" || echo "  ❌ icon.svg"
[ -f icon.png ] && echo "  ✅ icon.png" || echo "  ❌ icon.png"

echo ""
echo "✨ Project verification complete!"
