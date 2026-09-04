'use client';

import { Explore } from "@/components/explore/Explore";
import { authClient } from "@/lib/auth-client";

export default function ExplorePage() {
    const { data: session, isPending } = authClient.useSession();

    if (isPending) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-muted-foreground">Carregando...</p>
            </div>
        );
    }

    const userId = session?.user.id;

    return (
        <section className="flex justify-center">
            <Explore userId={userId} />
        </section>
    )
}
