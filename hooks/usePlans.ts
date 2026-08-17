import { adminDeletePlan, getPlanDetailsAdmin } from "@/services/adminService";
import { changeFavoriteStatus, changePlanVisibility, deleteAllFavoritePlans, deleteAllPlans, deleteFavoritePlan, deletePlan, getMyFavoritePlans, getPlanById, getPlans, getPublicPlans } from "@/services/plansService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type ChangeVisibilityParams = {
    planId: string;
    visibility: 'PUBLIC' | 'PRIVATE';
};

export function usePlansQuery(userId?: string) {
    return useQuery({
        queryKey: ['plans', userId],
        queryFn: () => getPlans(userId),
    })
}

export function usePublicPlansQuery(userId: string) {
    return useQuery({
        queryKey: ['public-plans', userId],
        queryFn: () => getPublicPlans(),
    })
}

export function useMyFavoritePlansQuery(userId: string) {
    return useQuery({
        queryKey: ['my-favorite-plans', userId],
        queryFn: () => getMyFavoritePlans(),
    })
}

export function useMyPlansQuery(userId: string, planId: string, isAdmin: boolean) {
    return useQuery({
        queryKey: ['my-plans', userId, planId, isAdmin],
        queryFn: () => {
            if (isAdmin) {
                return getPlanDetailsAdmin(planId);
            } else {
                return getPlanById(planId);
            }
        }
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
            queryClient.invalidateQueries({ queryKey: ['my-favorite-plans', userId] });
        },
        onError: (error) => {
            console.error('Erro ao alterar status de favorito do plano:', error);
        }
    })
}

export function useDeleteFavoritePlanMutation(userId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (planId: string) => deleteFavoritePlan(planId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['public-plans', userId] });
            queryClient.invalidateQueries({ queryKey: ['my-favorite-plans', userId] });
        },
        onError: (error) => {
            console.error('Erro ao deletar o plano favorito:', error);
        }
    })
}

export function useDeleteAllFavoritePlansMutation(userId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => deleteAllFavoritePlans(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['public-plans', userId] });
            queryClient.invalidateQueries({ queryKey: ['my-favorite-plans', userId] });
        },
        onError: (error) => {
            console.error('Erro ao deletar todos os planos favoritos:', error);
        }
    })
}

export function useDeletePlanMutation(userId: string, isAdmin: boolean) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (planId: string) => isAdmin ? adminDeletePlan(planId) : deletePlan(planId),
        onSuccess: (_, planId: string) => {
            queryClient.invalidateQueries({ queryKey: ['plans', userId] });
            queryClient.invalidateQueries({ queryKey: ['my-plans', userId, planId] });
            queryClient.invalidateQueries({ queryKey: ['public-plans', userId] });
            queryClient.invalidateQueries({ queryKey: ['my-favorite-plans', userId] });
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
            queryClient.invalidateQueries({ queryKey: ['my-favorite-plans', userId] });
        },
        onError: (error) => {
            console.error('Erro ao deletar todos os planos:', error);
        }
    })
}