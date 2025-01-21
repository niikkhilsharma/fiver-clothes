import { languageDictionaryType } from "@/lib/types";
import React from "react";

export default function Footer(dictionary: languageDictionaryType) {
  return (
    <footer className="mb-10 px-4 text-center text-gray-500">
      <small className="mb-2 block text-xs">
        &copy; {dictionary.dictionary.footer.allRightReserved}
      </small>
      <p className="text-xs">
        <span className="font-semibold">
          {dictionary.dictionary.footer.subHeading[1]}:
        </span>
        {dictionary.dictionary.footer.subHeading[2]}
      </p>
    </footer>
  );
}
