import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteDeepLearningContent, getAllDeepLearningByUser, getDeepLearningContent } from "@/services/deepLearningService";

export function useDeepLearningContent(studyPlanId: string) {
    return useQuery({
        queryKey: ['deep-learning-content', studyPlanId],
        queryFn: () =>
        getDeepLearningContent(studyPlanId),
        enabled: Boolean(studyPlanId),
        staleTime: 5 * 60 * 1000,
    });
}

export function useAllDeepLearningByUser(userId: string) {
    return useQuery({
        queryKey: ['all-deep-learning', userId],
        queryFn: () => getAllDeepLearningByUser(),
        enabled: Boolean(userId),
        staleTime: 5 * 60 * 1000,
    })
}

export function useDeleteDeepLearningContent(studyPlanId: string, userId: string) {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (planId: string) => deleteDeepLearningContent(planId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['deep-learning-content', studyPlanId] });
            queryClient.invalidateQueries({ queryKey: ['my-plan', userId, studyPlanId] });
            queryClient.invalidateQueries({ queryKey: ['all-deep-learning', userId] });
        },
        onError: (error) => {
            console.error('Erro ao deletar conteúdo de aprendizado profundo:', error);
        }
    });
}