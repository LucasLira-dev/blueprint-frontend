'use client';

import { use } from "react";
import { PlanDetails } from "@/components/plans/PlanDetails";
import { authClient } from "@/lib/auth-client";

interface PlanDetailsPageProps {
    params: Promise<{ id: string }>;
}

export default function PlanDetailsPage({ params }: PlanDetailsPageProps) {
    const { id: planId } = use(params);
    const { data: session } = authClient.useSession();

    const userId = session?.user.id;
    const userRole = session?.user.role;

    return (
        <section className="flex justify-center">
            <PlanDetails planId={planId} userId={userId} isAdmin={userRole === 'admin'}/>
        </section>
    )
}