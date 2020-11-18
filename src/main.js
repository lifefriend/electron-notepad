const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
  let mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    // frame: false,  // 隐藏导航栏（无边框）
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })

  // mainWindow.loadFile('src/index.html')
  mainWindow.loadURL('http://www.baidu.com')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  mainWindow.on('close', (e) => {

  });
  // 关闭窗口，退出程序
  mainWindow.on('closed', () => {
    mainWindow = null;
    app.quit();
  });
}

app.whenReady().then(() => {
  createWindow();

  // 针对Mac端的一些配置
  if (process.platform === 'darwin') {
    // 隐藏菜单栏
    app.dock.hide();
  }

  // 针对Windows端的一些配置
  if (process.platform === 'win32') {
    // 隐藏菜单栏
    Menu.setApplicationMenu(null);
  }

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

//与渲染进程的通信
ipcMain.on('reqaction', (event, arg) => {
  switch (arg) {
    case 'exit':
      break;
  }
});