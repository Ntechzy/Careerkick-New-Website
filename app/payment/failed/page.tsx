import type { Metadata } from "next";
import { PaymentResultPageClient } from "@/components/payment/PaymentResultPageClient";

export const metadata: Metadata = {
  title: "Payment Unsuccessful | CareerKick",
  alternates: {
    canonical: "/payment/failed",
  },
};

export default function PaymentFailedPage() {
  return <PaymentResultPageClient status="failed" />;
}
