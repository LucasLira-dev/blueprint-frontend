import { BookOpen, Calendar, Share2, Target, Video, Zap } from "lucide-react"

export const STEPS = [
    {
        id: 1,
        step: "01",
        stepName: "Criação",
        label: "/plans/new",
        title: "Descreva seu objetivo em uma frase.",
        description:
            "Um chat simples: diga o que quer aprender, seu nível e quanto tempo tem. A IA monta o plano em segundos, com streaming em tempo real.",
        image: "/image1.png",
    },
    {
        id: 2,
        step: "02",
        stepName: "Seus planos",
        label: "/plans",
        title: "Todos os seus planos em um só lugar.",
        description:
            "Acesse seus blueprints, explore planos públicos de outros usuários e favorite os melhores para consultar depois.",
        image: "/image2.png",
    },
    {
        id: 3,
        step: "03",
        stepName: "Compartilhe",
        label: "/plans/myPlan",
        title: "Compartilhe e baixe em PDF.",
        description:
            "Salve seus planos, baixe o PDF pronto para estudar offline e compartilhe seu conhecimento com a comunidade.",
        image: "/image3.png",
    },
    {
        id: 4,
        step: "04",
        stepName: "Planos públicos",
        label: "/explore",
        title: "Explore planos de outros usuários.",
        description:
            "Acesse planos públicos de outros usuários, explore e favorite os melhores para consultar depois.",
        image: "/image4.png",
    }
]

export const RESOURCES = [
    {
        icon: Calendar,
        title: "Cronograma com IA",
        description:
            "Syllabus semanal gerado por inteligencia artificial, sob medida para seu tema.",
    },
    {
        icon: Video,
        title: "Videos do YouTube",
        description:
            "Top 10 videos relevantes buscados automaticamente via YouTube Data API.",
    },
    {
        icon: BookOpen,
        title: "Livros do Google Books",
        description:
            "Top 10 livros encontrados pela Google Books API, com capa, autores e link.",
    },
    {
        icon: Zap,
        title: "Streaming em tempo real",
        description:
            "Acompanhe o progresso da geracao: moderacao, busca de videos, livros e mais.",
    },
    {
        icon: Target,
        title: "PDF automatico",
        description:
            "Plano exportado em PDF com syllabus, videos e livros, pronto para baixar.",
    },
    {
        icon: Share2,
        title: "Planos publicos",
        description:
            "Explore planos de outros usuarios, favorite os melhores e compartilhe seu conhecimento.",
    }
]