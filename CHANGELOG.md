# Changelog

All notable changes to the "Nishuuu Themes" extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

# Change Log

## [2.1.3] - 2025-08-12
### Fixed
- **Removed Focus Borders** - Eliminated all focus borders (`focusBorder: #00000000`) for cleaner UI
- **Enhanced Folder/File Selection** - Updated list selection colors to use theme accent colors
- **Improved Sidebar Navigation** - File and folder selection now uses consistent accent colors
- **Better Visual Hierarchy** - All selection states now properly highlight with theme colors

### Updated Properties
- `focusBorder` → `#00000000` (transparent, no borders)
- `list.activeSelectionForeground` → theme accent color
- `list.inactiveSelectionForeground` → theme accent color  
- `list.highlightForeground` → theme accent color
- `list.activeSelectionIconForeground` → theme accent color
- `list.inactiveSelectionIconForeground` → theme accent color

## [2.1.2] - 2025-08-12
### Fixed
- **Enhanced Tab Visibility** - Active file tabs now use theme accent colors for better text visibility
- **Added Hover States** - Added explicit hover foreground and background colors for better UX
- **Improved Contrast** - Fixed issue where active tab text was hard to read due to hover effects
- **Consistent Colors** - Each theme now uses its signature accent color for active tab text

### Details
- Teal themes: Active tabs now use `#80CBC4` (teal accent)
- Ocean themes: Active tabs now use `#6EBAD7` (ocean blue accent)  
- Palenight themes: Active tabs now use `#A178C4` (purple accent)
- Graphene themes: Active tabs now use `#6A90D0` (blue accent)
- Carbon themes: Active tabs now use `#D9D9D9` (light gray)
- Deepforest themes: Active tabs now use `#A3C679` (green accent)

## [2.1.1] - 2025-08-12
### Fixed
- **Removed Tab Borders** - Eliminated left and right borders from file tabs across all Vira themes
- **Consistent Tab Styling** - All themes now have clean, borderless tab appearance
- **UI Polish** - Improved visual consistency between Tara and Vira theme collections

## [2.1.0] - 2025-08-12
### Added
- **Complete Vira Theme Collection** - Added all 24 Vira themes to the collection
  - 12 Vira color themes (Carbon, Deepforest, Graphene, Ocean, Palenight, Teal + High Contrast variants)
  - 12 additional Vira Theme variants with enhanced styling
  - 6 Vira icon themes matching the color schemes
- **Expanded Theme Library** - Now includes 32 total themes across both Tara and Vira collections
- **Enhanced Theme Variety** - Multiple styling approaches for each primary color scheme

### Updated
- Package description to reflect the expanded theme collection
- README documentation with comprehensive theme listings
- Theme selector now includes both Tara and Vira collections

## [2.0.0] - 2025-08-12

### Added
- **Enhanced Color Accent Dropdown** with actual color dot icons and hex codes
- Color preview shows actual hex values with `$(circle-filled)` icons
- Primary themes clearly marked with detailed descriptions
- Current accent marked with checkmark `$(check)` icon

### Changed
- **BREAKING:** Streamlined to 4 primary themes: **Teal**, **Ocean**, **Palenight**, **Graphene**
- Reduced total themes from 25 to 8 (4 primary × 2 variants)
- Simplified accent color selection with 12 curated colors
- Updated icon themes to match 4 primary color schemes
- Primary theme colors prioritized in accent dropdown
- Improved color mapping between themes and icons
- Replaced emoji previews with VS Code native circle icons

### Removed
- WebStrom Dark theme (simplified focus on primary themes)
- Carbon and Deepforest themes (consolidated into primary 4)
- Italic font variants (simplified theme structure)
- Legacy accent colors (acid-lime, bright-teal, carbon, deepforest, indigo, tomato, vira)
- Emoji color indicators (replaced with circle-filled icons)

### Technical
- Cleaned up extension code for better performance
- Updated accent color mapping to focus on primary themes
- Enhanced Quick Pick interface with color information

## [1.3.0] - 2025-08-12

