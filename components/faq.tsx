"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSectionInView } from "@/hooks/hooks";
import { languageDictionaryType } from "@/lib/types";

export function FAQ({ dictionary }: { dictionary: languageDictionaryType }) {
  const { ref } = useSectionInView("FAQ", 0.5);

  const faqs = dictionary.faq.questions;

  return (
    <div className="mx-auto max-w-screen-lg" ref={ref} id="faq">
      <h2 className="my-10 flex items-center justify-center text-center text-3xl font-bold sm:text-start sm:text-2xl md:text-3xl lg:text-4xl">
        {dictionary.faq.heading}
      </h2>
      <Accordion type="single" collapsible className="space-y-4">
        {faqs.map((item: { question: string; answer: string }, i: number) => (
          <AccordionItem
            key={i}
            value={`item-${i + 1}`}
            className="rounded-2xl border-none bg-gray-200/60 p-4"
          >
            <AccordionTrigger className="font-bold hover:no-underline sm:text-lg">
              {item?.question}
            </AccordionTrigger>
            <AccordionContent className="text-xs sm:text-base">
              {item?.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
