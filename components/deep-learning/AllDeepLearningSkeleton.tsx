export const AllDeepLearningSkeleton = () => {
    return (
        <article
            aria-busy="true"
            aria-label="Carregando aprendizados profundos"
            className="flex flex-col gap-4 w-full max-w-5xl p-4 mt-8"
        >
            <div className="flex items-center gap-2">
                <div className="h-9 w-72 max-w-full animate-pulse rounded-lg bg-muted" />
                <div className="h-5 w-5 shrink-0 animate-pulse rounded-full bg-muted" />
            </div>
            <div className="h-4 w-36 animate-pulse rounded bg-muted" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div
                        key={index}
                        className="flex w-full flex-col overflow-hidden rounded-xl border border-border/60 bg-card"
                    >
                        <div className="aspect-video w-full animate-pulse bg-muted" />
                        <div className="p-4">
                            <div className="h-5 w-4/5 animate-pulse rounded bg-muted" />
                        </div>
                    </div>
                ))}
            </div>
        </article>
    );
}
