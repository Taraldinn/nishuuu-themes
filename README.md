# Nishuuu Themes

🎨 **A comprehensive VS Code theme extension** featuring **24 beautiful themes** with **Tara** color schemes, **dynamic accent colors**, **synchronized icon themes**, and **enhanced italic/bold font styling** for modern development.

## 📊 **Overview**

### 🌟 **What You Get**
- **24 Color Themes** (12 regular + 12 italic/bold enhanced)
- **6 Icon Themes** with dynamic accent color synchronization
- **24 Accent Colors** with visual dropdown selection
- **Dynamic folder icon colors** that change with your accent
- **Status bar integration** for quick theme customization
- **Comprehensive syntax highlighting** for 50+ programming languages
- **Terminal color theming** with full ANSI support
- **Professional code styling** optimized for modern development

### 🎯 **Perfect For**
- **Modern JavaScript/TypeScript** development
- **React, Vue, Angular** projects
- **Python, Go, Rust** and other languages
- **Developers who value** beautiful, readable code
- **Teams seeking** consistent visual styling
- **Anyone wanting** a premium theme experience

## ✨ Features

### 🎨 **Complete Theme Collection**
- **12 Base Color Themes** - Each in regular and high contrast variants
- **12 Italic/Bold Enhanced Themes** - Enhanced font styling for better readability
- **6 Icon Themes** - Matching accent colors for perfect coordination
- **Dynamic Accent Colors** - Change accent colors on the fly with 24 options
- **Custom Accent Support** - Use any hex color as your accent
- **Status Bar Integration** - Quick accent color selector in status bar
- **Folder Icon Sync** - Folder colors automatically match your accent

### 🌈 **Available Themes**

#### Color Themes
- **Tara Carbon** - Elegant gray accent
- **Tara Deepforest** - Natural green accent  
- **Tara Graphene** - Clean blue accent
- **Tara Ocean** - Deep blue accent
- **Tara Palenight** - Purple accent
- **Tara Teal** - Vibrant teal accent

Each theme includes:
- **Regular variant** - Standard styling
- **High Contrast variant** - Better accessibility
- **Italic variant** - Enhanced with italic/bold font styling

#### 🎯 **Italic/Bold Enhanced Features**
- **Keywords** in **bold** (`if`, `for`, `while`, `class`, `function`)
- **Function names** in *italic* (better readability)
- **Class names** in ***bold italic*** (prominent highlighting)
- **Variables/parameters** in *italic* (subtle emphasis)
- **Constants** in **bold** (clear distinction)
- **Import statements** in *italic* (visual separation)
- **Type annotations** in **bold** (TypeScript/Flow)
- **Decorators** in *italic* (Python/TypeScript)
- **JSX/TSX components** in **bold** (React development)
- **Object properties** in *italic* (structured data)

#### Icon Themes
- **Tara Icons Carbon** - Gray accented icons
- **Tara Icons Deepforest** - Green accented icons
- **Tara Icons Graphene** - Blue accented icons  
- **Tara Icons Ocean** - Ocean blue accented icons
- **Tara Icons Palenight** - Purple accented icons
- **Tara Icons Teal** - Teal accented icons

## 🚀 Quick Start

### Installation
1. Open VS Code
2. Go to Extensions (`Ctrl+Shift+X`)
3. Search for "Nishuuu Themes"
4. Click **Install**

### Activation
1. Open Command Palette (`Ctrl+Shift+P`)
2. Type "Preferences: Color Theme"
3. Select any **Tara** theme (try the **Italic** variants for enhanced styling!)
4. For icons: "Preferences: File Icon Theme" → Select matching **Tara Icons**

## 🎯 Accent Color System

### Using the Status Bar
- Click the **$(paintcan) Accent** button in your status bar
- Choose from 6 preset colors or enter a custom hex color
- Icon theme automatically updates to match (for preset colors)

### Available Accent Colors
- **Carbon** (`#737374`) - Elegant gray
- **Deepforest** (`#a3c679`) - Natural green
- **Graphene** (`#6a90d0`) - Clean blue
- **Ocean** (`#6ebad7`) - Deep blue  
- **Palenight** (`#a178c4`) - Purple
- **Teal** (`#80CBC4`) - Vibrant teal

### Configuration Options

```json
{
  "nishuuu.accent": "teal",
  "nishuuu.customAccent": "",
  "nishuuu.outlinedIcons": false,
  "nishuuu.tabIndicator": "border"
}
```

#### Settings Explained

- **`nishuuu.accent`** - Preset accent color (`carbon`, `deepforest`, `graphene`, `ocean`, `palenight`, `teal`)
- **`nishuuu.customAccent`** - Custom hex color (e.g., `#ff5722`) - overrides accent setting
- **`nishuuu.outlinedIcons`** - Use outlined folder icons instead of filled
- **`nishuuu.tabIndicator`** - Active tab indicator style (`border`, `fill`, `underline`)

## 🛠️ Commands

Access these via Command Palette (`Ctrl+Shift+P`):

- **`Nishuuu Themes: Select Accent Color`** - Open accent color picker
- **`Nishuuu Themes: Reset Accent Color`** - Reset to default teal
- **`Nishuuu Themes: Toggle Outlined Icons`** - Switch icon outline style

## 🎨 What Gets Accent Color

The accent color system affects these elements:
- **Activity Bar** - Active items and badges
- **Status Bar** - Remote items and indicators  
- **Tabs** - Active tab borders/backgrounds
- **Editor** - Cursor, find matches, brackets
- **Lists** - Selections and highlights
- **Buttons** - Primary and extension buttons
- **Links** - Text and notification links
- **Panels** - Active panel titles
- **Command Center** - Active items
- **Notebooks** - Focused cell borders
- **File Icons** - Folder accent colors (preset colors only)

## 📸 Screenshots

### Tara Carbon Theme
![Tara Carbon](https://via.placeholder.com/800x450/0A0A0A/737374?text=Tara+Carbon+Theme)

### Tara Teal Theme  
![Tara Teal](https://via.placeholder.com/800x450/0A0A0A/80CBC4?text=Tara+Teal+Theme)

### Icon Themes
![Icon Themes](https://via.placeholder.com/800x450/0A0A0A/ffffff?text=Beautiful+File+Icons)

## 🎨 Syntax Highlighting

Comprehensive syntax highlighting for:
- **JavaScript/TypeScript** - React, Vue, Angular
- **Python** - Full syntax support
- **Web Technologies** - HTML, CSS, SCSS, JSON
- **Backend** - PHP, Java, C#, Go, Rust
- **Data** - SQL, YAML, XML, Markdown
- **Configuration** - Docker, Nginx, Apache
- **And many more...**

## 🖥️ Terminal Colors

Each theme includes optimized terminal color schemes:
- **ANSI Colors** - Full 16-color support
- **Cursor Colors** - Accent-coordinated
- **Selection** - Themed backgrounds
- **Integration** - Works with all popular terminals

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup
```bash
git clone https://github.com/nishuuu/nishuuu-themes.git
cd nishuuu-themes
npm install
code .
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the original **Vira Theme** by [Tyresius92](https://github.com/Tyresius92)
- Icons based on **Material Design** principles
- Color science based on **accessibility guidelines**

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/nishuuu/nishuuu-themes/issues)
- **Discussions**: [GitHub Discussions](https://github.com/nishuuu/nishuuu-themes/discussions)

---

**Enjoy coding with Nishuuu Themes!** ✨

Made with ❤️ by [Nishuuu](https://github.com/nishuuu)
