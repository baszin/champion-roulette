const { app, BrowserWindow, ipcMain, shell } = require ('electron');
const fs = require('fs');
const path = require('path');

let win = null;

const createWin = () => {
    win = new BrowserWindow({
        autoHideMenuBar: true,
        width: 667,
        height: 500,
        resizable: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    })

    win.loadFile('index.html')
    win.webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url);
        return { action: 'deny' };
      });
}

app.whenReady().then(createWin);



ipcMain.on('generate', (event, data) => {

    let champs = fs.readFileSync(path.join('src', 'champs.json'))
    const array = JSON.parse(champs);

    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
      }
      
      const rndInt = randomIntFromInterval(1, 5)
    
    if (rndInt == 1) {
        var allChamp = "Role TOP\n" + array.top[~~(Math.random() * array.top.length)];
    }
    
    if (rndInt == 2) {
        var allChamp = "Role JUNGLE\n" + array.jngl[~~(Math.random() * array.jngl.length)];
    }
    
    if (rndInt == 3) {
        var allChamp = "Role MID\n" + array.mid[~~(Math.random() * array.mid.length)];
    }
    
    if (rndInt == 4) {
        var allChamp = "Role ADC\n" + array.adc[~~(Math.random() * array.adc.length)];
    }
    
    if (rndInt == 5) {
        var allChamp = "Role SUPPORT\n" + array.sup[~~(Math.random() * array.sup.length)];
    }
    
    var topChamp = array.top[~~(Math.random() * array.top.length)];
    var jnglChamp = array.jngl[~~(Math.random() * array.jngl.length)];
    var midChamp = array.mid[~~(Math.random() * array.mid.length)];
    var adcChamp = array.adc[~~(Math.random() * array.adc.length)];
    var supChamp = array.sup[~~(Math.random() * array.sup.length)];

    if (data == "null") {
        win.webContents.send('champion', "Please select a role!")
    }

    if (data == "all") {
        win.webContents.send('champion', allChamp)
    }

    if (data == "top") {
        win.webContents.send('champion', topChamp)
    }

    if (data == "jngl") {
        win.webContents.send('champion', jnglChamp)
    }

    if (data == "mid") {
        win.webContents.send('champion', midChamp)
    }

    if (data == "adc") {
        win.webContents.send('champion', adcChamp)
    }

    if (data == "sup") {
        win.webContents.send('champion', supChamp)
    }
})