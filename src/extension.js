const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

const ACCENT_COLORS = {
    'teal': '#80CBC4', 'vira': '#E9A581', 'cyan': '#57D7FF', 'blue': '#5393FF',
    'indigo': '#758AFF', 'purple': '#B54DFF', 'pink': '#FF669E', 'tomato': '#F85044',
    'orange': '#FF7042', 'yellow': '#FFCF3D', 'acid-lime': '#C6FF00', 'lime': '#39EA5F',
    'bright-teal': '#1DE9B6', 'white': '#FFFFFF'
};

let statusBarItem;
let extensionContext;

function getColorIcon(colorName) {
    if (!extensionContext) return undefined;
    const iconPath = path.join(extensionContext.extensionPath, 'assets', `${colorName}.svg`);
    return fs.existsSync(iconPath) ? vscode.Uri.file(iconPath) : undefined;
}

function getStatusBarIcon(colorName) {
    // Map each color to an appropriate VS Code built-in icon
    const iconMap = {
        'teal': '$(symbol-misc)',
        'vira': '$(flame)', 
        'cyan': '$(symbol-color)',
        'blue': '$(primitive-dot)',
        'indigo': '$(symbol-namespace)',
        'purple': '$(symbol-enum)',
        'pink': '$(heart)',
        'tomato': '$(circle-large)',
        'orange': '$(symbol-constant)',
        'yellow': '$(star-full)',
        'acid-lime': '$(symbol-boolean)',
        'lime': '$(symbol-property)',
        'bright-teal': '$(symbol-field)',
        'white': '$(circle-outline)'
    };
    
    return iconMap[colorName] || '$(symbol-color)';
}

function activate(context) {
    extensionContext = context;
    initializeStatusBar();
    registerCommands(context);
    setupConfigurationWatcher(context);
    applyAccentColor();
}

function initializeStatusBar() {
    const config = vscode.workspace.getConfiguration('nishuuu');
    if (config.get('enableStatusBar', true)) {
        statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
        statusBarItem.command = 'nishuuu.selectAccentColor';
        updateStatusBar();
        statusBarItem.show();
    }
}

function registerCommands(context) {
    context.subscriptions.push(
        vscode.commands.registerCommand('nishuuu.selectAccentColor', selectAccentColor),
        vscode.commands.registerCommand('nishuuu.toggleStatusBar', toggleStatusBar),
        vscode.commands.registerCommand('nishuuu.resetCustomizations', resetCustomizations)
    );
    if (statusBarItem) context.subscriptions.push(statusBarItem);
}

function setupConfigurationWatcher(context) {
    context.subscriptions.push(
        vscode.workspace.onDidChangeConfiguration(event => {
            if (event.affectsConfiguration('nishuuu.accentColor') || event.affectsConfiguration('nishuuu.customAccentColor')) {
                // Force immediate update with slight delay to ensure settings are saved
                setTimeout(() => {
                    updateStatusBar();
                    applyAccentColor();
                }, 100);
            }
            if (event.affectsConfiguration('nishuuu.enableStatusBar')) {
                handleStatusBarToggle();
            }
        })
    );
}

function updateStatusBar() {
    if (!statusBarItem) return;
    
    const config = vscode.workspace.getConfiguration('nishuuu');
    const customColor = config.get('customAccentColor', '');
    const accentColor = config.get('accentColor', 'teal');
    
    const colorName = customColor ? 'Custom' : accentColor.charAt(0).toUpperCase() + accentColor.slice(1).replace('-', ' ');
    const colorValue = customColor || ACCENT_COLORS[accentColor];
    
    // Use appropriate icon for each color
    if (customColor) {
        statusBarItem.text = `$(edit) ${colorName}`;
    } else {
        const icon = getStatusBarIcon(accentColor);
        statusBarItem.text = `${icon} ${colorName}`;
    }
    statusBarItem.tooltip = `Nishuuu Themes - ${colorValue}`;
    statusBarItem.color = colorValue;
}

