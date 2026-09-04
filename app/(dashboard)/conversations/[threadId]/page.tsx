'use client';

import { use } from "react";
import { ChatView } from "@/components/chat/ChatView";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ConversationPageProps {
    params: Promise<{ threadId: string }>;
}

export default function ConversationPage({ params }: ConversationPageProps) {
    const { threadId } = use(params);
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();

    useEffect(() => {
        if (!isPending && !session?.user.id) {
            router.replace("/login");
        }
    }, [isPending, session, router]);

    if (!session?.user.id) {
        return null;
    }

    return <ChatView threadId={threadId} userId={session.user.id} />;
}
