"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useActiveSectionContext } from "@/context/active-section-context";
import { cn } from "@/lib/utils";
import { languageDictionaryType } from "@/lib/types";
import Image from "next/image";

export default function Header({
  dictionary,
}: {
  dictionary: languageDictionaryType;
}) {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();
  const links = dictionary.header.links;

  return (
    <header className="z-[999]">
      <div className="fixed left-4 top-0 hidden items-center justify-center sm:top-6 sm:flex sm:rounded-full">
        <Image
          src={"/assets/images/logo.png"}
          width={500}
          height={500}
          alt="logo"
          className="relative -top-5 w-24"
        />
      </div>

      <motion.div
        className="absolute left-1/2 top-0 h-32 w-full rounded-none border border-white border-opacity-40 bg-white bg-opacity-80 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] dark:border-black/40 dark:bg-gray-950 dark:bg-opacity-75 sm:top-6 sm:h-14 sm:w-[31rem] sm:rounded-full"
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
      ></motion.div>

      <motion.div
        className="absolute left-1/2 top-[0.15rem] flex h-32 flex-col items-center justify-center py-2 sm:left-1/2 sm:top-[1.7rem] sm:h-12 sm:py-0"
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
      >
        <Image
          src={"/assets/images/logo.png"}
          width={500}
          height={500}
          alt="logo"
          className="relative top-0 w-24 sm:top-0 sm:hidden"
        />
        <ul className="relative -top-6 flex w-[22rem] flex-wrap items-center justify-center gap-y-1 text-[0.9rem] font-medium text-gray-500 sm:top-0 sm:flex-nowrap sm:gap-5">
          {links.map((link) => (
            <motion.li
              className={cn("relative flex h-3/4 items-center justify-center")}
              key={link.hash}
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <Link
                className={cn(
                  "flex w-full items-center justify-center px-3 py-4 text-gray-950 hover:text-gray-950 dark:text-gray-400 dark:hover:text-gray-300 sm:px-4 sm:py-3",
                  activeSection === link.name && "dark:text-gray-200",
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
      </motion.div>
    </header>
  );
}
