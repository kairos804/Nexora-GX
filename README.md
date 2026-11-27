# Nexora GX

Um navegador poderoso e anônimo.

**Versão 1.2.4**

## Inclui
- Pesquisa integrada e relógio em tempo real
- Nexora AI integrada ao Gemini
- Seleção entre Gemini 2.5 Flash e Gemini 2.5 Pro
- Configuração da chave dentro do próprio navegador
- Armazenamento local criptografado da chave usando Electron SafeStorage
- Aplicativo desktop com Electron e build para Windows

## Conectar a Nexora AI

1. Crie uma chave pessoal no Google AI Studio.
2. Abra o Nexora GX.
3. Clique em **Configurar IA**.
4. Cole a chave no campo e escolha **Salvar chave com segurança**.
5. Depois disso, basta abrir a Nexora AI e conversar. A configuração fica salva neste computador.

A chave é criptografada com o armazenamento seguro do sistema operacional e fica na pasta de dados local do aplicativo. Ela não é incluída no HTML, no preload, no repositório nem no instalador. Cada pessoa deve usar sua própria chave; o uso da API pode estar sujeito aos limites e preços definidos pelo Google.

Nunca compartilhe sua chave. Se ela for exposta, revogue-a e gere outra.

## Rodar no PC

Instale uma versão LTS do Node.js e execute:

```bash
npm install
npm start
```

## Gerar instalador Windows

```bash
npm run build:win
```

O instalador será gerado em `dist/`.
