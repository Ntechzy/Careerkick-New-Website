import type { Metadata } from "next";
import { PaymentStatePage } from "@/components/checkout/CheckoutPageClient";

export const metadata: Metadata = {
  title: "Payment Verification in Progress | Careerkick",
  alternates: {
    canonical: "/checkout/pending",
  },
};

type CheckoutPendingPageProps = {
  searchParams?: {
    enrollment?: string;
    paid?: string;
    due?: string;
    total?: string;
  };
};

export default function CheckoutPendingPage({ searchParams }: CheckoutPendingPageProps) {
  return <PaymentStatePage status="pending" paymentDetails={searchParams} />;
}
