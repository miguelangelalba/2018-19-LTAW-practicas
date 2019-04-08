const electron = require('electron')

console.log("Arrancando electron...")

electron.app.on('ready', ()=>{
    console.log("Evento Ready!")
    win = new electron.BrowserWindow({
        width: 600,
        height: 400
    })
    win.loadFile('index.html')
})
