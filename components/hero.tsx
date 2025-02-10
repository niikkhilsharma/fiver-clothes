"use client";

import { useSectionInView } from "@/hooks/hooks";
import {
  ArrowRight,
  Check,
  CircleCheckBig,
  Clock8,
  LaptopMinimalCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import { useSession, signIn } from "next-auth/react";
import { languageDictionaryType } from "@/lib/types";
import { motion } from "motion/react";
import { Button } from "./ui/button";

export default function Hero({
  dictionary,
}: {
  dictionary: languageDictionaryType;
}) {
  const { ref } = useSectionInView("Home", 0.5);
  const session = useSession();

  return (
    <div className="mx-auto max-w-screen-lg" id="home" ref={ref}>
      <div className="flex flex-col sm:flex-row">
        <motion.div
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ ease: "easeOut", duration: 1 }}
          className="w-full font-comfortaa sm:flex sm:w-1/2 sm:flex-col sm:justify-center"
        >
          <Balancer className="text-center text-3xl font-bold sm:text-start sm:text-2xl md:text-3xl lg:text-4xl">
            {dictionary.hero.title}
          </Balancer>
          <div className="my-6 text-center text-lg font-semibold sm:text-start sm:text-base lg:text-xl">
            {dictionary.hero.description}
          </div>

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
                  signIn("google", { redirectTo: "/create" });
                }}
              >
                {dictionary.hero.try_now} <ArrowRight />
              </button>
            )}
          </div>
        </motion.div>
        <motion.div
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ ease: "easeOut", duration: 1 }}
          className="flex w-full justify-center sm:w-1/2"
        >
          <Image
            className="w-full max-w-96 rounded-full sm:w-4/5 sm:max-w-full"
            src={
              "https://framerusercontent.com/images/CCAGhjHOco1Av6XJ4xBcPD6liI.png"
            }
            alt="AI-Generated Fashion Models"
            width={500}
            height={500}
          />
        </motion.div>
      </div>
      <div className="flex w-1/2 flex-wrap gap-4">
        <Button className="rounded-full bg-background text-xs text-foreground">
          <Check /> Full Usage Rights
        </Button>
        <Button className="rounded-full bg-background text-xs text-foreground">
          <LaptopMinimalCheck />
          Scale Instantly
        </Button>
        <Button className="rounded-full bg-background text-xs text-foreground">
          <CircleCheckBig /> 24 Hours Delivery
        </Button>
        <Button className="rounded-full bg-background text-xs text-foreground">
          <Clock8 /> Any product, Any Model, Any Location
        </Button>
      </div>
    </div>
  );
}
