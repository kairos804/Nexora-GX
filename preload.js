const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('nexoraAI', {
  status: () => ipcRenderer.invoke('nexora:gemini:status'),
  saveKey: (key) => ipcRenderer.invoke('nexora:gemini:save-key', key),
  removeKey: () => ipcRenderer.invoke('nexora:gemini:remove-key'),
  ask: (payload) => ipcRenderer.invoke('nexora:gemini:ask', payload)
});
