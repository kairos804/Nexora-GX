const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('nexoraAI', {
  ask: (payload) => ipcRenderer.invoke('nexora:gemini', payload)
});
