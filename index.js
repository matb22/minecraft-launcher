const { app, BrowserWindow , ipcMain, shell } = require('electron');
const path = require('node:path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    
    
  });

  
  
  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname,'main\\index.html'));

  ipcMain.on('launch-minecraft', () => {
    const minecraftPath = path.join(__dirname, 'version\\minecraft-1.19.fabric.optifine.xaeros.rei.wthit\\Minecraft.exe'); // Замените на ваш путь к Minecraft
    shell.openPath(minecraftPath); // Используйте shell.openPath для открытия файла
});

ipcMain.on('launch-minecraft', () => {
  const win = BrowserWindow.fromId(1); // Получаем окно
  if (win) {
      win.close(); // Закрываем окно 
  }
});

ipcMain.on('open-project-folder', () => {
  const projectFolderPath = path.join(__dirname, 'version\\minecraft-1.19.fabric.optifine.xaeros.rei.wthit'); // Получаем путь к родительской папке 
  shell.openPath(projectFolderPath);  // Открываем проводник в указанной папке
});


  // Open the DevTools.
  //mainWindow.webContents.openDevTools();

  
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
