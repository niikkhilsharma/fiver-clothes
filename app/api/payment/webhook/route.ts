import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { createTransaction } from "@/utils/db/actions";
import { stripe } from "@/utils/stripe/config";

const endpointSecret = process.env.STRIPE_SECRET_WEBHOOK_KEY!;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = (await headers()).get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    console.log(err);
    return new Response(`Webhook Error: ${err}`, {
      status: 400,
    });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("Processing checkout session:", session.id);

      const transactionDetails = {
        userEmail: session.metadata?.userEmail!,
        priceId: session.metadata?.priceId!,
        created: session.created,
        currency: session.currency,
        customerDetails: session.customer_details,
        amount: session.amount_total!,
      };

      console.log(session, "from session");

      const creditAmounts: { [key: number]: number } = {
        2400: 5,
        9900: 25,
        16000: 50,
      };
      const creditsToProvide =
        creditAmounts[session.amount_total as number] ?? 0;

      try {
        await createTransaction({ transactionDetails, creditsToProvide });
        console.log("Successfully processed session:", session.id);
      } catch (error) {
        console.log("Error processing transaction:", error);

        return NextResponse.json(
          { error: "Failed to process transaction" },
          { status: 500 },
        );
      }
      break;
    }

    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log("Payment succeeded:", paymentIntent.id);
      break;
    }

    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log("Payment failed:", paymentIntent.id);
      break;
    }

    default: {
      console.log(`Unhandled event type: ${event.type}`);
    }
  }
  return NextResponse.json({ received: true }, { status: 200 });
}
