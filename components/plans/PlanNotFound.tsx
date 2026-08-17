import { FileSearch } from "lucide-react"
import Link from "next/link"

export const PlanNotFound = () => {
    return (
        <article className="flex flex-col items-center justify-center w-full max-w-5xl min-h-[calc(100svh-8rem)] px-4 sm:px-6 md:px-8 py-6 sm:py-8 gap-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted">
                <FileSearch className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
                <h2 className="text-xl font-semibold">
                    Plano não encontrado
                </h2>
                <p className="text-sm text-muted-foreground max-w-md">
                    O plano que você procura não existe ou foi removido.
                </p>
            </div>
            <Link
                href="/plans"
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
                Voltar para meus planos
            </Link>
        </article>
    )
}
