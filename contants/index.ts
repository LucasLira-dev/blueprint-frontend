import { BookOpen, Calendar, Share2, Target, Video, Zap } from "lucide-react"

export const STEPS = [
    {
        id: 1,
        step: "01",
        title: "Descreva seu objetivo",
        description:
            "Digite o que quer aprender no chat. A IA extrai o tema, nivel e intencao automaticamente.",
    },
    {
        id: 2,
        step: "02",
        title: "Receba seu blueprint",
        description:
            "Cronograma em markdown com videos do YouTube, livros do Google Books e um PDF pronto.",
    },
    {
        id: 3,
        step: "03",
        title: "Organize e compartilhe",
        description:
            "Salve seus planos, baixe o PDF, explore planos publicos de outros usuarios e favorite os melhores.",
    },
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