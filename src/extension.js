const vscode = require('vscode');

let statusBarItem;
let currentAccentColor = '#80CBC4'; // Default teal

// Accent color presets - focused on primary themes with color previews
const accentColors = {
    'teal': '#80CBC4',
    'ocean': '#6EBAD7', 
    'palenight': '#A178C4',
    'graphene': '#6A90D0',
    'blue': '#5393FF',
    'cyan': '#64FFDA',
    'lime': '#C6FF00',
    'purple': '#B54DFF',
    'orange': '#FF7042',
    'pink': '#FF669E',
    'yellow': '#FFCF3D',
    'white': '#FFFFFF'
};

// Map accent colors to their icon accent variant
const accentToIconMapping = {
    'teal': 'teal',
    'ocean': 'ocean',
    'palenight': 'palenight', 
    'graphene': 'graphene',
    'blue': 'ocean',     // fallback to ocean
    'cyan': 'teal',      // fallback to teal
    'lime': 'teal',      // fallback to teal
    'purple': 'palenight', // fallback to palenight
    'orange': 'ocean',   // fallback to ocean
    'pink': 'palenight', // fallback to palenight
    'yellow': 'teal',    // fallback to teal
    'white': 'graphene'  // fallback to graphene
};

// Icon theme mapping
const iconThemeMapping = {
    'acid-lime': 'tara-icons-deepforest',
    'blue': 'tara-icons-ocean',
    'bright-teal': 'tara-icons-teal',
    'carbon': 'tara-icons-carbon',
    'cyan': 'tara-icons-teal',
    'deepforest': 'tara-icons-deepforest',
    'graphene': 'tara-icons-graphene', 
    'indigo': 'tara-icons-palenight',
    'lime': 'tara-icons-deepforest',
    'ocean': 'tara-icons-ocean',
    'orange': 'tara-icons-carbon',
    'palenight': 'tara-icons-palenight',
    'pink': 'tara-icons-palenight',
    'purple': 'tara-icons-palenight',
    'teal': 'tara-icons-teal',
    'tomato': 'tara-icons-carbon',
    'vira': 'tara-icons-carbon',
    'white': 'tara-icons-carbon',
    'yellow': 'tara-icons-carbon'
};

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log('Nishuuu Themes extension activated');

    // Create status bar item
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.command = 'nishuuu.selectAccentColor';
    statusBarItem.tooltip = 'Click to change accent color';
    context.subscriptions.push(statusBarItem);

    // Initialize accent color from settings
    initializeAccentColor();

    // Register commands
    const selectAccentCommand = vscode.commands.registerCommand('nishuuu.selectAccentColor', selectAccentColor);
    const resetAccentCommand = vscode.commands.registerCommand('nishuuu.resetAccentColor', resetAccentColor);
    const toggleOutlinedCommand = vscode.commands.registerCommand('nishuuu.toggleOutlinedIcons', toggleOutlinedIcons);

    context.subscriptions.push(selectAccentCommand, resetAccentCommand, toggleOutlinedCommand);

    // Listen for configuration changes
    vscode.workspace.onDidChangeConfiguration(event => {
        if (event.affectsConfiguration('nishuuu.accent') || 
            event.affectsConfiguration('nishuuu.customAccent') ||
            event.affectsConfiguration('nishuuu.tabIndicator')) {
            applyAccentColor();
        }
    }, null, context.subscriptions);

    // Show status bar item
    statusBarItem.show();
}

function initializeAccentColor() {
    const config = vscode.workspace.getConfiguration('nishuuu');
    const accent = config.get('accent', 'teal');
    const customAccent = config.get('customAccent', '');
    
    if (customAccent && customAccent.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)) {
        currentAccentColor = customAccent;
    } else {
        currentAccentColor = accentColors[accent] || accentColors.teal;
    }
    
    updateStatusBar();
    applyAccentColor();
}

