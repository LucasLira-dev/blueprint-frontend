'use client';

import { Sparkles } from "lucide-react"
import { DeepLearningCard } from "./DeepLearningCard"
import { useAllDeepLearningByUser } from "@/hooks/useDeepLearningContent";
import { useMemo } from "react";
import { AllDeepLearning } from "@/types";
import { AllDeepLearningSkeleton } from "./AllDeepLearningSkeleton";
import { AllDeepLearningError } from "./AllDeepLearningError";
import { AllDeepLearningEmpty } from "./AllDeepLearningEmpty";

interface AllDeepLearningProps {
    userId: string | undefined;
}

export const AllDeepLearningComponent = ({ userId }: AllDeepLearningProps) => {

    const { data: deepLearningsData, isLoading, isError, refetch } = useAllDeepLearningByUser(userId!);

    const deepLearnings = useMemo<AllDeepLearning[]>(() => deepLearningsData ?? [], [deepLearningsData]);

    if (isLoading) return <AllDeepLearningSkeleton />;
    if (isError) return <AllDeepLearningError onRetry={refetch} />;
    if (deepLearnings.length === 0) return <AllDeepLearningEmpty />;
    

    return (
        <article className="flex flex-col gap-4 w-full max-w-5xl p-4 mt-8">
            <div className="flex items-center gap-2">
                <h1 className="text-3xl font-semibold">Aprendizados profundos</h1>
                <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">
                {deepLearnings?.length || 0} aprendizado{deepLearnings?.length !== 1 ? 's' : ''} salvos.
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {deepLearnings.map((deepLearning) => (
                    <DeepLearningCard
                        key={deepLearning.id}
                        title={deepLearning.title}
                        thumbnail={deepLearning.thumbnail ?? "/default-thumbnail.jpg"}
                        planId={deepLearning.id}
                    />
                ))}
            </div>
        </article>
    )
}