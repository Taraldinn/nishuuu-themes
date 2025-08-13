const vscode = require('vscode');

// Accent color pa/**
 * Update status bar item
 */
function updateStatusBar() {
    const config = vscode.workspace.getConfiguration('nishuuu');
    const selectedAccent = config.get('accent', 'teal');
    const currentColor = ACCENT_COLORS[selectedAccent] || ACCENT_COLORS.teal;
    
    statusBarItem.text = `$(circle-filled) ${selectedAccent.charAt(0).toUpperCase() + selectedAccent.slice(1)}`;
    statusBarItem.tooltip = `Current accent color: ${selectedAccent} (${currentColor}). Click to change.`;
    statusBarItem.color = currentColor;
}a
const ACCENT_COLORS = {
    'teal': '#80CBC4',
    'vira': '#6C63FF',
    'cyan': '#64FFDA',
    'blue': '#5393FF',
    'indigo': '#3F51B5',
    'purple': '#B54DFF',
    'pink': '#FF669E',
    'tomato': '#FF6347',
    'orange': '#FF7042',
    'yellow': '#FFCF3D',
    'acid-lime': '#C6FF00',
    'lime': '#32CD32',
    'bright-teal': '#1DE9B6',
    'white': '#FFFFFF'
};

let statusBarItem;

/**
 * Extension activation
 */
function activate(context) {
    console.log('Nishuuu Themes extension is now active!');

    // Create status bar item
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 1000);
    statusBarItem.command = 'nishuuu.selectAccentColor';
    
    // Update status bar immediately
    updateStatusBar();
    statusBarItem.show();

    // Register select accent color command
    const selectAccentColorCommand = vscode.commands.registerCommand('nishuuu.selectAccentColor', selectAccentColor);

    // Watch for configuration changes
    const configurationChangeListener = vscode.workspace.onDidChangeConfiguration(event => {
        if (event.affectsConfiguration('nishuuu.accent')) {
            updateStatusBar();
            applyDynamicColors();
        }
    });

    context.subscriptions.push(selectAccentColorCommand, configurationChangeListener, statusBarItem);

    // Apply dynamic colors on startup
    applyDynamicColors();
}

/**
 * Update status bar with current accent color
 */
function updateStatusBar() {
    const config = vscode.workspace.getConfiguration('nishuuu');
    const selectedAccent = config.get('accent', 'teal');
    const currentColor = ACCENT_COLORS[selectedAccent] || ACCENT_COLORS.teal;
    
    statusBarItem.text = `$(circle-filled) ${selectedAccent.charAt(0).toUpperCase() + selectedAccent.slice(1)}`;
    statusBarItem.tooltip = `Current accent color: ${selectedAccent} (${currentColor}). Click to change.`;
    statusBarItem.color = currentColor;
}

/**
 * Show accent color selection dropdown
 */
async function selectAccentColor() {
    const config = vscode.workspace.getConfiguration('nishuuu');
    const currentAccent = config.get('accent', 'teal');
    
    // Create quick pick items with SVG icons from vira-source build assets
    const quickPickItems = Object.entries(ACCENT_COLORS).map(([key, color]) => {
        const iconPath = getSvgFilePath(key);
        
        return {
            label: key.charAt(0).toUpperCase() + key.slice(1),
            description: '',
            detail: key === currentAccent ? '✓ Currently selected' : '',
            accent: key,
            iconPath: iconPath
        };
    });

    const selectedItem = await vscode.window.showQuickPick(quickPickItems, {
        placeHolder: 'Select accent color',
        title: '',
        matchOnDescription: false,
        matchOnDetail: false
    });

    if (selectedItem) {
        await config.update('accent', selectedItem.accent, vscode.ConfigurationTarget.Global);
        await config.update('customAccent', '', vscode.ConfigurationTarget.Global);
        vscode.window.showInformationMessage(`Accent color changed to ${selectedItem.accent}`);
    }
}

/**
 * Get the SVG file path for an accent color from vira-source build assets
 */
function getSvgFilePath(accentKey) {
    // Use SVG files from vira-source/build/assets/
    const extensionPath = vscode.extensions.getExtension('taraldinn.nishuuu-themes')?.extensionPath;
    if (!extensionPath) return undefined;
    
    const viraSourcePath = extensionPath.replace(/themes\/nishuuu-themes$/, 'themes/vira-source/build/assets');
    
    // Map accent keys to their corresponding SVG files in vira-source
    const svgMapping = {
        'teal': 'teal.svg',
        'vira': 'vira.svg', 
        'cyan': 'cyan.svg',
        'blue': 'blue.svg',
        'indigo': 'indigo.svg',
        'purple': 'purple.svg',
        'pink': 'pink.svg',
        'tomato': 'tomato.svg',
        'orange': 'orange.svg',
        'yellow': 'yellow.svg',
        'acid-lime': 'acid-lime.svg',
        'lime': 'lime.svg',
        'bright-teal': 'bright-teal.svg',
        'white': 'white.svg'
    };
    
    const svgFileName = svgMapping[accentKey] || 'vira.svg';
    return vscode.Uri.file(`${viraSourcePath}/${svgFileName}`);
}

/**
 * Apply dynamic accent colors to the current theme
 */
/**
 * Apply dynamic colors based on selected accent
 */
