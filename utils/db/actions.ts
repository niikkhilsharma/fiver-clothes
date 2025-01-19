import prisma from "@/lib/prisma";
import Stripe from "stripe";

export type transactionDetails = {
  userEmail: string;
  priceId: string;
  created: number;
  currency: string | null;
  customerDetails: Stripe.Checkout.Session.CustomerDetails | null;
  amount: number | null;
};

export async function getUser({ email }: { email: string }) {
  const user = await prisma.user.findUnique({ where: { email: email } });
  console.log(user, "from actions");
  return user;
}

export async function reduceUserCredits({
  email,
  reduceBy,
}: {
  email: string;
  reduceBy: number;
}) {
  const user = await getUser({ email });

  if (!user) {
    return;
  }

  const updatedUser = await prisma.user.update({
    where: { email: email },
    data: {
      totalCredits: user?.totalCredits - reduceBy,
      usedCredits: user.usedCredits + reduceBy,
    },
  });
  console.log(updatedUser);
  return updatedUser;
}

export async function createTransaction({
  transactionDetails,
  creditsToProvide,
}: {
  transactionDetails: transactionDetails;
  creditsToProvide: number;
}) {
  const user = await getUser({ email: transactionDetails.userEmail });
  const updatedUser = await prisma.user.update({
    where: { email: transactionDetails.userEmail },
    data: { totalCredits: user?.totalCredits! + 4 },
  });

  console.log(
    updatedUser,
    "this is the updated user after the payment is done and his credits updated",
    "credits to update = ",
    creditsToProvide,
  );

  console.log("webhook create Transaction fun run");
  console.log(transactionDetails);
}
