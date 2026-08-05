import { Trash2 } from "lucide-react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"
import { Button } from "../ui/button";

interface DeleteFavoritePlanDialogProps {
    planId: string;
    planTitle: string;
    isDeleting: boolean;
    deleteAll?: boolean
    onDelete: (planId?: string) => void;
}

export const DeleteFavoritePlanDialog = ({ planId, planTitle, isDeleting, onDelete, deleteAll = false }: DeleteFavoritePlanDialogProps) => {

    const deleteFunction = () => {
        if (deleteAll) {
            onDelete();
        } else {
            onDelete(planId);
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger render={deleteAll ? <Button
                variant="destructive"
                className="w-full cursor-pointer"
                disabled={isDeleting}
            >
                <Trash2 className="h-4 w-4 mr-2" />
                Remover todos
            </Button> : <Button variant="ghost" className="hover:bg-destructive/10 cursor-pointer" onClick={(e) => e.stopPropagation()}> <Trash2 className="h-5 w-5" /></Button>} />
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle> Voce tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                        {deleteAll ? (
                            <>
                                Esta ação não pode ser desfeita. Isso irá deletar permanentemente <span className="font-bold text-destructive uppercase">todos</span> os planos favoritados.
                            </>
                        ) : (
                            <>
                                Esta ação não pode ser desfeita. Isso irá deletar permanentemente o plano <span className="font-bold text-destructive">{planTitle.toUpperCase()}</span> dos seus favoritos.
                            </>
                        )}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="bg-secondary hover:bg-secondary/90 cursor-pointer" onClick={(e) => e.stopPropagation()}>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                        disabled={isDeleting}
                        onClick={(e) => { e.stopPropagation(); deleteFunction(); }}
                        className="bg-destructive hover:bg-destructive/90 cursor-pointer"> Deletar </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