function updateStatusBar() {
    const config = vscode.workspace.getConfiguration('nishuuu');
    const accent = config.get('accent', 'teal');
    const customAccent = config.get('customAccent', '');
    
    if (customAccent) {
        statusBarItem.text = `$(paintcan) Custom`;
        statusBarItem.color = currentAccentColor;
    } else {
        // Convert hyphenated names to proper display format
        const displayName = accent
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        statusBarItem.text = `$(paintcan) ${displayName}`;
        statusBarItem.color = currentAccentColor;
    }
    
    // Remove background color to let the text/icon color show better
    statusBarItem.backgroundColor = undefined;
}

async function generateDynamicIconTheme(accentName) {
    const fs = require('fs').promises;
    const path = require('path');
    
    try {
        // Get the base icon theme (we'll use teal as base)
        const extensionPath = vscode.extensions.getExtension('taraldinn.nishuuu-themes').extensionPath;
        const baseThemePath = path.join(extensionPath, 'themes', 'tara-icons-teal.json');
        const baseTheme = JSON.parse(await fs.readFile(baseThemePath, 'utf8'));
        
        // Map the accent to the available icon variant
        const iconAccent = accentToIconMapping[accentName] || 'teal';
        
        // Create a copy of the base theme
        const dynamicTheme = JSON.parse(JSON.stringify(baseTheme));
        
        // Update folder icons to use the accent color
        for (const [key, definition] of Object.entries(dynamicTheme.iconDefinitions)) {
            if (definition.iconPath && definition.iconPath.includes('folder_') && definition.iconPath.includes('_open')) {
                // This is an open folder icon - update to use accent color
                const iconName = path.basename(definition.iconPath, '.svg');
                const baseIconName = iconName.replace(/\.accent\.\w+$/, '');
                definition.iconPath = `../icons/folders/filled/${baseIconName}.accent.${iconAccent}.svg`;
            }
        }
        
        // Write the dynamic theme to a temporary file
        const dynamicThemePath = path.join(extensionPath, 'themes', 'tara-icons-dynamic.json');
        await fs.writeFile(dynamicThemePath, JSON.stringify(dynamicTheme, null, 4));
        
        return 'tara-icons-dynamic';
    } catch (error) {
        console.error('Error generating dynamic icon theme:', error);
        // Fallback to static theme
        return iconThemeMapping[accentName] || 'tara-icons-teal';
    }
}

