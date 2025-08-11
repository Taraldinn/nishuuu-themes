# 📁 Nishuuu Themes - Folder Structure

## 🎯 **Core Extension Files**
```
├── 📄 package.json          # Extension manifest
├── 📄 CHANGELOG.md          # Version history
├── 📄 README.md             # Main documentation
├── 📄 LICENSE               # MIT license
├── 📄 icon.svg              # Logo source file
└── 📄 .vscodeignore         # Packaging exclusions
```

## 🎨 **Theme Assets**
```
├── 📁 src/                  # Extension source code
│   └── extension.js         # Main extension logic
├── 📁 themes/               # Color & icon theme JSON files
│   ├── tara-*.json          # Color themes (8 variants)
│   └── tara-icons-*.json    # Icon themes (6 variants)
└── 📁 icons/                # Icon theme SVG assets
    ├── files/               # File icons
    └── folders/             # Folder icons (with accent variants)
```

## 📚 **Documentation** (`docs/`)
```
├── CONTRIBUTING.md          # Contribution guidelines
├── ICON_GUIDE.md           # Icon creation guide
├── INSTALLATION.md         # Installation instructions
├── PUBLISHING_GUIDE.md     # Publishing workflow
└── TESTING_GUIDE.md        # Testing procedures
```

## 🔧 **Utility Scripts** (`scripts/`)
```
├── cleanup.sh              # Folder organization
├── create-logo.sh          # Logo generation help
├── publish.sh              # Publishing assistant
├── setup.sh                # Initial setup
├── show-all-colors.sh      # Color preview
├── test-accent-colors.sh   # Accent testing
└── test-folder-icons.sh    # Icon testing
```

## 📦 **Development**
```
├── node_modules/           # NPM dependencies
├── package-lock.json       # Dependency lock
├── .git/                   # Git repository
├── .github/                # GitHub workflows
└── .gitignore              # Git exclusions
```

---

## ✨ **Clean Benefits**
- 🎯 **Professional structure** - Easy to navigate
- 📦 **Optimized packaging** - Only essential files in extension
- 📚 **Organized docs** - All guides in one place
- 🔧 **Accessible scripts** - Development tools organized
- 🚀 **Ready to publish** - Clean, professional appearance
