'use client';

import { use } from "react";
import { Plans } from "@/components/plans/Plans";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface UserPlansPageProps {
    params: Promise<{ userId: string }>;
}

export default function UserPlansPage({ params }: UserPlansPageProps) {
    const { userId } = use(params);
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();

    useEffect(() => {
        if (!isPending && session?.user.role !== "admin") {
            router.replace("/");
        }
    }, [isPending, session, router]);

    const role = session?.user.role;

    if (role !== "admin") {
        return null;
    }

    const canChangeVisibility = session?.user.id === userId;

    return (
        <section className="flex justify-center">
            <Plans userId={userId} isAdmin={role === "admin"} canChangeVisibility={canChangeVisibility} />
        </section>
    )
}
