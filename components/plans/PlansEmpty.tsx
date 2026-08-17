import { BookOpen, Plus } from "lucide-react"
import Link from "next/link"

export const PlansEmpty = ({isAdmin = false }: { isAdmin: boolean }) => {
    return (
        <article className="flex flex-col items-center justify-center gap-6 w-full max-w-5xl min-h-[calc(100svh-8rem)] p-4">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-muted">
                <BookOpen className="h-10 w-10 text-muted-foreground" />
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
                <h2 className="text-xl font-semibold">
                    Nenhum plano encontrado
                </h2>
                <p className="text-sm text-muted-foreground max-w-md">
                    {isAdmin ? "O usuário ainda não criou nenhum plano" : "Você ainda não criou nenhum plano. Comece criando seu primeiro plano de estudos agora mesmo!"}
                </p>
            </div>
            {
                !isAdmin && (
                    <Link
                        href="/plans/new"
                        className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                        <Plus className="h-4 w-4" />
                        Criar primeiro plano
                    </Link>
                )
            }
        </article>
    )
}
