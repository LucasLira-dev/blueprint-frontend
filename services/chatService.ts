import { apiFetch } from "@/lib/api-client";

export interface PlanEvent {
    step: string;
    status: "start" | "done" | "error";
    label: string;
    studyPlanId?: string;
    syllabus?: string;
}

export async function* streamGeneratePlan(topic: string): AsyncGenerator<PlanEvent> {
    const response = await apiFetch(`/study-plans/generate?topic=${encodeURIComponent(topic)}`);

    if (!response.ok) {
        throw new Error(`Erro ao gerar plano: ${response.status}`);
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder()
    let buffer = "";

    while (true) {
        const { done, value } = await reader!.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
            if (line.startsWith("data: ")) {
                const data = line.slice(6);
                if (data === "[DONE]") return;

                try {
                    const parsed = JSON.parse(data);
                    yield parsed as PlanEvent;
                } catch (error) {
                    console.error("Error parsing JSON:", error);
                }
            }
        }
    }
}