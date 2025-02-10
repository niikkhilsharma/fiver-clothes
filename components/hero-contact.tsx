"use client";

import { useSectionInView } from "@/hooks/hooks";
import { languageDictionaryType } from "@/lib/types";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import React from "react";

const HeroContact = ({
  dictionary,
}: {
  dictionary: languageDictionaryType;
}) => {
  const { ref } = useSectionInView("Home", 0.5);

  return (
    <div
      className="mx-auto my-20 max-w-screen-lg px-4"
      id="heroContact"
      ref={ref}
    >
      <h1 className="text-center text-3xl font-bold md:text-4xl">
        {dictionary.hero.hero_contact.heading}
      </h1>
      <p className="mx-auto my-8 max-w-[80ch] text-center md:max-w-prose">
        {dictionary.hero.hero_contact.content}
      </p>
      <Button className="mx-auto flex gap-4 bg-white font-bold text-black hover:bg-gray-300 hover:text-white">
        {dictionary.hero.hero_contact.contact_btn}
        <ArrowRight />
      </Button>
    </div>
  );
};

export default HeroContact;
