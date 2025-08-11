# 🧪 Nishuuu Themes - Local Testing Guide

This guide will help you test the Nishuuu Themes extension locally, including the new accent color switching functionality.

## 🚀 Installation for Testing

### 1. Package and Install
```bash
# Navigate to the extension directory
cd nishuuu-themes

# Package the extension
vsce package

# Install in VS Code
code --install-extension nishuuu-themes-1.0.0.vsix
```

### 2. Verify Installation
1. Open VS Code
2. Go to Extensions panel (`Ctrl+Shift+X`)
3. Search for "Nishuuu Themes" 
4. Verify it shows as installed

## 🎨 Testing Color Themes

### 1. Basic Theme Testing
1. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
2. Type "Color Theme" and select "Preferences: Color Theme"
3. You should see all Tara themes:
   - Tara Carbon
   - Tara Carbon High Contrast
   - Tara Graphene  
   - Tara Graphene High Contrast
   - Tara Ocean
   - Tara Ocean High Contrast
   - Tara Teal
   - Tara Teal High Contrast
   - Tara Palenight
   - Tara Palenight High Contrast
   - Tara Deepforest
   - Tara Deepforest High Contrast

### 2. Test Syntax Highlighting
1. Open different file types (.js, .py, .html, .css, .json, etc.)
2. Verify syntax highlighting works correctly
3. Check that colors are distinct and readable

## 🎯 Testing Accent Color Feature

### 1. Status Bar Method
1. **Look for Status Bar Item**: In the bottom status bar (right side), you should see an item with a color symbol and accent name (e.g., "🎨 Graphene")
2. **Click Status Bar**: Click on the accent color name in the status bar
3. **Select New Accent**: A dropdown should appear from the top with options:
   - Carbon (Cool carbon gray accents)
   - Graphene (Modern indigo accents) 
   - Ocean (Marine-inspired blue accents)
   - Teal (Energetic teal accents)
   - Palenight (Mystical purple accents)
   - Deepforest (Natural emerald accents)
4. **Verify Changes**: After selecting a new accent:
   - Color theme should change automatically
   - Icon theme should change automatically  
   - Status bar should update to show new accent name
   - You should see a success notification

### 2. Command Palette Method
1. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
2. Type "Tara Theme: Select Accent Color"
3. Select from the dropdown
4. Verify same automatic changes as above

### 3. Individual Accent Commands
Test each individual command:
1. Press `Ctrl+Shift+P`
2. Try these commands:
   - "Tara Theme: Set Carbon Accent"
   - "Tara Theme: Set Graphene Accent"
   - "Tara Theme: Set Ocean Accent"
   - "Tara Theme: Set Teal Accent"
   - "Tara Theme: Set Palenight Accent"
   - "Tara Theme: Set Deepforest Accent"

## 🎨 Testing Icon Themes

### 1. Basic Icon Testing
1. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
2. Type "File Icon Theme" and select "Preferences: File Icon Theme"
3. You should see all Tara icon themes:
   - Tara Icons Carbon
   - Tara Icons Graphene
   - Tara Icons Ocean
   - Tara Icons Teal
   - Tara Icons Palenight
   - Tara Icons Deepforest

### 2. Verify Icon-Accent Synchronization
1. Set a specific color theme (e.g., Tara Ocean)
2. Use accent color switcher to change to a different accent (e.g., Teal)
3. Verify both color theme AND icon theme changed to match (Tara Teal + Tara Icons Teal)

### 3. Test File Icons
1. Create or open files with different extensions
2. Verify appropriate icons appear for:
   - Programming files (.js, .py, .java, .cpp, etc.)
   - Web files (.html, .css, .scss, etc.)
   - Config files (.json, .yaml, .toml, etc.)
   - Documentation (.md, .txt, etc.)

## 🔄 Testing High Contrast Support

### 1. High Contrast Preservation
1. Manually set a high contrast theme (e.g., "Tara Ocean High Contrast")
2. Use accent color switcher to change accent (e.g., to Teal)
3. Verify it switches to "Tara Teal High Contrast" (preserves high contrast)

### 2. Regular to High Contrast
1. Set a regular theme (e.g., "Tara Carbon")
2. Manually switch to high contrast version
3. Use accent switcher - should maintain high contrast preference

## 🌈 Testing Multiple Languages

Create test files for different programming languages to verify syntax highlighting:

### JavaScript/TypeScript
```javascript
// test.js
const greeting = "Hello World";
function sayHello(name) {
    return `Hello, ${name}!`;
}

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    speak() {
        console.log(`${this.name} is speaking`);
    }
}
```

### Python
```python
# test.py
def fibonacci(n):
    """Generate fibonacci sequence up to n"""
    a, b = 0, 1
    while a < n:
        print(a, end=' ')
        a, b = b, a + b

class Calculator:
    def __init__(self):
        self.result = 0
    
    def add(self, x, y):
        return x + y
```

## 🔧 Testing Terminal Integration

1. Open VS Code integrated terminal (`Ctrl+` ` or `` Ctrl+Shift+` ``)
2. Run various commands to test terminal colors:
   ```bash
   # Test basic colors
   echo -e "\e[31mRed text\e[0m"
   echo -e "\e[32mGreen text\e[0m" 
   echo -e "\e[33mYellow text\e[0m"
   echo -e "\e[34mBlue text\e[0m"
   
   # Test git output (if in a git repository)
   git status
   git log --oneline -5
   ```

## 🛠️ Troubleshooting

### Status Bar Not Showing
- Restart VS Code after installation
- Check if other extensions might be hiding status bar items
- Look for the color symbol (🎨) and accent name

### Themes Not Appearing
- Ensure extension is properly installed and enabled
- Restart VS Code
- Check VS Code output panel for errors

### Accent Color Not Changing
- Check VS Code settings to ensure themes aren't locked by workspace
- Verify you have permission to change global settings
- Look for error notifications

### Icons Not Changing
- Ensure both color theme and icon theme permissions
- Check that icon files are properly included in the extension
- Verify icon theme IDs match in package.json

## ✅ Complete Test Checklist

- [ ] Extension installs successfully
- [ ] All 12 color themes appear in theme selector
- [ ] All 6 icon themes appear in icon theme selector  
- [ ] Status bar shows current accent color
- [ ] Clicking status bar opens accent selector
- [ ] Command palette accent commands work
- [ ] Accent changes update both color and icon themes
- [ ] High contrast preference is preserved
- [ ] Syntax highlighting works for multiple languages
- [ ] File icons display correctly for various file types
- [ ] No error messages in VS Code output
- [ ] Extension doesn't conflict with other themes

## 📝 Reporting Issues

If you find any issues during testing:

1. **Check VS Code Output Panel**:
   - `View` → `Output` → Select "Nishuuu Themes" from dropdown
   - Look for error messages

2. **Include in Report**:
   - VS Code version
   - Operating system
   - Steps to reproduce
   - Expected vs actual behavior
   - Console errors (if any)

3. **Common Issues**:
   - Status bar not visible → Try restarting VS Code
   - Themes not changing → Check workspace settings override
   - Extension not loading → Verify installation and check console

## 🎯 Ready for Publishing

Once all tests pass:

1. ✅ All themes and icons work correctly
2. ✅ Accent color switching works smoothly
3. ✅ Status bar integration functions properly
4. ✅ No errors in VS Code output
5. ✅ Performance is acceptable
6. ✅ Documentation is accurate

Your extension is ready for publishing! 🚀
