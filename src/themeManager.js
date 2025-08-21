/**
 * Theme Manager for Nishuuu Themes
 * Advanced theme management with full Vira-style functionality
 */

const vscode = require('vscode');
const path = require('path');
const { ACCENT_COLORS, FOLDER_TYPES, ICON_THEME_FILES } = require('./constants');

class NishuuuThemeManager {
    constructor(context) {
        this.context = context;
        this.statusBarItem = null;
        this.accentColors = ACCENT_COLORS;
        
        this.setupStatusBar();
        this.setupConfigurationWatcher();
    }
    
    setupStatusBar() {
        this.statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
        this.statusBarItem.command = 'nishuuuTheme.switchAccent';
        this.statusBarItem.tooltip = 'Click to change accent color';
        this.updateStatusBar();
        this.statusBarItem.show();
        this.context.subscriptions.push(this.statusBarItem);
    }
    
    setupConfigurationWatcher() {
        const configWatcher = vscode.workspace.onDidChangeConfiguration(event => {
            if (event.affectsConfiguration('nishuuuTheme.accent') || 
                event.affectsConfiguration('nishuuuTheme.customAccent')) {
                this.applyAccent();
            }
        });
        this.context.subscriptions.push(configWatcher);
    }
    
    updateStatusBar() {
        const currentAccent = this.getCurrentAccent();
        const accentHex = this.accentColors[currentAccent] || currentAccent;
        
        if (currentAccent.startsWith('#')) {
            // Custom accent color
            this.statusBarItem.text = `$(paintcan) Custom`;
            this.statusBarItem.color = currentAccent;
            this.statusBarItem.tooltip = `Custom accent color: ${currentAccent}`;
        } else {
            // Preset accent color
            this.statusBarItem.text = `$(paintcan) ${currentAccent}`;
            this.statusBarItem.color = accentHex;
            this.statusBarItem.tooltip = `Current accent: ${currentAccent} (${accentHex})`;
        }
    }
    
    getCurrentAccentHex() {
        const currentAccent = this.getCurrentAccent();
        return this.accentColors[currentAccent] || currentAccent;
    }
    
    getCurrentAccent() {
        const config = vscode.workspace.getConfiguration('nishuuuTheme');
        const customAccent = config.get('customAccent');
        
        if (customAccent && customAccent.startsWith('#')) {
            return customAccent;
        }
        
        return config.get('accent', 'Teal');
    }
    
    async showAccentPicker() {
        const accentNames = Object.keys(this.accentColors);
        const items = accentNames.map(name => {
            const accentHex = this.accentColors[name];
            const assetFile = `${name.toLowerCase().replace(/\s+/g, '-')}.svg`;
            const extensionPath = vscode.extensions.getExtension('taraldinn.nishuuu-themes')?.extensionPath;
            const iconPath = extensionPath ? path.join(extensionPath, 'assets', assetFile) : null;
            
            return {
                label: `$(circle-filled) ${name}`,
                description: accentHex,
                detail: `Accent color: ${accentHex}`,
                iconPath: iconPath ? vscode.Uri.file(iconPath) : undefined,
                accentName: name
            };
        });
        
        // Add custom accent option
        items.push({
            label: '$(plus) Custom Accent Color',
            description: 'Enter a custom hex color',
            detail: 'Click to enter custom hex color (e.g., #FF8800)',
            accentName: 'custom'
        });
        
        const selected = await vscode.window.showQuickPick(items, {
            placeHolder: 'Select accent color',
            matchOnDetail: true
        });
        
        if (selected) {
            if (selected.accentName === 'custom') {
                await this.showCustomAccentInput();
            } else {
                await this.setAccent(selected.accentName);
            }
        }
    }
    
