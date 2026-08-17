import { deleteUser, getAllUsers } from "@/services/adminService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useAllUsersQuery() {
    return useQuery({
        queryKey: ['all-users'],
        queryFn: () => getAllUsers(),
    })
}

export function useDeleteUserMutation() {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['all-users'] });
            queryClient.invalidateQueries({ queryKey: ['plans']})
        },
        onError: (error) => {
            console.error('Erro ao deletar usuário:', error);
        }
    })
}