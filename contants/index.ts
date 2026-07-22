import { BookOpen, Calendar, Share2, Target, Video, Zap } from "lucide-react"

export const STEPS = [
    {
        id: 1,
        step: "01",
        title: "Descreva seu objetivo",
        description:
            "Diga o que quer aprender e em quanto tempo. A IA cuida do resto.",
    },
    {
        id: 2,
        step: "02",
        title: "Receba seu blueprint",
        description:
            "Cronograma semanal com recursos selecionados e marcos claros.",
    },
    {
        id: 3,
        step: "03",
        title: "Estude e evolua",
        description:
            "Acompanhe o progresso, ajuste o ritmo e compartilhe com sua equipe.",
    },
]

export const RESOURCES = [
    {
        icon: Calendar,
        title: "Timeline semanal",
        description:
            "Divisão inteligente por semana com metas mensuráveis.",
    },
    {
        icon: Video,
        title: "Vídeos curados",
        description:
            "Aulas selecionadas do YouTube e plataformas confiáveis.",
    },
    {
        icon: BookOpen,
        title: "Livros recomendados",
        description:
            "Bibliografia essencial e complementar para cada tema.",
    },
    {
        icon: Zap,
        title: "Streaming em tempo real",
        description:
            "Veja o plano sendo construído token a token.",
    },
    {
        icon: Target,
        title: "Foco em resultado",
        description:
            "Objetivos SMART e checkpoints avaliáveis.",
    },
    {
        icon: Share2,
        title: "Compartilhe fácil",
        description:
            "Exporte em PDF ou envie um link público.",
    }
]