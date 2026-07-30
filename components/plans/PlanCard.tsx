import { Plan } from "@/types"
import { Globe, Lock } from "lucide-react"
import Image from "next/image"
import { redirect } from "next/navigation"

interface PlanCardProps {
    plan: Plan,
    onChangeVisibility: (planId: string, visibility: 'PUBLIC' | 'PRIVATE') => void
}

export const PlanCard = ({ plan, onChangeVisibility }: PlanCardProps) => {

    const handlePlanClick = (id: string) => {
        redirect(`/plans/${id}`)
    }

    return (
        <div 
        onClick={() => handlePlanClick(plan.id)}
        className="flex flex-col gap-4 w-full max-w-5xl p-4 mt-8 border border-border rounded-lg hover:border-primary transition-shadow cursor-pointer">
            <div className="relative w-full h-48 rounded-lg overflow-hidden">
                <Image
                    src={plan.thumbnail ?? "/default-thumbnail.jpg"}
                    alt={`Thumbnail do plano ${plan.topic}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    loading="eager"
                />
            </div>
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                    <p className="font-medium text-lg line-clamp-1"> {plan.topic} </p>
                    <div className="flex items-center text-sm gap-2">
                        {plan.visibility === 'PUBLIC' ?
                            <Globe className="h-4 w-4 text-muted-foreground" /> :
                            <Lock className="h-4 w-4 text-muted-foreground" />
                        }
                        <span className="text-muted-foreground"> {plan.visibility === 'PUBLIC' ? 'Público' : 'Privado'} </span>
                    </div>
                </div>
                <button 
                onClick={(e) => {
                    onChangeVisibility(plan.id, plan.visibility === 'PUBLIC' ? 'PRIVATE' : 'PUBLIC');
                    e.stopPropagation()
                }}
                className="flex items-center gap-2 rounded-lg cursor-pointer bg-muted px-3 py-1 text-[12px] font-medium text-primary-foreground transition-colors hover:bg-muted/90 border ">
                    {
                        plan.visibility === 'PUBLIC' ? 'Público' : 'Privado'
                    }
                </button>
            </div>
        </div>
    )
}