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
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground"> {plan.userName} </span>
                    </div>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <button
                        type="button"
                        onClick={(event) => {
                            event.stopPropagation()
                            onFavoriteClick(!plan.isFavorite)
                        }}
                        aria-label={plan.isFavorite ? "Remover dos favoritos" : "Favoritar plano"}
                        className="rounded-full p-1 transition-colors hover:bg-muted cursor-pointer"
                    >
                        {plan.isFavorite ? (
                            <Heart className="h-4 w-4 text-red-600" fill="currentColor" />
                        ) : (
                            <Heart className="h-4 w-4" />
                        )}
                    </button>
                    <span>{plan.totalFavorites}</span>
                </div>
            </div>
        </div>
    )
}
