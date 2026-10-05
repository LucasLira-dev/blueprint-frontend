'use client';

import { use } from "react";
import { DeepLearningModule } from "@/components/deep-learning/DeepLearningModule";

interface DeepLearningPageProps {
    params: Promise<{ id: string }>;
}

export default function DeepLearningPage({ params }: DeepLearningPageProps) {
    const { id: planId } = use(params);

    return (
        <section className="flex justify-center">
            <DeepLearningModule planId={planId} />
        </section>
    )
}
