const {app, BrowserWindow, Menu,ipcMain} = require('electron')
const path = require('path')
const {appMenuTemplate} = require('./appmenu.js');

function createWindow () {
  let mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })

  mainWindow.loadFile('src/index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  mainWindow.on('close', (e) => {
    if(!safeExit){
      e.preventDefault();
      mainWindow.webContents.send('action', 'exiting');
    }
  });
  // 关闭窗口，退出程序
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  // 针对Mac端的一些配置
  if (process.platform === 'darwin') {
    appMenuTemplate.unshift({
        label: 'notepad',
        submenu: [{
          role: 'quit'
        }]
    })
  }

  // 针对Windows端的一些配置
  if (process.platform === 'win32') {
  }

  // 设置菜单部分
  const menu = Menu.buildFromTemplate(appMenuTemplate)
  Menu.setApplicationMenu(menu) 
 
  createWindow()

  // 隐藏菜单
  // app.dock.hide();
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

//是否可以安全退出
let safeExit = false;
//与渲染进程的通信
ipcMain.on('reqaction', (event, arg) => {
  switch(arg){
    case 'exit':
      //做点其它操作：比如记录窗口大小、位置等，下次启动时自动使用这些设置；不过因为这里（主进程）无法访问localStorage，这些数据需要使用其它的方式来保存和加载，这里就不作演示了。这里推荐一个相关的工具类库，可以使用它在主进程中保存加载配置数据：https://github.com/sindresorhus/electron-store
      safeExit=true;
      app.quit();//退出程序
      break;
  }
});