"use client";

import { useRef, useEffect, useMemo } from "react";
import { ChatHeader } from "./ChatHeader";
import { ChatSuggestions } from "./ChatSuggestions";
import { ChatInput } from "./ChatInput";
import { useChat, type Message } from "@/hooks/useChat";
import { useThreadHistoryQuery } from "@/hooks/useConversations";
import { ConversationApiError } from "@/services/conversationsService";
import { Markdown } from "./Markdown";
import { ChatSkeleton } from "./ChatSkeleton";
import { ChatError } from "./ChatError";
import { AudioSummary } from "./AudioSummary";
import { toast } from "sonner";

interface ChatViewProps {
  threadId?: string;
  userId?: string;
}

export function ChatView({ threadId, userId }: ChatViewProps) {
  const {
    data: history,
    error,
    isPending,
    isError,
    refetch,
  } = useThreadHistoryQuery(threadId ?? "", Boolean(threadId));

  const historyMessages = useMemo<Message[]>(
    () =>
      history?.messages.map((message, index) => ({
        id: `${threadId}-${index}`,
        role: message.role,
        content: message.content,
        planId: message.planId,
        audioSummary: message.audioSummary,
        steps: [],
      })) ?? [],
    [history, threadId]
  );

  if (!threadId) {
    return <ChatSession initialMessages={[]} userId={userId} />;
  }

  if (isPending) {
    return <ChatSkeleton />;
  }

  if (isError || !history) {
    const isNotFound = error instanceof ConversationApiError && error.status === 404;

    return (
      <ChatError isNotFound={isNotFound} refetch={refetch} />
    )
  }

  if (history.messages.length === 0) {
    return (
      <div className="flex h-full items-center justify-center px-4">
        <div className="flex max-w-md flex-col items-center gap-2 text-center">
          <h2 className="text-lg font-medium">Nenhuma mensagem nesta conversa</h2>
          <p className="text-sm text-muted-foreground">
            Volte para a página inicial e gere um novo plano de estudos.
          </p>
        </div>
      </div>
    );
  }

  return <ChatSession key={threadId} initialMessages={historyMessages} userId={userId} />;
}

function ChatSession({ initialMessages, userId }: { initialMessages: Message[]; userId?: string }) {
  const { messages, sendMessage, isStreaming, isGeneratingPdf } = useChat(initialMessages, userId!);
  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 150;
    if (isNearBottom) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    const toastId = "pdf-generation";

    if (!isGeneratingPdf) {
      toast.dismiss(toastId);
      return;
    }

    toast.loading(
      "Seu plano foi gerado. Finalizando o PDF, aguarde antes de sair desta página.",
      { id: toastId, duration: Infinity },
    );

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };

    const handleNavigationAttempt = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;

      const link = event.target.closest("a[href]");
      if (
        !link ||
        link.hasAttribute("download") ||
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const href = link.getAttribute("href");
      if (!href) return;

      const destination = new URL(href, window.location.href);
      const isSamePage =
        destination.origin === window.location.origin &&
        destination.pathname === window.location.pathname &&
        destination.search === window.location.search &&
        destination.hash === window.location.hash;

      if (
        destination.origin !== window.location.origin ||
        isSamePage
      ) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      toast.warning(
        "Aguarde a conclusão da geração do PDF antes de sair desta página.",
      );
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("click", handleNavigationAttempt, true);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("click", handleNavigationAttempt, true);
    };
  }, [isGeneratingPdf]);

  const handleSubmit = (content: string, model?: string) => {
    if (content.trim() === "") return;

    sendMessage(content, model);
  }

  const handleSuggestionSelect = (suggestion: string) => {
    handleSubmit(suggestion);
  }

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden" ref={containerRef}>
      <div className="flex min-h-0 flex-1 justify-center overflow-y-auto overflow-x-hidden px-4 py-10 sm:px-6 sm:py-16">
        <div className="flex w-full max-w-2xl min-w-0 flex-col gap-4 sm:gap-6">
          {messages.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-6 sm:gap-8">
              <ChatHeader />

              <h1 className="text-center text-3xl font-medium tracking-tight sm:text-4xl md:text-5xl">
                O que você quer{" "}
                <span className="bg-linear-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  aprender?
                </span>
              </h1>

              <p className="max-w-md px-2 text-center text-sm text-muted-foreground">
                Descreva o tema, seu nível e quanto tempo tem. A IA monta um plano de
                estudos sob medida.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4 sm:gap-6">
              {messages.map((message) => (
                <div key={message.id} className={`flex flex-col gap-2 ${message.role === "user" ? "items-end" : "items-start"}`}>
                  {message.steps.length > 0 && (
                    <div className="mt-3 w-full flex flex-col gap-2 overflow-hidden rounded-lg border border-border/50 bg-card/50 p-3">
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Passos
                      </p>
                      <ul className="space-y-2 p-4 ml-3">
                        {message.steps.map((step, idx) => (
                          <li
                            key={step.step}
                            className="flex flex-row gap-12 text-sm fade-up"
                            style={{ animationDelay: `${idx * 50}ms` }}
                          >
                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-semibold text-primary">
                              {step.step}
                            </span>
                            <span className="text-foreground/80 wrap-break-word">{step.label}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {message.content && (
                    <div className={`rounded-lg p-4 text-sm ${message.role === "user" ? "bg-muted text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
                      {message.role === "user" ? message.content : <Markdown content={message.content} />}
                      {message.planId ? (
                        <div
                        className="mt-3 flex flex-col md:flex-row gap-2">
                          <a href={`/plans/${message.planId}`} className="inline-block text-sm font-medium text-primary underline underline-offset-4 hover:text-primary/80">
                          Acesse seu plano de estudos
                          </a>
                          <AudioSummary syllabus={message.audioSummary || ""} />
                        </div>
                      ) : 
                      <p>
                        {message.role === "assistant" && !message.content && !message.error && (
                          <span className="text-muted-foreground">Gerando conteúdo...</span>
                        )}
                      </p>
                      }
                    </div>
                  )}
                  {message.role === "assistant" && message.suggestedTopic && (
                    <button
                      type="button"
                      onClick={() => handleSubmit(message.suggestedTopic!)}
                      disabled={isStreaming}
                      className="mt-3 block text-left text-sm font-medium text-primary underline underline-offset-4 hover:text-primary/80 disabled:opacity-50"
                    >
                      Gerar plano sobre “{message.suggestedTopic}”
                    </button>
                  )}
                  {message.error && (
                    <div className="mt-2 text-sm text-red-500 w-full">
                      <p className="truncate">Erro: {message.error}</p>
                    </div>
                  )}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center bg-background px-4 py-4 sm:px-6">
        <div className="flex w-full max-w-2xl flex-col items-center gap-4">
          {!isStreaming && messages.length === 0 && (
            <ChatSuggestions onSelect={handleSuggestionSelect} />
          )}
          <ChatInput onSubmit={handleSubmit} disabled={isStreaming} />
        </div>
      </div>
    </div>
  );
}
