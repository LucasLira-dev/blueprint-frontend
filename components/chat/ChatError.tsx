import { useRouter } from "next/navigation";

interface ChatErrorProps {
    isNotFound: boolean;
    refetch: () => void;
}

export const ChatError = ({ isNotFound, refetch }: ChatErrorProps) => {

    const router = useRouter();

    return (
        <div className="flex h-full flex-col items-center justify-center gap-4 px-4">
        <p className="text-sm text-muted-foreground">
          {isNotFound
            ? "Esta conversa não foi encontrada ou não está disponível para você."
            : "Não foi possível carregar esta conversa."}
        </p>
        {isNotFound ? (
          <button
            type="button"
            onClick={() => router.push("/plans")}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            Voltar para planos
          </button>
        ) : (
          <button
            type="button"
            onClick={() => refetch()}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            Tentar novamente
          </button>
        )}
      </div>
    )
}