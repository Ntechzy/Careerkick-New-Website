import type { Metadata } from "next";
import { PaymentStatePage } from "@/components/checkout/CheckoutPageClient";

export const metadata: Metadata = {
  title: "Payment Unsuccessful | Careerkick",
  alternates: {
    canonical: "/checkout/failure",
  },
};

export default function CheckoutFailurePage() {
  return <PaymentStatePage status="failure" />;
}

