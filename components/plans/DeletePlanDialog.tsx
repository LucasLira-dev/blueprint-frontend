import { Trash2 } from "lucide-react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"
import { Button } from "../ui/button";

interface DeletePlanDialogProps {
    planId: string;
    planTitle: string;
    onDelete: (planId: string) => void;
}

export const DeletePlanDialog = ({ planId, planTitle, onDelete }: DeletePlanDialogProps) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger render={<Button variant="ghost" className="hover:bg-destructive/10 cursor-pointer"> <Trash2 className="h-5 w-5" /></Button>} />
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle> Voce tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Essa ação não pode ser desfeita. Isso irá deletar permanentemente o plano <span className="font-bold text-destructive">{planTitle.toUpperCase()}</span> e todos os seus dados.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="bg-secondary hover:bg-secondary/90 cursor-pointer">Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => onDelete(planId)}
                        className="bg-destructive hover:bg-destructive/90 cursor-pointer"> Deletar </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}