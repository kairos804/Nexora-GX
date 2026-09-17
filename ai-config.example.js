// Nexora GX — configuração de provedores de IA
// NUNCA coloque suas chaves reais neste arquivo ou no GitHub.
// Use variáveis de ambiente no processo/backend.

export const AI_PROVIDERS = {
  openai: {
    name: "OpenAI",
    env: "OPENAI_API_KEY",
    baseURL: "https://api.openai.com/v1"
  },
  anthropic: {
    name: "Anthropic / Claude",
    env: "ANTHROPIC_API_KEY",
    baseURL: "https://api.anthropic.com"
  },
  gemini: {
    name: "Google Gemini",
    env: "GEMINI_API_KEY",
    baseURL: "https://generativelanguage.googleapis.com"
  },
  grok: {
    name: "xAI / Grok",
    env: "XAI_API_KEY",
    baseURL: "https://api.x.ai/v1"
  }
};

// O usuário poderá selecionar o provedor/modelo na área de IA do Nexora GX.
export const DEFAULT_AI_PROVIDER = "openai";
