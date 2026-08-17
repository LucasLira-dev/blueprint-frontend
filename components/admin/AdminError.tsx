import { AlertTriangle } from "lucide-react"

interface AdminErrorProps {
    onRetry?: () => void
}

export const AdminError = ({ onRetry }: AdminErrorProps) => {
    return (
        <div className="flex flex-1 flex-col items-center justify-center min-h-[calc(100svh-8rem)] p-6 md:p-8 lg:p-10 gap-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10">
                <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
                <h2 className="text-xl font-semibold">
                    Erro ao carregar usuários
                </h2>
                <p className="text-sm text-muted-foreground max-w-md">
                    Ocorreu um erro inesperado ao tentar carregar a lista de usuários. Por favor, tente novamente.
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
        </div>
    )
}
