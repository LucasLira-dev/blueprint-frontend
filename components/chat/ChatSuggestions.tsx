"use client";

import { ArrowRight } from "lucide-react";

const SUGGESTIONS = [
  "Aprender Rust do zero",
  "Next.js para iniciantes",
  "Preparação para AWS Cloud Practitioner",
] as const;

interface ChatSuggestionsProps {
  onSelect?: (suggestion: string) => void;
}

export function ChatSuggestions({ onSelect }: ChatSuggestionsProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 px-1">
      {SUGGESTIONS.map((text) => (
        <button
          key={text}
          type="button"
          onClick={() => onSelect?.(text)}
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-elevated px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground sm:px-4 sm:py-2 sm:text-sm"
        >
          {text}
          <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
        </button>
      ))}
    </div>
  );
}
