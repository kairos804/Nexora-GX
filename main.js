const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

const GEMINI_MODELS = new Set(['gemini-2.5-flash', 'gemini-2.5-pro']);

ipcMain.handle('nexora:gemini', async (_event, payload = {}) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('Chave do Gemini não configurada. Defina GEMINI_API_KEY no Windows e abra o Nexora novamente.');
  }

  const prompt = typeof payload.prompt === 'string' ? payload.prompt.trim() : '';
  const model = GEMINI_MODELS.has(payload.model) ? payload.model : 'gemini-2.5-flash';
  if (!prompt) throw new Error('Digite uma pergunta antes de enviar.');
  if (prompt.length > 20000) throw new Error('A pergunta é muito longa. Limite: 20.000 caracteres.');

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey
      },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }]
      }),
      signal: AbortSignal.timeout(45000)
    }
  );

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = data?.error?.message || `A API do Gemini respondeu com HTTP ${response.status}.`;
    throw new Error(message);
  }

  const text = (data?.candidates?.[0]?.content?.parts || [])
    .map(part => part.text || '')
    .join('')
    .trim();

  if (!text) {
    const reason = data?.promptFeedback?.blockReason;
    throw new Error(reason ? `O Gemini bloqueou esta solicitação (${reason}).` : 'O Gemini não retornou uma resposta em texto.');
  }

  return { text };
});

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    backgroundColor: '#0f0f0f',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
