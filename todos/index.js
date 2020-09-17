const electron = require('electron')

const { app, BrowserWindow, Menu, ipcMain } = electron

let mainWindow, addWindow

app.on('ready', () => {
  console.log('App is running...')
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true
    }
  })
  mainWindow.loadURL(`file://${__dirname}/main.html`)
  // Force close
  mainWindow.on('closed', () => app.quit())

  const mainMenu = Menu.buildFromTemplate(menuTemplate)
  Menu.setApplicationMenu(mainMenu)
})

function createAddWindow() {
  addWindow = new BrowserWindow({
    width: 500,
    height: 300,
    title: 'Add New Todo',
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true
    }
  })
  addWindow.loadURL(`file://${__dirname}/add.html`)
  addWindow.on('closed', () => addWindow = null) // => Clean up
}

ipcMain.on('addTodo', (event, todo) => {
  mainWindow.webContents.send('getTodo', todo)
  addWindow.close()
})

const menuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'New Todo',
        accelerator: process.platform === 'darwin' ? 'Command+N' : 'Ctrl+N',
        click() {
          createAddWindow()
        }
      },
      {
        label: 'Clear Todos',
        click() {
          mainWindow.webContents.send('clearTodos')
        }
      },
      {
        label: 'Quit',
        accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click() {
          app.quit()
        }
      }
    ]
  }
]

/** Cross platform */
// MacOS
if (process.platform === 'darwin') {
  menuTemplate.unshift({})
}

if (process.env.NODE_ENV !== 'production') {
  menuTemplate.push({
    label: 'Developer View',
    submenu: [
      { role: 'reload' },
      {
        label: 'Toggle Developer Tools',
        accelerator: process.platform === 'darwin' ? 'Command+Alt+I': 'Ctrl+Shift+I',
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools()
        }
      }
    ]
  })
}