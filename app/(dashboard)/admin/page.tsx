export const dynamic = "force-dynamic";

import { AdminPage } from "@/components/admin/AdminPage";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminPageRoute() {
  let session = null;

  try {
    session = await authClient.getSession({
      fetchOptions: {
        headers: await headers(),
      },
    });
  } catch (error) {
    console.error("Erro ao buscar sessão:", error);
  }

  const userRole = session?.data?.user?.role;
  
  if (userRole !== "admin") {
    redirect("/");
  }

  return (
    <section className="flex justify-center">
      <AdminPage />
    </section>
  );
}