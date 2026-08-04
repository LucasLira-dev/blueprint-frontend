type Video = {
    id: string;
    title: string;
    videoUrl: string;
    thumbnail: string;
    channelName: string;
}

type Book = {
    id: string;
    title: string;
    authors: string[];
    thumbnail: string;
    infoLink: string;
    description: string;
}

export type PlanDetails = {
    id: string;
    userId: string;
    topic: string;
    syllabus?: string | null;
    pdfUrl?: string | null;
    visibility: 'PUBLIC' | 'PRIVATE';
    videos: Video[];
    books: Book[];
}

export type Plan = {
    id: string;
    topic: string;
    visibility: 'PUBLIC' | 'PRIVATE';
    thumbnail: string | null;
}


export type PlansResponse = {
    plans: Plan[];
}

export type PublicPlan = {
    id: string;
    userName: string;
    topic: string;
    visibility: 'PUBLIC' | 'PRIVATE';
    thumbnail: string | null;
    isFavorite: boolean;
    totalFavorites: number;
}

export type PublicPlansResponse = {
    plans: PublicPlan[];
    totalUserFavorites: number;
}