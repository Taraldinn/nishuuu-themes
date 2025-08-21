const vscode = require('vscode');
const { NishuuuThemeManager } = require('./themeManager');

let themeManager;

function activate(context) {
    console.log('🎨 Nishuuu Themes extension is now active!');
    
    themeManager = new NishuuuThemeManager(context);
    
    // Register commands
    const switchAccentCmd = vscode.commands.registerCommand('nishuuuTheme.switchAccent', () => {
        themeManager.showAccentPicker();
    });
    
    const clearAccentCmd = vscode.commands.registerCommand('nishuuuTheme.clearAccent', () => {
        themeManager.clearAccent();
    });
    
    const testIconsCmd = vscode.commands.registerCommand('nishuuuTheme.testIcons', () => {
        themeManager.testFolderIcons();
    });
    
    context.subscriptions.push(switchAccentCmd, clearAccentCmd, testIconsCmd);
    
    // Initialize theme manager
    themeManager.initialize();
}

function deactivate() {
    if (themeManager) {
        themeManager.dispose();
    }
}

module.exports = {
    activate,
    deactivate
};
