# Nexora GX — Versão para PC

## Baixar o instalador pronto

1. Abra a aba **Actions** do repositório no GitHub.
2. Entre na execução mais recente de **Build Nexora GX for Windows** que terminou com sucesso.
3. Na seção **Artifacts**, baixe **Nexora-GX-Windows-...**.
4. Extraia o ZIP baixado.
5. Execute `Nexora-GX-1.2.4-x64-nsis.exe` para instalar ou o executável `portable` para abrir sem instalação.

O GitHub Actions gera os executáveis Windows automaticamente em pushes para `main` e `feature/gemini-integration`, em pull requests para `main` e também quando a execução é iniciada manualmente. O resultado fica disponível como artefato por 14 dias.

## Gerar localmente no Windows

Requisitos: Windows 10 ou superior, Node.js 22 e npm.

Dentro da pasta do projeto:

```powershell
npm install
npm run build:win
```

Os arquivos `.exe` serão gerados na pasta `dist/`:
- Instalador NSIS: permite escolher a pasta de instalação e cria atalhos.
- Versão portable: executável sem instalador.

## Nexora AI

A integração com Gemini está no aplicativo. Cada usuário deve adicionar sua própria chave em **Nexora AI → Configurar IA**. A chave fica armazenada localmente com a proteção do Electron SafeStorage; não coloque chaves no GitHub nem compartilhe-as.
