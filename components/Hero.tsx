'use client';

import Link from "next/link"
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface HeroProps {
  hasSession: boolean;
}

export const Hero = ({ hasSession }: HeroProps) => {

    useGSAP(() => {
        const timeline = gsap.timeline({ defaults: { duration: 1, ease: "power2.out" } });

        timeline.from(".hero h1", { x: -150, opacity: 0, stagger: 0.2 });

        timeline.from(".hero p", { y: 50, opacity: 0 }, "-=0.5");
        
    })

    return (
        <section className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center hero">
        <div className="absolute inset-0 pointer-events-none bg-(image:--gradient-hero) bg-no-repeat" />

        <div className="relative z-10 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-medium tracking-tight leading-[1.05] mb-6">
            <span className="text-1"> O plano de estudos <span className="text-primary">mais</span> </span>
            <span className="text-primary text-2">inteligente do mundo.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Do zero ao domínio de qualquer assunto — cronograma, vídeos e
            livros gerados sob medida em segundos.
          </p>

          <Link
            href={hasSession ? "/chat/new" : "/login"}
            className="btn-primary inline-flex items-center gap-2 rounded-full px-8 py-4 text-lg font-medium"
          >
            {hasSession ? "Novo plano" : "Começar"}
            <span className="text-xl">→</span>
          </Link>
        </div>
      </section>
    )
}