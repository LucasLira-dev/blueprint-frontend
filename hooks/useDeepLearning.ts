import { useCallback, useRef, useState } from "react";
import { streamDeepLearning, type DeepLearningEvent } from "@/services/deepLearningService";

export const DEEP_LEARNING_STEPS = [
    { step: "extractTopics", title: "Extracao dos topicos" },
    { step: "researchTopics", title: "Pesquisa aprofundada" },
    { step: "generateContent", title: "Geracao do conteudo" },
    { step: "evaluation", title: "Avaliacao e refino" },
    { step: "generateQuiz", title: "Geracao do quiz" },
] as const;

export function useDeepLearning() {
    const [events, setEvents] = useState<DeepLearningEvent[]>([]);
    const [isStreaming, setIsStreaming] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<{ deepLearningContentId: string; studyPlanId: string } | null>(null);
    const abortRef = useRef<AbortController | null>(null);

    const reset = useCallback(() => {
        abortRef.current?.abort();
        abortRef.current = null;
        setEvents([]);
        setError(null);
        setResult(null);
        setIsStreaming(false);
    }, []);

    const generate = useCallback(async (planId: string, model?: string) => {
        abortRef.current?.abort();
        const controller = new AbortController();
        abortRef.current = controller;

        setEvents([]);
        setError(null);
        setResult(null);
        setIsStreaming(true);

        try {
            for await (const event of streamDeepLearning(planId, model)) {
                if (controller.signal.aborted) break;

                if (event.status === "error") {
                    setError(event.label);
                    continue;
                }

                if (event.step === "done") {
                    setResult({
                        deepLearningContentId: event.deepLearningContentId ?? "",
                        studyPlanId: event.studyPlanId ?? "",
                    });
                    continue;
                }

                setEvents((prev) => {
                    const exists = prev.find((e) => e.step === event.step);
                    return exists ? prev.map((e) => (e.step === event.step ? event : e)) : [...prev, event];
                });
            }
        } catch (err) {
            if (!controller.signal.aborted) {
                setError((err as Error).message);
            }
        } finally {
            if (!controller.signal.aborted) {
                setIsStreaming(false);
            }
        }
    }, []);

    return { events, isStreaming, error, result, generate, reset };
}
