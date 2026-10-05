"use client";

import { useEffect, useRef, useState } from "react";
import type { QuizQuestion } from "@/types";
import { QuizCard } from "./QuizCard";
import { QuizResult } from "./QuizResult";

interface QuizSectionProps {
  questions: QuizQuestion[];
}

export const QuizSection = ({ questions }: QuizSectionProps) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const resultRef = useRef<HTMLDivElement | null>(null);

  const sorted = [...(questions ?? [])].sort((a, b) => a.order - b.order);
  const total = sorted.length;
  const answeredCount = sorted.filter(
    (question) => answers[question.id] !== undefined
  ).length;
  const isComplete = total > 0 && answeredCount === total;
  const score = sorted.filter(
    (question) => answers[question.id] === question.correctAnswer
  ).length;
  const progress = total > 0 ? (answeredCount / total) * 100 : 0;

  useEffect(() => {
    if (isComplete) {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [isComplete]);

  if (total === 0) return null;

  const handleSelect = (questionId: string, answer: string) => {
    setAnswers((previous) => ({ ...previous, [questionId]: answer }));
  };

  const handleReset = () => {
    setAnswers({});

    const section = sectionRef.current;
    const container = section?.closest<HTMLElement>("main");

    if (!section || !container) {
      section?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    const stickyOffset = (headerRef.current?.offsetHeight ?? 0) + 8;
    const top =
      container.scrollTop +
      section.getBoundingClientRect().top -
      container.getBoundingClientRect().top -
      stickyOffset;

    container.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} id="quiz" className="flex scroll-mt-8 flex-col gap-6">
      <div
        ref={headerRef}
        className="sticky top-0 z-20 -mx-4 flex flex-col gap-3 border-b border-border/70 bg-background/90 px-4 py-4 backdrop-blur-md sm:-mx-6 sm:px-6"
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <h2 className="text-display text-2xl text-foreground sm:text-3xl">
              Quiz de fixação
            </h2>
            <p className="text-sm text-muted-foreground">
              {total} perguntas sobre os tópicos estudados
            </p>
          </div>

          <div className="flex shrink-0 flex-col items-end rounded-2xl border border-border/70 bg-surface/40 px-4 py-2.5">
            <span className="text-lg font-semibold tabular-nums text-foreground">
              {answeredCount}/{total}
            </span>
            <span className="text-xs text-muted-foreground">
              {answeredCount === 1 ? "1 respondida" : `${answeredCount} respondidas`}
            </span>
          </div>
        </div>

        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={answeredCount}
          aria-label="Progresso do quiz"
          className="h-1.5 w-full overflow-hidden rounded-full bg-muted"
        >
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <ol className="flex flex-col gap-4">
        {sorted.map((question, index) => (
          <li key={question.id}>
            <QuizCard
              question={question}
              position={index + 1}
              total={total}
              selectedAnswer={answers[question.id]}
              isAnswered={answers[question.id] !== undefined}
              onSelect={handleSelect}
            />
          </li>
        ))}
      </ol>

      <div ref={resultRef} className="scroll-mt-8">
        {isComplete && (
          <QuizResult score={score} total={total} onReset={handleReset} />
        )}
      </div>
    </section>
  );
};