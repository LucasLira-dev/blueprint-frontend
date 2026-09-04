'use client';

import Image from "next/image";
import Link from "next/link";
import { RegisterComponent } from "@/components/auth/RegisterComponent";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loading } from "@/components/Loading";

export default function RegisterPage() {

    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;
  
    useEffect(() => {
      if (!isPending && user) {
        router.replace("/");
      }
    }, [isPending, router, user]);
  
    if (isPending) {
      return (
        <Loading />
      );
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
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 md:px-8 mt-4">
        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-4">
              Crie sua conta.
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto">
              Comece a criar seus blueprints personalizados.
            </p>
          </div>
          <RegisterComponent />

          <p className="text-center mt-6 md:mt-8 text-sm sm:text-base text-muted-foreground mb-4">
            Já tem uma conta?{' '}
            <Link href="/login" className="text-foreground font-medium hover:underline">
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
