const { app, BrowserWindow, ipcMain, safeStorage } = require('electron');
const path = require('path');
const fs = require('fs/promises');

const GEMINI_MODELS = new Set(['gemini-2.5-flash', 'gemini-2.5-pro']);
const KEY_FILE = () => path.join(app.getPath('userData'), 'gemini-key.enc');

async function readGeminiKey() {
  if (!safeStorage.isEncryptionAvailable()) {
    throw new Error('O armazenamento seguro do Windows não está disponível neste momento.');
  }
  try {
    const encrypted = await fs.readFile(KEY_FILE());
    return safeStorage.decryptString(encrypted);
  } catch (error) {
    if (error.code === 'ENOENT') return '';
    throw new Error('Não foi possível ler a configuração salva do Gemini. Tente salvar a chave novamente.');
  }
}

ipcMain.handle('nexora:gemini:status', async () => {
  try {
    const key = await readGeminiKey();
    return { configured: Boolean(key), secureStorage: safeStorage.isEncryptionAvailable() };
  } catch (error) {
    return { configured: false, secureStorage: safeStorage.isEncryptionAvailable(), error: error.message };
  }
});

ipcMain.handle('nexora:gemini:save-key', async (_event, rawKey) => {
  if (!safeStorage.isEncryptionAvailable()) {
    throw new Error('O Windows não disponibilizou o armazenamento seguro. Não vou salvar sua chave sem proteção.');
  }
  const key = typeof rawKey === 'string' ? rawKey.trim() : '';
  if (!key || key.length < 20 || key.length > 300) {
    throw new Error('A chave parece inválida. Confira e tente novamente.');
  }
  const encrypted = safeStorage.encryptString(key);
  await fs.mkdir(app.getPath('userData'), { recursive: true });
  await fs.writeFile(KEY_FILE(), encrypted, { mode: 0o600 });
  return { saved: true };
});

ipcMain.handle('nexora:gemini:remove-key', async () => {
  try { await fs.unlink(KEY_FILE()); } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  return { removed: true };
});

ipcMain.handle('nexora:gemini:ask', async (_event, payload = {}) => {
  const apiKey = await readGeminiKey();
  if (!apiKey) throw new Error('Configure sua chave do Gemini nas configurações da Nexora AI primeiro.');

  const prompt = typeof payload.prompt === 'string' ? payload.prompt.trim() : '';
  const model = GEMINI_MODELS.has(payload.model) ? payload.model : 'gemini-2.5-flash';
  if (!prompt) throw new Error('Digite uma pergunta antes de enviar.');
  if (prompt.length > 20000) throw new Error('A pergunta é muito longa. Limite: 20.000 caracteres.');

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
      body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: prompt }] }] }),
      signal: AbortSignal.timeout(45000)
    }
  );

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = data?.error?.message || `A API do Gemini respondeu com HTTP ${response.status}.`;
    throw new Error(message);
  }

  const answer = (data?.candidates?.[0]?.content?.parts || [])
    .map(part => part.text || '').join('').trim();
  if (!answer) {
    const reason = data?.promptFeedback?.blockReason;
    throw new Error(reason ? `O Gemini bloqueou esta solicitação (${reason}).` : 'O Gemini não retornou uma resposta em texto.');
  }
  return { text: answer };
});

function createWindow() {
  const win = new BrowserWindow({
    width: 1200, height: 800, minWidth: 900, minHeight: 600,
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
