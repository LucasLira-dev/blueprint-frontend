"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import {
  AVAILABLE_MODELS,
  DEFAULT_MODEL_ID,
} from "@/constants/availableModels";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MODEL_STORAGE_KEY = "blueprint:selectedModel";

interface ChatInputProps {
  onSubmit?: (content: string, model?: string) => void;
  disabled?: boolean;
}

function getStoredModel(): string {
  if (typeof window === "undefined") return DEFAULT_MODEL_ID;
  const stored = window.localStorage.getItem(MODEL_STORAGE_KEY);
  return AVAILABLE_MODELS.some((available) => available.id === stored)
    ? (stored as string)
    : DEFAULT_MODEL_ID;
}

export function ChatInput({ onSubmit, disabled }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [model, setModel] = useState(getStoredModel);

  const handleSubmit = () => {
    if (!message.trim()) return;
    onSubmit?.(message, model);
    setMessage("");
  };

  const handleModelChange = (next: string | null) => {
    if (!next) return;
    setModel(next);
    window.localStorage.setItem(MODEL_STORAGE_KEY, next);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-full">
      <div className="rounded-2xl border border-border bg-surface-elevated p-3 sm:p-4 ">
        <textarea
          disabled={disabled}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ex: Quero aprender Rust..."
          rows={2}
          className="w-full h-full resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
        />

        <div className="mt-3 flex flex-col gap-2 flex-row sm:items-center sm:justify-between">
          <Select
            value={model.charAt(0).toUpperCase() + model.slice(1)}
            onValueChange={handleModelChange}
            disabled={disabled}
          >
            <SelectTrigger className="w-full p-4 cursor-pointer rounded-full sm:w-80 border border-border bg-background/20 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none">
              <SelectValue placeholder="Modelo de IA" />
            </SelectTrigger>
            <SelectContent align="start">
              {AVAILABLE_MODELS.map((available) => (
                <SelectItem key={available.id} value={available.id} className="p-2 cursor-pointer">
                  {available.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!message.trim() || disabled}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              <Send className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}