"use client";

import { Check, Lightbulb, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { QuizQuestion } from "@/types";

interface QuizCardProps {
  question: QuizQuestion;
  position: number;
  total: number;
  selectedAnswer?: string;
  isAnswered: boolean;
  onSelect: (questionId: string, answer: string) => void;
}

export const QuizCard = ({
  question,
  position,
  total,
  selectedAnswer,
  isAnswered,
  onSelect,
}: QuizCardProps) => {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border/70 bg-surface/40 p-4 transition-colors sm:p-5",
        isAnswered && "border-primary/40"
      )}
    >
      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground tabular-nums">
          Pergunta {position} de {total}
        </span>
        <p className="text-sm font-medium leading-snug text-foreground sm:text-[15px]">
          {question.question}
        </p>
      </div>

      <div className="mt-3 flex flex-col gap-2">
        {question.options.map((option) => {
          const isSelected = selectedAnswer === option;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onSelect(question.id, option)}
              className={cn(
                "group flex w-full items-center gap-3 rounded-xl border px-3.5 py-2.5 text-left text-sm transition-all cursor-pointer",
                isSelected
                  ? question.correctAnswer === option ? "border-primary/60 bg-primary/20 text-foreground" : "border-destructive/60 bg-destructive/20 text-foreground"
                  : "border-border/70 bg-background/60 text-muted-foreground hover:border-primary/40 hover:bg-surface/60 hover:text-foreground"
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "grid h-4 w-4 shrink-0 place-items-center rounded-full border",
                  isSelected
                    ? question.correctAnswer === option ? "border-primary/60 bg-primary/20" : "border-destructive/60 bg-destructive/20"
                    : "border-border group-hover:border-primary/50"
                )}
              >
                {isSelected && question.correctAnswer === option && <Check className="h-3 w-3 text-primary" />}
                {isSelected && question.correctAnswer !== option && <X className="h-3 w-3 text-destructive" />}
              </span>
              <span className="min-w-0 flex-1">{option}</span>
            </button>
          );
        })}
      </div>

      {isAnswered && question.explanation && (
        <div className="mt-3 flex items-start gap-2.5 rounded-xl border border-border/70 bg-background/60 p-3.5">
          <Lightbulb aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <p className="text-sm leading-relaxed text-muted-foreground">
            {question.explanation}
          </p>
        </div>
      )}
    </div>
  );
};