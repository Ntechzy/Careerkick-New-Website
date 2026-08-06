import type { Metadata } from "next";
import { CheckoutPageClient } from "@/components/checkout/CheckoutPageClient";
import { getCounsellingPackage } from "@/lib/counsellingPackages";

export const metadata: Metadata = {
  title: "Secure Checkout | Careerkick",
  description:
    "Complete your Careerkick counselling enrollment with secure payment.",
  alternates: {
    canonical: "/checkout",
  },
};

type CheckoutPageProps = {
  searchParams?: {
    package?: string;
  };
};

export default function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const selectedPackage = getCounsellingPackage(searchParams?.package);

  return <CheckoutPageClient selectedPackage={selectedPackage ?? null} />;
}

