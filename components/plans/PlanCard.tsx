import { Plan } from "@/types"
import { Globe, Lock, ChevronRight } from "lucide-react"
import Image from "next/image"
import { redirect } from "next/navigation"

interface PlanCardProps {
    plan: Plan,
    onChangeVisibility: (planId: string, visibility: 'PUBLIC' | 'PRIVATE') => void
    canChangeVisibility?: boolean
}

export const PlanCard = ({ plan, onChangeVisibility, canChangeVisibility }: PlanCardProps) => {

    const handlePlanClick = (id: string) => {
        redirect(`/plans/${id}`)
    }

    return (
        <div 
            onClick={() => handlePlanClick(plan.id)}
            className="group flex flex-col w-full max-w-5xl border border-border/60 rounded-xl overflow-hidden bg-card hover:shadow-lg hover:border-primary/50 transition-all duration-200 cursor-pointer"
        >
            <div className="relative w-full aspect-video overflow-hidden">
                <Image
                    src={plan.thumbnail ?? "/default-thumbnail.jpg"}
                    alt={`Thumbnail do plano ${plan.topic}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="flex items-center gap-1 text-white text-sm font-medium">
                        Ver detalhes <ChevronRight className="h-4 w-4" />
                    </span>
                </div>
            </div>
            
            <div 
            className="flex items-center justify-between p-4">
                <div className="flex flex-col gap-1.5 min-w-0">
                    <h3 className="font-semibold text-base truncate">{plan.topic}</h3>
                    <div className="flex items-center gap-1.5">
                        {plan.visibility === 'PUBLIC' ? (
                            <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                        ) : (
                            <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                        )}
                        <span className="text-xs text-muted-foreground">
                            {plan.visibility === 'PUBLIC' ? 'Público' : 'Privado'}
                        </span>
                    </div>
                </div>
                
                {
                    canChangeVisibility && (
                        <button
                            onClick={(e) => {
                                onChangeVisibility(plan.id, plan.visibility === 'PUBLIC' ? 'PRIVATE' : 'PUBLIC');
                                e.stopPropagation()
                            }}
                            className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors"
                        >
                            {plan.visibility === 'PUBLIC' ? (
                                <Globe className="h-3.5 w-3.5" />
                            ) : (
                                <Lock className="h-3.5 w-3.5" />
                            )}
                            {plan.visibility === 'PUBLIC' ? 'Público' : 'Privado'}
                        </button>
                    )
                }
            </div>
        </div>
    )
}