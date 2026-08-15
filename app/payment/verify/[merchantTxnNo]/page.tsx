import type { Metadata } from "next";
import { Suspense } from "react";
import { PaymentStatusVerifier } from "@/components/payment/PaymentStatusVerifier";

export const metadata: Metadata = {
  title: "Verifying Payment | CareerKick",
  alternates: {
    canonical: "/payment/verify",
  },
};

type PaymentVerifyTxnPageProps = {
  params: {
    merchantTxnNo: string;
  };
};

export default function PaymentVerifyTxnPage({ params }: PaymentVerifyTxnPageProps) {
  return (
    <Suspense fallback={<PaymentVerifyFallback />}>
      <PaymentStatusVerifier merchantTxnNo={decodeURIComponent(params.merchantTxnNo)} />
    </Suspense>
  );
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
