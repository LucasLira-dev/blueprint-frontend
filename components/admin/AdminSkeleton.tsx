export const AdminSkeleton = () => {
    return (
        <div className="flex flex-1 flex-col p-6 md:p-8 lg:p-10">
            <div className="mx-auto w-full max-w-4xl">
                <div className="mb-8">
                    <div className="mb-2 flex items-center gap-2">
                        <div className="h-5 w-5 rounded bg-muted animate-pulse" />
                        <div className="h-4 w-32 rounded bg-muted animate-pulse" />
                    </div>
                    <div className="h-9 w-48 rounded-lg bg-muted animate-pulse mb-2" />
                    <div className="h-4 w-40 rounded bg-muted animate-pulse" />
                </div>

                <div className="mb-6">
                    <div className="h-12 w-full rounded-xl bg-muted animate-pulse" />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="rounded-2xl p-6 border border-border">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full bg-muted animate-pulse" />
                                <div className="flex flex-1 flex-col gap-2">
                                    <div className="h-5 w-32 rounded bg-muted animate-pulse" />
                                    <div className="h-4 w-48 rounded bg-muted animate-pulse" />
                                </div>
                            </div>
                            <div className="mt-6 flex gap-3">
                                <div className="h-10 w-28 rounded-lg bg-muted animate-pulse" />
                                <div className="h-10 w-28 rounded-lg bg-muted animate-pulse" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
