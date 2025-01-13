"use client";

import { useState, useEffect } from "react";
import { useSectionInView } from "@/lib/hooks";
import { Check } from "lucide-react";
import { Nunito_Sans } from "next/font/google";
import axios from "axios";
import Stripe from "stripe";
import { loadStripe } from "@stripe/stripe-js";
import { getAllActiveProductsWithPrice } from "@/utils/stripe/product";

const nunito_sans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-comfortaa",
  display: "swap",
});

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
);

export function Pricing() {
  const [allProducts, setAllProducts] = useState<Stripe.Product[] | null>();
  const { ref } = useSectionInView("Pricing", 0.5);

  const handleCheckout = async (priceId: string) => {
    try {
      const stripe = (await stripePromise)!;

      // Create checkout session
      const response = await fetch("/api/payment/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceId }),
      });

      const { sessionId } = await response.json();
      console.log(sessionId, "from here");
      const result = await stripe.redirectToCheckout({
        sessionId,
      });

      if (result.error) {
        console.error(result.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const activeProducts = await getAllActiveProductsWithPrice();
        setAllProducts(activeProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div
      className="mx-auto my-10 max-w-screen-lg sm:my-20"
      id="pricing"
      ref={ref}
    >
      <h2 className="my-10 flex items-center justify-center text-center text-3xl font-bold sm:text-start sm:text-2xl md:text-3xl lg:text-4xl">
        Get Started With polara
      </h2>
      {allProducts && (
        <>
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="rounded-xl border border-gray-300 px-6 py-12 lg:max-w-96">
              <h2 className="text-2xl font-semibold">{allProducts[0].name}</h2>
              <p className="font-sans text-sm">{allProducts[0].description}</p>
              <p className="mt-1 font-sans text-2xl">
                $ {allProducts[0].default_price?.unit_amount / 100} / 5 credits
              </p>
              <button
                onClick={() => {
                  handleCheckout(allProducts[0].default_price.id);
                }}
                className={`mt-8 flex w-full justify-center gap-4 rounded-xl border border-black bg-white px-8 py-2 text-center font-bold text-black transition duration-200 hover:bg-teal-500 hover:text-white ${nunito_sans.className}`}
              >
                {allProducts[0].name}
              </button>
              <div className="mt-10 text-sm">
                <p className="flex items-center gap-2">
                  <Check size={26} className="mr-1" />
                  Get credits to try polara on your own clothes
                </p>
                <p className="mt-4 flex items-center gap-2">
                  <Check size={34} className="mr-1" />
                  Pay-as-you-go by purchasing the generation credits you need
                </p>
              </div>
            </div>
            <div className="w-full rounded-xl border border-gray-300 bg-[#25B1A4] px-6 py-12 text-white">
              <h2 className="text-2xl font-semibold">{allProducts[2].name}</h2>
              <p className="font-sans text-sm">{allProducts[2].description}</p>
              <p className="mt-1 font-sans text-2xl">
                $ {allProducts[2].default_price?.unit_amount / 100} / 25 credits
              </p>
              <button
                onClick={() => {
                  handleCheckout(allProducts[2].default_price.id);
                }}
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
            <h2 className="text-2xl font-semibold">{allProducts[1].name}</h2>
            <p className="font-sans text-sm">{allProducts[1].description}</p>
            <p className="mt-1 font-sans text-2xl">
              $ {allProducts[1].default_price?.unit_amount / 100} / 50 credits
            </p>
            <button
              onClick={() => {
                handleCheckout(allProducts[1].default_price.id);
              }}
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
        </>
      )}
    </div>
  );
}
