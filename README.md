# Nishuuu Themes

Beautiful dark themes based on Vira with dynamic accent colors and comprehensive UI integration.

## Features

- **6 Primary Color Themes**: Carbon, Deepforest, Graphene, Ocean, Palenight, Teal
- **High Contrast Variants**: Enhanced readability options
- **Dynamic Accent Colors**: 14 accent colors with real-time UI updates
- **Folder Icon Integration**: Dynamic folder icons that match your accent color
- **Vira-Style Configuration**: Full compatibility with Vira theme settings
- **Status Bar Integration**: Quick accent color switching from the status bar

## Installation

1. Install the extension from VS Code Marketplace
2. Switch to a Nishuuu theme (e.g., "Tara Carbon")
3. Switch to a Nishuuu icon theme (e.g., "Tara Icons Carbon")
4. Use the status bar to change accent colors

## Accent Colors

- **Teal** - Signature teal accent (#80CBC4)
- **Vira** - Warm vira tone (#20b2aa)
- **White** - Clean white accent (#FFFFFF)
- **Tomato** - Bright tomato red (#FF7042)
- **Orange** - Bright orange accent (#E9A581)
- **Yellow** - Golden yellow accent (#FFCF3D)
- **Acid Lime** - Electric lime (#C6FF00)
- **Lime** - Vibrant lime green (#39EA5F)
- **Bright Teal** - Electric teal (#64FFDA)
- **Cyan** - Bright cyan blue (#57D7FF)
- **Blue** - Classic blue accent (#758AFF)
- **Indigo** - Modern indigo (#5393FF)
- **Purple** - Rich purple accent (#B54DFF)
- **Pink** - Vibrant pink accent (#FF669E)

## Configuration

### Basic Settings

```json
{
  "nishuuuTheme.accent": "Teal",
  "nishuuuTheme.customAccent": ""
}
```

### Advanced Settings

```json
{
  "nishuuuTheme.useOutlinedIcons": false,
  "nishuuuTheme.useTopTabIndicator": false,
  "nishuuuTheme.showBorders": false,
  "nishuuuTheme.contrastedTabs": false,
  "nishuuuTheme.solidLineHighlight": false,
  "nishuuuTheme.hidesExplorerArrows": true,
  "nishuuuTheme.hidesShadows": false
}
```

## Commands

- **Nishuuu Themes: Switch Accent Color** - Open accent color picker
- **Nishuuu Themes: Clear Accent Color** - Clear custom accent color
- **Nishuuu Themes: Test Folder Icons** - Test folder icon functionality

## How to Use

### Quick Accent Switching
1. Click the status bar item (shows current accent color)
2. Select your desired accent color from the picker
3. Watch as the entire UI updates in real-time

### Custom Accent Color
1. Open VS Code Settings
2. Search for "nishuuuTheme.customAccent"
3. Enter a hex color (e.g., #FF8800)
4. The custom color will override the preset accent

### Folder Icons
1. Switch to a Nishuuu icon theme
2. Change accent colors to see folder icons update
3. Toggle between filled and outlined icons in settings

## Theme Variants

### Dark Themes
- **Tara Carbon** - Deep charcoal with teal accents
- **Tara Deepforest** - Rich forest green palette
- **Tara Graphene** - Modern graphite design
- **Tara Ocean** - Calming blue depths
- **Tara Palenight** - Soft purple nights
- **Tara Teal** - Fresh teal experience

### High Contrast Variants
All themes include high contrast versions for enhanced accessibility.

### Icon Themes
- **Tara Icons Carbon** through **Tara Icons Teal**
- Consistent design language across all variants
- Dynamic accent color integration

## Troubleshooting

### Accent Colors Not Working
1. Ensure you're using a Nishuuu theme
2. Check that the extension is activated
3. Try reloading VS Code window

### Folder Icons Not Updating
1. Switch to a Nishuuu icon theme
2. Change accent colors to trigger updates
3. Use the "Test Folder Icons" command

### Status Bar Not Showing
1. Check extension activation
2. Ensure status bar is not hidden
3. Try reloading VS Code window

## Development

### Project Structure
```
src/
├── index.js              # Main entry point
├── themeManager.js       # Core theme management
└── constants.js          # Constants and configurations
```

### Building
```bash
npm install
npm run package
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Credits

Inspired by the Vira theme with custom Nishuuu styling and enhancements.
