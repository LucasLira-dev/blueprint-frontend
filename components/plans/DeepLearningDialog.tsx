'use client';

import { useState } from "react";
import { Brain, Check, Circle, Loader2, TriangleAlert, X } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { DEEP_LEARNING_STEPS, useDeepLearning } from "@/hooks/useDeepLearning";
import Link from "next/link";

interface DeepLearningDialogProps {
    planId: string;
}

type StepState = 'pending' | 'running' | 'done' | 'error';

export const DeepLearningDialog = ({ planId }: DeepLearningDialogProps) => {
    const [open, setOpen] = useState(false);
    const { events, isStreaming, error, result, generate, reset } = useDeepLearning();

    const eventByStep = new Map(events.map((event) => [event.step, event]));

    const getStepState = (step: string): StepState => {
        if (error && !eventByStep.has(step)) {
            console.log('Error occurred: ', error);
            const running = events.some((e) => e.status === 'start' && e.step === step);
            return running ? 'error' : 'pending';
        }
        const event = eventByStep.get(step);
        if (!event) return 'pending';
        if (event.status === 'done') return 'done';
        if (event.status === 'error') return 'error';
        return 'running';
    };

    const handleOpenChange = (nextOpen: boolean) => {
        setOpen(nextOpen);
        if (!nextOpen) {
            reset();
        }
    };

    const handleGenerate = () => {
        setOpen(true);
        generate(planId);
    };

    const completedCount = DEEP_LEARNING_STEPS.filter((s) => getStepState(s.step) === 'done').length;
    const isFinished = Boolean(result) || Boolean(error);

    return (
        <>
            <Button onClick={handleGenerate} className="btn-primary inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium w-full sm:w-auto cursor-pointer">
                <Brain className="h-4 w-4" /> Gerar aprendizado profundo
            </Button>

            <Dialog open={open} onOpenChange={handleOpenChange}>
                <DialogContent className="sm:max-w-lg" showCloseButton={false}>
                    <DialogHeader>
                        <DialogTitle className="flex items-center justify-center gap-2">
                            {isStreaming ? <Loader2 className="h-5 w-5 animate-spin text-primary" /> : error ? <TriangleAlert className="h-5 w-5 text-destructive" /> : <Brain className="h-5 w-5 text-primary" />}
                            {isStreaming ? 'Gerando aprendizado profundo' : error ? 'Falha na geração' : result ? 'Aprendizado concluído' : 'Como funciona'}
                        </DialogTitle>
                        <DialogDescription className="text-center text-sm text-muted-foreground">
                            Construindo seu material...
                        </DialogDescription>
                    </DialogHeader>

                    <ol className="flex flex-col gap-2 text-left">
                        {DEEP_LEARNING_STEPS.map((step, index) => {
                            const state = getStepState(step.step);
                            const label = eventByStep.get(step.step)?.label;

                            return (
                                <li key={step.step} className="flex gap-3 rounded-lg border border-border/60 bg-muted/30 p-3">
                                    <div className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-border bg-background text-xs font-semibold">
                                        {state === 'done' ? (
                                            <Check className="h-3.5 w-3.5 text-emerald-500" />
                                        ) : state === 'running' ? (
                                            <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                                        ) : state === 'error' ? (
                                            <TriangleAlert className="h-3.5 w-3.5 text-destructive" />
                                        ) : (
                                            <span className="text-muted-foreground">{index + 1}</span>
                                        )}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-1.5 text-sm font-medium">
                                            {step.title}
                                            {state === 'pending' && !isStreaming && <Circle className="h-2 w-2 text-muted-foreground" />}
                                        </div>
                                        <p className="mt-0.5 text-sm text-muted-foreground">
                                            {label ?? 'Aguardando...'}
                                        </p>
                                    </div>
                                </li>
                            );
                        })}
                    </ol>

                    {error && (
                        <div className="flex gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive truncate items-center justify-center w-full">
                            <TriangleAlert className=" h-4 w-4 shrink-0" />
                            <span>Erro ao gerar o aprendizado</span>
                        </div>
                    )}

                    {result && !error && (
                        <div className="rounded-lg border border-border bg-muted/50 p-3 text-sm text-muted-foreground">
                            Aprendizado salvo com sucesso. ID: <span className="font-mono text-xs text-foreground">{result.deepLearningContentId}</span>
                        </div>
                    )}

                    {isStreaming && (
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                            <div
                                className="h-full rounded-full transition-all duration-500"
                                style={{ width: `${(completedCount / DEEP_LEARNING_STEPS.length) * 100}%`, background: "var(--gradient-primary)" }}
                            />
                        </div>
                    )}

                    <DialogFooter>
                        {isStreaming ? (
                            <DialogClose render={<Button variant="outline" />}>
                                <X className="h-4 w-4" /> Parar
                            </DialogClose>
                        ) : (
                            <>
                                {isFinished && (
                                    error ? (
                                        <Button onClick={handleGenerate} variant="outline" className="p-3">
                                            Tentar novamente
                                        </Button>
                                    ) : (
                                        <Link href={`/plans/${planId}/deep-learning`} className="p-3">
                                            <Button className="w-full">
                                                <Check className="h-4 w-4" /> Visualizar aprendizado
                                            </Button>
                                        </Link>
                                    )
                                )}
                                <DialogClose render={<Button />}>Fechar</DialogClose>
                            </>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
