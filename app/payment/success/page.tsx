import type { Metadata } from "next";
import { Suspense } from "react";
import { PaymentResultPageClient } from "@/components/payment/PaymentResultPageClient";
import { PaymentStatusVerifier } from "@/components/payment/PaymentStatusVerifier";

export const metadata: Metadata = {
  title: "Payment Successful | CareerKick",
  alternates: {
    canonical: "/payment/success",
  },
};

type PaymentSuccessPageProps = {
  searchParams?: {
    merchantTxnNo?: string;
  };
};

export default function PaymentSuccessPage({ searchParams }: PaymentSuccessPageProps) {
  if (searchParams?.merchantTxnNo) {
    return (
      <Suspense fallback={<PaymentVerifyFallback />}>
        <PaymentStatusVerifier merchantTxnNo={searchParams.merchantTxnNo} />
      </Suspense>
    );
  }

  return <PaymentResultPageClient status="success" />;
}

function PaymentVerifyFallback() {
  return (
    <main className="min-h-screen bg-[#F6F8F5] px-4 py-16 text-slate-900">
      <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
        <p className="text-sm font-semibold text-slate-600">Verifying payment status...</p>
      </div>
    </main>
  );
}
