import type { Metadata } from "next";
import { Suspense } from "react";
import { PaymentPageClient } from "@/components/payment/PaymentPageClient";

export const metadata: Metadata = {
  title: "Secure Payment | CareerKick",
  description: "Complete your CareerKick counselling payment using a frontend demo checkout.",
  alternates: {
    canonical: "/payment",
  },
};

export default function PaymentPage() {
  return (
    <Suspense fallback={<PaymentPageFallback />}>
      <PaymentPageClient />
    </Suspense>
  );
}

function PaymentPageFallback() {
  return (
    <main className="min-h-screen bg-[#F6F8F5] px-4 py-16 text-slate-900">
      <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
        <p className="text-sm font-semibold text-slate-600">Loading payment details...</p>
      </div>
    </main>
  );
}
