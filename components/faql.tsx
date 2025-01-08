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
      <h2 className="mb-10 text-center text-4xl font-bold">
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible className="space-y-4 px-4">
        {faq.map((item, i) => (
          <AccordionItem
            key={i}
            value={`item-${i + 1}`}
            className="rounded-2xl border-none bg-gray-200/60 p-4"
          >
            <AccordionTrigger className="text-lg font-bold hover:no-underline">
              {item?.question}
            </AccordionTrigger>
            <AccordionContent className="">{item?.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