function applyDynamicColors() {
    const config = vscode.workspace.getConfiguration('nishuuu');
    const selectedAccent = config.get('accent', 'teal');
    
    const accentColor = ACCENT_COLORS[selectedAccent] || ACCENT_COLORS.teal;
    
    // Get the current color theme
    const colorTheme = vscode.workspace.getConfiguration('workbench').get('colorTheme');
    
    // Only apply to our themes
    if (!colorTheme || !colorTheme.toLowerCase().includes('tara')) {
        return;
    }
    
    // Apply dynamic CSS overrides for UI elements (not syntax highlighting)
    const cssOverrides = {
        // Status bar
        'statusBar.background': accentColor,
        'statusBar.foreground': getContrastColor(accentColor),
        'statusBar.border': accentColor,
        
        // Activity bar
        'activityBar.activeBorder': accentColor,
        'activityBar.activeBackground': addAlpha(accentColor, 0.2),
        'activityBar.activeFocusBorder': accentColor,
        
        // Tabs - Enhanced borders
        'tab.activeBorder': accentColor,
        'tab.activeBorderTop': 'transparent',
        'tab.unfocusedActiveBorder': 'transparent',
        'tab.unfocusedActiveBorderTop': 'transparent',
        'tab.hoverBackground': addAlpha(accentColor, 0.1),
        'tab.hoverBorder': accentColor,
        
        // Buttons and links
        'button.background': accentColor,
        'button.foreground': getContrastColor(accentColor),
        'button.hoverBackground': adjustBrightness(accentColor, 0.1),
        'textLink.foreground': accentColor,
        'textLink.activeForeground': adjustBrightness(accentColor, 0.2),
        
        // Focus and selection
        'focusBorder': accentColor,
        'selection.background': addAlpha(accentColor, 0.3),
        'list.activeSelectionBackground': addAlpha(accentColor, 0.2),
        'list.hoverBackground': '#00000000', // Disable hover effects in explorer
        'list.focusBackground': addAlpha(accentColor, 0.2),
        'list.inactiveSelectionBackground': addAlpha(accentColor, 0.1),
        'list.hoverForeground': '#D9D9D9', // Keep text visible but no background hover
        
        // File explorer specific - disable hover effects
        'tree.indentGuidesStroke': '#212121',
        'list.focusOutline': '#00000000',
        'list.focusAndSelectionOutline': '#00000000',
        
        // Progress bar
        'progressBar.background': accentColor,
        
        // Scrollbar
        'scrollbarSlider.activeBackground': addAlpha(accentColor, 0.8),
        'scrollbarSlider.hoverBackground': addAlpha(accentColor, 0.6),
        
        // Minimap
        'minimap.selectionHighlight': accentColor,
        
        // Badge
        'badge.background': accentColor,
        'badge.foreground': getContrastColor(accentColor),
        
        // Notifications
        'notificationCenterHeader.background': accentColor,
        'notificationCenterHeader.foreground': getContrastColor(accentColor),
        
        // Panel
        'panel.border': addAlpha(accentColor, 0.5),
        'panelTitle.activeBorder': accentColor,
        
        // Sidebar
        'sideBar.border': addAlpha(accentColor, 0.3),
        
        // Editor groups
        'editorGroup.border': addAlpha(accentColor, 0.3),
        'editorGroupHeader.tabsBorder': addAlpha(accentColor, 0.3)
    };
    
    // Update workbench color customizations
    const workbenchConfig = vscode.workspace.getConfiguration('workbench');
    const currentCustomizations = workbenchConfig.get('colorCustomizations') || {};
    
    // Merge with existing customizations, but prioritize our accent colors
    const updatedCustomizations = {
        ...currentCustomizations,
        ...cssOverrides
    };
    
    // Apply the customizations
    workbenchConfig.update('colorCustomizations', updatedCustomizations, vscode.ConfigurationTarget.Global);
}

/**
 * Get contrasting color (white or black) for better readability
 */
function getContrastColor(hexColor) {
    // Remove # if present
    hexColor = hexColor.replace('#', '');
    
    // Convert to RGB
    const r = parseInt(hexColor.substr(0, 2), 16);
    const g = parseInt(hexColor.substr(2, 2), 16);
    const b = parseInt(hexColor.substr(4, 2), 16);
    
    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    // Return black for light colors, white for dark colors
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
}

/**
 * Add alpha transparency to hex color
 */
function addAlpha(hexColor, alpha) {
    // Remove # if present
    hexColor = hexColor.replace('#', '');
    
    // Convert to RGB
    const r = parseInt(hexColor.substr(0, 2), 16);
    const g = parseInt(hexColor.substr(2, 2), 16);
    const b = parseInt(hexColor.substr(4, 2), 16);
    
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Adjust brightness of hex color
 */
function adjustBrightness(hexColor, factor) {
    // Remove # if present
    hexColor = hexColor.replace('#', '');
    
    // Convert to RGB
    let r = parseInt(hexColor.substr(0, 2), 16);
    let g = parseInt(hexColor.substr(2, 2), 16);
    let b = parseInt(hexColor.substr(4, 2), 16);
    
    // Adjust brightness
    r = Math.min(255, Math.max(0, Math.round(r + (255 - r) * factor)));
    g = Math.min(255, Math.max(0, Math.round(g + (255 - g) * factor)));
    b = Math.min(255, Math.max(0, Math.round(b + (255 - b) * factor)));
    
    // Convert back to hex
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

/**
 * Extension deactivation
 */
function deactivate() {
    if (statusBarItem) {
        statusBarItem.dispose();
    }
}

module.exports = {
    activate,
    deactivate
};
