export const dynamic = "force-dynamic";

import { Plans } from "@/components/plans/Plans";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";

export default async function PlansPage() {

    let session = null;

    try {
        session = await authClient.getSession({
            fetchOptions: {
                headers: await headers()
            }
        })
    }
    catch (error) {
        console.error('Erro ao buscar sessão:', error);
    }

    const userId = session?.data?.user.id

    return (
        <section className="flex justify-center">
            <Plans userId={userId}/>
        </section>
    )
}