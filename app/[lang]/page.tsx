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

export default async function Home({ params }: { params: { lang: Locale } }) {
  const param = await params;
  const dictionary = await getDictionary(param.lang);

  return (
    <div className="px-4 pt-28 sm:pt-36">
      <ActiveSectionContextProvider>
        <Header dictionary={dictionary} />
        <Hero dictionary={dictionary} />
        <SectionDivider />
        <Demo dictionary={dictionary} />
        <SectionDivider />
        <Pricing dictionary={dictionary} />
        <SectionDivider />
        <FAQ dictionary={dictionary} />
        {/* <SectionDivider /> */}
        <Contact dictionary={dictionary} />
        <Footer dictionary={dictionary} />
      </ActiveSectionContextProvider>
    </div>
  );
}
