import Image from "next/image"
import Link from "next/link";

interface VideoCardProps {
    title: string;
    channel: string;
    youtubeUrl: string;
    thumbnailUrl: string;
}

export const VideoCard = (props: VideoCardProps) => {
    return (
        <Link
        href={props.youtubeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col gap-2 border-2 border-border rounded-t-lg rounded-b-lg bg-surface/40 transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:bg-surface hover:shadow-(--shadow-elegant)]">
            <div className="relative w-full h-48 rounded-t-lg overflow-hidden">
                <Image
                    src={props.thumbnailUrl ?? "/ytb-fallback.webp"}
                    alt={`Thumbnail do plano ${props.title}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    loading="eager"
                />
            </div>
            <div className="flex flex-col gap-2 px-3 pb-3 mt-2 mb-1 rounded-b-lg">
                <h3 className="font-semibold line-clamp-2">{props.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-1"> {props.channel} </p>
            </div>
        </Link>
    )
}