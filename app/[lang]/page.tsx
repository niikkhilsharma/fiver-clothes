import ActiveSectionContextProvider from "@/context/active-section-context";
import Contact from "@/components/contact";
import { Demo } from "@/components/demo";
import { FAQ } from "@/components/faq";
import Header from "@/components/header";
import Hero from "@/components/hero";
import { Pricing } from "@/components/pricing";
import SectionDivider from "@/components/section-divider";
import Footer from "@/components/footer";
import { getDictionary } from "@/lib/dictionary";
import { Locale } from "@/i18n.config";
import { languageDictionaryType } from "@/lib/types";
import HeroContact from "@/components/hero-contact";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const param = await params;
  const dictionary = (await getDictionary(
    param.lang,
  )) as languageDictionaryType;

  return (
    <div className="overflow-hidden px-4 pt-40 sm:pt-36">
      <ActiveSectionContextProvider>
        <Header dictionary={dictionary} />
        <Hero dictionary={dictionary} />
        <SectionDivider />
        <Demo dictionary={dictionary} />
        <SectionDivider />
        <Pricing dictionary={dictionary} />
        <SectionDivider />
        <HeroContact dictionary={dictionary} />
        <FAQ dictionary={dictionary} />
        <Contact dictionary={dictionary} />
        <Footer dictionary={dictionary} />
      </ActiveSectionContextProvider>
    </div>
  );
}
