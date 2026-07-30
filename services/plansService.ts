import { apiFetch } from "@/lib/api-client";
import { Plan, PlanDetails } from "@/types";

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