    async showCustomAccentInput() {
        const customColor = await vscode.window.showInputBox({
            placeHolder: 'Enter hex color (e.g., #FF8800)',
            prompt: 'Custom accent color',
            validateInput: (input) => {
                if (!input) return 'Color cannot be empty';
                if (!/^#[0-9A-Fa-f]{6}$/.test(input)) {
                    return 'Please enter a valid 6-digit hex color (e.g., #FF8800)';
                }
                return null;
            }
        });
        
        if (customColor) {
            await this.setCustomAccent(customColor);
        }
    }
    
    async setCustomAccent(hexColor) {
        const config = vscode.workspace.getConfiguration('nishuuuTheme');
        await config.update('customAccent', hexColor, vscode.ConfigurationTarget.Global);
        
        this.applyAccent();
        this.updateStatusBar();
        
        vscode.window.showInformationMessage(`Custom accent color set to ${hexColor}`);
    }
    
    async setAccent(accentName) {
        const config = vscode.workspace.getConfiguration('nishuuuTheme');
        await config.update('accent', accentName, vscode.ConfigurationTarget.Global);
        await config.update('customAccent', '', vscode.ConfigurationTarget.Global);
        
        this.applyAccent();
        this.updateStatusBar();
        
        vscode.window.showInformationMessage(`Accent color changed to ${accentName}`);
    }
    
    async clearAccent() {
        const config = vscode.workspace.getConfiguration('nishuuuTheme');
        const currentCustomAccent = config.get('customAccent');
        
        if (currentCustomAccent) {
            // Clear custom accent and return to preset
            await config.update('customAccent', '', vscode.ConfigurationTarget.Global);
            vscode.window.showInformationMessage('Custom accent color cleared, using preset accent');
        } else {
            // Reset to default accent
            await config.update('accent', 'Teal', vscode.ConfigurationTarget.Global);
            vscode.window.showInformationMessage('Accent color reset to default (Teal)');
        }
        
        this.applyAccent();
        this.updateStatusBar();
    }
    
