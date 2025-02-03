import { stripe } from "@/utils/stripe/config";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const userDetails = await auth();

  if (!userDetails) {
    return NextResponse.json(
      {
        error: "Authentication required. Please log in to continue.",
      },
      { status: 401 },
    );
  }

  try {
    const { priceId } = await req.json();

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      // payment_method_types: ["card", "paypal"],
      // nikhil-remove the below one as this you used for testing from your account
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.VERCEL_PROJECT_PRODUCTION_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.VERCEL_PROJECT_PRODUCTION_URL}/`,
      metadata: { userEmail: userDetails?.user?.email || "", priceId },
    });

    return new Response(JSON.stringify({ sessionId: session.id }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  }
}
