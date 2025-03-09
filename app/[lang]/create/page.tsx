import Header from "@/components/header";
import prisma from "@/lib/prisma";
import Create from "./create";
import { getDictionary } from "@/lib/dictionary";
import { languageDictionaryType } from "@/lib/types";
import { Locale } from "@/i18n.config";
import ActiveSectionContextProvider from "@/context/active-section-context";
import { auth } from "@/auth";
import PricingPopUp from "@/components/pricing-pop";

export default async function CreatePage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const param = await params;
  const dictionary = (await getDictionary(
    param.lang,
  )) as languageDictionaryType;

  const session = await auth();
  const user = session?.user;

  const prismaUser = await prisma.user.findUnique({
    where: { email: user?.email! },
  });

  return (
    <div className="absolute top-0 min-h-screen w-full">
      {!(prismaUser?.totalCredits! > 0) ? (
        <PricingPopUp dictionary={dictionary} />
      ) : (
        <>
          <ActiveSectionContextProvider>
            <Header dictionary={dictionary} />
          </ActiveSectionContextProvider>
          <Create dictionary={dictionary} />
        </>
      )}
    </div>
  );
}
