"use client";

import { Merriweather } from "next/font/google";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import clsx from "clsx";
import { useActiveSectionContext } from "@/context/active-section-context";
import { cn } from "@/lib/utils";
import { languageDictionaryType } from "@/lib/types";
import Image from "next/image";

const merriweather = Merriweather({
  weight: ["400"],
  subsets: ["latin"],
});

export default function Header({
  dictionary,
}: {
  dictionary: languageDictionaryType;
}) {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();
  const links = dictionary.header.links;

  return (
    <header className="relative z-[999] overflow-x-hidden">
      <div className="fixed left-4 top-0 hidden items-center justify-center sm:top-6 sm:flex sm:rounded-full">
        <Link href={"/"}>
          <Image
            src={"/assets/images/logo.jpg"}
            width={1024}
            height={1024}
            alt="logo"
            className="h-12 w-12"
          />
        </Link>
      </div>
      <motion.div
        className="fixed left-1/2 top-0 h-[4.5rem] w-full rounded-none border border-white border-opacity-40 bg-white bg-opacity-80 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] dark:border-black/40 dark:bg-gray-950 dark:bg-opacity-75 sm:top-6 sm:h-[3.25rem] sm:w-[30rem] sm:rounded-full"
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
      ></motion.div>
      <nav className="fixed left-1/2 top-[0.15rem] flex h-12 -translate-x-1/2 py-2 sm:top-[1.7rem] sm:h-[initial] sm:py-0">
        <ul className="flex w-[22rem] flex-wrap items-center justify-center gap-y-1 text-[0.9rem] font-medium text-gray-500 sm:flex-nowrap sm:gap-5">
          {links.map((link) => (
            <motion.li
              className={cn("relative flex h-3/4 items-center justify-center")}
              key={link.hash}
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <Link
                className={clsx(
                  "flex w-full items-center justify-center px-3 py-3 transition hover:text-gray-950 dark:text-gray-500 dark:hover:text-gray-300",
                  {
                    "text-gray-950 dark:text-gray-200":
                      activeSection === link.key,
                  },
                )}
                href={link.hash}
                onClick={() => {
                  setActiveSection(link.key);
                  setTimeOfLastClick(Date.now());
                }}
              >
                {link.name}

                {link.key === activeSection && (
                  <motion.span
                    className="absolute inset-0 -z-10 rounded-full bg-gray-100 dark:bg-gray-800"
                    layoutId="activeSection"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  ></motion.span>
                )}
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
