"use client";
import { useState, useEffect } from "react";
import { useSectionInView } from "@/hooks/hooks";
import { Check } from "lucide-react";
import { Nunito_Sans } from "next/font/google";
import Stripe from "stripe";
import { loadStripe } from "@stripe/stripe-js";
import { getAllActiveProductsWithPrice } from "@/utils/stripe/product";
import { languageDictionaryType } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { signIn } from "next-auth/react";
import { motion } from "motion/react";

const nunito_sans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-comfortaa",
  display: "swap",
});

export function Pricing({
  dictionary,
}: {
  dictionary: languageDictionaryType;
}) {
  const { toast } = useToast();
  const [allProducts, setAllProducts] = useState<Stripe.Product[]>([]);
  const { ref } = useSectionInView("Pricing", 0.5);

  const handleCheckout = async (priceId: string) => {
    try {
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
      );

      if (!stripe) return;

      // Create checkout session
      const response = await fetch("/api/payment/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceId }),
      });

      if (!response.ok) {
        const error = {
          title:
            response.status === 401
              ? dictionary.message.loginFirst
              : dictionary.errors.wentWrong,
          description:
            response.status === 401
              ? dictionary.message.loginFirst
              : dictionary.errors.reload,
          action:
            response.status === 401 ? (
              <ToastAction
                className="rounded-md border border-white/40 px-3 py-1"
                altText={dictionary.message.tryAgain}
                onClick={() => {
                  signIn("google");
                }}
              >
                {dictionary.message.signIn}
              </ToastAction>
            ) : (
              <ToastAction
                className="rounded-md border border-white/40 px-3 py-1"
                altText={dictionary.message.reload}
              >
                {dictionary.message.reload}
              </ToastAction>
            ),
        };
        toast({
          title: error.title,
          description: error.description,
          variant: "destructive",
          action: error.action,
        });
        throw new Error(dictionary.errors.wentWrong);
      }

      const { sessionId } = await response.json();
      await stripe.redirectToCheckout({
        sessionId,
      });
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const activeProducts = await getAllActiveProductsWithPrice();
        console.log(activeProducts, activeProducts?.length);
        setAllProducts(activeProducts);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  if (!(allProducts.length > 0)) return;
  return (
    <div
      className="mx-auto my-10 max-w-screen-lg sm:my-20"
      id="pricing"
      ref={ref}
    >
      <h2 className="my-10 flex items-center justify-center text-center text-3xl font-bold sm:text-start sm:text-2xl md:text-3xl lg:text-4xl">
        {dictionary.pricing.heading}
      </h2>
      {allProducts && (
        <>
          <div className="flex flex-col gap-4 sm:flex-row">
            <motion.div
              initial={{ x: -100 }}
              whileInView={{ x: 0 }}
              transition={{ ease: "easeOut", duration: 1 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-gray-300 px-6 py-12 lg:max-w-96"
            >
              <h2 className="text-2xl font-semibold">{allProducts[0].name}</h2>
              <p className="font-sans text-sm">
                {dictionary.pricing.product_1.tagline}
              </p>
              <p className="mt-1 font-sans text-2xl">
                {/* @ts-expect-error nikhil change this later*/}€
                {allProducts[0].default_price?.unit_amount / 100} / 5{" "}
                {dictionary.message.credits}
              </p>
              <button
                onClick={() => {
                  // @ts-expect-error nikhil change this later
                  handleCheckout(allProducts[0].default_price.id);
                }}
                className={`mt-8 flex w-full justify-center gap-4 rounded-xl border border-black bg-white px-8 py-2 text-center font-bold text-black transition duration-200 hover:bg-teal-500 hover:text-white ${nunito_sans.className}`}
              >
                {allProducts[0].name}
              </button>
              <div className="mt-10 text-sm">
                <p className="flex items-center gap-2">
                  {dictionary.pricing.product_1[1]}
                </p>
                <p className="mt-4 flex items-center gap-2">
                  {dictionary.pricing.product_1[2]}
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ x: 100 }}
              whileInView={{ x: 0 }}
              transition={{ ease: "easeOut", duration: 1 }}
              viewport={{ once: true }}
              className="w-full rounded-2xl border border-gray-300 bg-[#25B1A4] px-6 py-12 text-white"
            >
              <h2 className="text-2xl font-semibold">{allProducts[1].name}</h2>
              <p className="font-sans text-sm">
                {dictionary.pricing.product_2.tagline}
              </p>
              <p className="mt-1 font-sans text-2xl">
                {/* @ts-expect-error nikhil change this later*/}€
                {allProducts[1].default_price?.unit_amount / 100} / 25{" "}
                {dictionary.message.credits}
              </p>
              <button
                onClick={() => {
                  // @ts-expect-error nikhil change this later
                  handleCheckout(allProducts[1].default_price.id);
                }}
                className={`mt-8 flex w-full justify-center gap-4 rounded-xl border border-teal-500 border-transparent bg-white px-8 py-2 text-center font-bold text-black transition duration-200 hover:bg-zinc-300 hover:text-white ${nunito_sans.className}`}
              >
                {allProducts[1].name}
              </button>
              <div className="mt-10 text-sm">
                <p className="flex items-center gap-2">
                  {dictionary.pricing.product_2[1]}
                </p>
                <p className="mt-4 flex items-center gap-2">
                  {dictionary.pricing.product_2[2]}
                </p>
                <p className="mt-4 flex items-center gap-2">
                  {dictionary.pricing.product_2[3]}
                </p>
              </div>
            </motion.div>
          </div>
          <motion.div
            initial={{ y: 100 }}
            whileInView={{ y: 0 }}
            transition={{ ease: "easeOut", duration: 1 }}
            viewport={{ once: true }}
            className="mt-4 w-full rounded-2xl border border-gray-300 bg-[#082A2B] px-6 py-12 text-white"
          >
            <h2 className="text-2xl font-semibold">{allProducts[2].name}</h2>
            <p className="font-sans text-sm">
              {dictionary.pricing.product_3.tagline}
            </p>
            <p className="mt-1 font-sans text-2xl">
              {/* @ts-expect-error nikhil change this later*/}€
              {allProducts[2].default_price?.unit_amount / 100} / 50{" "}
              {dictionary.message.credits}
            </p>
            <button
              onClick={() => {
                // @ts-expect-error nikhil change this later
                handleCheckout(allProducts[2]?.default_price.id);
              }}
              className={`mt-8 flex w-full justify-center gap-4 rounded-xl border border-teal-500 border-transparent bg-white px-8 py-2 text-center font-bold text-black transition duration-200 hover:bg-teal-500/95 hover:text-white ${nunito_sans.className}`}
            >
              {allProducts[2].name}
            </button>
            <div className="mt-10 text-sm">
              <p className="flex items-center gap-2">
                {dictionary.pricing.product_3[1]}
              </p>
              <p className="mt-4 flex items-center gap-2">
                {dictionary.pricing.product_3[2]}
              </p>
              <p className="mt-4 flex items-center gap-2">
                {dictionary.pricing.product_3[3]}
              </p>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}
