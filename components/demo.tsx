"use client";

import { useSectionInView } from "@/hooks/hooks";
import { languageDictionaryType } from "@/lib/types";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

export function Demo({ dictionary }: { dictionary: languageDictionaryType }) {
  const { ref } = useSectionInView("Demo", 0.5);
  const speed = "fast";
  const direction = "left";

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isLoaded) {
      addAnimation();
      setIsLoaded(true);
    }
  }, [isLoaded]);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      // Clone the entire content twice to ensure smooth infinite scroll
      const scrollerContent = Array.from(scrollerRef.current.children);

      // Add two sets of clones to ensure continuous scroll
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse",
      );
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      const duration =
        speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s";
      containerRef.current.style.setProperty("--animation-duration", duration);
    }
  };

  const images = [
    ["1a.webp", "1b.webp"],
    ["2a.webp", "2b.webp"],
    ["3a.webp", "3b.webp"],
    ["4a.webp", "4b.webp"],
    ["5a.webp", "5b.webp"],
    ["6a.webp", "6b.webp"],
    ["7a.webp", "7b.webp"],
  ];

  return (
    <div ref={ref} id="demo">
      <div className="mx-auto max-w-screen-lg">
        <h2 className="my-10 flex items-center justify-center text-center text-3xl font-bold sm:text-start sm:text-2xl md:text-3xl lg:text-4xl">
          {dictionary.demo.heading}
        </h2>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <div
            ref={containerRef}
            className="relative w-full overflow-hidden bg-gray-100 py-10 dark:bg-transparent"
          >
            <div
              ref={scrollerRef}
              className="animate-scroll flex w-max overflow-hidden whitespace-nowrap"
            >
              {images.map((pair, index) => (
                <div
                  key={index}
                  className="mx-2 flex min-w-max space-x-4 rounded-lg bg-white p-4 shadow-lg"
                >
                  {pair.map((src, i) => (
                    <Image
                      width={600}
                      height={794}
                      key={i}
                      src={`/assets/images/slider/${src}`}
                      alt={`Image ${index + 1}${i === 0 ? "a" : "b"}`}
                      className="h-60 w-60 object-cover"
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
