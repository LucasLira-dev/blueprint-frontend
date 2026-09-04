'use client';

import { use } from "react";
import { PlanDetails } from "@/components/plans/PlanDetails";
import { authClient } from "@/lib/auth-client";

interface PlanDetailsPageProps {
    params: Promise<{ id: string }>;
}

export default function PlanDetailsPage({ params }: PlanDetailsPageProps) {
    const { id: planId } = use(params);
    const { data: session, isPending } = authClient.useSession();

    if (isPending) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-muted-foreground">Carregando...</p>
            </div>
        );
    }

    const userId = session?.user.id;
    const userRole = session?.user.role;

    return (
        <section className="flex justify-center">
            <PlanDetails planId={planId} userId={userId} isAdmin={userRole === 'admin'}/>
        </section>
    )
}