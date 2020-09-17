const electron = require('electron')

const { ipcRenderer } = electron

const list = document.querySelector('ul')

ipcRenderer.on('getTodo', (event, todo) => {
  const li = document.createElement('li')
  const text = document.createTextNode(todo)

  li.appendChild(text)
  list.appendChild(li)
})

ipcRenderer.on('clearTodos', () => {
  list.innerHTML = ''
})