function handleStatusBarToggle() {
    const config = vscode.workspace.getConfiguration('nishuuu');
    const enable = config.get('enableStatusBar', true);
    
    if (enable && !statusBarItem) {
        initializeStatusBar();
    } else if (!enable && statusBarItem) {
        statusBarItem.dispose();
        statusBarItem = null;
    }
}

async function selectAccentColor() {
    const colorOptions = Object.keys(ACCENT_COLORS).map(key => {
        const displayName = key.charAt(0).toUpperCase() + key.slice(1).replace('-', ' ');
        const iconPath = getColorIcon(key);
        return {
            label: displayName,
            value: key,
            iconPath: iconPath
        };
    });
    
    colorOptions.push({ 
        label: '$(edit) Custom Color', 
        value: 'custom'
    });
    
    const selected = await vscode.window.showQuickPick(colorOptions, {
        placeHolder: 'Select an accent color'
    });
    
    if (selected) {
        const config = vscode.workspace.getConfiguration('nishuuu');
        if (selected.value === 'custom') {
            const customColor = await vscode.window.showInputBox({
                placeHolder: '#80CBC4',
                prompt: 'Enter hex color (e.g., #80CBC4)',
                validateInput: (value) => {
                    if (!value) return 'Enter a color';
                    if (!/^#[0-9A-Fa-f]{6}$/.test(value)) return 'Enter valid hex color (e.g., #80CBC4)';
                    return null;
                }
            });
            if (customColor) {
                await config.update('customAccentColor', customColor, vscode.ConfigurationTarget.Global);
                // Force immediate update
                setTimeout(() => {
                    updateStatusBar();
                    applyAccentColor();
                }, 150);
            }
        } else {
            await config.update('accentColor', selected.value, vscode.ConfigurationTarget.Global);
            await config.update('customAccentColor', '', vscode.ConfigurationTarget.Global);
            // Force immediate update
            setTimeout(() => {
                updateStatusBar();
                applyAccentColor();
            }, 150);
        }
    }
}

async function toggleStatusBar() {
    const config = vscode.workspace.getConfiguration('nishuuu');
    const current = config.get('enableStatusBar', true);
    await config.update('enableStatusBar', !current, vscode.ConfigurationTarget.Global);
}

function loadAccentColorSettings(colorName) {
    try {
        const settingsDir = path.join(extensionContext.extensionPath, 'accent-colors-settings');
        const possibleFiles = [
            `${colorName}.json`,
            `${colorName.charAt(0).toUpperCase() + colorName.slice(1)}.json`,
            `${colorName.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('-')}.json`
        ];
        
        for (const fileName of possibleFiles) {
            const filePath = path.join(settingsDir, fileName);
            if (fs.existsSync(filePath)) {
                return JSON.parse(fs.readFileSync(filePath, 'utf8'));
            }
        }
        return null;
    } catch (error) {
        console.error(`Error loading ${colorName}:`, error);
        return null;
    }
}

function generateCustomColorSettings(color) {
    const alpha80 = color + '80', alpha40 = color + '40', alpha33 = color + '33';
    const alpha26 = color + '26', alpha14 = color + '14';
    
    return {
        "workbench.colorCustomizations": {
            "[Tara*]": {
                "statusBar.background": alpha14,
                "statusBar.foreground": color,
                "statusBarItem.prominentBackground": alpha26,
                "statusBarItem.prominentForeground": color,
                "statusBar.debuggingBackground": alpha33,
                "statusBar.debuggingForeground": color,
                "toolbar.activeBackground": alpha26,
                "button.background": color,
                "button.hoverBackground": color + 'cc',
                "extensionButton.separator": alpha33,
                "extensionButton.background": alpha14,
                "extensionButton.foreground": color,
                "extensionButton.hoverBackground": alpha33,
                "extensionButton.prominentForeground": color,
                "extensionButton.prominentBackground": alpha14,
                "extensionButton.prominentHoverBackground": alpha33,
                "activityBarBadge.background": color,
                "activityBar.activeBorder": color,
                "activityBarTop.activeBorder": color,
                "list.inactiveSelectionIconForeground": color,
                "list.activeSelectionForeground": color,
                "list.inactiveSelectionForeground": color,
                "list.highlightForeground": color,
                "sash.hoverBorder": alpha80,
                "list.activeSelectionIconForeground": color,
                "scrollbarSlider.activeBackground": alpha80,
                "editorSuggestWidget.highlightForeground": color,
                "textLink.foreground": color,
                "progressBar.background": color,
                "pickerGroup.foreground": color,
                "tab.activeBorder": color,
                "tab.activeBorderTop": color + '00',
                "tab.unfocusedActiveBorder": color,
                "tab.unfocusedActiveBorderTop": color + '00',
                "tab.activeModifiedBorder": color + '00',
                "notificationLink.foreground": color,
                "editorWidget.resizeBorder": color,
                "editorWidget.border": color,
                "settings.modifiedItemIndicator": color,
                "panelTitle.activeBorder": color,
                "breadcrumb.activeSelectionForeground": color,
                "menu.selectionForeground": color,
                "menubar.selectionForeground": color,
                "editor.findMatchBorder": color,
                "selection.background": alpha40,
                "statusBarItem.remoteBackground": alpha14,
                "statusBarItem.remoteHoverBackground": color,
                "statusBarItem.remoteForeground": color,
                "notebook.inactiveFocusedCellBorder": alpha80,
                "commandCenter.activeBorder": alpha80,
                "chat.slashCommandForeground": color,
                "chat.avatarForeground": color,
                "activityBarBadge.foreground": "#FFFFFF",
                "button.foreground": "#FFFFFF",
                "statusBarItem.remoteHoverForeground": "#FFFFFF"
            }
        }
    };
}

async function applyAccentColor() {
    try {
        const config = vscode.workspace.getConfiguration('nishuuu');
        const customColor = config.get('customAccentColor', '');
        const accentColor = config.get('accentColor', 'teal');
        
        let colorSettings;
        if (customColor) {
            colorSettings = generateCustomColorSettings(customColor);
        } else {
            colorSettings = loadAccentColorSettings(accentColor);
            if (!colorSettings) {
                const colorValue = ACCENT_COLORS[accentColor] || '#80CBC4';
                colorSettings = generateCustomColorSettings(colorValue);
            }
        }
        
        if (colorSettings?.['workbench.colorCustomizations']) {
            const workbenchConfig = vscode.workspace.getConfiguration('workbench');
            const current = workbenchConfig.get('colorCustomizations', {});
            
            await workbenchConfig.update('colorCustomizations', {
                ...current,
                ...colorSettings['workbench.colorCustomizations']
            }, vscode.ConfigurationTarget.Global);
            
            // Force status bar update after applying colors
            setTimeout(() => {
                updateStatusBar();
            }, 50);
        }
    } catch (error) {
        console.error('Error applying accent color:', error);
        // Fallback update in case of error
        updateStatusBar();
    }
}

async function resetCustomizations() {
    try {
        const workbenchConfig = vscode.workspace.getConfiguration('workbench');
        const current = workbenchConfig.get('colorCustomizations', {});
        
        const cleaned = {};
        for (const [key, value] of Object.entries(current)) {
            if (!key.startsWith('[Tara') && !key.startsWith('[Vira')) {
                cleaned[key] = value;
            }
        }
        
        await workbenchConfig.update('colorCustomizations', cleaned, vscode.ConfigurationTarget.Global);
        updateStatusBar();
        vscode.window.showInformationMessage('Color customizations reset! 🔄');
    } catch (error) {
        vscode.window.showErrorMessage(`Reset failed: ${error.message}`);
    }
}

function deactivate() {
    if (statusBarItem) statusBarItem.dispose();
}

module.exports = { activate, deactivate };
