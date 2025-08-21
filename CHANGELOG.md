# Changelog

All notable changes to the Tara Themes extension will be documented in this file.

## [3.1.0-beta.1] - 2025-08-18

### Added
- **🎨 Dynamic Accent Color Switcher**: New feature to dynamically change accent colors
  - Status bar item on the right side showing current accent color
  - Click to open accent color picker with 14 predefined colors
  - Live UI updates without requiring theme reload
  - Persistent accent color selection across VS Code sessions
  
### Enhanced
- **Comprehensive UI Theming**: Accent color now affects:
  - Tab bottom borders (only active tabs)
  - All buttons with proper contrast and transparency
  - File & folder icon colors  
  - Product icon active colors
  - Active text colors with link styling
  - Extension page buttons with 50-100% transparency
  - Explorer file names when active/selected
  - Focus borders and selection highlights
  - Progress bars, scrollbars, and badges
  
### Updated
- **Color Palette**: Updated to match exact specifications:
  - Lime (#39EA5F), Blue (#5393FF), Cyan (#57D7FF)
  - Bright Teal (#64FFDA), Indigo (#758AFF), Teal (#80CBC4)
  - Purple (#B54DFF), Acid Lime (#C6FF00), Vira (#E9A581)
  - Tomato (#F85044), Pink (#FF669E), Orange (#FF7042)
  - Yellow (#FFCF3D), White (#FFFFFF)

## [3.0.6] - 2025-08-18

### Fixed
- **Tab Border Debug Fix**: Added comprehensive tab border tokens to ensure complete border removal
  - Added `tab.hoverBorder`, `tab.unfocusedHoverBorder`, and `tab.lastPinnedBorder` tokens
  - Set all additional tab border tokens to transparent to prevent any remaining borders
  - Ensured hover states also have no borders for consistent clean appearance
  - Applied across all 12 theme variants for complete tab border elimination

## [3.0.5] - 2025-08-18

### Changed
- **Complete Tab Border Removal**: Implemented clean, minimal tab design as requested
  - Removed all tab borders (top, left, right, and separators between tabs)
  - Only active tabs now show a bottom border (solid teal #80CBC4)
  - Inactive and unfocused tabs have no visible borders for a completely clean look
  - Applied across all 12 theme variants for consistent minimal design

## [3.0.3] - 2025-08-18

### Changed
- **Tab Border Enhancement**: Improved tab visual design for better user experience
  - Removed top border from tabs (`tab.activeBorderTop` and `tab.unfocusedActiveBorderTop` set to transparent)
  - Enhanced bottom border visibility with solid teal for active tabs and semi-transparent for unfocused tabs
  - Cleaner, more modern tab appearance across all 12 theme variants

## [3.0.2] - 2025-08-18

### Changed
- **Tab Border Enhancement**: Improved tab visual design for better user experience
  - Removed top border from tabs (`tab.activeBorderTop` and `tab.unfocusedActiveBorderTop` set to transparent)
  - Enhanced bottom border visibility with solid teal for active tabs and semi-transparent for unfocused tabs
  - Cleaner, more modern tab appearance across all 12 theme variants

## [3.0.1] - 2025-08-18

### Fixed
- **Critical Tab Border Fix**: Resolved visual issues with tab borders across all themes
  - Fixed transparent `tab.activeBorderTop` (now fully visible teal accent)
  - Fixed invisible `tab.unfocusedActiveBorderTop` (now semi-transparent teal)  
  - Fixed invisible `tab.border` separators (now subtle but visible)
  - Fixed background color mismatches between `editorGroupHeader.tabsBackground` and theme backgrounds
  - Each theme now uses its correct background color for consistent appearance
- Improved tab visibility and contrast across all 12 theme variants
- Enhanced visual consistency between active and inactive tabs

## [3.0.0] - 2025-08-13

### Added
- Complete theme redesign with Tara branding
- Dynamic accent color system with 12 color options
- SVG icon integration for accent color selection
- Status bar accent color display
- Enhanced tab styling with clean borders
- Disabled explorer hover effects for minimal design
- High contrast theme variants
- Comprehensive icon theme collection

### Changed
- Renamed all themes from "Vira" to "Tara-Theme"
- Updated color palettes for better contrast
- Improved tab visibility and borders
- Enhanced UI consistency across all themes

### Fixed
- Tab border visibility issues
- Theme name conflicts
- Extension activation performance
- Color scheme consistency

## [2.1.3] - Previous Release

### Fixed
- Minor bug fixes and improvements

---

For detailed changes, see the [commit history](https://github.com/taraldinn/nishuuu-themes/commits/main).
