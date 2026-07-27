# TODO - Implementação do Chat (Frontend ↔ Backend)

## Contexto

O backend (NestJS em `localhost:3001`) expõe um endpoint SSE para gerar planos de estudos:

```
GET /study-plans/generate?topic=<texto>
```

- Requer autenticação (cookie de sessão via better-auth)
- Retorna **Server-Sent Events (SSE)** com o plano sendo gerado token a token
- Evento final `done` contém `studyPlanId` e `syllabus`

---

## Passo 1 — Criar o client HTTP base

Crie `lib/api-client.ts` para centralizar requests autenticados.

```ts
const API_BASE = process.env.NEXT_PUBLIC_BETTER_AUTH_URL ?? "http://localhost:3001";

export async function apiFetch(path: string, init?: RequestInit) {
  return fetch(`${API_BASE}${path}`, {
    ...init,
    credentials: "include",   // envia cookies de sessão cross-origin
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });
}
```

> Por que `credentials: "include"`?  
> Frontend roda em `localhost:3000`, backend em `localhost:3001` — domínios diferentes.  
> Sem isso, o cookie de sessão não é enviado.

---

## Passo 2 — Criar o `chatService`

Crie `services/chatService.ts` seguindo sua arquitetura de service.

```ts
import { apiFetch } from "@/lib/api-client";

export interface PlanEvent {
  type: "token" | "done" | "error";
  content?: string;
  studyPlanId?: string;
  syllabus?: unknown;
}

export async function* streamGeneratePlan(topic: string): AsyncGenerator<PlanEvent> {
  const res = await apiFetch(`/study-plans/generate?topic=${encodeURIComponent(topic)}`);

  if (!res.ok) {
    throw new Error(`Erro ao gerar plano: ${res.status}`);
  }

  const reader = res.body!.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      if (line.startsWith("data: ")) {
        const data = line.slice(6);
        if (data === "[DONE]") return;

        try {
          const parsed = JSON.parse(data);
          yield parsed as PlanEvent;
        } catch {
          // ignora linhas que não são JSON válido
        }
      }
    }
  }
}
```

### Por que `AsyncGenerator` (`function*`)?

O endpoint é SSE — os dados chegam **um pedaço de cada vez**.  
Um `AsyncGenerator` permite que o componente consuma os eventos com `for await...of`,  
o que encaixa perfeitamente com React state updates durante o streaming.

---

## Passo 3 — Criar o hook `useChat`

Crie `hooks/useChat.ts` para gerenciar o estado da conversa e o streaming.

```ts
"use client";

import { useState, useCallback } from "react";
import { streamGeneratePlan, type PlanEvent } from "@/services/chatService";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  planId?: string;
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);

  const sendMessage = useCallback(async (content: string) => {
    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsStreaming(true);

    const assistantMsg: Message = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: "",
    };

    try {
      for await (const event of streamGeneratePlan(content)) {
        if (event.type === "token" && event.content) {
          assistantMsg.content += event.content;
          // imuta o array para o React detectar a mudança
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMsg.id ? { ...assistantMsg } : m
            )
          );
        }

        if (event.type === "done") {
          assistantMsg.planId = event.studyPlanId;
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMsg.id ? { ...assistantMsg } : m
            )
          );
        }
      }
    } catch (err) {
      assistantMsg.content += "\n\n[Erro ao gerar plano]";
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMsg.id ? { ...assistantMsg } : m
        )
      );
    } finally {
      setIsStreaming(false);
    }
  }, []);

  return { messages, isStreaming, sendMessage };
}
```

---

## Passo 4 — Integrar no `ChatView`

Atualize `components/chat/ChatView.tsx` para usar o hook e exibir as mensagens.

Pontos-chave:
- `ChatInput` chama `sendMessage` ao submeter
- Mensagens do assistant com `content` vazio mostram um indicador de loading
- Mensagens longas fazem scroll automático para baixo
- O textarea fica desabilitado enquanto `isStreaming === true`

---

## Passo 5 — Renderizar o streaming no assistant

Enquanto o backend envia tokens, o `assistantMsg.content` vai crescendo.  
Para dar feedback visual, use:

```tsx
{msg.role === "assistant" && !msg.content && isStreaming && (
  <div className="flex gap-1">
    <span className="h-2 w-2 rounded-full bg-primary animate-bounce" />
    <span className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:0.15s]" />
    <span className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:0.3s]" />
  </div>
)}
```

---

## Passo 6 — Scroll automático

Adicione um `ref` no container de mensagens e faça scroll toda vez que `messages` mudar:

```tsx
const bottomRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  bottomRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);

// no JSX:
<div ref={bottomRef} />
```

---

## Estrutura final de arquivos

```
lib/
  api-client.ts          # fetch base com credentials

services/
  chatService.ts         # streamGeneratePlan (AsyncGenerator)

hooks/
  useChat.ts             # state + lógica de streaming

components/chat/
  ChatView.tsx           # compõe tudo, usa useChat
  ChatInput.tsx          # textarea + botão enviar
  ChatHeader.tsx         # badge
  ChatSuggestions.tsx    # chips de sugestão
  MessageBubble.tsx      # bolha de mensagem (user/assistant)
  StreamingDots.tsx      # indicador de loading
```

---

## Checklist

- [ ] Criar `lib/api-client.ts`
- [ ] Criar `services/chatService.ts`
- [ ] Criar `hooks/useChat.ts`
- [ ] Criar `components/chat/MessageBubble.tsx`
- [ ] Criar `components/chat/StreamingDots.tsx`
- [ ] Atualizar `ChatView.tsx` para usar `useChat`
- [ ] Atualizar `ChatInput.tsx` para receber `onSubmit` + `disabled`
- [ ] Testar streaming com o backend rodando
- [ ] Tratar erros de conexão / sessão expirada
- [ ] Adicionar scroll automático