    applyAccent() {
        const currentAccent = this.getCurrentAccent();
        const accentHex = this.accentColors[currentAccent] || currentAccent;
        
        const config = vscode.workspace.getConfiguration('nishuuuTheme');
        const useTopTabIndicator = config.get('useTopTabIndicator', false);
        const contrastedTabs = config.get('contrastedTabs', false);
        const showBorders = config.get('showBorders', false);
        const solidLineHighlight = config.get('solidLineHighlight', false);
        const hidesShadows = config.get('hidesShadows', false);
        
        const colorCustomizations = {
            // Status Bar
            'statusBar.debuggingBackground': accentHex + '33',
            'statusBar.debuggingForeground': accentHex,
            'statusBarItem.remoteBackground': accentHex + '14',
            'statusBarItem.remoteHoverBackground': accentHex + '26',
            'statusBarItem.remoteForeground': accentHex,
            
            // Activity Bar - Product icon active color
            'activityBar.activeBorder': accentHex,
            'activityBarBadge.background': accentHex,
            'activityBarBadge.foreground': '#000000',
            
            // Buttons - Use accent color with transparency
            'button.background': accentHex + '80', // 50% transparency
            'button.foreground': this.getContrastColor(accentHex),
            'button.hoverBackground': accentHex + 'CC', // 80% transparency
            'button.secondaryBackground': accentHex + '40', // 25% transparency
            'button.secondaryForeground': accentHex,
            'button.secondaryHoverBackground': accentHex + '60', // 37% transparency
            
            // Tabs - Bottom border accent color
            'tab.activeBorder': useTopTabIndicator ? '#00000000' : accentHex,
            'tab.activeBorderTop': useTopTabIndicator ? accentHex : '#00000000',
            'tab.activeForeground': accentHex,
            'tab.inactiveForeground': '#FFFFFF',
            'tab.activeModifiedBorder': accentHex,
            'tab.unfocusedActiveBorder': accentHex + '80',
            'tab.unfocusedActiveBorderTop': useTopTabIndicator ? accentHex + '80' : '#00000000',
            
            // Lists - File explorer active selection
            'list.activeSelectionForeground': accentHex,
            'list.activeSelectionBackground': accentHex + '26',
            'list.highlightForeground': accentHex,
            'list.focusForeground': accentHex,
            'list.focusBackground': accentHex + '1A',
            'list.hoverForeground': accentHex,
            'list.hoverBackground': accentHex + '1A',
            
            // Input fields
            'input.border': accentHex + '4D',
            'inputOption.activeBorder': accentHex,
            'inputOption.activeBackground': accentHex + '1A',
            'inputOption.hoverBackground': accentHex + '26',
            
            // Scrollbar
            'scrollbarSlider.activeBackground': accentHex + 'CC',
            'scrollbarSlider.hoverBackground': accentHex + '99',
            
            // Editor - Only UI elements, not text colors
            'editor.findMatchBorder': accentHex,
            'editor.findMatchHighlightBorder': accentHex + '80',
            'editor.selectionBackground': accentHex + '40',
            'editor.lineHighlightBorder': solidLineHighlight ? '#00000000' : accentHex + '26',
            'editor.lineHighlightBackground': solidLineHighlight ? accentHex + '1A' : '#00000000',
            'editor.wordHighlightBorder': accentHex + '80',
            'editor.wordHighlightStrongBorder': accentHex,
            
            // Widgets
            'editorWidget.border': accentHex + 'CC',
            'editorSuggestWidget.highlightForeground': accentHex,
            'editorSuggestWidget.selectedBackground': accentHex + '26',
            'editorHoverWidget.border': accentHex + 'CC',
            
            // Progress
            'progressBar.background': accentHex,
            
            // Links - Active text color
            'textLink.foreground': accentHex,
            'textLink.activeForeground': accentHex + 'CC',
            'textLink.foreground': accentHex,
            
            // Settings
            'settings.modifiedItemIndicator': accentHex,
            'settings.checkboxBackground': accentHex + '26',
            'settings.checkboxBorder': accentHex,
            'settings.checkboxForeground': accentHex,
            
            // Panels
            'panelTitle.activeBorder': accentHex,
            'panelTitle.activeForeground': accentHex,
            
            // Breadcrumbs
            'breadcrumb.activeSelectionForeground': accentHex,
            'breadcrumb.focusForeground': accentHex,
            
            // Menus
            'menu.selectionForeground': accentHex,
            'menu.selectionBackground': accentHex + '26',
            'menubar.selectionForeground': accentHex,
            'menubar.selectionBackground': accentHex + '26',
            
            // Command Center
            'commandCenter.activeBorder': accentHex + '80',
            'commandCenter.activeBackground': accentHex + '1A',
            
            // Chat/Copilot
            'chat.slashCommandForeground': accentHex,
            'chat.avatarForeground': accentHex,
            'chat.requestBackground': accentHex + '1A',
            'chat.requestBorder': accentHex + '40',
            
            // Extensions
            'extensionButton.prominentBackground': accentHex + '80',
            'extensionButton.prominentForeground': this.getContrastColor(accentHex),
            'extensionButton.prominentHoverBackground': accentHex + 'CC',
            
            // Notifications
            'notificationCenterHeader.background': accentHex + '1A',
            'notificationToast.border': accentHex + '40',
            
            // Welcome page
            'welcomePage.buttonBackground': accentHex + '80',
            'welcomePage.buttonHoverBackground': accentHex + 'CC',
            'welcomePage.progress.background': accentHex + '40',
            'welcomePage.progress.foreground': accentHex,
            
            // Sidebar
            'sideBarTitle.foreground': accentHex,
            'sideBarSectionHeader.foreground': accentHex,
            
            // Tree
            'tree.indentGuidesStroke': accentHex + '40',
            'tree.tableColumnsBorder': accentHex + '40',
            
            // Debug
            'debugToolBar.background': accentHex + '1A',
            'debugToolBar.border': accentHex + '40',
            
            // Terminal
            'terminal.inactiveSelectionBackground': accentHex + '26',
            'terminal.selectionBackground': accentHex + '40',
            
            // Git
            'gitDecoration.addedResourceForeground': accentHex,
            'gitDecoration.modifiedResourceForeground': accentHex,
            'gitDecoration.stageModifiedResourceForeground': accentHex,
            'gitDecoration.untrackedResourceForeground': accentHex,
            
            // Merge conflicts
            'merge.currentHeaderBackground': accentHex + '26',
            'merge.incomingHeaderBackground': accentHex + '26',
            'merge.commonHeaderBackground': accentHex + '26',
            
            // Peek view
            'peekView.border': accentHex,
            'peekViewEditor.background': accentHex + '1A',
            'peekViewResult.background': accentHex + '1A',
            'peekViewTitle.background': accentHex + '26',
            'peekViewTitleLabel.foreground': accentHex,
            
            // Inline chat
            'inlineChat.border': accentHex + '40',
            'inlineChat.background': accentHex + '1A',
            'inlineChat.shadow': accentHex + '26',
            
            // Testing
            'testing.iconPassed': accentHex,
            'testing.iconFailed': accentHex,
            'testing.iconQueued': accentHex,
            'testing.iconUnset': accentHex,
            'testing.iconSkipped': accentHex,
            
            // Problems
            'problemsErrorIcon.foreground': accentHex,
            'problemsWarningIcon.foreground': accentHex,
            'problemsInfoIcon.foreground': accentHex,
            
            // Editor overview
            'editorOverviewRuler.addedForeground': accentHex,
            'editorOverviewRuler.modifiedForeground': accentHex,
            'editorOverviewRuler.deletedForeground': accentHex,
            'editorOverviewRuler.errorForeground': accentHex,
            'editorOverviewRuler.warningForeground': accentHex,
            'editorOverviewRuler.infoForeground': accentHex
        };
        
        // Apply Vira-style toggles
        if (contrastedTabs) {
            colorCustomizations['editorGroupHeader.tabsBackground'] = '#0E0E0E';
            colorCustomizations['tab.inactiveBackground'] = '#0E0E0E';
        }
        
        if (showBorders) {
            colorCustomizations['panel.border'] = '#11121699';
            colorCustomizations['sideBar.border'] = '#11121699';
            colorCustomizations['titleBar.border'] = '#11121699';
            colorCustomizations['editor.border'] = '#11121699';
        }
        
        if (hidesShadows) {
            colorCustomizations['widget.shadow'] = '#00000000';
            colorCustomizations['scrollbar.shadow'] = '#00000000';
            colorCustomizations['dropdown.shadow'] = '#00000000';
            colorCustomizations['panel.shadow'] = '#00000000';
        }
        
        // Apply color customizations
        vscode.workspace.getConfiguration('workbench').update('colorCustomizations', colorCustomizations, vscode.ConfigurationTarget.Global);
        
        // Update folder icons if using Nishuuu icon theme
        this.updateFolderIcons(currentAccent);
    }
    
