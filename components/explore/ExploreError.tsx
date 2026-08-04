import { AlertTriangle } from "lucide-react"

interface ExploreErrorProps {
    onRetry?: () => void
}

export const ExploreError = ({ onRetry }: ExploreErrorProps) => {
    return (
        <article className="flex flex-col items-center justify-center w-full max-w-5xl p-4 mt-8 gap-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10">
                <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
                <h2 className="text-xl font-semibold">
                    Erro ao carregar planos públicos
                </h2>
                <p className="text-sm text-muted-foreground max-w-md">
                    Ocorreu um erro inesperado ao tentar carregar os planos públicos. Por favor, tente novamente.
                </p>
            </div>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                    Tentar novamente
                </button>
            )}
        </article>
    )
}
