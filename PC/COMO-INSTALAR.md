# Nexora GX — Versão para PC

## Baixar os executáveis prontos

1. Abra a aba **Actions** do repositório no GitHub.
2. Entre na execução mais recente de **Build Nexora GX for Windows** que terminou com sucesso.
3. Na seção **Artifacts**, baixe o ZIP **Nexora-GX-Windows-...**.
4. Extraia o ZIP.
5. Execute **Nexora-GX-Setup-1.2.4-x64.exe** para instalar o navegador ou **Nexora-GX-Portable-1.2.4-x64.exe** para abrir sem instalação.

O GitHub Actions gera os executáveis para Windows x64 automaticamente quando há push em `main` ou `feature/gemini-integration`, em pull requests para `main` e também por execução manual. Os artefatos ficam disponíveis por 14 dias.

## Gerar localmente no Windows

Requisitos: Windows 10 ou superior, Node.js 22 e npm.

Dentro da pasta do projeto:

```powershell
npm install
npm run build:win
```

Os executáveis ficam na pasta `dist/`:
- `Nexora-GX-Setup-1.2.4-x64.exe`: instalador NSIS, com escolha da pasta e criação de atalhos.
- `Nexora-GX-Portable-1.2.4-x64.exe`: versão portátil, sem instalação.

Esta versão do Nexora GX é somente navegador e não inclui recursos de inteligência artificial.
