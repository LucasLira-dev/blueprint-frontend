'use client';

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import { NewPlanButton } from "./NewPlanButton";

interface HeroProps {
  hasSession: boolean;
  isPending?: boolean;
}

export const Hero = ({ hasSession, isPending }: HeroProps) => {

    useGSAP(() => {
        const media = gsap.matchMedia();

        media.add("(prefers-reduced-motion: no-preference)", () => {
            const timeline = gsap.timeline({ defaults: { duration: 1, ease: "power2.out" } });

            timeline.from(".hero h1", { x: -150, opacity: 0, stagger: 0.2 });

            timeline.from(".hero p", { y: 50, opacity: 0 }, "-=0.5");
        });
    })

    return (
      <section className="relative flex flex-col items-center justify-center min-h-dvh px-4 sm:px-6 text-center hero overflow-hidden">
        <div className="hidden sm:block">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/background.jpeg')" }}
          />
          <div className="absolute inset-0 bg-primary/20 mix-blend-overlay" />
          <div className="absolute inset-0 md:bg-linear-to-b lg:bg-linear-to-t from-background/5 via-background/95 to-background/95" />
          <div className="absolute inset-0 pointer-events-none bg-(image:--gradient-hero) bg-no-repeat" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto mt-16">
          <h1 className="font-display text-5xl sm:text-5xl md:text-7xl font-medium tracking-[-0.035em] leading-[1.05] mb-4 sm:mb-6">
            O plano de estudos <span className="text-primary">mais</span>{" "}
            <span className="text-primary">inteligente do mundo.</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-foreground max-w-2xl mx-auto mb-8 sm:mb-10">
            Do zero ao domínio de qualquer assunto — cronograma, vídeos e
            livros gerados sob medida em segundos.
          </p>

          {isPending ? (
            <div
              aria-label="Carregando plano"
              aria-busy="true"
              className="inline-flex h-12 animate-pulse items-center justify-center gap-2 rounded-lg bg-muted/80 px-6 py-3 shadow-sm"
            >
              <div className="h-5 w-5 rounded-full bg-primary" />
              <div className="h-4 w-20 rounded-full bg-primary" />
            </div>
          ) : (
            <NewPlanButton
              hasSession={hasSession}
              className="rounded-lg bg-primary px-6 py-3 text-primary-foreground hover:bg-primary/90"
            >
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </NewPlanButton>
          )}
        </div>
      </section>
    )
}