import { SettingsClient } from "@/components/settings/SettingsClient";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";

export default async function SettingsPage() {
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

    const user = session?.data?.user;
    const sessionCreatedAt = session?.data?.session?.createdAt?.toISOString();

    return (
        <section className="flex justify-center px-4 py-8 sm:px-6 lg:px-8">
            <SettingsClient
                userId={user?.id}
                userName={user?.name}
                userEmail={user?.email}
                sessionCreatedAt={sessionCreatedAt}
            />
        </section>
    )
}
