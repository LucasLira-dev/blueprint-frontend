export type Plan = {
    id: string;
    topic: string;
    visibility: 'PUBLIC' | 'PRIVATE';
    thumbnail: string | null;
}


export type PlansResponse = {
    plans: Plan[];
}