# Nexora GX

Um navegador poderoso anônimo.

**Versão 1.2.3**

## Inclui
- Pesquisa integrada
- Relógio em tempo real
- Chat Nexora AI com Gemini
- Modelos Gemini 2.5 Flash e Gemini 2.5 Pro
- Aplicativo desktop com Electron
- Chromium via Electron
- Build para Windows (`.exe`) com Electron Builder

## Configurar o Gemini

O Nexora lê a chave no processo principal do Electron pela variável de ambiente `GEMINI_API_KEY`. A chave não deve ser colocada no HTML, no preload ou no GitHub.

**PowerShell (somente na sessão atual):**

```powershell
$env:GEMINI_API_KEY="SUA_CHAVE_NOVA"
npm start
```

**Prompt de Comando (somente na janela atual):**

```bat
set GEMINI_API_KEY=SUA_CHAVE_NOVA
npm start
```

Crie uma chave nova no Google AI Studio. Não reutilize uma chave que tenha sido compartilhada em chat ou commit. Não envie a chave para o GitHub.

## Rodar no PC

```bash
npm install
npm start
```

## Gerar instalador `.exe`

```bash
npm run build:win
```

O instalador Windows será gerado na pasta `dist/`. Quem usar o aplicativo precisará configurar sua própria variável `GEMINI_API_KEY`; a chave não é embutida no instalador.
