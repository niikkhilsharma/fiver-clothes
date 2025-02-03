"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { languageDictionaryType } from "@/lib/types";

interface PaymentStatus {
  status: "success" | "failed" | "processing";
  customerEmail?: string;
  amount?: number;
  orderDetails?: {
    productName: string;
    quantity: number;
  };
}

function Success({ dictionary }: { dictionary: languageDictionaryType }) {
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const verifyPayment = async () => {
      const sessionId = searchParams.get("session_id");

      if (!sessionId) {
        router.push("/");
        return;
      }

      try {
        const response = await fetch("/api/payment/verify-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sessionId }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error);
        }

        setPaymentStatus(data);
      } catch (error) {
        setPaymentStatus({ status: "failed" });
        console.log(dictionary.payment.failed.paymentVerification, error);
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [searchParams, router]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-teal-500" />
        <p className="mt-4 text-lg">{dictionary.payment.verifying}</p>
      </div>
    );
  }

  if (!paymentStatus || paymentStatus.status === "failed") {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <XCircle className="h-16 w-16 text-red-500" />
        <h1 className="mt-4 text-2xl font-bold">
          {dictionary.payment.failed.title}
        </h1>
        <p className="mt-2 text-gray-600">
          {dictionary.payment.failed.message}
        </p>
        <button
          onClick={() => router.push("/")}
          className="mt-6 rounded-lg bg-teal-500 px-6 py-2 text-white hover:bg-teal-600"
        >
          {dictionary.payment.failed.returnHome}
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center">
      <CheckCircle2 className="h-16 w-16 text-green-500" />
      <h1 className="mt-4 text-2xl font-bold">
        {dictionary.payment.success.title}
      </h1>
      {paymentStatus?.customerEmail && (
        <p className="mt-2 text-gray-600">
          {dictionary.payment.success.confirmation}
          {paymentStatus.customerEmail}
        </p>
      )}
      {paymentStatus?.orderDetails && (
        <div className="mt-4 rounded-lg border border-gray-200 p-4">
          <h2 className="font-semibold">
            {dictionary.payment.success.orderDetails.title}
          </h2>
          <p>{paymentStatus.orderDetails.productName}</p>
          <p>
            {dictionary.payment.success.orderDetails.quantity}:{" "}
            {paymentStatus.orderDetails.quantity}
          </p>
          {paymentStatus.amount && (
            <p>
              {dictionary.payment.success.orderDetails.amount}: $
              {(paymentStatus.amount / 100).toFixed(2)}
            </p>
          )}
        </div>
      )}
      <div className="mt-8 flex gap-4">
        <button
          onClick={() => router.push("/")}
          className="rounded-lg bg-teal-500 px-6 py-2 text-white hover:bg-teal-600"
        >
          {dictionary.payment.success.returnHome}
        </button>
        <button
          onClick={() => router.push("/dashboard")}
          className="rounded-lg border border-teal-500 px-6 py-2 text-teal-500 hover:bg-teal-50"
        >
          {dictionary.payment.success.goToDashboard}
        </button>
      </div>
    </div>
  );
}
export default Success;
