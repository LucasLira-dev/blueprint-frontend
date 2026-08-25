import { apiFetch } from "@/lib/api-client";
import { ConversationThread, ThreadHistoryResponse } from "@/types";

export class ConversationApiError extends Error {
    constructor(public readonly status: number, message: string) {
        super(message);
        this.name = "ConversationApiError";
    }
}

export const getMyThreads = async (): Promise<ConversationThread[]> => {
    try {
        const response = await apiFetch("/conversations/my-threads");

        if (!response.ok) {
            throw new Error(`Erro ao buscar conversas: ${response.status}`);
        }

        return response.json();

    }
    catch (error) {
        throw new Error(`Erro ao buscar conversas: ${error}`);
    }
}

export const getThreadHistory = async (threadId: string): Promise<ThreadHistoryResponse> => {
    try {
        const response = await apiFetch(`/conversations/${threadId}`);

        if (!response.ok) {
            throw new ConversationApiError(
                response.status,
                `Erro ao buscar a conversa: ${response.status}`,
            );
        }

        return response.json();
    }
    catch (error) {
        if (error instanceof ConversationApiError) {
            throw error;
        }

        throw new ConversationApiError(0, "Erro ao buscar a conversa");
    }
}