    getContrastColor(hexColor) {
        if (hexColor.startsWith('#')) {
            const r = parseInt(hexColor.slice(1, 3), 16);
            const g = parseInt(hexColor.slice(3, 5), 16);
            const b = parseInt(hexColor.slice(5, 7), 16);
            const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
            return luminance > 0.6 ? '#000000' : '#FFFFFF';
        }
        return '#FFFFFF';
    }
    
    async updateFolderIcons(accentName) {
        const config = vscode.workspace.getConfiguration('nishuuuTheme');
        const useOutlinedIcons = config.get('useOutlinedIcons', false);
        
        const currentIconTheme = vscode.workspace.getConfiguration('workbench').get('iconTheme');
        if (!currentIconTheme || !currentIconTheme.includes('tara-icons')) {
            return;
        }
        
        // Update icon theme files with new accent
        try {
            const extensionPath = vscode.extensions.getExtension('taraldinn.nishuuu-themes')?.extensionPath;
            if (!extensionPath) return;
            
            const themesPath = path.join(extensionPath, 'themes');
            
            for (const fileName of ICON_THEME_FILES) {
                await this.updateIconThemeFile(themesPath, fileName, accentName, useOutlinedIcons);
            }
            
            // Reload icon theme
            await this.reloadIconTheme();
            
        } catch (error) {
            console.error('Error updating folder icons:', error);
        }
    }
    
