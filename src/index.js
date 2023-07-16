const { app, BrowserWindow, ipcMain } = require('electron');
const electronReload = require('electron-reload');
const path = require('path');
electronReload(__dirname);

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

let mainWindow;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 400,
    height: 50,
    maxWidth: 400, minWidth: 400,
    maxHeight: 50, minHeight: 50,
    autoHideMenuBar: true,
    frame:false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    transparent: true,
    alwaysOnTop: true,
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on('app/close', () => {
  app.quit();
}
);

ipcMain.on('app/minimize', () => {
  mainWindow.minimize();
}
);