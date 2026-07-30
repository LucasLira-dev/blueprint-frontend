import Image from "next/image"
import Link from "next/link";
import { useState } from "react";

interface BookCardProps {
    title: string;
    authors: string[];
    coverImage: string;
    bookUrl: string;
}

export const BookCard = (props: BookCardProps) => {
    const [imgSrc, setImgSrc] = useState(props.coverImage?.replace(/^http:\/\//, "https://") ?? "/book-fallback.webp");

    return (
        <Link
        href={props.bookUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col gap-2 border border-border rounded-lg bg-surface/40 transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:bg-surface hover:shadow-(--shadow-elegant)]">
            <div className="relative w-full h-56 rounded-t-lg overflow-hidden">
                <Image
                    src={imgSrc}
                    alt={`Capa do livro ${props.title}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    quality={90}
                    loading="eager"
                    onError={() => setImgSrc("/book-fallback.webp")}
                />
            </div>
            <div className="flex flex-col gap-1 px-3 pb-3 mt-1">
                <h3 className="font-semibold line-clamp-2">{props.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-1">
                    {props.authors.join(", ")}
                </p>
            </div>
        </Link>
    )
}