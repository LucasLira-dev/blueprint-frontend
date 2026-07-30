import { PlanDetails } from "@/components/plans/PlanDetails";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";

interface PlanDetailsPageProps {
    params: Promise<{ id: string }>;
}

export default async function PlanDetailsPage({ params }: PlanDetailsPageProps) {

    const { id: planId } = await params;

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
            <PlanDetails planId={planId} userId={userId}/>
        </section>
    )

}