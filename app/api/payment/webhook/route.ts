import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/utils/stripe/config";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const endpointSecret = process.env.STRIPE_SECRET_WEBHOOK_KEY!;
  const sig = (await headers()).get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);

    console.log(event, "from webhook");

    const data = event.data.object;
    // const credits =
    //   data.amount_total === 24 ? 5 : data.amount_total === 99 ? 25 : 50;

    console.log(event.data, "from webhook");

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        // Verify the payment status
        if (session.payment_status === "paid") {
          // Update user credits in your database

          await prisma.transactions.create({
            data: {
              amount: data.amount_total,
              email: "email",
              stripePaymentIntentId: session.id,
              userId: session?.metadata?.userId,
            },
          });

          // Send confirmation email
          // await sendEmail({
          //   email: session.customer_details?.email,
          //   orderDetails: {
          //     amount: session.amount_total,
          //     productName: session.metadata.productName,
          //   },
          // });

          // Log successful payment
          console.log("Payment successful:", session.id);
        }
        break;
      }

      case "charge.failed": {
        const charge = event.data.object;
        console.error("Payment failed:", charge.id);
        // Handle failed payment
        // await handleFailedPayment(charge);
        break;
      }

      case "charge.failed": {
        const charge = event.data.object;
        console.error("Payment failed:", charge.id);
        // Handle failed payment
        // await handleFailedPayment(charge);
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Webhook handler failed",
      },
      { status: 400 },
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
