"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import { fetchPaymentStatus } from "@/lib/features/paymentSlice";
import { useAppDispatch } from "@/lib/hooks";
import {
  getCheckoutSession,
  savePaymentRecord,
  type PaymentMethod,
  type PaymentRecord,
} from "@/lib/mockPayment";

const SUCCESS_STATUSES = ["success", "successful", "captured", "paid", "approved", "authorized", "s"];

function getMerchantTxnNo(searchParams: URLSearchParams) {
  return (
    searchParams.get("merchantTxnNo") ??
    searchParams.get("merchantTxnNO") ??
    searchParams.get("merchant_txn_no") ??
    searchParams.get("merchantTxn") ??
    searchParams.get("orderId") ??
    searchParams.get("txn") ??
    searchParams.get("txnNo") ??
    null
  );
}

function getPaymentMethod(paymentMode?: string): PaymentMethod {
  const normalized = paymentMode?.trim().toLowerCase();

  if (normalized === "upi" || normalized === "card" || normalized === "wallet") {
    return normalized;
  }

  return "netbanking";
}

function isSuccessfulStatus(txnStatus?: string) {
  return SUCCESS_STATUSES.includes(txnStatus?.trim().toLowerCase() ?? "");
}

function createFallbackSession({
  merchantTxnNo,
  amount,
}: {
  merchantTxnNo: string;
  amount: number;
}): Omit<PaymentRecord, "paymentMethod" | "paymentStatus" | "paymentDate"> {
  return {
    packageId: "",
    packageTitle: "Counselling Plan",
    packageSubtitle: "Counselling Plan",
    student: {
      studentName: "Student",
      mobile: "",
      email: "",
      whatsapp: "",
      course: "",
      stateOrDomicile: "",
      district: "",
      scoreOrRank: "",
      applicationNumber: "",
      category: "",
    },
    baseAmount: amount,
    taxRate: 0,
    taxAmount: 0,
    totalAmount: amount,
    discountAmount: 0,
    netAmount: amount,
    amountPaid: amount,
    dueAmount: 0,
    paymentMode: "full",
    merchantTxnNo,
    createdAt: new Date().toISOString(),
  };
}

export function PaymentStatusVerifier({
  merchantTxnNo,
}: {
  merchantTxnNo?: string;
}) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("Verifying payment status...");
  const queryMerchantTxnNo = useMemo(() => getMerchantTxnNo(searchParams), [searchParams]);

  useEffect(() => {
    let cancelled = false;

    const verifyPayment = async () => {
      const session = getCheckoutSession();
      const activeMerchantTxnNo = merchantTxnNo ?? queryMerchantTxnNo ?? session?.merchantTxnNo;

      if (!activeMerchantTxnNo) {
        setMessage("Payment transaction number could not be found.");
        router.replace("/payment/failed");
        return;
      }

      const result = await dispatch(fetchPaymentStatus(activeMerchantTxnNo));

      if (cancelled) {
        return;
      }

      if (!fetchPaymentStatus.fulfilled.match(result)) {
        const fallbackSession =
          session ??
          createFallbackSession({
            merchantTxnNo: activeMerchantTxnNo,
            amount: 0,
          });
        const record: PaymentRecord = {
          ...fallbackSession,
          attemptId: activeMerchantTxnNo,
          merchantTxnNo: activeMerchantTxnNo,
          paymentMethod: "netbanking",
          paymentStatus: "failed",
          paymentDate: new Date().toISOString(),
        };

        savePaymentRecord(record);
        router.replace("/payment/failed");
        return;
      }

      const statusData = result.payload.data;
      const paymentStatus = isSuccessfulStatus(statusData.txnStatus) ? "success" : "failed";
      const fallbackSession =
        session ??
        createFallbackSession({
          merchantTxnNo: statusData.merchantTxnNo,
          amount: statusData.amount,
        });
      const record: PaymentRecord = {
        ...fallbackSession,
        transactionId: paymentStatus === "success" ? statusData.merchantTxnNo : undefined,
        attemptId: paymentStatus === "failed" ? statusData.merchantTxnNo : undefined,
        merchantTxnNo: statusData.merchantTxnNo,
        gatewayStatusResponse: statusData.gatewayStatusResponse,
        paymentMethod: getPaymentMethod(statusData.paymentMode),
        paymentStatus,
        paymentDate: new Date().toISOString(),
      };

      savePaymentRecord(record);
      router.replace(paymentStatus === "success" ? "/payment/success" : "/payment/failed");
    };

    void verifyPayment();

    return () => {
      cancelled = true;
    };
  }, [dispatch, merchantTxnNo, queryMerchantTxnNo, router]);

  return (
    <main className="min-h-screen bg-[#F6F8F5] px-4 py-16 text-slate-900">
      <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
        <Loader2 className="mx-auto h-6 w-6 animate-spin text-[#51A70A]" />
        <h1 className="mt-4 text-xl font-bold text-slate-950">Checking Payment</h1>
        <p className="mt-2 text-sm font-semibold text-slate-600">{message}</p>
      </div>
    </main>
  );
}
