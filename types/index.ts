type Video = {
    id: string;
    title: string;
    videoUrl: string;
    videoId: string;
    thumbnail: string | null;
    channelName: string | null;
}

type Book = {
    id: string;
    title: string;
    authors: string[];
    thumbnail: string | null;
    infoLink: string | null;
    description: string | null;
}

export type PlanDetails = {
    id: string;
    userId: string;
    topic: string;
    syllabus: string;
    pdfUrl: string | null;
    visibility: 'PUBLIC' | 'PRIVATE';
    videos: Video[];
    books: Book[];
    hasDeepLearningContent: boolean;
}

export type Plan = {
    id: string;
    topic: string;
    visibility: 'PUBLIC' | 'PRIVATE';
    thumbnail: string | null;
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

export type FavoritePlan = {
    id: string;
    topic: string;
    userName: string;
    thumbnail: string | null;
}

export type User = {
    id: string;
    email: string;
    role: 'user' | 'admin';
    name: string;
}

export type ConversationThread = {
    id: string;
    topic: string;
    threadId: string;
    createdAt: string;
}

export type HistoryMessage = {
    role: 'user' | 'assistant';
    content: string;
}


export type ThreadHistoryResponse = {
    threadId: string;
    messages: HistoryMessage[];
}

export type DeepLearningStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';

export type DeepTopic = {
    id: string;
    slug: string;
    deepLearningContentId: string;
    title: string;
    description: string;
    content: string;
    order: number;
    createdAt?: string;
    updatedAt?: string;
}

export type QuizQuestion = {
    id: string;
    deepLearningContentId: string;
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
    order: number;
}

export type QuizAttempt = {
    id: string;
    userId: string;
    deepLearningContentId: string;
    score: number;
    total: number;
    answers: Record<string, string>;
    createdAt: string;
}

export type DeepLearningContent = {
    id: string;
    studyPlanId: string;
    title: string;
    summary: string;
    status: DeepLearningStatus;
    topics: DeepTopic[];
    questions: QuizQuestion[];
    quizAttempts?: QuizAttempt[];
    createdAt?: string;
    updatedAt?: string;
}


