const electron = require('electron')
const ffmpeg = require('fluent-ffmpeg')

const { app, BrowserWindow, ipcMain } = electron

let mainWindow

app.on('ready', () => {
  console.log('App is running...')
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true
    }
  })
  mainWindow.loadURL(`file://${__dirname}/index.html`)
})

ipcMain.on('getVideoLength', (event, path) => {
  ffmpeg.setFfmpegPath("c:\\ffmpeg\\bin\\ffprode.exe")
  ffmpeg.ffprobe(path, (error, metaData) => {
    if (error) {
      throw Error(error)
    }
    mainWindow.webContents.send('getVideoInfo', metaData.format.duration)
  })
})