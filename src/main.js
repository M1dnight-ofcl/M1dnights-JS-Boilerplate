const { app, BrowserWindow, screen, ipcMain } = require('electron');
const path = require('path');

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minHeight: 175,
    minWidth: 250,
    maxWidth: (width * 1.25),
    maxHeight: (height * 1.25),
    autoHideMenuBar: true,
    titleBarStyle: "hidden",
    title: "Project",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // mainWindow.webContents.openDevTools();
};

ipcMain.on('close', () => {
  app.quit();
})
ipcMain.on('min', () => {
  BrowserWindow.getFocusedWindow().minimize();
})
ipcMain.on('max', () => {
  if(!BrowserWindow.getFocusedWindow().isMaximized()){ BrowserWindow.getFocusedWindow().maximize(); }
  else if(BrowserWindow.getFocusedWindow().isMaximized()){ BrowserWindow.getFocusedWindow().unmaximize(); }
})

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
