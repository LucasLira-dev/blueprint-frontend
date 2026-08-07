"use client";

import { PublicPlan } from "@/types"
import { Heart, Globe } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface ExploreCardProps {
    plan: PublicPlan;
    onFavoriteClick: (favorite: boolean) => void;
}

export const ExploreCard = ({ plan, onFavoriteClick }: ExploreCardProps) => {
    const router = useRouter()

    const handlePlanClick = (id: string) => {
        router.push(`/plans/${id}`)
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </div>
            
            <div className="flex items-center justify-between p-4">
                <div className="flex flex-col gap-1.5 min-w-0">
                    <h3 className="font-semibold text-base truncate">{plan.topic}</h3>
                    <div className="flex items-center gap-1.5">
                        <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{plan.userName}</span>
                    </div>
                </div>
                
                <div className="flex items-center gap-1.5">
                    <button
                        type="button"
                        onClick={(event) => {
                            event.stopPropagation()
                            onFavoriteClick(!plan.isFavorite)
                        }}
                        aria-label={plan.isFavorite ? "Remover dos favoritos" : "Favoritar plano"}
                        className="rounded-full p-1.5 transition-colors hover:bg-muted"
                    >
                        {plan.isFavorite ? (
                            <Heart className="h-4 w-4 text-red-600" fill="currentColor" />
                        ) : (
                            <Heart className="h-4 w-4 text-muted-foreground" />
                        )}
                    </button>
                    <span className="text-sm text-muted-foreground tabular-nums">{plan.totalFavorites}</span>
                </div>
            </div>
        </div>
    )
}
