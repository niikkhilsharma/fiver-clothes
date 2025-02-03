"use server";

import { stripe } from "@/utils/stripe/config";
import Stripe from "stripe";

// Type definitions
export interface PriceData {
  amount: number;
  currency: string;
  id: string;
  recurring: Stripe.Price.Recurring | null;
}

export interface ProductWithPrice {
  id: string;
  name: string;
  description: string | null;
  images: string[];
  active: boolean;
  default_price: PriceData;
}

export type StripProductWithPrice = Stripe.Product & Stripe.Price;

// Functions

export async function getAllActiveProductsWithPrice() {
  const allProducts = await stripe.products.list({
    active: true,
    expand: ["data.default_price"],
  });

  // Filter products that have the metadata category = "AI_Clothes_getpolara"
  const filteredProducts = allProducts.data.filter((product) => {
    return product.metadata.category === "AI_Clothes_getpolara";
  });

  return filteredProducts;
}

export async function convertPriceIdToPrice(
  priceId: string,
): Promise<PriceData> {
  if (!priceId) {
    throw new Error("Price ID is required");
  }

  const price = await stripe.prices.retrieve(priceId);

  return {
    amount: (price.unit_amount ?? 0) / 100,
    currency: price.currency,
    id: price.id,
    recurring: price.recurring,
  };
}

export async function createProducts() {
  try {
    // 1. Basic Plan
    const basicProduct = await stripe.products.create({
      name: "Basic Plan",
      description: "Perfect for quick and small projects. Includes 5 Credits.",
      metadata: {
        credits: "5",
      },
    });

    const basicPrice = await stripe.prices.create({
      product: basicProduct.id,
      unit_amount: 2400, // 24 EUR in cents
      currency: "eur",
    });

    // Set as default price
    await stripe.products.update(basicProduct.id, {
      default_price: basicPrice.id,
    });

    // 2. Standard Plan
    const standardProduct = await stripe.products.create({
      name: "Standard Plan",
      description:
        "Ideal for frequent users and mid-sized projects. Includes 25 Credits.",
      metadata: {
        credits: "25",
      },
    });

    const standardPrice = await stripe.prices.create({
      product: standardProduct.id,
      unit_amount: 9900, // 99 EUR in cents
      currency: "eur",
    });

    await stripe.products.update(standardProduct.id, {
      default_price: standardPrice.id,
    });

    // 3. Premium Plan
    const premiumProduct = await stripe.products.create({
      name: "Premium Plan",
      description:
        "Best value for professionals and large projects. Includes 50 Credits.",
      metadata: {
        credits: "50",
      },
    });

    const premiumPrice = await stripe.prices.create({
      product: premiumProduct.id,
      unit_amount: 16000, // 160 EUR in cents
      currency: "eur",
    });

    await stripe.products.update(premiumProduct.id, {
      default_price: premiumPrice.id,
    });

    console.log("Products created successfully!");
    console.log("\nBasic Plan:");
    console.log("Product ID:", basicProduct.id);
    console.log("Price ID:", basicPrice.id);

    console.log("\nStandard Plan:");
    console.log("Product ID:", standardProduct.id);
    console.log("Price ID:", standardPrice.id);

    console.log("\nPremium Plan:");
    console.log("Product ID:", premiumProduct.id);
    console.log("Price ID:", premiumPrice.id);
  } catch (error) {
    console.log("Error creating products:", error);
  }
}

export async function deleteAllProducts() {
  try {
    // First, list all products
    const products = await stripe.products.list({
      limit: 100, // Adjust if you have more products
      active: true,
    });

    console.log(`Found ${products.data.length} products to delete...`);

    // Delete each product
    for (const product of products.data) {
      // Get all prices associated with this product
      const prices = await stripe.prices.list({
        product: product.id,
      });

      // Deactivate all prices first
      for (const price of prices.data) {
        await stripe.prices.update(price.id, { active: false });
        console.log(`Deactivated price: ${price.id}`);
      }

      // Then delete the product
      await stripe.products.del(product.id);
      console.log(`Deleted product: ${product.name} (${product.id})`);
    }

    console.log(
      "\nAll products and their prices have been deleted successfully!",
    );
  } catch (error) {
    console.log("Error deleting products:", error);
  }
}
