'use client';

import { Explore } from "@/components/explore/Explore";
import { authClient } from "@/lib/auth-client";

export default function ExplorePage() {
    const { data: session } = authClient.useSession();

    const userId = session?.user.id;

    return (
        <section className="flex justify-center">
            <Explore userId={userId} />
        </section>
    )
}
