"use client";

import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useDeepLearningContent, useDeleteDeepLearningContent } from "@/hooks/useDeepLearningContent";
import type { DeepLearningContent } from "@/types";
import { Badge } from "@/components/ui/badge";
import { TopicAccordion } from "./TopicAccordion";
import { QuizSection } from "./QuizSection";
import { DeepLearningSkeleton } from "./DeepLearningSkeleton";
import { DeepLearningError } from "./DeepLearningError";
import { DeepLearningNotFound } from "./DeepLearningNotFound";
import { DeleteDeepLearningContentDialog } from "./DeleteDeepLearningContentDialog";
import { useRouter } from "next/navigation";

const DEEP_LEARNING_OBJECTIVES = [
  "Compreender os conceitos fundamentais do plano de estudo.",
  "Aplicar o conhecimento adquirido em situações práticas.",
  "Desenvolver habilidades críticas e analíticas relacionadas ao conteúdo.",
  "Preparar-se para avaliações e quizzes de fixação.",
];

interface DeepLearningModuleProps {
  planId: string;
}

const ModuleHeader = ({
  content,
  planId,
  isDeleting,
  onDelete,
}: {
  content: DeepLearningContent;
  planId: string;
  isDeleting: boolean;
  onDelete: () => Promise<unknown>;
}) => (
  <header className="flex flex-col gap-6">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <Link
        href={`/plans/${planId}`}
        className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
        Voltar ao plano
      </Link>
      <div className="flex items-center gap-1.5">
        <Badge variant="outline">
          <Sparkles />
          Gerado por IA
        </Badge>
        <DeleteDeepLearningContentDialog
          contentTitle={content.title}
          isDeleting={isDeleting}
          onDelete={onDelete}
        />
      </div>
    </div>

    <div className="flex flex-col gap-3">
      <h1 className="text-display text-3xl text-foreground sm:text-4xl">
        {content.title}
      </h1>
      <p className="text-base leading-relaxed text-muted-foreground">
        {content.summary}
      </p>
    </div>
  </header>
);

const ObjectivesPanel = ({ objectives }: { objectives: string[] }) => (
  <section className="rounded-2xl border border-border/70 bg-surface/40 p-5 sm:p-6">
    <h2 className="text-sm font-semibold text-foreground">
      O que você vai aprender
    </h2>
    <ul className="mt-4 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
      {objectives.map((objective) => (
        <li
          key={objective}
          className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground"
        >
          <span
            aria-hidden
            className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
          />
          {objective}
        </li>
      ))}
    </ul>
  </section>
);

export const DeepLearningModule = ({ planId }: DeepLearningModuleProps) => {
  const { data, isLoading, isError, refetch } = useDeepLearningContent(planId);
  const { mutateAsync: deleteContent, isPending: isDeletingContent } =
    useDeleteDeepLearningContent(planId);

  const router = useRouter();

  const handleDeleteContent = async () => {
    try {
      await deleteContent(planId);
      toast.success("Conteúdo de aprendizado profundo deletado com sucesso.");
      router.push(`/plans/${planId}`);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao deletar o conteúdo. Tente novamente.");
      throw error;
    }
  };

  if (isLoading) return <DeepLearningSkeleton />;
  if (isError) return <DeepLearningError onRetry={() => refetch()} planId={planId} />;
  if (!data) return <DeepLearningNotFound planId={planId} />;

  return (
    <article className="mx-auto flex w-full md:max-w-3xl lg:max-w-4xl flex-col gap-8 px-4 py-8 sm:gap-10 sm:px-6 sm:py-10">
      <ModuleHeader
        content={data}
        planId={planId}
        isDeleting={isDeletingContent}
        onDelete={handleDeleteContent}
      />
      <ObjectivesPanel objectives={DEEP_LEARNING_OBJECTIVES} />

      <div className="h-px w-full bg-border" />

      <section className="flex flex-col gap-4">
        <h2 className="text-display text-2xl text-foreground">Tópicos</h2>
        <TopicAccordion topics={data.topics} />
      </section>

      <div className="h-px w-full bg-border" />

      <QuizSection questions={data.questions} />
    </article>
  );
};