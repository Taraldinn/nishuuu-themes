# 🚀 Nishuuu Themes - Installation & Publishing Guide

This guide covers everything you need to know about installing, testing, and publishing the Nishuuu Themes extension.

## 📦 Quick Setup

### Automated Setup (Recommended)
```bash
cd nishuuu-themes
./setup.sh
```

### Manual Setup
```bash
# Install dependencies
npm install

# Install VSCE globally
npm install -g @vscode/vsce

# Package the extension
npm run package
```

## 🔧 Local Installation & Testing

### Install Locally
```bash
# Package the extension
vsce package

# Install in VS Code
code --install-extension nishuuu-themes-1.0.0.vsix
```

### Test the Themes
1. Open VS Code
2. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
3. Type "Color Theme"
4. Select any Tara theme from the list
5. Test with different file types to verify syntax highlighting

### Test Accent Color Feature
1. **Status Bar Method**: 
   - Look for the accent color name in the status bar (e.g., "Graphene")
   - Click on it to open the accent color selector
   - Choose a different accent color and see both theme and icons change

2. **Command Palette Method**:
   - Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
   - Type "Tara Theme: Select Accent Color"
   - Choose from the dropdown options

3. **Verify**:
   - Both color theme and icon theme should change together
   - Status bar should update to show the new accent color name

## 🌐 Publishing to VS Code Marketplace

### Prerequisites
1. **Microsoft Account**: Create one at https://account.microsoft.com
2. **Azure DevOps**: Set up at https://dev.azure.com
3. **Publisher Account**: Create at https://marketplace.visualstudio.com/manage

### Setup Publisher Account
1. Go to https://marketplace.visualstudio.com/manage
2. Sign in with your Microsoft account
3. Create a new publisher with ID: `nishuuu`
4. Fill in all required details

### Get Personal Access Token
1. Go to https://dev.azure.com
2. Click on your profile → Personal Access Tokens
3. Create new token with:
   - **Name**: VS Code Extension Publishing
   - **Expiration**: 1 year (or custom)
   - **Scopes**: Select "Marketplace" → "Manage"
4. Copy the token (you won't see it again!)

### Login to VSCE
```bash
# Login with your publisher name
vsce login nishuuu

# Enter your Personal Access Token when prompted
```

### Publish the Extension
```bash
# Publish to marketplace
vsce publish

# Or publish with specific version
vsce publish 1.0.0

# Or publish as pre-release
vsce publish --pre-release
```

### Update Extension
```bash
# Increment version and publish
vsce publish patch  # 1.0.0 → 1.0.1
vsce publish minor  # 1.0.0 → 1.1.0
vsce publish major  # 1.0.0 → 2.0.0
```

## 🐙 GitHub Repository Setup

### Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `nishuuu-themes`
3. Description: "Beautiful dark themes for VS Code featuring Tara color schemes"
4. Make it public
5. Initialize with README (uncheck, we already have one)

### Connect Local Repository
```bash
cd nishuuu-themes

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Nishuuu Themes v1.0.0"

# Add remote origin
git remote add origin https://github.com/nishuuu/nishuuu-themes.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Setup GitHub Secrets (for automated publishing)
1. Go to your GitHub repository
2. Settings → Secrets and Variables → Actions
3. Add these secrets:
   - `VSCE_PAT`: Your Visual Studio Code Personal Access Token
   - `GITHUB_TOKEN`: Auto-created by GitHub (no action needed)

### Create Release
```bash
# Tag the release
git tag v1.0.0
git push origin v1.0.0

# Or create through GitHub UI:
# Go to Releases → Create a new release
```

## 📝 Version Management

### Updating Versions
1. **Update package.json version**
2. **Update CHANGELOG.md** with new changes
3. **Commit changes**
4. **Create git tag**
5. **Push to GitHub**
6. **Publish to marketplace**

Example workflow:
```bash
# Update version in package.json (manually or with npm)
npm version patch  # Updates package.json and creates git tag

# Update CHANGELOG.md
# ... add your changes ...

# Commit and push
git add .
git commit -m "Release v1.0.1: Bug fixes and improvements"
git push origin main
git push origin --tags

# Publish to marketplace
vsce publish
```

## 🎯 Publishing Checklist

### Before Publishing
- [ ] All theme files are valid JSON
- [ ] Package.json has correct version
- [ ] README.md is complete and accurate
- [ ] CHANGELOG.md is updated
- [ ] LICENSE file is present
- [ ] Icon file is ready (icon.png)
- [ ] Extension has been tested locally
- [ ] All themes work correctly
- [ ] Terminal colors are properly set

### Publishing Steps
- [ ] Version bumped in package.json
- [ ] Changes documented in CHANGELOG.md
- [ ] Code committed to git
- [ ] Git tag created
- [ ] Pushed to GitHub
- [ ] Extension packaged successfully
- [ ] Published to VS Code Marketplace
- [ ] GitHub release created
- [ ] Extension verified in marketplace

## 🔍 Testing Checklist

### Theme Testing
- [ ] **JavaScript/TypeScript**: Functions, strings, comments, keywords
- [ ] **Python**: Classes, functions, decorators, f-strings
- [ ] **HTML**: Tags, attributes, text content
- [ ] **CSS**: Selectors, properties, values
- [ ] **JSON**: Keys, values, strings, numbers
- [ ] **Markdown**: Headers, links, code blocks, emphasis
- [ ] **Terminal**: All 16 ANSI colors work correctly

### UI Testing
- [ ] Sidebar colors
- [ ] Activity bar styling
- [ ] Tab styling (active/inactive)
- [ ] Status bar colors
- [ ] Panel backgrounds
- [ ] Input field styling
- [ ] Dropdown menus
- [ ] Notification styling

## 🆘 Troubleshooting

### Common Issues

**"Publisher not found"**
```bash
# Make sure you're logged in
vsce login nishuuu
```

**"Invalid JSON in theme file"**
```bash
# Validate JSON files
node -pe "JSON.parse(require('fs').readFileSync('themes/tara-carbon.json', 'utf8'))"
```

**"Package failed"**
```bash
# Check .vscodeignore file
# Ensure all required files are included
```

**"Extension not installing"**
```bash
# Check VS Code version compatibility
# Verify in package.json: "engines.vscode"
```

### Getting Help
- **VS Code Extension Docs**: https://code.visualstudio.com/api
- **VSCE Documentation**: https://github.com/microsoft/vscode-vsce
- **Marketplace Publishing**: https://code.visualstudio.com/api/working-with-extensions/publishing-extension

## 📊 Analytics & Monitoring

### After Publishing
- Monitor downloads on VS Code Marketplace
- Check user reviews and ratings
- Watch for GitHub issues and feedback
- Track extension usage analytics

### Marketplace Links
- **Extension Page**: https://marketplace.visualstudio.com/items?itemName=nishuuu.nishuuu-themes
- **Publisher Dashboard**: https://marketplace.visualstudio.com/manage/publishers/nishuuu

---

🎉 **Congratulations!** You now have everything needed to publish and maintain the Nishuuu Themes extension!
