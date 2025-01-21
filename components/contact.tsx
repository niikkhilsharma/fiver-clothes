"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSectionInView } from "@/hooks/hooks";
import { sendEmail } from "@/actions/sendEmail";
import SubmitBtn from "./submit-btn";
import toast from "react-hot-toast";
import { languageDictionaryType } from "@/lib/types";

export default function Contact({
  dictionary,
}: {
  dictionary: languageDictionaryType;
}) {
  const { ref } = useSectionInView("Contact");

  return (
    <motion.section
      id="contact"
      ref={ref}
      className="mx-auto mt-6 w-[min(100%,38rem)] max-w-screen-lg py-10 text-center sm:mt-12"
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
      viewport={{
        once: true,
      }}
    >
      <h2 className="mb-8 text-center text-3xl font-medium capitalize">
        {dictionary.contact.heading}
      </h2>

      <p className="-mt-6 text-gray-700">
        {dictionary.contact.subHeading[1]}
        <a className="mx-1 underline" href="mailto:example@gmail.com">
          {dictionary.contact.subHeading[2]}
        </a>
        {dictionary.contact.subHeading[2]}
      </p>

      <form
        className="mt-10 flex flex-col"
        action={async (formData) => {
          const { error } = await sendEmail(formData);

          if (error) {
            toast.error(error);
            return;
          }

          toast.success(dictionary.contact.toastMessages.mailSentSuccess);
        }}
      >
        <input
          className="h-14 rounded-lg border border-black px-4 transition-all"
          name="senderEmail"
          type="email"
          required
          maxLength={500}
          placeholder={dictionary.contact.placeHolder.input}
        />
        <textarea
          className="my-3 h-52 rounded-lg border border-black p-4 transition-all"
          name="message"
          placeholder={dictionary.contact.placeHolder.textarea}
          required
          maxLength={5000}
        />
        <SubmitBtn dictionary={dictionary} />
      </form>
    </motion.section>
  );
}
