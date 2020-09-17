const electron = require('electron')

const { ipcRenderer } = electron

// Reading file details
document.querySelector('form').addEventListener('submit', event => {
  event.preventDefault()
  const { path } = document.querySelector('#video').files[0]

  ipcRenderer.send('getVideoLength', path)
})

ipcRenderer.on('getVideoInfo', (event, duration) => {
  document.querySelector('#video-info').innerHTML = `Video is ${duration.toFixed(2)} seconds`
})