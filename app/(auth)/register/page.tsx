import Link from "next/link";
import { Sparkles } from "lucide-react";
import { RegisterComponent } from "@/components/auth/RegisterComponent";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function RegisterPage() {

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
    <div className="min-h-screen bg-background flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 glass-panel">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">Blueprint</span>
          </Link>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 pt-24">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">
              Crie sua conta.
            </h1>
            <p className="text-muted-foreground">
              Comece a criar seus blueprints personalizados.
            </p>
          </div>

          <RegisterComponent />

          <p className="text-center mt-6 text-muted-foreground">
            Já tem uma conta?{' '}
            <Link href="/login" className="text-foreground font-medium hover:underline">
              Entrar
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
