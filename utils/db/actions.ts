import prisma from "@/lib/prisma";
import Stripe from "stripe";

export type transactionDetails = {
  userEmail: string;
  priceId: string;
  created: number;
  currency: string | null;
  customerDetails: Stripe.Checkout.Session.CustomerDetails | null;
  amount: number;
};

export async function getUser({ email }: { email: string }) {
  try {
    const user = await prisma.user.findUnique({ where: { email: email } });
    console.log(user, "from actions");
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
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
  try {
    console.log(transactionDetails);
    const user = await getUser({
      email: transactionDetails.customerDetails?.email!,
    });

    if (!user) {
      throw new Error(
        `User not found with email ${transactionDetails.userEmail}`,
      );
    }

    const updatedUser = await prisma.user.update({
      where: {
        email: transactionDetails.customerDetails?.email!,
      },
      data: {
        totalCredits: user.totalCredits + creditsToProvide,
        amountPaid: user.amountPaid + transactionDetails.amount,
      },
    });

    console.log(updatedUser, creditsToProvide);
    console.log("Transaction created.");
    console.log(transactionDetails);

    return updatedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
