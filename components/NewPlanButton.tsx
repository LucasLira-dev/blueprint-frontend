import Link from "next/link"
import { cn } from "@/lib/utils"

interface NewPlanButtonProps {
    hasSession?: boolean;
    children?: React.ReactNode;
    className?: string;
}

export const NewPlanButton = ({ hasSession, children, className }: NewPlanButtonProps) => {
    return (
        <Link
            href={hasSession ? "/plans/new" : "/login"}
            className={cn(
                "inline-flex items-center justify-center gap-2 text-sm sm:text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                className
            )}
        >
            {hasSession ? "Novo plano" : "Começar"}
            {children}
        </Link>
    )
}
