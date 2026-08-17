'use client';

import { Heart, Search } from "lucide-react"
import { ExploreCard } from "./ExploreCard"
import { ExploreSkeleton } from "./ExploreSkeleton"
import { ExploreError } from "./ExploreError"
import { ExploreEmpty } from "./ExploreEmpty"
import { FavoritesDrawer } from "./FavoritesDrawer"
import { PublicPlan } from "@/types"
import { useChangePlanFavoriteMutation, usePublicPlansQuery } from "@/hooks/usePlans"
import { useMemo, useState } from "react"
import { Button } from "../ui/button";
import { toast } from "sonner";


export const Explore = ({ userId }: { userId: string | undefined}) => {

    const [searchTerm, setSearchTerm] = useState("")
    const [favoritesDrawerOpen, setFavoritesDrawerOpen] = useState(false);

    const { data, isLoading, error } = usePublicPlansQuery(userId!)

    const { mutate: changeFavorite } = useChangePlanFavoriteMutation(userId!)

    const plansData = useMemo<PublicPlan[]>(() => data?.plans ?? [], [data])

    const filteredPlans = plansData.filter((plan) => plan.topic.toLowerCase().includes(searchTerm.toLowerCase()) || plan.userName.toLowerCase().includes(searchTerm.toLowerCase()))

    if (isLoading) {
        return <ExploreSkeleton />
    }

    if (error) {
        return <ExploreError />
    }

    if (plansData.length === 0) {
        return (
            <div className="flex flex-col justify-center w-full max-w-5xl p-4 m-4 gap-6">
                <ExploreEmpty />
            </div>
        )
    }

    const handleFavoriteClick = (planId: string, favorite: boolean) => {
        changeFavorite({ planId, favorite }, {
            onSuccess: () => {
                toast.success(`Plano ${favorite ? 'adicionado aos favoritos' : 'removido dos favoritos'} com sucesso!`);
            },
            onError: (error) => {
                console.error('Erro ao alterar status de favorito do plano:', error);
                toast.error('Erro ao alterar status de favorito do plano. Tente novamente.');
            }
        })
    }

    const totalUserFavorites = data?.totalUserFavorites ?? 0

    return (
        <>
        <article className="flex flex-col gap-4 w-full max-w-5xl p-4 mt-8">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-semibold">
                        Explorar planos
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        {plansData.length} plano{plansData.length > 1 ? 's' : ''} disponível{plansData.length > 1 ? 'eis' : ''}.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    {totalUserFavorites > 0 && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setFavoritesDrawerOpen(true)}
                            className="gap-1.5"
                        >
                            <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                            {totalUserFavorites} favoritado{totalUserFavorites > 1 ? 's' : ''}
                        </Button>
                    )}
                </div>
            </div>
            <div className="relative flex items-center gap-2 w-full">
                <input
                    onChange={(e) => setSearchTerm(e.target.value)}
                    type="text"
                    placeholder="Pesquisar planos públicos"
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <div
                    className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-lg bg-muted px-2 py-2 text-sm text-muted-foreground">
                    <Search className="h-4 w-4 text-muted-foreground" />
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredPlans.length > 0 ? (
                    filteredPlans.map((plan) => (
                        <ExploreCard
                            key={plan.id}
                            plan={plan}
                            onFavoriteClick={(favorite: boolean) => handleFavoriteClick(plan.id, favorite)}
                        />
                    ))
                ) : (
                    <p className="col-span-full text-center text-muted-foreground">
                        Nenhum plano encontrado.
                    </p>
                )}
            </div>
        </article>
        <FavoritesDrawer
            userId={userId!}
            open={favoritesDrawerOpen}
            onOpenChange={setFavoritesDrawerOpen}
        />
        </>
    )
}
