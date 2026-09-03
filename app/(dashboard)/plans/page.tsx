'use client';

import { Plans } from "@/components/plans/Plans";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
//import { headers } from "next/headers";

export default function PlansPage() {

    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();
    
      if (isPending) {
        return (
          <div className="flex min-h-screen items-center justify-center">
            <p className="text-muted-foreground">Carregando...</p>
          </div>
        );
      }

    console.log("Sessão atual:", session);

    if (!session?.user) {
        console.log("Usuário não autenticado, redirecionando para /login");
        router.push("/login");
    }

    const userId = session?.user.id

    return (
        <section className="flex justify-center">
            <Plans userId={userId} canChangeVisibility={true}/>
        </section>
    )
}