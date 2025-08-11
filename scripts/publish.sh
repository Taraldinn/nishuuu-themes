#!/bin/bash

echo "🎨 Nishuuu Themes Publishing Script"
echo "=================================="
echo ""

echo "1️⃣  First, get your Personal Access Token:"
echo "   → Go to: https://dev.azure.com"
echo "   → Sign in → Profile → Personal access tokens"
echo "   → New Token → Name: 'VS Code Publishing'"
echo "   → Scopes: Custom defined → Marketplace (Manage)"
echo "   → Copy the token!"
echo ""

echo "2️⃣  Login to vsce:"
echo "   vsce login nishuuu"
echo "   (paste your token when prompted)"
echo ""

echo "3️⃣  Publish the extension:"
echo "   vsce publish"
echo ""

echo "📝 Before publishing, update:"
echo "   - Email in package.json (currently: your-email@example.com)"
echo "   - Add icon.png (128x128) for marketplace"
echo "   - Verify repository URL is correct"
echo ""

echo "🚀 After publishing:"
echo "   Extension will be at: https://marketplace.visualstudio.com/items?itemName=nishuuu.nishuuu-themes"
echo ""

echo "Ready to publish? (y/n)"
read -r response
if [[ "$response" =~ ^[Yy]$ ]]; then
    echo "Starting publishing process..."
    echo "Run: vsce login nishuuu"
    echo "Then: vsce publish"
else
    echo "Publishing cancelled. Update your details first!"
fi
