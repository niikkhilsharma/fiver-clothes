"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faq } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";

export function FAQ() {
  const { ref } = useSectionInView("FAQ", 0.5);

  return (
    <div className="mx-auto max-w-screen-lg" ref={ref} id="faq">
      <h2 className="my-10 flex items-center justify-center text-center text-3xl font-bold sm:text-start sm:text-2xl md:text-3xl lg:text-4xl">
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible className="space-y-4">
        {faq.map((item, i) => (
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
