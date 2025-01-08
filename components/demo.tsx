"use client";

import { useSectionInView } from "@/lib/hooks";
import { Compare } from "./ui/compare";

export function Demo() {
  const { ref } = useSectionInView("Demo", 0.5);
  return (
    <div className="p-4" ref={ref} id="demo">
      <div className="mx-auto max-w-screen-lg">
        <h2 className="mb-16 text-center text-4xl font-bold">
          Features That Transform Your Fashion Imagery
        </h2>
        <div className="flex gap-4">
          <Compare
            firstImage="/1.jpg"
            secondImage="https://framerusercontent.com/images/c4EmAOZOYrRIJT54hh20j6k9G4.png"
            firstImageClassName="object-cover object-left-top"
            secondImageClassname="object-cover object-left-top"
            className="h-[200px] w-[200px] md:h-[500px] md:w-[500px]"
            slideMode="hover"
          />
          <Compare
            firstImage="/2a.webp"
            secondImage="/2b.png"
            firstImageClassName="object-cover object-left-top"
            secondImageClassname="object-cover object-left-top"
            className="h-[200px] w-[200px] md:h-[500px] md:w-[500px]"
            slideMode="hover"
          />
          <Compare
            firstImage="/3a.webp"
            secondImage="/3b.png"
            firstImageClassName="object-cover object-left-top"
            secondImageClassname="object-cover object-left-top"
            className="h-[200px] w-[200px] md:h-[500px] md:w-[500px]"
            slideMode="hover"
          />
        </div>
      </div>
    </div>
  );
}
