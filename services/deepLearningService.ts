import { apiFetch } from "@/lib/api-client";
import type { DeepLearningContent } from "@/types";

export interface DeepLearningEvent {
    step: string;
    status: "start" | "done" | "error" | "streaming";
    label: string;
    deepLearningContentId?: string;
    studyPlanId?: string;
}

export async function getDeepLearningContent(studyPlanId: string): Promise<DeepLearningContent> {
    try {
        const response = await apiFetch(`/deep-learning/${studyPlanId}/content`);

        if (!response.ok) {
            throw new Error(`Erro ao buscar conteúdo de aprendizado profundo: ${response.status}`);
        }

        const data: DeepLearningContent = await response.json();

        console.log("Fetched deep learning content:", data);

        return data;
    }
    catch (error) {
        console.error("Error fetching deep learning content:", error);
        throw new Error("Erro ao buscar conteúdo de aprendizado profundo.");
    }
}

export async function* streamDeepLearning(planId: string, model?: string): AsyncGenerator<DeepLearningEvent> {
    const query = new URLSearchParams();
    if (model) {
        query.set("model", model);
    }
    const suffix = query.toString() ? `?${query.toString()}` : "";

    const response = await apiFetch(`/deep-learning/${planId}/generate${suffix}`);

    if (!response.ok) {
        if (response.status === 429) {
            throw new Error("Você atingiu o limite de 5 gerações por hora. Tente novamente mais tarde.");
        }
        throw new Error(`Erro ao gerar aprendizado profundo: ${response.status}`);
    }

    if (!response.body) {
        throw new Error("Resposta do servidor sem corpo.");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    try {
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() ?? "";

            for (const line of lines) {
                if (!line.startsWith("data: ")) continue;

                const data = line.slice(6);
                if (data === "[DONE]") return;

                try {
                    yield JSON.parse(data) as DeepLearningEvent;
                } catch (error) {
                    console.error("Error parsing JSON:", error);
                }
            }
        }
    } finally {
        reader.cancel().catch(() => {});
    }
}

export async function deleteDeepLearningContent(studyPlanId: string) {
    try {
        const response = await apiFetch(`/deep-learning/${studyPlanId}/content`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Erro ao deletar conteúdo de aprendizado profundo: ${response.status}`);
        }

        return {
            message: 'Conteúdo de aprendizado profundo deletado com sucesso',
        }
    }
    catch (error) {
        throw new Error(`Erro ao deletar conteúdo de aprendizado profundo: ${error}`);
    }
}