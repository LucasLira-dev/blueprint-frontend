export const dynamic = "force-dynamic";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { DashboardLayoutClient } from "./DashboardLayoutClient";
import { Provider } from "./provider";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let session = null;
  try {
    session = await authClient.getSession({
      fetchOptions: {
        headers: await headers(),
      },
    });
  } catch (error) {
    console.error("Erro ao obter a sessão do usuário:", error);
    redirect("/login");
  }

  if (!session?.data?.user?.id) {
    redirect("/login");
  }

  const user = session.data.user;
  const userInitials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Provider>
      <DashboardLayoutClient
        userInitials={userInitials}
        userName={user.name}
        userRole={user.role ?? 'user'}
      >
        {children}
      </DashboardLayoutClient>
    </Provider>
  );
}