### Added
- **WebStrom Dark** - New custom dark theme with precise 10-color palette
- Pure black backgrounds (#0A0A0A) throughout UI
- Custom syntax highlighting with specific color mapping:
  - Keywords (export, default, this): Blue (#6990D0)
  - Class/method keywords: Purple (#A178C4) 
  - Class names: Yellow (#D5B060)
  - String delimiters: Blue (#6990D0)
  - String values: Green (#A3C679)
  - Numbers: Dark red (#AF5355)
  - Variables: Light gray (#C8C8C8)
  - Comments: Gray (#5A5A5A, italic)
- Active tab accent border in blue
- Hover effects for folder tree (no focus borders)
- Comprehensive semantic token support

### Changed
- Updated description to mention 25 themes (was 24)
- Added "webstrom" and "custom theme" keywords

## [1.2.4] - 2024-12-19

### Changed
- Final project cleanup and consolidation
- Reorganized scripts folder with renamed, essential-only scripts
- Consolidated development tools into `dev-tools.sh`
- Updated documentation structure with comprehensive guides
- Removed redundant files and improved project organization
- Updated .vscodeignore for cleaner packaging

## [1.2.3] - 2024-12-19

### Changed
- **🚫 Removed All Borders**: Complete borderless UI experience
  - Removed tab borders (active, inactive, unfocused)
  - Removed activity bar borders
  - Removed panel and sidebar borders
  - Removed input field borders
  - Removed widget borders
  - Removed all UI element borders

### Fixed
- Clean, modern borderless appearance
- No visual distraction from borders
- Smoother, more elegant interface
- Better focus on content rather than UI elements

### Technical
- Updated all 24 themes to use transparent borders (#00000000)
- Modified extension logic to exclude border applications
- Updated tab indicator options (removed border, added none)
- Default tab indicator now "none" for cleanest look

## [1.2.2] - 2025-08-12

### Fixed
- **🎯 Refined Bold Styling**: Bold now only applies to actual keywords (if, for, while, function, etc.)
- Removed excessive bold styling from constants, classes, and other elements
- Improved code readability with more selective font weight usage
- Better balance between emphasis and readability

### Changed
- **Keywords**: Only control flow and language keywords are now bold
- **Functions**: Remain italic for better readability
- **Variables**: Remain italic for subtle emphasis
- **Constants**: No longer bold (better visual balance)
- **Classes**: No longer bold italic (cleaner appearance)

### Technical
- Complete project cleanup and organization
- Removed duplicate and backup files
- Optimized file structure and packaging
- Updated .vscodeignore for cleaner distribution

## [1.2.1] - 2025-08-12

### Fixed
- Fixed VS Code engine compatibility (downgraded from 1.95.0 to 1.74.0)
- Fixed @types/vscode version compatibility
- Resolved publishing issues
- Updated package description for better marketplace visibility

### Technical
- Compatible with VS Code 1.74.0 and higher
- Optimized package size and dependency management

## [1.2.0] - 2025-08-12

### Added
- **🎨 Italic/Bold Enhanced Themes**: 12 new theme variants with enhanced font styling
  - Keywords in **bold** (if, for, while, class, function, etc.)
  - Function names in *italic* (better readability)
  - Class names in ***bold italic*** (prominent highlighting)
  - Variables and parameters in *italic* (subtle emphasis)
  - Constants in **bold** (clear distinction)
  - Import statements in *italic* (visual separation)
  - Type annotations in **bold** (clear type visibility)
  - Decorators in *italic* (clean styling)
  - JSX/TSX components in **bold** (React development)
  - Object properties in *italic* (structured data)
- Enhanced syntax highlighting for modern development patterns
- Better support for TypeScript, React, Vue, and other frameworks
- Improved readability with strategic font weight usage

### Technical
- All 12 base themes now have italic/bold variants (24 total themes)
- Font styling rules optimized for different programming languages
- Backward compatible with existing configurations

## [1.0.0] - 2025-08-12

### Added
- Initial release of Nishuuu Themes
- 12 beautiful theme variants with Tara color schemes:
  - Tara Carbon (+ High Contrast)
  - Tara Graphene (+ High Contrast)
  - Tara Ocean (+ High Contrast)
  - Tara Teal (+ High Contrast)
  - Tara Palenight (+ High Contrast)
  - Tara Deepforest (+ High Contrast)
- Comprehensive syntax highlighting for 50+ programming languages
- Complete terminal color theming with ANSI support
- UI integration for all VS Code interface elements
- Git decoration and diff highlighting
- High contrast variants for accessibility
- Professional color palettes designed for reduced eye strain

### Features
- Web Development: HTML, CSS, JavaScript, TypeScript, React, Vue, Angular
- Backend Languages: Python, Java, C#, C++, Go, Rust, Ruby, PHP
- Database: SQL, MongoDB
- DevOps: Docker, Kubernetes, YAML, Shell scripts
- And many more programming languages and file types

### Terminal Support
- 16 ANSI colors with bright variants
- Custom cursor styling
- Background and foreground colors matched to editor themes
- Perfect integration with VS Code integrated terminal
