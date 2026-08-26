export const dynamic = "force-dynamic";

import { ChatView } from "@/components/chat/ChatView";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function ChatPage() {
  let session = null;

  try {
    session = await authClient.getSession({
      fetchOptions: {
        headers: await headers(),
      },
    });
  } catch (error) {
    console.error("Erro ao obter a sessão do usuário:", error);
  }

  if (!session?.data?.user.id) {
    redirect("/login");
  }

  return <ChatView userId={session.data.user.id} />;
}
