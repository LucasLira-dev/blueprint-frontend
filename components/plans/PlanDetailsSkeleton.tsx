export const PlanDetailsSkeleton = () => {
    return (
        <article className="flex flex-col gap-12 w-full max-w-5xl px-4 sm:px-6 md:px-8 py-6 sm:py-8 mt-4 sm:mt-8">
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                    <div className="h-4 w-20 rounded bg-muted animate-pulse" />
                    <div className="h-4 w-2 rounded bg-muted animate-pulse" />
                    <div className="h-4 w-32 rounded bg-muted animate-pulse" />
                </div>

                <div className="h-10 sm:h-12 w-64 rounded-lg bg-muted animate-pulse" />

                <div className="flex justify-between items-center flex-wrap">
                    <div className="h-8 w-28 rounded-lg bg-muted animate-pulse" />
                    <div className="h-10 w-10 rounded-lg bg-muted animate-pulse" />
                </div>

                <div className="h-px bg-border w-full" />

                <div className="flex flex-col gap-2 mt-2">
                    <div className="h-6 w-36 rounded bg-muted animate-pulse" />
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-2xl border border-border bg-surface/40 p-4 sm:p-5">
                        <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-xl bg-muted animate-pulse" />
                        <div className="flex-1 flex flex-col gap-2">
                            <div className="h-5 w-48 rounded bg-muted animate-pulse" />
                            <div className="h-4 w-64 rounded bg-muted animate-pulse" />
                        </div>
                        <div className="h-10 w-32 rounded-full bg-muted animate-pulse" />
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <div className="flex gap-2 border-b border-border pb-2">
                    <div className="h-10 w-20 rounded-lg bg-muted animate-pulse" />
                    <div className="h-10 w-16 rounded-lg bg-muted animate-pulse" />
                </div>

                <div className="flex justify-between items-center mt-4">
                    <div className="h-6 w-48 rounded bg-muted animate-pulse" />
                    <div className="h-4 w-16 rounded bg-muted animate-pulse" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="flex flex-col gap-2 border border-border rounded-lg bg-surface/40">
                            <div className="w-full h-48 rounded-t-lg bg-muted animate-pulse" />
                            <div className="flex flex-col gap-2 px-3 pb-3">
                                <div className="h-5 w-3/4 rounded bg-muted animate-pulse" />
                                <div className="h-4 w-1/2 rounded bg-muted animate-pulse" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </article>
    )
}
