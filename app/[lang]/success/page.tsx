import { Suspense } from "react";
import { getDictionary } from "@/lib/dictionary";
import { Locale } from "@/i18n.config";
import { languageDictionaryType } from "@/lib/types";
import Success from "./success";

export default async function SuccessPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const param = await params;
  const dictionary = (await getDictionary(
    param.lang,
  )) as languageDictionaryType;

  return (
    <Suspense>
      <Success dictionary={dictionary} />
    </Suspense>
  );
}
