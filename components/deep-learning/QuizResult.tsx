"use client";

import { BookOpenCheck, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface QuizResultProps {
  score: number;
  total: number;
  onReset: () => void;
}

export const QuizResult = ({ score, total, onReset }: QuizResultProps) => {
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  const passed = percentage >= 60;

  return (
    <div className="mt-2 flex flex-col items-center gap-4 rounded-3xl border border-border/70 bg-surface/40 px-6 py-10 text-center fade-up sm:px-10">
      <div
        className={cn(
          "grid h-14 w-14 place-items-center rounded-full",
          passed ? "bg-primary/10 text-primary" : "bg-background/60 text-muted-foreground"
        )}
      >
        {passed ? (
          <Trophy className="h-6 w-6" />
        ) : (
          <BookOpenCheck className="h-6 w-6" />
        )}
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-display text-xl text-foreground">Você concluiu o quiz</h3>
        <p className="text-sm text-muted-foreground">
          {percentage}% de acerto em {total} perguntas
        </p>
      </div>

      <div className="text-display text-5xl tabular-nums text-foreground">
        {score}
        <span className="text-muted-foreground">/{total}</span>
      </div>

      <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
        {passed
          ? "Bom trabalho — você reteve o conteúdo. Revise os pontos que errou para fixar de vez."
          : "Continue estudando — releia os tópicos acima e tente novamente."}
      </p>

      <Button
        variant="outline"
        onClick={onReset}
        className="mt-1 cursor-pointer gap-1.5 rounded-full px-4"
      >
        Refazer quiz
      </Button>
    </div>
  );
};