import ActiveSectionContextProvider from "@/context/active-section-context";
import Contact from "@/components/contact";
import { Demo } from "@/components/demo";
import { FAQ } from "@/components/faql";
import Header from "@/components/header";
import Hero from "@/components/hero";
import { Pricing } from "@/components/pricing";

export default function Home() {
  return (
    <div>
      <ActiveSectionContextProvider>
        <Header />
        <Hero />
        <Demo />
        <Pricing />
        <FAQ />
        <Contact />
      </ActiveSectionContextProvider>
    </div>
  );
}
