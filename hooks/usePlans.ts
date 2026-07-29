import { changePlanVisibility, getPlans } from "@/services/plansService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type ChangeVisibilityParams = {
    planId: string;
    visibility: 'PUBLIC' | 'PRIVATE';
};

export function usePlansQuery(userId: string) {
    return useQuery({
        queryKey: ['plans', userId],
        queryFn: () => getPlans(),
    })
}

export function useChangePlanVisibilityMutation(userId: string) {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ planId, visibility}: ChangeVisibilityParams) => changePlanVisibility(planId, visibility),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['plans', userId] });
        },
        onError: (error) => {
            console.error('Erro ao alterar visibilidade do plano:', error);
        }
    })
}