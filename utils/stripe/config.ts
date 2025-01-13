import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // @ts-ignore
  apiVersion: null,
  // Register this as an official Stripe plugin.
  appInfo: {
    name: "Polara Subscription Starter",
    version: "0.0.0",
    url: "https://www.getpolara.ai/",
  },
});
