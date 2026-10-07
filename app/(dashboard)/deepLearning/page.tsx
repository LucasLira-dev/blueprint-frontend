'use client';


import { AllDeepLearningComponent } from "@/components/deep-learning/AllDeepLearning";
import { authClient } from "@/lib/auth-client";

export default function DeepLearningListPage() {

    const { data: session } = authClient.useSession();
    const userId = session?.user.id;

    return (
        <section className="flex justify-center">
            <AllDeepLearningComponent userId={userId} />
        </section>
    )
}