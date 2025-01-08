"use client";

import { useSectionInView } from "@/lib/hooks";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BsArrow90DegRight } from "react-icons/bs";

export default function Hero() {
  const { ref } = useSectionInView("Home", 0.5);
  return (
    <div
      className="mx-auto flex min-h-screen max-w-screen-lg items-center justify-center gap-4 px-4"
      id="home"
      ref={ref}
    >
      <div className="w-1/2 font-comfortaa">
        <h1 className="text-5xl font-bold leading-tight">
          AI-Generated Fashion Models: Revolutionizing How You Showcase Apparel
        </h1>
        <p className="my-8 text-xl font-medium">
          Generate AI models wearing your products using only one flat-lay image
          and drive more sales.
        </p>
        <button className="mt-8 flex gap-4 rounded-md border-2 border-transparent bg-teal-500 px-8 py-2 font-bold text-white transition duration-200 hover:border-teal-500 hover:bg-white hover:text-black">
          <Link
            href="/create"
            className="flex h-full w-full items-center justify-center gap-4"
          >
            Try Now <ArrowRight />
          </Link>
        </button>
      </div>
      <div className="w-1/2">
        <div className="relative flex">
          <Image
            className="absolute bottom-20 h-36 w-24 rounded-xl"
            src={
              "https://framerusercontent.com/images/xsrDZQ3sXOBS6ZGmlAZvakVfofU.webp?scale-down-to=1024"
            }
            alt="AI-Generated Fashion Models"
            width={50}
            height={50}
          />
          <BsArrow90DegRight className="absolute bottom-60 left-8 text-5xl text-gray-300" />
          <Image
            className="ml-24 h-1/2 rounded-xl"
            src={
              "https://framerusercontent.com/images/CxtfLWyxYWoXZbavuYgdHQROs.png"
            }
            alt="AI-Generated Fashion Models"
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
  );
}
