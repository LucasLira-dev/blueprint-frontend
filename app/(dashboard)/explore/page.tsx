export const dynamic = "force-dynamic";

import { Explore } from "@/components/explore/Explore";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function ExplorePage() {

    let session = null;

    try {
        session = await authClient.getSession({
            fetchOptions: {
                headers: await headers(),
            }
        })
    }
    catch (error) {
        console.error('Erro ao buscar sessão:', error);
    }

    if (!session?.data?.user) {
        redirect("/login");
    }

    const userId = session?.data?.user.id

    return (
        <section className="flex justify-center">
            <Explore userId={userId} />
        </section>
    )
}
