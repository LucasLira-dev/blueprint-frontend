export const dynamic = "force-dynamic";

import Link from "next/link";
import { LoginComponent } from "@/components/auth/LoginComponent";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function LoginPage() {

  let session = null;
  try {
    session = await authClient.getSession({
      fetchOptions: {
        headers: await headers()
      }
    });
  } catch (error) {
    console.error("Error fetching session:", error);
  }

  if (session?.data) {
    redirect("/")
  }

  return (
    <div className="min-h-screen bg-background flex flex-col p-2 my-5 sm:my-0">
      <main className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">
              Bem-vindo de<br />volta.
            </h1>
            <p className="text-muted-foreground">
              Entre para continuar seus blueprints.
            </p>
          </div>
          <div className="p-3">
            <LoginComponent />
          </div>

          <p className="text-center mt-6 text-muted-foreground">
            Não tem conta?{' '}
            <Link href="/register" className="text-foreground font-medium hover:underline">
              Criar conta
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}