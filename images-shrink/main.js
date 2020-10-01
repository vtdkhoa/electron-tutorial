const { app, BrowserWindow, Menu } = require('electron')

process.env.NODE_ENV = 'development'

const isDev = process.env.NODE_ENV !== 'production' ? true : false
const isMac = process.platform === 'darwin' ? true : false

let mainWindow

function createMainWindow() {
  mainWindow = new BrowserWindow({
    title: 'Images Shrink',
    width: 600,
    height: 800,
    icon: `${__dirname}/assets/icons/icon_32x32.png`,
    resizable: isDev,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true
    }
  })

  mainWindow.loadURL(`file://${__dirname}/app/index.html`)
}

app.on('ready', () => {
  createMainWindow()

  const mainMenu = Menu.buildFromTemplate(menu)
  Menu.setApplicationMenu(mainMenu)

  mainWindow.on('closed', () => mainWindow = null)
})

const menu = [
  ...isMac ? [{ role: 'appMenu' }] : [],
  {
    label: 'File',
    submenu: [
      {
        label: 'Quit',
        click() {
          app.quit()
        }
      }
    ]
  }
]

app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow()
  }
})

app.allowRendererProcessReuse = true