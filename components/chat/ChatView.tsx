"use client";

import { ChatHeader } from "./ChatHeader";
import { ChatSuggestions } from "./ChatSuggestions";
import { ChatInput } from "./ChatInput";
import { useChat } from "@/hooks/useChat";

export function ChatView() {

  const { messages, sendMessage, isStreaming } = useChat();

  const handleSubmit = (content: string) => {
    if (content.trim() === "") return;

    sendMessage(content);
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-10 sm:px-6 sm:py-16">
      
      {
        messages.length === 0 ? (
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
        ): (
          <div className="flex w-full max-w-2xl flex-col gap-4 sm:gap-6">
            {messages.map((message) => (
              <div key={message.id} className={`flex flex-col gap-2 ${message.role === "user" ? "items-end" : "items-start"}`}>
                <div className={`rounded-lg p-4 ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
                  {message.content}
                </div>
                {message.steps.length > 0 && (
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    {message.steps.map((step) => (
                      <li key={step.step}>
                        <span className="font-medium">{step.label}</span> - {step.status}
                      </li>
                    ))}
                  </ul>
                )}
                {message.error && (
                  <div className="mt-2 text-sm text-red-500">
                    Erro: {message.error}
                  </div>
                )}
              </div>
            ))}
          </div>
        )
      }

      <div className="mt-auto flex w-full max-w-2xl flex-col items-center gap-4 pt-6 sm:gap-6 sm:pt-8">
        {
          !isStreaming && messages.length === 0 && (
            <ChatSuggestions onSelect={handleSubmit} />
          )
        }
        <ChatInput onSubmit={handleSubmit} disabled={isStreaming} />
      </div>
    </div>
  );
}
