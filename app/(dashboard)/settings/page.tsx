'use client';

import { SettingsClient } from "@/components/settings/SettingsClient";
import { authClient } from "@/lib/auth-client";

export default function SettingsPage() {
    const { data: session, isPending } = authClient.useSession();

    if (isPending) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-muted-foreground">Carregando...</p>
            </div>
        );
    }

    const user = session?.user;
    const sessionCreatedAt = session?.session?.createdAt?.toISOString();

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
