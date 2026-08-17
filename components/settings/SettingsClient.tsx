"use client";

import { useRouter } from "next/navigation";
import { LogOut, Shield, AlertTriangle, AlertCircleIcon } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useDeleteAllPlansMutation, usePlansQuery } from "@/hooks/usePlans";
import { DeleteAllPlansDialog } from "./DeleteAllPlansDialog";
import { DeleteAccountDialog } from "./DeleteAccountDialog";
import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { toast } from "sonner";

interface SettingsClientProps {
    userId?: string;
    userName?: string;
    userEmail?: string;
    sessionCreatedAt?: string;
}

const ONE_HOUR_MS = 60 * 60 * 1000;

export function SettingsClient({ userId, userName, userEmail, sessionCreatedAt }: SettingsClientProps) {
    const router = useRouter();
    const { mutate: deleteAllPlansMutation, isPending } = useDeleteAllPlansMutation(userId!);
    const { data: plans } = usePlansQuery(userId!);

    const [needsRecentLogin, setNeedsRecentLogin] = useState(false);
    const [isDeletingAccount, setIsDeletingAccount] = useState(false);

    useEffect(() => {
        if (!sessionCreatedAt) {
            return;
        }

        const createdAt = new Date(sessionCreatedAt).getTime();
        if (!Number.isFinite(createdAt)) {
            return;
        }

        const elapsedMs = Date.now() - createdAt;
        if (elapsedMs > ONE_HOUR_MS) {
            const timeoutId = window.setTimeout(() => {
                setNeedsRecentLogin(true);
            }, 0);

            return () => window.clearTimeout(timeoutId);
        }

        const timeoutId = window.setTimeout(() => {
            setNeedsRecentLogin(true);
        }, ONE_HOUR_MS - elapsedMs);

        return () => window.clearTimeout(timeoutId);
    }, [sessionCreatedAt]);

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
                toast.error('Erro ao sair da conta. Tente novamente.');
            }
        } catch (error) {
            console.error(error);
            toast.error('Erro ao sair da conta. Tente novamente.');
        }
    };

    const handleDeleteAllPlans = () => {
        deleteAllPlansMutation(undefined, {
            onSuccess: () => {
                toast.success('Todos os planos foram deletados com sucesso.');
            },
            onError: (error) => {
                console.error(error);
                toast.error('Erro ao deletar todos os planos. Tente novamente.');
            }
        });
    };

    const handleDeleteAccount = async () => {
        if (needsRecentLogin) {
            toast.error('Sua sessão de login tem mais de 1 hora. Faça login novamente para conseguir deletar a conta.');
            return;
        }

        setIsDeletingAccount(true);

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
                toast.error('Erro ao deletar a conta. Tente novamente.');
            }
        } catch (error) {
            console.error(error)
            toast.error('Erro ao deletar a conta. Tente novamente.');
        } finally {
            setIsDeletingAccount(false);
        }
    };

    const hasPlans = plans && plans.length > 0;

    return (
        <>
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

                {needsRecentLogin && (
                    <Alert variant="destructive">
                        <AlertCircleIcon className="h-4 w-4" />
                        <AlertTitle>Faça login novamente</AlertTitle>
                        <AlertDescription>
                            Sua sessão tem mais de 1 hora. Entre novamente para liberar a exclusão da conta.
                        </AlertDescription>
                    </Alert>
                )}

                <div className="glass-panel rounded-2xl border border-destructive/20 p-3 sm:p-4 space-y-2">
                    <DeleteAllPlansDialog
                        onDelete={handleDeleteAllPlans}
                        isPending={isPending}
                        disabled={!hasPlans}
                    />

                    <DeleteAccountDialog
                        onDelete={handleDeleteAccount}
                        isPending={isDeletingAccount}
                        disabled={needsRecentLogin || isDeletingAccount}
                    />
                </div>
            </div>
        </div>
        </>
    );
}
