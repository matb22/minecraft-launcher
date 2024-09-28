const { ipcRenderer } = require('electron');
const launchButton = document.getElementById('launch-button');

const launchfiles = document.getElementById('launch-files')


launchButton.addEventListener('click', () => {
    ipcRenderer.send('launch-minecraft');
    ipcRenderer.send('close');
});


launchfiles.addEventListener('click', () => {
    ipcRenderer.send('open-project-folder');
    
});

