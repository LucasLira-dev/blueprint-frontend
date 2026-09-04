export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import { LoginComponent } from "@/components/auth/LoginComponent";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function LoginPage() {

  let session = null;
  const headersList = await headers();

  try {
    session = await authClient.getSession({
      fetchOptions: {
        headers: headersList,
      }
    });
  } catch (error) {
    console.error("Error fetching session:", error);
  }

  console.log("Session data from login page:", session);  

  if (session?.data) {
    redirect("/")
  }

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:block relative w-1/2 opacity-60">
        <Image
          loading="eager"
          src="/authLogo.jpeg"
          alt="Blueprint Logo"
          fill
          className="object-cover"
        />
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4 mt-4">
              Bem-vindo de<br />volta.
            </h1>
            <p className="text-muted-foreground">
              Entre para continuar seus blueprints.
            </p>
          </div>
          <div className="p-3">
            <LoginComponent />
          </div>

          <p className="text-center mt-6 text-muted-foreground mb-4">
            Não tem conta?{' '}
            <Link href="/register" className="text-foreground font-medium hover:underline">
              Criar conta
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}