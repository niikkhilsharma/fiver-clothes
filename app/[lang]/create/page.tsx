import Header from "@/components/header";
import Create from "./create";
import { getDictionary } from "@/lib/dictionary";
import { languageDictionaryType } from "@/lib/types";
import { Locale } from "@/i18n.config";
import ActiveSectionContextProvider from "@/context/active-section-context";

export default async function CreatePage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const param = await params;
  const dictionary = (await getDictionary(
    param.lang,
  )) as languageDictionaryType;

  return (
    <div className="min-h-screen">
      <ActiveSectionContextProvider>
        <Header dictionary={dictionary} />
      </ActiveSectionContextProvider>
      <Create dictionary={dictionary} />
    </div>
  );
}
