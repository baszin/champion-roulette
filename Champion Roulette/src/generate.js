const ipcRenderer = require('electron').ipcRenderer;

const generate = () => {
    ipcRenderer.send('generate', document.querySelector('.role').value)
}

ipcRenderer.on('champion', (event, data) => {
    const champTag = document.querySelector("#generated");
    champTag.innerText = data;
})