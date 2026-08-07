import type { Metadata } from "next";
import { PaymentPageClient } from "@/components/payment/PaymentPageClient";

export const metadata: Metadata = {
  title: "Secure Payment | CareerKick",
  description: "Complete your CareerKick counselling payment using a frontend demo checkout.",
  alternates: {
    canonical: "/payment",
  },
};

export default function PaymentPage() {
  return <PaymentPageClient />;
}
