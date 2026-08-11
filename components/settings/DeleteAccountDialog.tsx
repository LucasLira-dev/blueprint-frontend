"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface DeleteAccountDialogProps {
    onDelete: () => void;
    isPending: boolean;
    disabled?: boolean;
}

export function DeleteAccountDialog({ onDelete, isPending, disabled = false }: DeleteAccountDialogProps) {
    const [open, setOpen] = useState(false);

    const handleDelete = () => {
        onDelete();
        setOpen(false);
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger
                disabled={disabled || isPending}
                render={
                    <Button
                        variant="destructive"
                        className="w-full justify-start gap-3 h-auto py-3 cursor-pointer whitespace-normal"
                        disabled={disabled || isPending}
                    >
                        <Trash2 className="h-4 w-4 shrink-0" />
                        <div className="flex flex-col items-start text-left min-w-0">
                            <span className="text-md font-bold max-sm:m-auto">Deletar minha conta</span>
                            <span className="text-xs opacity-80 wrap-break-words">Remove permanentemente sua conta e todos os dados</span>
                        </div>
                    </Button>
                }
            />
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Deletar sua conta?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Essa ação não pode ser desfeita. Sua conta será
                        <span className="font-bold text-destructive"> permanentemente removida</span>,
                        incluindo todos os planos, dados e configurações associados.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="bg-secondary hover:bg-secondary/90 cursor-pointer">
                        Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        disabled={isPending}
                        className="bg-destructive hover:bg-destructive/90 cursor-pointer"
                    >
                        {isPending ? "Deletando..." : "Deletar conta"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
