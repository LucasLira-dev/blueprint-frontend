'use client';

import { CirclePause, Play } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface AudioSummaryProps {
  syllabus: string;
}

export function AudioSummary({ syllabus }: AudioSummaryProps) {
  const [speaking, setSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [speechAvailable, setSpeechAvailable] = useState<boolean | null>(null);
  const utterancesRef = useRef<SpeechSynthesisUtterance[]>([]);

  useEffect(() => {
    if (
      !('speechSynthesis' in window) ||
      !('SpeechSynthesisUtterance' in window)
    ) {
      const unsupportedCheck = setTimeout(
        () => setSpeechAvailable(false),
        0,
      );
      return () => clearTimeout(unsupportedCheck);
    }

    const updateAvailability = () => {
      setSpeechAvailable(window.speechSynthesis.getVoices().length > 0);
    };

    updateAvailability();
    window.speechSynthesis.addEventListener('voiceschanged', updateAvailability);

    const fallbackCheck = setTimeout(updateAvailability, 1000);

    return () => {
      clearTimeout(fallbackCheck);
      window.speechSynthesis.removeEventListener(
        'voiceschanged',
        updateAvailability,
      );
      window.speechSynthesis?.cancel();
      utterancesRef.current = [];
    };
  }, []);

  if (speechAvailable !== true) {
    return null;
  }

  function generateAudio() {
    setError(null);

    if (!syllabus.trim()) {
      setError('O resumo é obrigatório.');
      return;
    }

    try {
      if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) {
        setError('A síntese de voz não é compatível com este navegador.');
        return;
      }

      window.speechSynthesis.cancel();
      utterancesRef.current = [];

      const voices = window.speechSynthesis.getVoices();
      const voice =
        voices.find((item) => item.lang.toLowerCase() === 'pt-br') ??
        voices.find((item) => item.lang.toLowerCase().startsWith('pt'));
      const chunks = syllabus.trim().match(/[^.!?]+[.!?]+|[^.!?]+$/g) ?? [];
      const textChunks = chunks.flatMap((chunk) => {
        const text = chunk.trim();
        return text.match(/.{1,220}(?:\s|$)/g) ?? [text];
      });

      let completed = 0;
      const utterances = textChunks.map((chunk) => {
        const utterance = new SpeechSynthesisUtterance(chunk.trim());
        utterance.lang = 'pt-BR';
        if (voice) utterance.voice = voice;
        utterance.onstart = () => setSpeaking(true);
        utterance.onend = () => {
          completed += 1;
          if (completed === utterances.length) setSpeaking(false);
        };
        utterance.onerror = (event) => {
          if (event.error === 'canceled' || event.error === 'interrupted') {
            return;
          }    
          console.error('Erro na síntese de voz:', event.error);
          window.speechSynthesis.cancel();
          setSpeaking(false);
          setError(`Não foi possível reproduzir o áudio (${event.error}).`);
        };
        return utterance;
      });

      utterancesRef.current = utterances;
      setTimeout(() => {
        utterances.forEach((utterance) => window.speechSynthesis.speak(utterance));
      }, 0);
    } catch (speechError) {
      console.error('Erro na síntese de voz:', speechError);
      setSpeaking(false);
      setError('Não foi possível reproduzir o áudio.');
    }
  }

  function stopAudio() {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }

  return (
    <section className="space-y-4">
      <div
        onClick={speaking ? stopAudio : generateAudio}
        className="flex items-center gap-2 rounded-md mt-1 cursor-pointer"
        aria-label='Ouvir resumo em áudio'
      >
       {
        speaking ?  (
          <Tooltip disabled={!syllabus.trim()}>
            <TooltipTrigger> 
              <CirclePause size={16} />
            </TooltipTrigger>
            <TooltipContent>
              <p>Parar</p>
            </TooltipContent>
          </Tooltip>
      ) : (
          <Tooltip disabled={!syllabus.trim()}>
            <TooltipTrigger>
              <Play size={16} />
            </TooltipTrigger>
            <TooltipContent>
              <p>Ouvir</p>
            </TooltipContent>
          </Tooltip>
      )
       }
      </div>

      {error && <p role="alert">{error}</p>}
    </section>
  );
}