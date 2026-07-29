import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Hero } from "@/components/Hero";

import { RESOURCES, STEPS } from "@/contants/index";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";
import { NewPlanButton } from "@/components/NewPlanButton";

export default async function Home() {

  let session = null;

  session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    }
  })

  const hasSession = !!session?.data?.user?.id;

  return (
    <div
      className="flex min-h-screen flex-col bg-background bg-(image:--gradient-hero) bg-fixed bg-no-repeat text-foreground"
    >
      <header className="fixed top-0 left-0 right-0 z-50 glass-panel">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">Blueprint</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <Link href="#como-funciona" className="hover:text-foreground transition-colors">
              Como funciona
            </Link>
            <Link href="#recursos" className="hover:text-foreground transition-colors">
              Recursos
            </Link>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <Link href={hasSession ? "/planos" : "/login"} className="text-muted-foreground hover:text-foreground transition-colors">
              {hasSession ? "Planos" : "Entrar"}
            </Link>
            <NewPlanButton hasSession={hasSession} className="btn-primary rounded-full px-5 py-2.5 font-medium text-white"/>
          </div>
        </nav>
      </header>

      <Hero hasSession={hasSession} />

      <section id="como-funciona" className="py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <p className="text-primary text-sm font-medium mb-4">Como funciona</p>
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-16">
            Três passos até seu blueprint.
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {STEPS.map((item) => (
              <div
                key={item.id}
                className="glass-panel rounded-2xl p-8 transition-colors hover:border-primary/30"
              >
                <span className="text-primary text-sm font-medium">
                  {item.step}
                </span>
                <h3 className="text-xl font-medium mt-4 mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="recursos" className="py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <p className="text-primary text-sm font-medium mb-4">Recursos</p>
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-16">
            Tudo o que você precisa para
            <br />
            estudar melhor.
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {RESOURCES.map((item) => (
              <div
                key={item.title}
                className="glass-panel rounded-2xl p-8 transition-colors hover:border-primary/30"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-6">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="mt-auto border-t border-border py-8 px-6 ">
        <div className="mx-auto max-w-6xl flex flex-col gap-2 sm:flex-row items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>Blueprint</span>
          </div>
          <p>© 2026 Blueprint. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
