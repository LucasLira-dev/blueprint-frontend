import { apiFetch } from "@/lib/api-client";
import { Plan, PlanDetails, PublicPlansResponse } from "@/types";

export const getPlans = async (): Promise<Plan[]> => {
    try {
        const response = await apiFetch("/study-plans/plans");

        if (!response.ok) {
            throw new Error(`Erro ao buscar planos: ${response.status}`);
        }

        const data: Plan[] = await response.json();
        return data;
    }
    catch (error) {
        throw new Error(`Erro ao buscar planos: ${error}`);
    }
}

export const getPublicPlans = async (): Promise<PublicPlansResponse> => {
    try {
        const response = await apiFetch("/study-plans/plans/publics");

        if (!response.ok) {
            throw new Error(`Erro ao buscar planos públicos: ${response.status}`);
        }

        const data: PublicPlansResponse = await response.json();
        console.log("Data fetched from getPublicPlans:", data); // Log the fetched data for debugging
        return data;
    }
    catch (error) {
        throw new Error(`Erro ao buscar planos públicos: ${error}`);
    }
}

export const getPlanById = async (planId: string): Promise<PlanDetails> => {
    try {
        const response = await apiFetch(`/study-plans/plans/${planId}`);

        if (!response.ok) {
            throw new Error(`Erro ao buscar plano: ${response.status}`);
        }

        const data: PlanDetails = await response.json();
        return data;
    }
    catch (error) {
        throw new Error(`Erro ao buscar plano: ${error}`);
    }
}

export const changePlanVisibility = async (planId: string, visibility: 'PUBLIC' | 'PRIVATE') => {
    try {
        const response = await apiFetch(`/study-plans/plans/${planId}/visibility?visibility=${visibility}`, {
            method: 'PATCH',
        });

        if (!response.ok) {
            throw new Error(`Erro ao alterar visibilidade do plano: ${response.status}`);
        }

        return {
            message: 'Visibilidade do plano alterada com sucesso',
        }
    }
    catch (error) {
        throw new Error(`Erro ao alterar visibilidade do plano: ${error}`);
    }
}

export const changeFavoriteStatus = async (planId: string, favorite: boolean) => {
    try {
        const response = await apiFetch(`/study-plans/plans/${planId}/favorite`, {
            method: 'PATCH',
            body: JSON.stringify({ favorite }),
        });

        if (!response.ok) {
            throw new Error(`Erro ao alterar status de favorito do plano: ${response.status}`);
        }

        return {
            message: 'Status de favorito do plano alterado com sucesso',
        }
    }
    catch (error) {
        throw new Error(`Erro ao alterar status de favorito do plano: ${error}`);
    }
}

export const deletePlan = async (planId: string) => {
    try {
        const response = await apiFetch(`/study-plans/plans/${planId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Erro ao deletar plano: ${response.status}`);
        }
    }
    catch (error) {
        throw new Error(`Erro ao deletar plano: ${error}`);
    }
}

export const deleteAllPlans = async () => {
    try {
        const response = await apiFetch(`/study-plans/plans/delete-all`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Erro ao deletar todos os planos: ${response.status}`);
        }
    }
    catch (error) {
        throw new Error(`Erro ao deletar todos os planos: ${error}`);
    }
}