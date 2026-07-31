"use client";

import { useState } from "react";
import { AlertTriangle } from "lucide-react";
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

interface DeleteAllPlansDialogProps {
    onDelete: () => void;
    isPending: boolean;
    disabled?: boolean;
}

export function DeleteAllPlansDialog({ onDelete, isPending, disabled }: DeleteAllPlansDialogProps) {
    const [open, setOpen] = useState(false);

    const handleDelete = () => {
        onDelete();
        setOpen(false);
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger
                disabled={disabled}
                render={
                    <Button
                        variant="destructive"
                        className="w-full justify-start gap-3 h-auto py-3 cursor-pointer whitespace-normal"
                    >
                        <AlertTriangle className="h-4 w-4 shrink-0" />
                        <div className="flex flex-col items-start min-w-0">
                            <span className="text-md font-bold max-sm:m-auto">Deletar todos os planos</span>
                            <span className="text-xs opacity-80 wrap-break-words">Remove permanentemente todos os seus planos de estudo</span>
                        </div>
                    </Button>
                }
            />
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Deletar todos os planos?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Essa ação não pode ser desfeita. Todos os seus planos de estudo serão
                        <span className="font-bold text-destructive"> permanentemente removidos</span>.
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
                        {isPending ? "Deletando..." : "Deletar tudo"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
