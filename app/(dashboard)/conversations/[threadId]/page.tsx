export const dynamic = "force-dynamic";

import { ChatView } from "@/components/chat/ChatView";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

interface ConversationPageProps {
    params: Promise<{ threadId: string }>;
}

export default async function ConversationPage({ params }: ConversationPageProps) {
    const { threadId } = await params;

    let session = null;

    try {
        session = await authClient.getSession({
            fetchOptions: {
                headers: await headers(),
            }
        })
    }
    catch (error) {
        console.error("Erro ao obter a sessão do usuário:", error);
    }

    if (!session?.data?.user.id) {
        redirect("/login");
    }

    return <ChatView threadId={threadId} userId={session.data.user.id} />;
}
