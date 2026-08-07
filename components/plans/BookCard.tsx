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
            className="group flex flex-col border border-border/60 rounded-xl overflow-hidden bg-card hover:shadow-lg hover:border-primary/50 transition-all duration-200"
        >
            <div className="relative w-full h-56 overflow-hidden">
                <Image
                    src={imgSrc}
                    alt={`Capa do livro ${props.title}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    quality={90}
                    onError={() => setImgSrc("/book-fallback.webp")}
                />
            </div>
            <div className="flex flex-col gap-1 p-4">
                <h3 className="font-semibold text-sm line-clamp-2">{props.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-1">
                    {props.authors.join(", ")}
                </p>
            </div>
        </Link>
    )
}