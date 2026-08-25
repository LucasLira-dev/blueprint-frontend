import { useQuery } from "@tanstack/react-query";
import { getMyThreads, getThreadHistory } from "@/services/conversationsService";

export function useMyThreadsQuery(userId: string) {
    return useQuery({
        queryKey: ['my-threads', userId],
        queryFn: getMyThreads,
    })
}

export function useThreadHistoryQuery(threadId: string, enabled = true) {
    return useQuery({
        queryKey: ['thread-history', threadId],
        queryFn: () => getThreadHistory(threadId),
        enabled: enabled && Boolean(threadId),
    })
}