async function selectAccentColor() {
    const config = vscode.workspace.getConfiguration('nishuuu');
    const currentAccent = config.get('accent', 'teal');
    
    // Create color preview items with actual color circles
    const items = [
        {
            label: '$(circle-filled) Teal',
            description: `${accentColors.teal} - Primary theme color`,
            detail: 'Vibrant teal accent - matches Tara Teal theme',
            accent: 'teal'
        },
        {
            label: '$(circle-filled) Ocean', 
            description: `${accentColors.ocean} - Primary theme color`,
            detail: 'Deep blue accent - matches Tara Ocean theme',
            accent: 'ocean'
        },
        {
            label: '$(circle-filled) Palenight',
            description: `${accentColors.palenight} - Primary theme color`, 
            detail: 'Purple accent - matches Tara Palenight theme',
            accent: 'palenight'
        },
        {
            label: '$(circle-filled) Graphene',
            description: `${accentColors.graphene} - Primary theme color`,
            detail: 'Clean blue accent - matches Tara Graphene theme', 
            accent: 'graphene'
        },
        {
            label: '$(circle-filled) Blue',
            description: `${accentColors.blue} - Additional color`,
            detail: 'Classic blue accent',
            accent: 'blue'
        },
        {
            label: '$(circle-filled) Cyan',
            description: `${accentColors.cyan} - Additional color`,
            detail: 'Pure cyan blue',
            accent: 'cyan'
        },
        {
            label: '$(circle-filled) Lime',
            description: `${accentColors.lime} - Additional color`,
            detail: 'Fresh lime green',
            accent: 'lime'
        },
        {
            label: '$(circle-filled) Purple',
            description: `${accentColors.purple} - Additional color`,
            detail: 'Rich purple accent',
            accent: 'purple'
        },
        {
            label: '$(circle-filled) Orange',
            description: `${accentColors.orange} - Additional color`,
            detail: 'Bright orange accent',
            accent: 'orange'
        },
        {
            label: '$(circle-filled) Pink',
            description: `${accentColors.pink} - Additional color`,
            detail: 'Vibrant pink accent',
            accent: 'pink'
        },
        {
            label: '$(circle-filled) Yellow',
            description: `${accentColors.yellow} - Additional color`,
            detail: 'Golden yellow accent',
            accent: 'yellow'
        },
        {
            label: '$(circle-filled) White',
            description: `${accentColors.white} - Additional color`,
            detail: 'Clean white accent',
            accent: 'white'
        },
        {
            label: '$(gear) Custom Color...',
            description: 'Enter custom hex color',
            detail: 'Define your own accent color',
            accent: 'custom'
        }
    ];

    // Mark current accent with checkmark instead of filled circle
    const currentItem = items.find(item => item.accent === currentAccent);
    if (currentItem) {
        currentItem.label = currentItem.label.replace('$(circle-filled)', '$(check)');
    }

    const selection = await vscode.window.showQuickPick(items, {
        placeHolder: 'Select an accent color for Nishuuu Themes',
        matchOnDescription: true
    });

    if (selection) {
        if (selection.accent === 'custom') {
            await selectCustomColor();
        } else {
            await config.update('accent', selection.accent, vscode.ConfigurationTarget.Global);
            await config.update('customAccent', '', vscode.ConfigurationTarget.Global);
            
            currentAccentColor = accentColors[selection.accent];
            updateStatusBar();
            applyAccentColor();
            
            vscode.window.showInformationMessage(
                `Accent color changed to ${selection.accent}. Icon theme will also update automatically.`
            );
        }
    }
}

async function selectCustomColor() {
    const customColor = await vscode.window.showInputBox({
        prompt: 'Enter a custom accent color',
        placeHolder: '#80CBC4',
        validateInput: (value) => {
            if (!value) return 'Please enter a color';
            if (!value.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)) {
                return 'Please enter a valid hex color (e.g., #80CBC4 or #ABC)';
            }
            return null;
        }
    });

    if (customColor) {
        const config = vscode.workspace.getConfiguration('nishuuu');
        await config.update('customAccent', customColor, vscode.ConfigurationTarget.Global);
        
        currentAccentColor = customColor;
        updateStatusBar();
        applyAccentColor();
        
        vscode.window.showInformationMessage(
            `Custom accent color applied: ${customColor}`
        );
    }
}

async function resetAccentColor() {
    const config = vscode.workspace.getConfiguration('nishuuu');
    await config.update('accent', 'teal', vscode.ConfigurationTarget.Global);
    await config.update('customAccent', '', vscode.ConfigurationTarget.Global);
    
    currentAccentColor = accentColors.teal;
    updateStatusBar();
    applyAccentColor();
    
    vscode.window.showInformationMessage('Accent color reset to default teal');
}

async function toggleOutlinedIcons() {
    const config = vscode.workspace.getConfiguration('nishuuu');
    const current = config.get('outlinedIcons', false);
    await config.update('outlinedIcons', !current, vscode.ConfigurationTarget.Global);
    
    vscode.window.showInformationMessage(
        `Outlined icons ${!current ? 'enabled' : 'disabled'}`
    );
}

