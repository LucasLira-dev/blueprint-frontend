'use client';

import { Plans } from "@/components/plans/Plans";
import { authClient } from "@/lib/auth-client";

export default function PlansPage() {

    const { data: session } = authClient.useSession();

    const userId = session?.user.id

    return (
        <section className="flex justify-center">
            <Plans userId={userId} canChangeVisibility={true}/>
        </section>
    )
}