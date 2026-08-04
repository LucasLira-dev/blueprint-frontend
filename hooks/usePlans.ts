import { changeFavoriteStatus, changePlanVisibility, deleteAllPlans, deletePlan, getPlanById, getPlans, getPublicPlans } from "@/services/plansService";
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

export function usePublicPlansQuery(userId: string) {
    return useQuery({
        queryKey: ['public-plans', userId],
        queryFn: () => getPublicPlans(),
    })
}

export function useMyPlansQuery(userId: string, planId: string) {
    return useQuery({
        queryKey: ['my-plans', userId, planId],
        queryFn: () => getPlanById(planId),
    })
}

export function useChangePlanVisibilityMutation(userId: string) {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ planId, visibility}: ChangeVisibilityParams) => changePlanVisibility(planId, visibility),
        onSuccess: (_, { planId }) => {
            queryClient.invalidateQueries({ queryKey: ['plans', userId] });
            queryClient.invalidateQueries({ queryKey: ['my-plans', userId, planId] });
        },
        onError: (error) => {
            console.error('Erro ao alterar visibilidade do plano:', error);
        }
    })
}

export function useChangePlanFavoriteMutation(userId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ planId, favorite }: { planId: string, favorite: boolean }) => changeFavoriteStatus(planId, favorite),
        onSuccess: (_, { planId }) => {
            queryClient.invalidateQueries({ queryKey: ['plans', userId] });
            queryClient.invalidateQueries({ queryKey: ['my-plans', userId, planId] });
            queryClient.invalidateQueries({ queryKey: ['public-plans', userId] });
        },
        onError: (error) => {
            console.error('Erro ao alterar status de favorito do plano:', error);
        }
    })
}

export function useDeletePlanMutation(userId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (planId: string) => deletePlan(planId),
        onSuccess: (_, planId: string) => {
            queryClient.invalidateQueries({ queryKey: ['plans', userId] });
            queryClient.invalidateQueries({ queryKey: ['my-plans', userId, planId] });
            queryClient.invalidateQueries({ queryKey: ['public-plans', userId] });
        },
        onError: (error) => {
            console.error('Erro ao deletar o plano:', error);
        }
    })
}

export function useDeleteAllPlansMutation(userId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => deleteAllPlans(), 
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['plans', userId] });
            queryClient.invalidateQueries({ queryKey: ['my-plans', userId] });
            queryClient.invalidateQueries({ queryKey: ['public-plans', userId] });
        },
        onError: (error) => {
            console.error('Erro ao deletar todos os planos:', error);
        }
    })
}