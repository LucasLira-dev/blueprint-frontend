'use client';

import { useChangePlanVisibilityMutation, useDeletePlanMutation, useMyPlansQuery } from "@/hooks/usePlans";
import { AlertCircleIcon, Download, FileText, X } from "lucide-react";
import { ChangeVisibilityToogle } from "./ChangeVisibilityToogle";
import { VideoCard } from "./VideoCard";
import { BookCard } from "./BookCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DeletePlanDialog } from "./DeletePlanDialog";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { PlanDetailsSkeleton } from "./PlanDetailsSkeleton";
import { PlanDetailsError } from "./PlanDetailsError";
import { PlanNotFound } from "./PlanNotFound";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

interface PlanDetailsProps {
    planId: string;
    userId: string | undefined;
}

export const PlanDetails = ({ planId, userId }: PlanDetailsProps) => {
    const { data: planDetails, isLoading, error } = useMyPlansQuery(userId!, planId);
    const { mutate: deletePlan } = useDeletePlanMutation(userId!);
    const { mutate: changeVisibility } = useChangePlanVisibilityMutation(userId!);

    const [alert, setAlert] = useState<{ type: 'success' | 'destructive'; message: string } | null>(null);

    const router = useRouter();

    useEffect(() => {
        if (alert) {
            const timer = setTimeout(() => {
                setAlert(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [alert]);

    if (isLoading) {
        return <PlanDetailsSkeleton />;
    }

    if (error) {
        return <PlanDetailsError />
    }

    if (!planDetails) {
        return <PlanNotFound />;
    }

    const handleDeletePlan = (planId: string) => {
        deletePlan(planId, {
            onSuccess: () => {
                router.push('/plans');
            },
            onError: (error) => {
                setAlert({ type: 'destructive', message: `Erro ao deletar o plano: ${error.message}` });
            }
        })
    }

    const handleChangeVisibility = (planId: string, visibility: 'PUBLIC' | 'PRIVATE') => {
        changeVisibility({ planId, visibility }, {
            onSuccess: () => {
                setAlert({ type: 'success', message: `Visibilidade do plano alterada para ${visibility === 'PUBLIC' ? 'Público' : 'Privado'}` });
            }, 
            onError: (error) => {
                setAlert({ type: 'destructive', message: `Erro ao alterar visibilidade do plano: ${error.message}` });
            }
        })
    }

    return (
        <>
        {alert && (
            <div className="fixed top-4 right-4 z-50 w-full max-w-sm">
                <Alert variant={alert.type === 'destructive' ? 'destructive' : 'default'}>
                    <AlertCircleIcon className="h-4 w-4" />
                    <AlertTitle>{alert.type === 'destructive' ? 'Erro' : 'Sucesso'}</AlertTitle>
                    <AlertDescription>{alert.message}</AlertDescription>
                    <button
                        onClick={() => setAlert(null)}
                        className="absolute top-2 right-2 p-1 rounded-full hover:bg-muted/50"
                    >
                        <X className="h-3 w-3" />
                    </button>
                </Alert>
            </div>
        )}
        <article className="flex flex-col gap-12 w-full max-w-5xl px-4 sm:px-6 md:px-8 py-6 sm:py-8 mt-4 sm:mt-8">
            <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                    <Link href="/plans" className="hover:underline">
                        Meus Planos
                    </Link>
                    <span>/</span>
                    <span className="text-foreground font-medium">{planDetails.topic}</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight bg-linear-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent wrap-break-word">
                    {planDetails.topic.toUpperCase()}
                </h1>

                <div className="flex justify-between items-center flex-wrap">
                    <div className="flex flex-wrap items-center gap-3 mt-1">
                        <ChangeVisibilityToogle 
                            visibility={planDetails.visibility}
                            onChangeVisibility={(visibility) => handleChangeVisibility(planDetails.id, visibility)}
                        />
                    </div>
                    <DeletePlanDialog 
                    planTitle={planDetails.topic}
                    planId={planDetails.id}
                    onDelete={handleDeletePlan}
                    />
                </div>
                

                <div className="h-px bg-linear-to-r from-transparent via-border to-transparent w-full" />

                <div className="flex flex-col gap-2 mt-2">
                    <h2 className="text-xl font-semibold tracking-tight">Material em PDF</h2>
                    <div className="mt-2 flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4 sm:gap-5 rounded-2xl border border-border bg-surface/40 p-4 sm:p-5 transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:bg-surface hover:shadow-(--shadow-elegant)]">
                        <div className="grid h-14 w-14 sm:h-16 sm:w-16 shrink-0 place-items-center rounded-xl shadow-(--shadow-glow)]" style={{ background: "var(--gradient-primary)" }}>
                            <FileText className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <div className="font-medium">Guia completo — {planDetails.topic}</div>
                            <div className="mt-0.5 text-sm text-muted-foreground">Roadmap, resumos e exercícios em um único arquivo.</div>
                        </div>
                        <button onClick={() => planDetails.pdfUrl && window.open(planDetails.pdfUrl, '_blank')} className="btn-primary inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium w-full sm:w-auto">
                            <Download className="h-4 w-4" /> Baixar PDF
                        </button>
                    </div>
                </div>
            </div>
            <Tabs defaultValue="videos" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <TabsList variant="line">
                    <TabsTrigger value="videos">Videos</TabsTrigger>
                    <TabsTrigger value="books">Livros</TabsTrigger>
                </TabsList>
                <TabsContent value="videos">
                    <div className="flex flex-col gap-4 mt-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold tracking-tight">
                                Videos recomendados
                            </h2>
                            <span className="text-sm text-muted-foreground">
                                {planDetails.videos.length} videos
                            </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {planDetails.videos.map((video) => (
                                <VideoCard
                                    key={video.id}
                                    title={video.title}
                                    channel={video.channelName}
                                    youtubeUrl={video.videoUrl}
                                    thumbnailUrl={video.thumbnail}
                                />
                            ))}
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="books">
                    <div className="flex flex-col gap-4 mt-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold tracking-tight">
                                Livros recomendados
                            </h2>
                            <span className="text-sm text-muted-foreground">
                                {planDetails.books.length} livros
                            </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {planDetails.books.map((book) => (
                                <BookCard
                                    key={book.id}
                                    title={book.title}
                                    authors={book.authors}
                                    coverImage={book.thumbnail}
                                    bookUrl={book.infoLink}
                                />
                            ))}
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </article>
        </>
    );
}