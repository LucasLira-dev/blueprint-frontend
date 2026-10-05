"use client";

import { useState } from "react";
import { Loader2, Trash2 } from "lucide-react";
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

interface DeleteDeepLearningContentDialogProps {
    contentTitle: string;
    isDeleting: boolean;
    onDelete: () => Promise<unknown>;
}

export const DeleteDeepLearningContentDialog = ({
    contentTitle,
    isDeleting,
    onDelete,
}: DeleteDeepLearningContentDialogProps) => {
    const [open, setOpen] = useState(false);

    const handleDelete = async () => {
        await onDelete().catch(() => undefined);
        setOpen(false);
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger
                render={
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Deletar conteúdo"
                        className="cursor-pointer text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                }
            />
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Deletar o conteúdo?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Essa ação não pode ser desfeita. Isso irá deletar permanentemente{" "}
                        <span className="font-bold text-destructive">{contentTitle}</span>, com todos os tópicos
                        estudados e o quiz de fixação. Você pode gerar um novo conteúdo depois.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer bg-secondary hover:bg-secondary/90">
                        Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="cursor-pointer bg-destructive hover:bg-destructive/90"
                    >
                        {isDeleting ? (
                            <span className="flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Deletando...
                            </span>
                        ) : "Deletar"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};