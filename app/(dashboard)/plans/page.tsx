'use client';

import { Plans } from "@/components/plans/Plans";
import { authClient } from "@/lib/auth-client";

export default function PlansPage() {

    const { data: session, isPending } = authClient.useSession();
    
      if (isPending) {
        return (
          <div className="flex min-h-screen items-center justify-center">
            <p className="text-muted-foreground">Carregando...</p>
          </div>
        );
      }

    const userId = session?.user.id

    return (
        <section className="flex justify-center">
            <Plans userId={userId} canChangeVisibility={true}/>
        </section>
    )
}