# Contributing to Nishuuu Themes

Thank you for your interest in contributing to Nishuuu Themes! This document provides guidelines and information about contributing to this project.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Submitting Changes](#submitting-changes)
- [Style Guidelines](#style-guidelines)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How to Contribute

### Development Setup

1. **Fork the repository**
   ```bash
   git clone https://github.com/nishuuu/nishuuu-themes.git
   cd nishuuu-themes
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install VSCE (VS Code Extension CLI)**
   ```bash
   npm install -g @vscode/vsce
   ```

### Making Changes

1. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Theme files are located in `themes/` directory
   - Each theme is a JSON file following VS Code theme schema
   - Ensure consistency across all theme variants

3. **Test your changes**
   ```bash
   # Package the extension
   npm run package
   
   # Install and test in VS Code
   code --install-extension nishuuu-themes-*.vsix
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add: your descriptive commit message"
   ```

## Theme Development Guidelines

### Color Consistency
- Maintain consistent color relationships across theme variants
- Ensure sufficient contrast ratios for accessibility
- Test with various file types and programming languages

### File Structure
```
themes/
├── tara-carbon.json
├── tara-carbon-high-contrast.json
├── tara-graphene.json
└── ... (other theme files)
```

### Theme JSON Structure
Each theme file should include:
- `name`: Theme display name
- `type`: "dark" for all Tara themes
- `semanticHighlighting`: true
- `tokenColors`: Array of syntax highlighting rules
- `colors`: Object with UI color definitions

### Required Color Definitions
Ensure all themes include colors for:
- Editor (background, foreground, selection, etc.)
- Sidebar and Activity Bar
- Terminal (all 16 ANSI colors + bright variants)
- Status Bar and Title Bar
- Tabs and Panels
- Git decorations
- Error/Warning/Info indicators

## Submitting Changes

### Pull Request Process

1. **Update documentation** if needed
2. **Update CHANGELOG.md** with your changes
3. **Ensure all tests pass**
4. **Submit a pull request** with:
   - Clear description of changes
   - Screenshots showing theme updates (if applicable)
   - Reference to any related issues

### Pull Request Template
```markdown
## Description
Brief description of your changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Screenshots
(If applicable, include before/after screenshots)

## Testing
- [ ] Tested with multiple programming languages
- [ ] Verified terminal colors work correctly
- [ ] Checked accessibility/contrast ratios
- [ ] Tested on different VS Code versions

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review
- [ ] I have updated documentation if needed
- [ ] My changes generate no new warnings
```

## Style Guidelines

### JSON Formatting
- Use 4 spaces for indentation
- Keep consistent property ordering
- Use double quotes for strings
- Include trailing commas where appropriate

### Color Values
- Use 6-digit hex codes (e.g., `#FFFFFF`)
- Include alpha channel when needed (e.g., `#FFFFFF80`)
- Use consistent color naming conventions
- Document color purposes in comments when helpful

### Naming Conventions
- Theme files: `tara-{variant}.json` or `tara-{variant}-high-contrast.json`
- Theme names: "Tara {Variant}" or "Tara {Variant} High Contrast"
- Keep variant names lowercase in filenames, title case in display names

## Reporting Bugs

### Bug Report Template
When reporting bugs, please include:

1. **VS Code Version**: Help → About
2. **Extension Version**: From Extensions panel
3. **Theme Variant**: Which specific theme you're using
4. **Operating System**: Windows/macOS/Linux + version
5. **Steps to Reproduce**: Clear, numbered steps
6. **Expected Behavior**: What should happen
7. **Actual Behavior**: What actually happens
8. **Screenshots**: If applicable

### Example Bug Report
```markdown
**VS Code Version**: 1.95.0
**Extension Version**: 1.0.0
**Theme**: Tara Carbon
**OS**: macOS 14.0

**Steps to Reproduce**:
1. Open a JavaScript file
2. Notice string highlighting
3. Compare with function highlighting

**Expected**: Strings should be green (#a3c679)
**Actual**: Strings appear blue

**Screenshots**: [attach screenshot]
```

## Suggesting Features

### Feature Request Template
```markdown
**Feature Description**
Clear description of the proposed feature

**Use Case**
Why would this feature be useful?

**Proposed Implementation**
How do you think this should work?

**Alternatives Considered**
Any alternative solutions you've considered?
```

## Testing Guidelines

### Manual Testing Checklist
- [ ] Test with JavaScript/TypeScript files
- [ ] Test with Python files
- [ ] Test with HTML/CSS files
- [ ] Test with JSON/YAML files
- [ ] Test with Markdown files
- [ ] Verify terminal colors
- [ ] Check sidebar theming
- [ ] Verify status bar colors
- [ ] Test error/warning highlighting
- [ ] Check git decoration colors

### Automated Testing
Currently, we rely on manual testing. Contributions to add automated testing are welcome!

## Recognition

Contributors will be recognized in:
- README.md contributors section
- CHANGELOG.md for significant contributions
- GitHub releases notes

## Getting Help

- **Questions**: Open a GitHub issue with the "question" label
- **Discussions**: Use GitHub Discussions for general topics
- **Direct Contact**: Email nishuuu@example.com for sensitive issues

Thank you for contributing to Nishuuu Themes! 🎨
