'use client';

import { Plus, Search } from "lucide-react"
import Link from "next/link"
import { PlanCard } from "./PlanCard"
import { PlansSkeleton } from "./PlansSkeleton"
import { PlansError } from "./PlansError"
import { PlansEmpty } from "./PlansEmpty"
import { Plan } from "@/types"
import { useChangePlanVisibilityMutation, usePlansQuery } from "@/hooks/usePlans"
import { useMemo, useState } from "react"

export const Plans = ({ userId }: { userId: string | undefined }) => {

    const [searchTerm, setSearchTerm] = useState("")

    const { data, isLoading, error } = usePlansQuery(userId!)

    const { mutate: changeVisibility } = useChangePlanVisibilityMutation(userId!)

    const plansData = useMemo<Plan[]>(() => data ?? [], [data])

    const filteredPlans = plansData.filter((plan) => plan.topic.toLowerCase().includes(searchTerm.toLowerCase()))

    if (isLoading) {
        return <PlansSkeleton />
    }

    if (error) {
        return <PlansError />
    }

    const handleChangeVisibility = (planId: string, visibility: 'PUBLIC' | 'PRIVATE') => {
        changeVisibility({ planId, visibility })
    }

    if (plansData.length === 0) {
        return (
            <div className="flex flex-col justify-center w-full max-w-5xl p-4 m-4 gap-6">
                <PlansEmpty />
            </div>
        )
    }

    return (
        <article className="flex flex-col gap-4 w-full max-w-5xl p-4 mt-8">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-semibold">
                        Seus planos
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        {plansData.length} plano{plansData.length > 1 ? 's' : ''} salvos.
                    </p>
                </div>
                <Link href="/plans/new" className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                    <Plus className="h-4 w-4" />
                    Novo plano
                </Link>
            </div>
            <div className="relative flex items-center gap-2 w-full">
                <input
                    onChange={(e) => setSearchTerm(e.target.value)}
                    type="text"
                    placeholder="Pesquisar planos"
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
                        <PlanCard
                            key={plan.id}
                            plan={plan}
                            onChangeVisibility={handleChangeVisibility}
                        />
                    ))
                ) : (
                    <p className="col-span-full text-center text-muted-foreground">
                        Nenhum plano encontrado.
                    </p>
                )}
            </div>
        </article>
    )
}