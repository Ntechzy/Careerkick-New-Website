import type { Metadata } from "next";
import { PaymentStatePage } from "@/components/checkout/CheckoutPageClient";

export const metadata: Metadata = {
  title: "Payment Successful | Careerkick",
  alternates: {
    canonical: "/checkout/success",
  },
};

export default function CheckoutSuccessPage() {
  return <PaymentStatePage status="success" />;
}

