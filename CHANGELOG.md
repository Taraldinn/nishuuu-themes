# Changelog

All notable changes to the "Nishuuu Themes" extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
