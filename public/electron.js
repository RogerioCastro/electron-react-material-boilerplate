/* eslint import/no-extraneous-dependencies: ["error", {"bundledDependencies": false}] */
const {
  app,
  BrowserWindow,
  shell,
  ipcMain,
  dialog
} = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')

let mainWindow
// const isWindows = process.platform === 'win32'

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    icon: `${__dirname}/images/logo.png`,
    titleBarStyle: 'hidden',
    backgroundColor: '#282c34',
    darkTheme: true,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  })

  // mainWindow.maximize()
  mainWindow.menuBarVisible = false

  // Loading the web application
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`,
  )

  if (isDev) {
    mainWindow.webContents.openDevTools()
  }

  mainWindow.once('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined')
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize()
    } else {
      mainWindow.show()
      mainWindow.focus()
    }
  })

  // Open urls in the user's browser
  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault()
    shell.openExternal(url)
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// Communication
ipcMain.on('dialog-message', (event, args) => {
  const options = {
    type: args.type,
    title: args.title || (args.type && args.type === 'error' ? 'Error' : 'Information'),
    message: args.message || null,
    buttons: args.buttons || ['OK']
  }
  const channel = args.channel || 'dialog-response'
  // Returning the click result
  dialog.showMessageBox(options).then((response) => {
    event.sender.send(channel, response)
  })
})

// eslint-disable-next-line no-console
console.log('Electron running...')
