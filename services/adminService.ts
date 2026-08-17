import { apiFetch } from "@/lib/api-client";
import { PlanDetails, User } from "@/types";

export async function getAllUsers(): Promise<User[]> {
    try {
        const response = await apiFetch('/admin/all-users');

        if (!response.ok){
            throw new Error(`Erro ao buscar usuários: ${response.status}`);
        }

        const users: User[] = await response.json();
        return users;
    }
    catch (error) {
        console.error("Erro ao buscar usuários:", error);
        throw error;
    }
}

export async function getPlanDetailsAdmin(planId: string): Promise<PlanDetails> {
    try {
        const response = await apiFetch(`/admin/plan-details/${planId}`);

        if (!response.ok) {
            throw new Error(`Erro ao buscar detalhes do plano: ${response.status}`);
        }

        const planDetails: PlanDetails = await response.json();
        return planDetails;
    }
    catch (error) {
        console.error("Erro ao buscar detalhes do plano:", error);
        throw error;
    }
}

export async function adminDeletePlan(planId: string): Promise<{ message: string }> {
    try {
        const response = await apiFetch(`/admin/delete-plan/${planId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Erro ao deletar plano: ${response.status}`);
        }

        return {
            message: 'Plano deletado com sucesso',
        }
    }
    catch (error) {
        console.error("Erro ao deletar plano:", error);
        throw error;
    }
}

export async function deleteUser(id: string): Promise<{ message: string }> {
    try {
        const response = await apiFetch(`/admin/delete-user/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Erro ao deletar usuário: ${response.status}`);
        }

        return {
            message: 'Usuário deletado com sucesso',
        }
    }
    catch (error) {
        console.error("Erro ao deletar usuário:", error);
        throw error;
    }
}