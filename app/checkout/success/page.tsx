import type { Metadata } from "next";
import { PaymentStatePage } from "@/components/checkout/CheckoutPageClient";

export const metadata: Metadata = {
  title: "Payment Successful | Careerkick",
  alternates: {
    canonical: "/checkout/success",
  },
};

type CheckoutSuccessPageProps = {
  searchParams?: {
    enrollment?: string;
    paid?: string;
    due?: string;
    total?: string;
  };
};

export default function CheckoutSuccessPage({ searchParams }: CheckoutSuccessPageProps) {
  return <PaymentStatePage status="success" paymentDetails={searchParams} />;
}