function applyAccentColor() {
    const config = vscode.workspace.getConfiguration();
    const nishuu = vscode.workspace.getConfiguration('nishuuu');
    const accent = nishuu.get('accent', 'teal');
    const customAccent = nishuu.get('customAccent', '');
    const tabIndicator = nishuu.get('tabIndicator', 'none');
    
    // Use custom color if provided, otherwise use preset
    const accentColor = customAccent || accentColors[accent] || accentColors.teal;
    currentAccentColor = accentColor;
    
    // Create alpha variants
    const accent80 = accentColor + '80';
    const accent40 = accentColor + '40';
    const accent20 = accentColor + '20';
    const accent14 = accentColor + '14';
    const accent0D = accentColor + '0D';
    
    // Apply workbench color customizations matching Vira's accent system (NO BORDERS)
    const colorCustomizations = {
        // Status bar and activity bar
        'statusBarItem.remoteForeground': accentColor,
        'statusBarItem.remoteBackground': accent14,
        'statusBarItem.remoteHoverBackground': accentColor,
        'statusBarItem.remoteHoverForeground': '#000000',
        'activityBarBadge.background': accentColor,
        'activityBarBadge.foreground': '#000000',
        
        // Editor and selection (NO PANEL/SIDEBAR BORDERS)
        'progressBar.background': accentColor,
        'selection.background': accent80,
        'editor.findMatchBorder': accentColor,
        'editor.findMatchHighlightBorder': accent80,
        'editor.findRangeHighlightBackground': accent40,
        'editorCursor.foreground': accentColor,
        'editorBracketMatch.border': accent80,
        'editorOverviewRuler.findMatchForeground': accentColor,
        
        // Lists and inputs
        'list.activeSelectionForeground': accentColor,
        'list.inactiveSelectionForeground': accentColor,
        'list.activeSelectionIconForeground': accentColor,
        'list.inactiveSelectionIconForeground': accentColor,
        'list.highlightForeground': accentColor,
        'quickInputList.focusIconForeground': accentColor,
        'editorSuggestWidget.highlightForeground': accentColor,
        
        // Buttons and extensions
        'button.background': accentColor,
        'button.hoverBackground': accent80,
        'extensionButton.foreground': accentColor,
        'extensionButton.background': accent14,
        'extensionButton.hoverBackground': accent40,
        'extensionButton.prominentForeground': accentColor,
        'extensionButton.prominentBackground': accent14,
        'extensionButton.prominentHoverBackground': accent40,
        'extensionIcon.preReleaseForeground': accent20,
        
        // Links and notifications
        'textLink.foreground': accentColor,
        'notificationLink.foreground': accentColor,
        'pickerGroup.foreground': accentColor,
        'breadcrumb.activeSelectionForeground': accentColor,
        'menu.selectionForeground': accentColor,
        'menubar.selectionForeground': accentColor,
        'settings.modifiedItemIndicator': accentColor,
        
        // Tabs - NO BORDERS, background only for fill style
        ...(tabIndicator === 'fill' ? {
            'tab.activeBackground': accent20
        } : {}),
        
        // Notebooks - NO BORDERS
        'notebook.focusedCellBorder': '#00000000',
        'notebook.inactiveFocusedCellBorder': '#00000000',
        
        // Command center and toolbar
        'toolbar.activeBackground': accent20,
        
        // Chat (if available)
        'chat.slashCommandForeground': accentColor,
        'chat.avatarForeground': accentColor,
        
        // File explorer colors
        'tree.inactiveIndentGuidesStroke': accent40,
        'tree.indentGuidesStroke': accent80,
        
        // File and folder name colors (when selected/focused)
        'list.focusOutline': accentColor,
        'list.focusAndSelectionOutline': accentColor
    };
    
    // Apply the color customizations
    config.update('workbench.colorCustomizations', colorCustomizations, vscode.ConfigurationTarget.Global);
    
    // Update icon theme with dynamic folder colors
    if (!customAccent) {
        generateDynamicIconTheme(accent).then(iconTheme => {
            config.update('workbench.iconTheme', iconTheme, vscode.ConfigurationTarget.Global);
        });
    }
    
    updateStatusBar();
}

function deactivate() {
    if (statusBarItem) {
        statusBarItem.dispose();
    }
}

module.exports = {
    activate,
    deactivate
};
