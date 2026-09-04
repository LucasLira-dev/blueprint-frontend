import Link from "next/link";
import { Hero } from "@/components/Hero";

import { RESOURCES, STEPS } from "@/constants/index";
import { NewPlanButton } from "@/components/NewPlanButton";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";

export default async function Home() {

  let session = null;

  const headersList = await headers();

  try {
    session = await authClient.getSession({
      fetchOptions: {
        headers: headersList,
      },
    });
  }
  catch (error) {
    console.error("Error fetching session:", error);
  }

  console.log("Session data:", session);

  const hasSession = Boolean(session?.data?.user?.id);
  
  return (
    <div
      className="flex min-h-dvh flex-col bg-background bg-(image:--gradient-hero) bg-no-repeat text-foreground"
    >
      <header className="fixed top-0 left-0 right-0 z-50 glass-panel">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt=""
              width={1024}
              height={1024}
              className="h-8 w-8 sm:h-11 sm:w-11 md:h-12 md:w-12"
            />
            <span className="text-base font-semibold sm:text-lg">Blueprint</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <Link href="#como-funciona" className="hover:text-foreground transition-colors">
              Como funciona
            </Link>
            <Link href="#recursos" className="hover:text-foreground transition-colors">
              Recursos
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 text-sm">
            <Link href={hasSession ? "/plans" : "/login"} className="text-muted-foreground hover:text-foreground transition-colors">
              {hasSession ? "Planos" : "Entrar"}
            </Link>
            <NewPlanButton hasSession={hasSession} className="btn-primary rounded-full px-3 py-1.5 text-primary-foreground sm:px-4" />
          </div>
        </nav>
      </header>

      <Hero hasSession={hasSession} />

      <section id="como-funciona" className="py-24 px-6 bg-surface/30">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-16">
            Do objetivo ao domínio, em<br />
            três telas.
          </h2> 
          <div className="space-y-32">
            {STEPS.map((item, index) => (
              <div
                key={item.id}
                className={`flex flex-col md:flex-row items-center gap-12 ${
                  index % 2 !== 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-primary text-lg font-medium">{item.step}</span>
                    <div className="h-px w-12 bg-primary/30" />
                    <span className="text-muted-foreground font-medium">{item.stepName}</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-medium tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {item.description}
                  </p>
                </div>
                <div className="group flex-1 w-full transition-transform duration-300 hover:-translate-y-1">
                  <div className="relative rounded-xl border border-primary/20 bg-surface p-2 shadow-2xl shadow-primary/10 transition-colors duration-300 group-hover:border-primary/60">
                    <div className="flex items-center gap-2 px-3 py-2 border-b border-primary/10">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                      </div>
                      <span className="text-xs text-muted-foreground ml-2">{item.label}</span>
                    </div>
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={800}
                      height={450}
                      className="w-full h-auto rounded-b-lg"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="recursos" className="py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-16">
            Tudo o que você precisa para
            <br />
            estudar melhor.
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {RESOURCES.map((item) => (
              <div
                key={item.title}
                className="glass-panel border rounded-2xl p-8 transition-colors hover:border-primary/30"
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
            <Image
              src="/logo.png"
              alt=""
              width={1024}
              height={1024}
              className="h-5 w-5"
            />
            <span>Blueprint</span>
          </div>
          <p>© 2026 Blueprint. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
