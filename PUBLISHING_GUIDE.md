# How to Publish Nishuuu Themes to VS Code Marketplace

## Prerequisites
✅ Extension is built and packaged (`nishuuu-themes-1.0.0.vsix`)
✅ `vsce` tool is installed

## Step 1: Create Azure DevOps Account
1. Go to https://dev.azure.com
2. Sign in with your Microsoft account (or create one)
3. Create a new organization if prompted

## Step 2: Create Personal Access Token (PAT)
1. In Azure DevOps, click your profile picture → "Personal access tokens"
2. Click "New Token"
3. Give it a name like "VS Code Publishing"
4. Set expiration (recommend 1 year)
5. Under "Scopes", select "Custom defined"
6. Check "Marketplace" → "Manage" (this gives full marketplace access)
7. Click "Create"
8. **IMPORTANT**: Copy the token immediately - you won't see it again!

## Step 3: Create Publisher
```bash
# Login with your PAT (replace YOUR_TOKEN with actual token)
vsce login nishuuu

# When prompted, paste your Personal Access Token
```

## Step 4: Publish Extension
```bash
# Make sure you're in the extension directory
cd /home/aldinn/Documents/code/webstrom\ theme\ plugin/themes/nishuuu-themes

# Publish the extension
vsce publish
```

## Alternative: Manual Upload
If you prefer to upload manually:
1. Go to https://marketplace.visualstudio.com/manage
2. Sign in with the same Microsoft account
3. Click "New extension" → "Visual Studio Code"
4. Upload the `nishuuu-themes-1.0.0.vsix` file

## Before Publishing Checklist
- [ ] Update version number if needed
- [ ] Check all theme files are included
- [ ] Test extension locally
- [ ] Update README.md with screenshots
- [ ] Add proper repository URL in package.json
- [ ] Add proper email in package.json

## Post-Publishing
- Extension will be available at: https://marketplace.visualstudio.com/items?itemName=nishuuu.nishuuu-themes
- Users can install with: `code --install-extension nishuuu.nishuuu-themes`
- Or search "Nishuuu Themes" in VS Code Extensions tab
