import ActiveSectionContextProvider from "@/context/active-section-context";
import Contact from "@/components/contact";
import { Demo } from "@/components/demo";
import { FAQ } from "@/components/faql";
import Header from "@/components/header";
import Hero from "@/components/hero";
import { Pricing } from "@/components/pricing";
import SectionDivider from "@/components/section-divider";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="px-4">
      <ActiveSectionContextProvider>
        <Header />
        <Hero />
        <SectionDivider />
        <Demo />
        <SectionDivider />
        <Pricing />
        <SectionDivider />
        <FAQ />
        {/* <SectionDivider /> */}
        <Contact />
        <Footer />
      </ActiveSectionContextProvider>
    </div>
  );
}
