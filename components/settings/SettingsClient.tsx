"use client";

import { useRouter } from "next/navigation";
import { LogOut, Shield, AlertTriangle, AlertCircleIcon, X } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useDeleteAllPlansMutation, usePlansQuery } from "@/hooks/usePlans";
import { DeleteAllPlansDialog } from "./DeleteAllPlansDialog";
import { DeleteAccountDialog } from "./DeleteAccountDialog";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

interface SettingsClientProps {
    userId?: string;
    userName?: string;
    userEmail?: string;
}

export function SettingsClient({ userId, userName, userEmail }: SettingsClientProps) {
    const router = useRouter();
    const { mutate: deleteAllPlansMutation, isPending } = useDeleteAllPlansMutation(userId!);
    const { data: plans } = usePlansQuery(userId!);

    const [alert, setAlert] = useState<{ type: 'success' | 'destructive'; message: string } | null>(null);

    const handleLogout = async () => {
        try {
            const { error } = await authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        router.push("/login");
                    },
                }
            })
            if (error) {
                setAlert({ type: 'destructive', message: `Erro ao sair da conta. tente novamente.` });
            }
        } catch (error) {
            console.error(error);
            setAlert({ type: 'destructive', message: `Erro ao sair da conta. tente novamente.` });
        }
    };

    const handleDeleteAllPlans = () => {
        deleteAllPlansMutation(undefined, {
            onSuccess: () => {
                setAlert({ type: 'success', message: 'Todos os planos foram deletados com sucesso.' });
            },
            onError: (error) => {
                console.error(error);
                setAlert({ type: 'destructive', message: `Erro ao deletar todos os planos. tente novamente.` });
            }
        });
    };

    const handleDeleteAccount = async () => {
        try {
            const { error } = await authClient.deleteUser({
                fetchOptions: {
                    onSuccess: () => {
                        router.push("/login");
                    },
                }
            })
            if (error) {
                console.error(error)
                setAlert({ type: 'destructive', message: `Erro ao deletar a conta. tente novamente.` });
            }
        } catch (error) {
            console.error(error)
            setAlert({ type: 'destructive', message: `Erro ao deletar a conta. tente novamente.` });
        }
    };

    const hasPlans = plans && plans.length > 0;

    return (
        <>
        {alert && (
            <div className="fixed top-4 right-4 z-50 w-full max-w-sm">
                <Alert variant={alert.type === 'destructive' ? 'destructive' : 'default'}>
                    <AlertCircleIcon className="h-4 w-4" />
                    <AlertTitle>{alert.type === 'destructive' ? 'Erro' : 'Sucesso'}</AlertTitle>
                    <AlertDescription>{alert.message}</AlertDescription>
                    <button
                        onClick={() => setAlert(null)}
                        className="absolute top-2 right-2 p-1 rounded-full hover:bg-muted/50"
                        aria-label="Fechar alerta"
                    >
                        <X className="h-3 w-3" />
                    </button>
                </Alert>
            </div>
        )}
        <div className="w-full max-w-2xl space-y-8 fade-up">
            <div>
                <h1 className="text-display text-2xl sm:text-3xl text-foreground">
                    Configurações
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">
                    Gerencie sua conta e preferências
                </p>
            </div>

            <div className="glass-panel rounded-2xl p-5 sm:p-6">
                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary">
                        {userName?.split(" ").map((n) => n[0]).join("").toUpperCase()}
                    </div>
                    <div className="flex flex-col overflow-hidden">
                        <span className="truncate text-sm font-medium text-foreground">{userName}</span>
                        <span className="truncate text-xs text-muted-foreground">{userEmail}</span>
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex items-center gap-2 px-1">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Conta
                    </h2>
                </div>

                <div className="glass-panel rounded-2xl p-3 sm:p-4 space-y-2">
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer"
                    >
                        <LogOut className="h-4 w-4 shrink-0" />
                        <div className="flex flex-col items-start text-left">
                            <span className="text-md font-bold">Sair da conta</span>
                            <span className="text-xs text-muted-foreground">Encerra a sessão atual</span>
                        </div>
                    </button>
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex items-center gap-2 px-1">
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                    <h2 className="text-xs font-semibold uppercase tracking-wider text-destructive">
                        Zona de perigo
                    </h2>
                </div>

                <div className="glass-panel rounded-2xl border border-destructive/20 p-3 sm:p-4 space-y-2">
                    <DeleteAllPlansDialog
                        onDelete={handleDeleteAllPlans}
                        isPending={isPending}
                        disabled={!hasPlans}
                    />

                    <DeleteAccountDialog
                        onDelete={handleDeleteAccount}
                        isPending={false}
                    />
                </div>
            </div>
        </div>
        </>
    );
}
