import { apiFetch } from "@/lib/api-client";
import { Plan } from "@/types";

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