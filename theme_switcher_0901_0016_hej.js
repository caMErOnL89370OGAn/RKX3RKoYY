// 代码生成时间: 2025-09-01 00:16:42
// Import necessary Node.js modules
const fs = require('fs');
const path = require('path');

// Define the directory where themes are stored
const themesDir = path.join(__dirname, 'themes');

// Define available themes
const availableThemes = ['light', 'dark', 'colorful'];

// Function to switch themes
function switchTheme(currentTheme, newTheme) {
    // Check if the new theme is available
    if (!availableThemes.includes(newTheme)) {
        throw new Error('Theme not available');
    }

    // Check if the current theme is valid
    if (!fs.existsSync(path.join(themesDir, `${currentTheme}.css`))) {
        throw new Error('Current theme does not exist');
    }

    // Set the new theme as the active theme
    fs.writeFileSync(path.join(themesDir, 'activeTheme.css'), `@import './${newTheme}.css';`);

    console.log(`Theme switched successfully to ${newTheme}`);
}

// Function to get the current active theme
function getCurrentTheme() {
    try {
        const themeContent = fs.readFileSync(path.join(themesDir, 'activeTheme.css'), 'utf8');
        const theme = themeContent.match(/'\.\/(.+).css'/)[1];
        return theme;
    } catch (error) {
        throw new Error('Failed to read the active theme');
    }
}

// Export the module
module.exports = {
    switchTheme,
    getCurrentTheme
};

// Example usage:
// const themeModule = require('./theme_switcher.js');
// try {
//     themeModule.switchTheme(themeModule.getCurrentTheme(), 'dark');
// } catch (error) {
//     console.error(error.message);
// }
