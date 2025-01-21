"use client";

import { useSectionInView } from "@/hooks/hooks";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import { useSession, signIn } from "next-auth/react";
import { languageDictionaryType } from "@/lib/types";

export default function Hero({
  dictionary,
}: {
  dictionary: languageDictionaryType;
}) {
  const { ref } = useSectionInView("Home", 0.5);
  const session = useSession();

  return (
    <div
      className="mx-auto flex max-w-screen-lg flex-col sm:flex-row"
      id="home"
      ref={ref}
    >
      <div className="w-full font-comfortaa sm:flex sm:w-1/2 sm:flex-col sm:justify-center">
        <Balancer className="text-center text-3xl font-bold sm:text-start sm:text-2xl md:text-3xl lg:text-4xl">
          {dictionary.hero.title}
        </Balancer>
        <Balancer className="my-6 text-center text-lg font-semibold sm:text-start sm:text-base lg:text-xl">
          {dictionary.hero.description}
        </Balancer>

        <div className="mb-10 mt-2 flex justify-center sm:mb-0 sm:justify-start">
          {session.status === "authenticated" ? (
            <button className="flex gap-4 rounded-md border-2 border-transparent bg-teal-500 px-8 py-2 font-bold text-white transition duration-200 hover:border-teal-500 hover:bg-white hover:text-black">
              <Link
                href={"/create"}
                className="flex h-full w-full items-center justify-center gap-4"
              >
                {dictionary.hero.try_now} <ArrowRight />
              </Link>
            </button>
          ) : (
            <button
              className="flex items-center justify-center gap-4 rounded-md border-2 border-transparent bg-teal-500 px-8 py-2 font-bold text-white transition duration-200 hover:border-teal-500 hover:bg-white hover:text-black"
              onClick={() => {
                signIn("google");
              }}
            >
              {dictionary.hero.try_now} <ArrowRight />
            </button>
          )}
        </div>
      </div>
      <div className="flex w-full justify-center sm:w-1/2">
        <Image
          className="w-full max-w-96 rounded-full sm:w-4/5 sm:max-w-full"
          src={
            "https://framerusercontent.com/images/CCAGhjHOco1Av6XJ4xBcPD6liI.png"
          }
          alt="AI-Generated Fashion Models"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
}
