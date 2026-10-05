import Link from "next/link";
import { ArrowLeft, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DeepLearningNotFoundProps {
  planId: string;
}

export const DeepLearningNotFound = ({ planId }: DeepLearningNotFoundProps) => {
  return (
    <div className="mx-auto flex w-full max-w-170 flex-col items-center gap-4 px-4 py-16 text-center sm:px-6">
      <div className="grid h-12 w-12 place-items-center rounded-full bg-surface text-primary">
        <Brain className="h-5 w-5" />
      </div>
      <div className="flex flex-col gap-1.5">
        <h1 className="text-display text-2xl text-foreground">
          Este plano ainda não tem aprendizado profundo
        </h1>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          Volte ao plano e gere o módulo aprofundado — a leitura dos tópicos e o
          quiz de fixação ficam disponíveis assim que a geração terminar.
        </p>
      </div>
      <Button
        variant="ghost"
        render={<Link href={`/plans/${planId}`} />}
        className="cursor-pointer gap-1.5 rounded-full"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar ao plano
      </Button>
    </div>
  );
};
