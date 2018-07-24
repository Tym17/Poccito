const {app, BrowserWindow} = require('electron');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({width: 300, height: 500});
    mainWindow.setMenu(null);
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