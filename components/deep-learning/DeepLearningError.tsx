"use client";

import Link from "next/link";
import { ArrowLeft, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DeepLearningErrorProps {
  onRetry?: () => void;
  planId: string;
}

export const DeepLearningError = ({ onRetry, planId }: DeepLearningErrorProps) => {
  return (
    <div className="mx-auto flex w-full max-w-170 flex-col items-center gap-4 px-4 py-16 text-center sm:px-6">
      <div className="grid h-12 w-12 place-items-center rounded-full bg-destructive/10 text-destructive">
        <TriangleAlert className="h-5 w-5" />
      </div>
      <div className="flex flex-col gap-1.5">
        <h1 className="text-display text-2xl text-foreground">
          Não foi possível carregar o aprendizado
        </h1>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          Algo interrompeu o carregamento deste módulo. Tente novamente em instantes
          — se o problema continuar, regere o aprendizado profundo no plano.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {onRetry && (
          <Button
            onClick={onRetry}
            className="btn-primary cursor-pointer gap-1.5 rounded-full px-4"
          >
            Tentar novamente
          </Button>
        )}
        <Button
          variant="ghost"
          render={<Link href={`/plans/${planId}`} />}
          className="cursor-pointer gap-1.5 rounded-full"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar ao plano
        </Button>
      </div>
    </div>
  );
};
