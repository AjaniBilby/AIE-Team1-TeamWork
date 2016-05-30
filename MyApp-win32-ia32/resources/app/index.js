const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const dialog = electron.dialog
const globalShortcut = electron.globalShortcut
var ipc = require("ipc");
var fs = require("fs");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

var settings = {}

let template = [{
  label: 'View',
  submenu: []
}];

function createWindow () {
  settings.graphics = JSON.parse(fs.readFileSync("./settings/graphics.json", 'utf8'));
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600, frame: !settings.graphics.frameless})

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/app.asar/index.html`);

  mainWindow.setMenu(null)
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
  mainWindow.setFullScreen(settings.graphics.fullscreen);
}

app.on('ready', function(){
  createWindow();
  globalShortcut.register('CommandOrControl+Shift+R', function() {
    mainWindow.reload();
  })
  globalShortcut.register('`', function(){
    mainWindow.webContents.openDevTools();
  })
  globalShortcut.register("F11", function(){
    mainWindow.setFullScreen(!mainWindow.isFullScreen());
  })
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
