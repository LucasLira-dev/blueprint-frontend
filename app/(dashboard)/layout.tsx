import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { DashboardLayoutClient } from "./DashboardLayoutClient";

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
    throw new Error("Erro ao obter a sessão do usuário.");
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
    <DashboardLayoutClient
      userInitials={userInitials}
      userName={user.name}
    >
      {children}
    </DashboardLayoutClient>
  );
}
