import Link from "next/link"

interface NewPlanButtonProps {
    hasSession?: boolean;
    children?: React.ReactNode;
    className?: string;
}

export const NewPlanButton = ({ hasSession, children, className }: NewPlanButtonProps) => {
    return (
        <Link
            href={hasSession ? "/plans/new" : "/login"}
            className={`bg-primary text-background text-sm sm:text-base px-1 py-2 md:px-4 md:py-2 rounded-md font-medium hover:bg-primary/90 transition-colors ${className} `}
        >
            {hasSession ? "Novo plano" : "Começar"}
            {children}
        </Link>
    )
}