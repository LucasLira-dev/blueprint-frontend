import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"

interface DeepLearningCardProps {
    title: string;
    thumbnail: string;
    planId: string;
}

export const DeepLearningCard = ({ title, thumbnail, planId }: DeepLearningCardProps) => {
    return (
        <Link
            href={`/plans/${planId}/deep-learning`}
            className="group flex flex-col w-full border border-border/60 rounded-xl overflow-hidden bg-card hover:shadow-lg hover:border-primary/50 transition-all duration-200 cursor-pointer"
        >
            <div className="relative w-full aspect-video overflow-hidden">
                <Image
                    src={thumbnail}
                    alt={`Thumbnail do aprendizado ${title}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="flex items-center gap-1 text-white text-sm font-medium">
                        Ver aprendizado <ChevronRight className="h-4 w-4" />
                    </span>
                </div>
            </div>

            <div className="p-4">
                <h3 className="font-semibold text-base truncate">{title}</h3>
            </div>
        </Link>
    )
}