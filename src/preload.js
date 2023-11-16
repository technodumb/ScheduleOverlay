// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require('electron');


const API = {
    window: {
        close: () => ipcRenderer.send('app/close'),
        minimize: () => ipcRenderer.send('app/minimize'),
        openFile: () => ipcRenderer.invoke('dialog:openFile'),
        addFile: () => ipcRenderer.send('vscode:addFile'),
        resizeTo: (width, height) => ipcRenderer.send('window:resizeTo', width, height),
    },
}

contextBridge.exposeInMainWorld('app', API);