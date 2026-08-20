"use client";

import { useRef, useEffect } from "react";
import { ChatHeader } from "./ChatHeader";
import { ChatSuggestions } from "./ChatSuggestions";
import { ChatInput } from "./ChatInput";
import { useChat } from "@/hooks/useChat";
import { Markdown } from "./Markdown";

export function ChatView() {

  const { messages, sendMessage, isStreaming } = useChat();
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

  const handleSubmit = (content: string) => {
    if (content.trim() === "") return;

    sendMessage(content);
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
                      {message.planId && (
                        <a href={`/plans/${message.planId}`} className="mt-3 inline-block text-sm font-medium text-primary underline underline-offset-4 hover:text-primary/80">
                          Acesse seu plano de estudos
                        </a>
                      )}
                    </div>
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