    async updateIconThemeFile(themesPath, fileName, accentName, useOutlinedIcons) {
        const fs = require('fs').promises;
        const filePath = path.join(themesPath, fileName);
        
        try {
            const content = await fs.readFile(filePath, 'utf8');
            const iconTheme = JSON.parse(content);
            
            const accentSuffix = accentName.toLowerCase().replace(/\s+/g, '-');
            const variantDir = useOutlinedIcons ? 'outlined' : 'filled';
            
            // Update folder icon definitions
            for (const folderType of FOLDER_TYPES) {
                const iconKey = `_${folderType}`;
                if (iconTheme.iconDefinitions[iconKey]) {
                    const basePath = iconTheme.iconDefinitions[iconKey].iconPath;
                    let newPath = basePath.replace('/folders/filled/', `/folders/${variantDir}/`);
                    newPath = newPath.replace(`${folderType}.svg`, `${folderType}.accent.${accentSuffix}.svg`);
                    iconTheme.iconDefinitions[iconKey].iconPath = newPath;
                }
            }
            
            await fs.writeFile(filePath, JSON.stringify(iconTheme, null, 2), 'utf8');
            
        } catch (error) {
            console.error(`Error updating icon theme ${fileName}:`, error);
        }
    }
    
    async reloadIconTheme() {
        try {
            const currentIconTheme = vscode.workspace.getConfiguration('workbench').get('iconTheme');
            await vscode.workspace.getConfiguration('workbench').update('iconTheme', null, vscode.ConfigurationTarget.Global);
            await new Promise(resolve => setTimeout(resolve, 100));
            await vscode.workspace.getConfiguration('workbench').update('iconTheme', currentIconTheme, vscode.ConfigurationTarget.Global);
        } catch (error) {
            console.error('Error reloading icon theme:', error);
        }
    }
    
    async testFolderIcons() {
        const currentIconTheme = vscode.workspace.getConfiguration('workbench').get('iconTheme');
        if (!currentIconTheme || !currentIconTheme.includes('tara-icons')) {
            const choice = await vscode.window.showWarningMessage(
                'Please switch to a Nishuuu icon theme to test folder icons',
                'Switch to Tara Icons Carbon',
                'Cancel'
            );
            
            if (choice === 'Switch to Tara Icons Carbon') {
                await vscode.workspace.getConfiguration('workbench').update('iconTheme', 'tara-icons-carbon', vscode.ConfigurationTarget.Global);
                vscode.window.showInformationMessage('✅ Switched to Tara Icons Carbon');
            }
            return;
        }
        
        const accentNames = Object.keys(this.accentColors);
        const items = accentNames.map(name => ({
            label: `Test ${name}`,
            description: `Apply ${name} accent to folder icons`,
            accentName: name
        }));
        
        const selected = await vscode.window.showQuickPick(items, {
            placeHolder: 'Select accent color to test folder icons',
            canPickMany: false
        });
        
        if (selected) {
            await this.setAccent(selected.accentName);
            vscode.window.showInformationMessage(`🎨 Applied ${selected.accentName} accent to folder icons!`);
        }
    }
    
    initialize() {
        this.applyAccent();
    }
    
    dispose() {
        if (this.statusBarItem) {
            this.statusBarItem.dispose();
        }
    }
}

module.exports = { NishuuuThemeManager };


