"use client";

import { useSectionInView } from "@/hooks/hooks";
import { Compare } from "./ui/compare";
import { languageDictionaryType } from "@/lib/types";

export function Demo(dictionary: languageDictionaryType) {
  const { ref } = useSectionInView("Demo", 0.5);

  return (
    <div ref={ref} id="demo">
      <div className="mx-auto max-w-screen-lg">
        <h2 className="my-10 flex items-center justify-center text-center text-3xl font-bold sm:text-start sm:text-2xl md:text-3xl lg:text-4xl">
          {dictionary.dictionary.demo.heading}
        </h2>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Compare
            firstImage="/assets/images/3a.webp"
            secondImage="/assets/images/3a.webp"
            firstImageClassName="object-cover object-left-top"
            secondImageClassname="object-cover object-left-top"
            className="aspect-video w-4/5 md:h-[500px] md:w-[500px]"
            slideMode="drag"
            compare={false}
          />
          <Compare
            firstImage="/assets/images/m.png"
            secondImage="/assets/images/m.png"
            firstImageClassName="object-cover object-left-top"
            secondImageClassname="object-cover object-left-top"
            className="aspect-video w-4/5 md:h-[500px] md:w-[500px]"
            slideMode="drag"
            compare={false}
          />
          <Compare
            firstImage="/assets/images/3a.webp"
            secondImage="/assets/images/3b.png"
            firstImageClassName="object-cover object-left-top"
            secondImageClassname="object-cover object-left-top"
            className="aspect-video w-4/5 md:h-[500px] md:w-[500px]"
            slideMode="hover"
          />
        </div>
      </div>
    </div>
  );
}
