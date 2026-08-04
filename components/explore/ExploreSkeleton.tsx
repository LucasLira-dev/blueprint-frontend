export const ExploreSkeleton = () => {
    return (
        <article className="flex flex-col gap-4 w-full max-w-5xl p-4 mt-8">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                    <div className="h-9 w-48 rounded-lg bg-muted animate-pulse" />
                    <div className="h-4 w-32 rounded bg-muted animate-pulse" />
                </div>
            </div>

            <div className="relative flex items-center w-full">
                <div className="h-12 w-full rounded-lg bg-muted animate-pulse" />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex flex-col gap-4 p-4 border border-border rounded-lg">
                        <div className="w-full h-48 rounded-lg bg-muted animate-pulse" />
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col gap-2">
                                <div className="h-5 w-32 rounded bg-muted animate-pulse" />
                                <div className="h-4 w-16 rounded bg-muted animate-pulse" />
                            </div>
                            <div className="h-5 w-12 rounded bg-muted animate-pulse" />
                        </div>
                    </div>
                ))}
            </div>
        </article>
    )
}
