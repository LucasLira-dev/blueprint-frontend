"use client";

import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionPanel,
} from "@/components/ui/accordion";
import type { DeepTopic } from "@/types";
import { TopicProse } from "./TopicProse";

interface TopicAccordionProps {
  topics: DeepTopic[];
  defaultOpenSlug?: string;
}

export const TopicAccordion = ({ topics, defaultOpenSlug }: TopicAccordionProps) => {
  if (!topics || topics.length === 0) return null;

  const defaultValue = [defaultOpenSlug ?? topics[0].slug];

  return (
    <Accordion defaultValue={defaultValue} className="flex flex-col gap-3">
      {topics.map((topic, index) => (
        <AccordionItem
          key={topic.id}
          value={topic.slug}
          className="rounded-2xl border border-border/70 bg-surface/40 transition-colors hover:border-border data-open:border-primary/40 data-open:bg-surface/60"
        >
          <AccordionHeader className="w-full">
            <AccordionTrigger className="px-4 py-4 sm:px-5 sm:py-5 cursor-pointer">
              <div className="flex min-w-0 flex-1 items-start gap-3 sm:gap-4">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border/70 bg-background/80 text-xs font-semibold tabular-nums text-muted-foreground transition-colors group-data-open/accordion-item:text-primary">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block text-base font-semibold text-foreground sm:text-lg">
                    {topic.title}
                  </span>
                  {topic.description && (
                    <span className="mt-1 block text-sm text-muted-foreground">
                      {topic.description}
                    </span>
                  )}
                </div>
              </div>
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionPanel className="border-t border-border/60 px-4 pb-5 pt-5 sm:px-5 sm:pb-6">
            <TopicProse content={topic.content} />
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};