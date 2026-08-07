import type { Metadata } from "next";
import { PaymentStatePage } from "@/components/checkout/CheckoutPageClient";

export const metadata: Metadata = {
  title: "Payment Unsuccessful | Careerkick",
  alternates: {
    canonical: "/checkout/failure",
  },
};

type CheckoutFailurePageProps = {
  searchParams?: {
    enrollment?: string;
    paid?: string;
    due?: string;
    total?: string;
  };
};

export default function CheckoutFailurePage({ searchParams }: CheckoutFailurePageProps) {
  return <PaymentStatePage status="failure" paymentDetails={searchParams} />;
}
