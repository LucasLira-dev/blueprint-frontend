import { Waves } from "lucide-react"

export const Loading = () => {
    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background text-foreground">
            <div
                className="pointer-events-none absolute inset-0"
                style={{ background: "var(--gradient-hero)" }}
            />
            <div className="relative flex flex-col justify-center items-center gap-8 fade-up">
                <div className="relative flex items-center justify-center">
                    <div className="loader-ring absolute h-24 w-24 rounded-full" />
                    <div className="flex h-16 w-16 items-center justify-center bg-primary rounded-2xl shadow-(--shadow-elegant)">
                        <Waves className="h-8 w-8 text-foreground" />
                    </div>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <h1 className="text-display text-2xl tracking-tight text-foreground">
                        Blueprint
                    </h1>
                    <p className="text-sm text-muted-foreground">Estamos quase prontos...</p>
                </div>
            </div>
        </div>
    )
}