import { NextResponse } from "next/server";
import { getAllActiveProductsWithPrice } from "@/utils/stripe/product";

export async function GET() {
  try {
    const activeProducts = await getAllActiveProductsWithPrice();

    if (activeProducts.length === 0) {
      return NextResponse.json(
        { message: "No active products found with valid prices" },
        { status: 404 },
      );
    }

    return NextResponse.json(activeProducts, { status: 200 });
  } catch (error) {
    console.log("Error retrieving prices:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
