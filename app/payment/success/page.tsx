import type { Metadata } from "next";
import { PaymentResultPageClient } from "@/components/payment/PaymentResultPageClient";

export const metadata: Metadata = {
  title: "Payment Successful | CareerKick",
  alternates: {
    canonical: "/payment/success",
  },
};

export default function PaymentSuccessPage() {
  return <PaymentResultPageClient status="success" />;
}
