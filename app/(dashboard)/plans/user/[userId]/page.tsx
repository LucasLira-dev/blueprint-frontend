export const dynamic = "force-dynamic";

import { Plans } from "@/components/plans/Plans";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

interface UserPlansPageProps {
    params: Promise<{ userId: string }>;
}

export default async function UserPlansPage({ params }: UserPlansPageProps) {
    const { userId } = await params;

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

    const role = session?.data?.user.role

    if (role !== "admin") {
        redirect("/")
    }

    const canChangeVisibility = session?.data?.user.id === userId

    return (
        <section className="flex justify-center">
            <Plans userId={userId} isAdmin={role === "admin"} canChangeVisibility={canChangeVisibility} />
        </section>
    )
}
