'use client';

import { use } from "react";
import { DeepLearningModule } from "@/components/deep-learning/DeepLearningModule";
import { authClient } from "@/lib/auth-client";

interface DeepLearningPageProps {
    params: Promise<{ id: string }>;
}

export default function DeepLearningPage({ params }: DeepLearningPageProps) {
    const { id: planId } = use(params);
    const { data: session } = authClient.useSession();

    const userId = session?.user.id;

    return (
        <section className="flex justify-center">
            <DeepLearningModule planId={planId} userId={userId} />
        </section>
    )
}