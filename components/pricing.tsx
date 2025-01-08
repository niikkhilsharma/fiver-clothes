"use client";

import { useSectionInView } from "@/lib/hooks";
import { Check } from "lucide-react";
import { Nunito_Sans } from "next/font/google";
const nunito_sans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-comfortaa",
  display: "swap",
});

export function Pricing() {
  const { ref } = useSectionInView("Pricing", 0.5);
  return (
    <div className="mx-auto my-20 max-w-screen-lg" id="pricing" ref={ref}>
      <h2 className="mb-16 text-center text-4xl font-bold">
        Get Started With polara
      </h2>
      <div className="flex gap-4">
        <div className="rounded-xl border border-gray-300 px-6 py-12 lg:max-w-96">
          <h2 className="text-2xl font-semibold">Free</h2>
          <p className="font-sans text-sm">
            For individuals getting started with polara
          </p>
          <button
            className={`mt-8 flex w-full justify-center gap-4 rounded-xl border border-teal-500 border-transparent bg-white px-8 py-2 text-center font-bold text-black transition duration-200 hover:bg-teal-500 hover:text-white ${nunito_sans.className}`}
          >
            Get Started For Free
          </button>
          <div className="mt-10 text-sm">
            <p className="flex items-center gap-2">
              <Check size={26} className="mr-1" />
              Free credits to try polara on your own clothes
            </p>
            <p className="mt-4 flex items-center gap-2">
              <Check size={34} className="mr-1" />
              Pay-as-you-go by purchasing the generation credits you need
            </p>
          </div>
        </div>
        <div className="w-full rounded-xl border border-gray-300 bg-[#25B1A4] px-6 py-12 text-white">
          <h2 className="text-2xl font-semibold">Monthly Plans</h2>
          <p className="font-sans text-sm">
            For growing brands with reccurent needs
          </p>
          <button
            className={`mt-8 flex w-full justify-center gap-4 rounded-xl border border-teal-500 border-transparent bg-white px-8 py-2 text-center font-bold text-black transition duration-200 hover:bg-zinc-300 hover:text-white ${nunito_sans.className}`}
          >
            Explore Plans
          </button>
          <div className="mt-10 text-sm">
            <p className="flex items-center gap-2">
              <Check size={22} className="mr-1" />
              Monthly generations
            </p>
            <p className="mt-4 flex items-center gap-2">
              <Check size={22} className="mr-1" />
              Early access to new features
            </p>
            <p className="mt-4 flex items-center gap-2">
              <Check size={22} className="mr-1" />
              Priority support
            </p>
          </div>
        </div>
      </div>
      <div className="mt-4 w-full rounded-xl border border-gray-300 bg-[#082A2B] px-6 py-12 text-white">
        <h2 className="text-2xl font-semibold">Enterprise Scale</h2>
        <p className="font-sans text-sm">
          For large organizations with custom AI needs and high-volume
          processing
        </p>
        <button
          className={`mt-8 flex w-full justify-center gap-4 rounded-xl border border-teal-500 border-transparent bg-white px-8 py-2 text-center font-bold text-black transition duration-200 hover:bg-teal-500/95 hover:text-white ${nunito_sans.className}`}
        >
          Contact Sales
        </button>
        <div className="mt-10 text-sm">
          <p className="flex items-center gap-2">
            <Check size={22} className="mr-1" />
            Tailored monthly or annual generations
          </p>
          <p className="mt-4 flex items-center gap-2">
            <Check size={22} className="mr-1" />
            Overnight batch process hundreds of clothing items
          </p>
          <p className="mt-4 flex items-center gap-2">
            <Check size={22} className="mr-1" />
            Dedicated compute infrastructure
          </p>
        </div>
      </div>
    </div>
  );
}
