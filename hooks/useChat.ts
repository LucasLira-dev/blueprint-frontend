import { useState, useCallback } from "react";
import { streamGeneratePlan, type PlanEvent } from "@/services/chatService";
import { useQueryClient } from "@tanstack/react-query";

export interface Message {
    id: string;
    role: "user" | "assistant";
    content: string | undefined;
    steps: PlanEvent[];
    planId?: string;
    error?: string;
}

export function useChat(initialMessages: Message[] = [], userId: string) {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [isStreaming, setIsStreaming] = useState(false);

    const query = useQueryClient();

    const sendMessage = useCallback(async (content: string) => {
        const userMessage: Message = { id: crypto.randomUUID(), role: "user", content, steps: []};
        const assistantId = crypto.randomUUID();
        setMessages((prevMessages) => [...prevMessages, userMessage, { id: assistantId, role: "assistant", content: "", steps: [] }]);
        setIsStreaming(true);

        const patch = (fn: (message: Message) => Message) => {
            setMessages((prevMessages) => prevMessages.map((msg) => (msg.id === assistantId ? fn(msg) : msg)));
        }

        try {
            for await (const event of streamGeneratePlan(content)) {
                if (event.step === "error" || event.status === "error") {
                    patch((msg: Message) => ({ ...msg, error: event.label }));
                    continue;
                }

                if (event.step === "syllabusChunk") {
                    patch((msg: Message) => ({ ...msg, content: (msg.content ?? "") + event.label }));
                    continue;
                }

                if (event.step === "done") {
                    patch((msg: Message) => ({ ...msg, content: event.syllabus, planId: event.studyPlanId, steps: []}));
                    continue;
                }

                patch((msg: Message) => {
                    const exists = msg.steps.find((s) => s.step === event.step);
                    const steps = exists ? msg.steps.map((s) => (s.step === event.step ? event : s)) : [...msg.steps, event];
                    return { ...msg, steps };
                });
            }
        }
        catch (error) {
            patch((msg: Message) => ({ ...msg, error: (error as Error).message }));
            console.error("Error during streaming:", error);
        }
        finally {
            setIsStreaming(false);
            query.invalidateQueries({ queryKey: ['my-threads', userId] });
        }
    }, [query, userId]);

    return { messages, sendMessage, isStreaming };
}
