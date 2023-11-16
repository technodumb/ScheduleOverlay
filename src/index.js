const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const electronReload = require('electron-reload');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

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
    minHeight: 50,
    // autoHideMenuBar: true,
    frame:false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    transparent: true,
    alwaysOnTop: true,
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

app.on('blur', () => {
  app.setBackgroundColor('#00000000');
});

app.on('focus', () => {
  app.setBackgroundColor('#00000000');
});

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
});

ipcMain.on('vscode:addFile', () => {
  // get current month and date and create a string of format 'mmmm dd.txt'
  const date = new Date();
  const month = date.toLocaleString('default', { month: 'long' });
  const day = date.getDate();
  const fileName = `${month} ${day}.txt`;
  const folderName = 'D:/Users/Documents/Code/2023 New start/Schedule/';
  const filePath = path.join(folderName, fileName);
  exec(`code "${filePath}"`);

});

ipcMain.handle('dialog:openFile', handleOpenFile);

ipcMain.on('window:resizeTo', (event, width, height) => {
  mainWindow.setSize(width, height);
  // set minimum and maximum height to current height
  mainWindow.setMinimumSize(width, height);
  mainWindow.setMaximumSize(width, height);
});

async function handleOpenFile() {
  // show open file dialog at file path D:/Users/Documents/Code/2023 New start/Schedule/
  
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    defaultPath: 'D:/Users/Documents/Code/2023 New start/Schedule/',
    filters: [
      { name: 'Text Files', extensions: ['txt'] },
      { name: 'All Files', extensions: ['*'] }
    ]
  });

  if (result.canceled) {
    return;
  }

  const filePath = result.filePaths[0];

  const fileData = fs.readFileSync(filePath, 'utf-8');

  return fileData;
}
