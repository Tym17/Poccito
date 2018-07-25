const { app, BrowserWindow } = require('electron');
const config = require('./config.json');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 300,
        height: 450,
        frame: config.debugmode,
        resizable: config.debugmode,
        center: true
    });
    if (!config.debugmode) {
        mainWindow.setMenu(null);
    }
    mainWindow.loadFile('index.html');
    mainWindow.on('closed', () => {
        mainWindow = null;
    })
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
})