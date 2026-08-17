"use client";

import { useMemo, useState } from "react";
import { Shield, Search, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAllUsersQuery, useDeleteUserMutation } from "@/hooks/useAdmin";
import { User } from "@/types";
import { DeleteAccountDialog } from "../settings/DeleteAccountDialog";
import Link from "next/link";
import { AdminSkeleton } from "./AdminSkeleton";
import { AdminError } from "./AdminError";
import { toast } from "sonner";

export function AdminPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: usersData, isLoading, isError } = useAllUsersQuery();

  const { mutate: deleteUser, isPending } = useDeleteUserMutation();

  const users = useMemo<User[]>(() => usersData ?? [], [usersData]);

  if (isLoading) {
    return <AdminSkeleton />
  }

  if (isError) {
    return <AdminError />
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteUser = (userId: string) => {
    deleteUser(userId, {
      onSuccess: () => {
        toast.success('Usuário deletado com sucesso.');
      },
      onError: (error) => {
        toast.error(`Erro ao deletar usuário: ${error.message}`);
        console.error("Erro ao deletar usuário:", error);
      },
    })
  };

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <>
    <div className="flex flex-1 flex-col p-6 md:p-8 lg:p-10">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-2 text-muted-foreground">
            <Shield className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">Área administrativa</span>
          </div>
          <h1 className="text-display mb-2 text-3xl font-bold">Usuários</h1>
          <p className="text-muted-foreground">
            {users.length} contas cadastradas na plataforma
          </p>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Pesquisar por nome ou email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-border bg-surface py-3 pl-10 pr-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="glass-panel rounded-2xl p-6 transition-all hover:border-primary/30"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary">
                  {getUserInitials(user.name)}
                </div>
                <div className="flex flex-1 flex-col">
                  <h3 className="text-lg font-semibold">{user.name}</h3>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <Link href={`/plans/user/${user.id}`} passHref>
                  <Button 
                  variant="outline" 
                  className="flex flex-row items-center gap-1 cursor-pointer">
                    <Eye className="mr-2 h-4 w-4" />
                    Ver planos
                  </Button>
                </Link>
                <DeleteAccountDialog
                  onDelete={() => handleDeleteUser(user.id)}
                  isPending={isPending}
                  isMyAccount={false}
                  disabled={user.role === "admin"}
                />
              </div>
            </div>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">
              Nenhum usuário encontrado com a busca &quot;{searchQuery}&quot;
            </p>
          </div>
        )}
      </div>
    </div>
    </>
  );
}