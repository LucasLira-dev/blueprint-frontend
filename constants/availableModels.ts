export interface AvailableModel {
  id: string;
  label: string;
}

export const DEFAULT_MODEL_ID = "gemini-2.5-flash";

export const AVAILABLE_MODELS: AvailableModel[] = [
  { id: "gemini-2.5-flash", label: "Gemini 2.5 Flash" },
  { id: "gemini-2.5-flash-lite", label: "Gemini 2.5 Flash Lite" },
  { id: "openai/gpt-oss-120b", label: "GPT-OSS 120B (Groq)" },
  { id: "openai/gpt-oss-20b", label: "GPT-OSS 20B (Groq)" },
  { id: "qwen/qwen3.6-27b", label: "Qwen3.6 27B (Groq)" },
  { id: "qwen/qwen3.8-27b", label: "Qwen3.8 27B (Groq)" },
  { id: "minimax/minimax-m3:free", label: "MiniMax M3 (OpenRouter)" },
  { id: "nvidia/nemotron-3-ultra-550b-a55b:free", label: "Nemotron 3 Ultra 550B (OpenRouter)" },
  { id: "nvidia/nemotron-3-super-120b-a12b:free", label: "Nemotron 3 Super 120B (OpenRouter)" },
  { id: "thinkingmachines/inkling:free", label: "Inkling (OpenRouter)" },
  { id: "poolside/laguna-s-2.1:free", label: "Laguna S 2.1 (OpenRouter)" },
];