import type { Metadata } from "next";
import { PaymentStatePage } from "@/components/checkout/CheckoutPageClient";

export const metadata: Metadata = {
  title: "Payment Verification in Progress | Careerkick",
  alternates: {
    canonical: "/checkout/pending",
  },
};

export default function CheckoutPendingPage() {
  return <PaymentStatePage status="pending" />;
}

