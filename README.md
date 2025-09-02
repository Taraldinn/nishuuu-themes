# 🎨 Nishuuu Themes

[![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/nishuuu.nishuuu-themes?style=for-the-badge&logo=visual-studio-code&logoColor=white)](https://marketplace.visualstudio.com/items?itemName=nishuuu.nishuuu-themes)
[![Visual Studio Marketplace Downloads](https://img.shields.io/visual-studio-marketplace/d/nishuuu.nishuuu-themes?style=for-the-badge&logo=visual-studio-code&logoColor=white)](https://marketplace.visualstudio.com/items?itemName=nishuuu.nishuuu-themes)
[![Visual Studio Marketplace Rating](https://img.shields.io/visual-studio-marketplace/r/nishuuu.nishuuu-themes?style=for-the-badge&logo=visual-studio-code&logoColor=white)](https://marketplace.visualstudio.com/items?itemName=nishuuu.nishuuu-themes)

Beautiful dark themes with **dynamic accent color customization** for Visual Studio Code. Features 6 main Tara themes with settings-based accent color system that instantly transforms your coding environment.

## ✨ Features

- 🎨 **6 Main Color Themes**: Carbon, DeepForest, Graphene, Ocean, Palenight, Teal
- 🌈 **Dynamic Accent Colors**: 14 preset colors + custom hex support
- 📊 **Status Bar Integration**: Real-time accent color display and selection
- 🖼️ **Icon Themes**: Matching file icons for all theme variants
- ⚡ **Instant Application**: Colors apply immediately when changed
- 🔧 **Settings-Based**: All customizations stored in VS Code settings
- 🎯 **High Contrast Variants**: Enhanced accessibility options

## 🚀 Quick Start

1. **Install** the extension from VS Code Marketplace
2. **Select Theme**: `Ctrl+K Ctrl+T` → Choose any Tara theme
3. **Change Accent**: Click the colored circle in status bar
4. **Customize**: Pick from 14 colors or enter custom hex

## 🎨 Theme Variants

### Main Themes
| Theme | Description | Best For |
|-------|-------------|----------|
| **Tara Carbon** | Deep charcoal with customizable accents | General development |
| **Tara DeepForest** | Rich forest green palette | Nature lovers |
| **Tara Graphene** | Modern graphite design | Professional coding |
| **Tara Ocean** | Calming blue depths | Long coding sessions |
| **Tara Palenight** | Soft purple nights | Creative work |
| **Tara Teal** | Fresh teal experience | Web development |

### High Contrast Variants
All themes include high contrast versions for enhanced accessibility.

## 🌈 Accent Colors

### Preset Colors
- 🔴 **Tomato** `#FF6347`
- 🟠 **Orange** `#FF7042` 
- 🟡 **Yellow** `#FFCF3D`
- 🟢 **Lime** `#32CD32`
- 🔵 **Cyan** `#64FFDA`
- 🟣 **Purple** `#B54DFF`
- 🌸 **Pink** `#FF699E`
- 🟦 **Blue** `#5393FF`
- 🟪 **Indigo** `#3F51B5`
- 🍃 **Acid-Lime** `#C6FF00`
- 🌊 **Bright-Teal** `#1DE9B6`
- 🐚 **Teal** `#80CBC4`
- ⚡ **Vira** `#6C63FF`
- ⚪ **White** `#FFFFFF`

### Custom Colors
Enter any hex color for unlimited customization possibilities.

## 📊 Status Bar Integration

The status bar shows your current accent color with:
- **Color Indicator**: Circular icon in your accent color
- **Color Name**: Current accent color name
- **Quick Access**: Click to change colors instantly
- **Background Sync**: Status bar background matches accent

## ⚙️ Configuration

### Available Settings

```json
{
  "nishuuu.accentColor": "teal",
  "nishuuu.customAccentColor": "#80CBC4",
  "nishuuu.enableStatusBar": true
}
```

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `nishuuu.accentColor` | string | `"teal"` | Selected accent color name |
| `nishuuu.customAccentColor` | string | `"#80CBC4"` | Custom hex color value |
| `nishuuu.enableStatusBar` | boolean | `true` | Show/hide status bar indicator |

## 🎯 What Changes With Accent Colors

- **Activity Bar**: Badges and active indicators
- **Editor**: Selection backgrounds, find highlights
- **Status Bar**: Background and prominent items
- **Buttons**: Primary button backgrounds
- **Tabs**: Active tab borders and highlights
- **Sidebar**: Selection and hover states
- **Terminal**: Cursor and selection colors

## 🔧 Commands

Access these commands via Command Palette (`Ctrl+Shift+P`):

- `Nishuuu: Apply Accent Color Now` - Force apply current accent color
- `Nishuuu: Debug Accent Color System` - Troubleshoot color application

## 📖 Usage Examples

### Quick Color Change
1. Click the colored circle in status bar
2. Select from the dropdown menu
3. Colors apply instantly!

### Custom Hex Color
1. Select "Custom Color" from dropdown
2. Enter your hex color (e.g., `#FF5722`)
3. Press Enter to apply

### Settings Method
```json
{
  "nishuuu.accentColor": "purple",
  "nishuuu.enableStatusBar": true
}
```

## 🎨 Screenshots

*[Add screenshots showing different themes and accent colors]*

## 🛠️ Development

### File Structure
```
nishuuu-themes/
├── themes/                    # Theme JSON files
├── nishuuu themes all settings/   # Accent color configurations
├── icons/                     # Icon theme assets
├── src/extension.js          # Main extension logic
└── package.json              # Extension manifest
```

### Building
```bash
# Package extension
npm run package

# Install locally
npm run install
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 Changelog

### v4.0.0
- Complete rebuild with dynamic accent colors
- 6 main Tara themes with high contrast variants
- Status bar integration with color sync
- Settings-based configuration system
- Icon themes for all variants
- Custom hex color support

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Marketplace**: [Nishuuu Themes](https://marketplace.visualstudio.com/items?itemName=nishuuu.nishuuu-themes)
- **Repository**: [GitHub](https://github.com/nishuuu/nishuuu-themes)
- **Issues**: [Bug Reports & Features](https://github.com/nishuuu/nishuuu-themes/issues)

## ⭐ Support

If you enjoy using Nishuuu Themes:
- ⭐ **Star** the repository
- 📝 **Rate** on VS Code Marketplace  
- 🐛 **Report** bugs or suggest features
- 💬 **Share** with fellow developers

---

**Made with 💜 by [nishuuu](https://github.com/nishuuu-themes)**

*Transform your coding environment with beautiful themes and dynamic colors!*