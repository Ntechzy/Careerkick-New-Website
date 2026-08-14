"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AlertCircle, Check, Download, Phone, Printer, X } from "lucide-react";
import { formatIndianCurrency } from "@/lib/counsellingPackages";
import { CONTACT_NUMBERS, getTelLink, getWhatsAppLink } from "@/lib/contactLinks";
import { getPaymentRecord, type PaymentRecord } from "@/lib/mockPayment";

const METHOD_LABELS = {
  upi: "UPI",
  card: "Card",
  netbanking: "Net Banking",
  wallet: "Wallet",
} as const;

export function PaymentResultPageClient({ status }: { status: "success" | "failed" }) {
  const router = useRouter();
  const [record, setRecord] = useState<PaymentRecord | null>(null);

  useEffect(() => {
    const savedRecord = getPaymentRecord(status);

    if (!savedRecord) {
      router.replace("/services#pricing");
      return;
    }

    setRecord(savedRecord);
  }, [router, status]);

  if (!record) {
    return (
      <main className="min-h-screen bg-[#F6F8F5] px-4 py-16 text-slate-900">
        <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <p className="text-sm font-semibold text-slate-600">Restoring payment details...</p>
        </div>
      </main>
    );
  }

  return status === "success" ? <PaymentSuccess record={record} /> : <PaymentFailed record={record} />;
}

function PaymentSuccess({ record }: { record: PaymentRecord }) {
  return (
    <main className="min-h-screen bg-[#F6F8F5] px-4 py-10 text-slate-900 sm:px-6">
      <section className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-8">
        <span className="mx-auto flex h-16 w-16 animate-pulse items-center justify-center rounded-full bg-green-100 text-green-700">
          <Check className="h-8 w-8" />
        </span>
        <h1 className="mt-5 text-3xl font-bold text-slate-950">Payment Successful</h1>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-600">
          Your counselling enrollment payment has been successfully recorded.
        </p>
        <p className="mt-5 text-4xl font-bold text-slate-950">{formatIndianCurrency(record.amountPaid)}</p>

        <ResultGrid
          items={[
            ["Transaction ID", record.transactionId ?? "CKPAY-DEMO"],
            ["Amount Paid", formatIndianCurrency(record.amountPaid)],
            ["Payment Method", METHOD_LABELS[record.paymentMethod]],
            ["Student Name", record.student.studentName],
            ["Package", record.packageTitle],
            ["Date & Time", new Date(record.paymentDate).toLocaleString("en-IN")],
            ...(record.dueAmount > 0 ? ([["Remaining Balance", formatIndianCurrency(record.dueAmount)]] as [string, string][]) : []),
          ]}
        />

        <Timeline />

        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#51A70A] px-5 text-sm font-bold text-white">
            Go to Dashboard / Continue
          </Link>
          <button type="button" onClick={() => window.print()} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 text-sm font-bold text-slate-800">
            <Printer className="h-4 w-4" />
            Print Receipt
          </button>
          <button type="button" onClick={() => window.print()} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 text-sm font-bold text-slate-800">
            <Download className="h-4 w-4" />
            Download Receipt
          </button>
        </div>

        <HelpBlock />
      </section>
    </main>
  );
}

function PaymentFailed({ record }: { record: PaymentRecord }) {
  return (
    <main className="min-h-screen bg-[#F6F8F5] px-4 py-10 text-slate-900 sm:px-6">
      <section className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-8">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-600">
          <X className="h-8 w-8" />
        </span>
        <h1 className="mt-5 text-3xl font-bold text-slate-950">Payment Unsuccessful</h1>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-600">
          We couldn&apos;t complete your payment. No confirmation has been generated.
        </p>

        <ResultGrid
          items={[
            ["Attempted Amount", formatIndianCurrency(record.amountPaid)],
            ["Selected Method", METHOD_LABELS[record.paymentMethod]],
            ["Attempt ID", record.attemptId ?? "CKATTEMPT-DEMO"],
          ]}
        />

        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left">
          <p className="flex items-center gap-2 font-bold text-slate-950">
            <AlertCircle className="h-5 w-5 text-red-600" />
            Possible reasons
          </p>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            <li>Payment was cancelled</li>
            <li>Authentication could not be completed</li>
            <li>Bank/UPI service may be temporarily unavailable</li>
          </ul>
        </div>

        <HelpBlock />
      </section>
    </main>
  );
}

function ResultGrid({ items }: { items: [string, string][] }) {
  return (
    <dl className="mt-7 grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left sm:grid-cols-2">
      {items.map(([label, value]) => (
        <div key={label}>
          <dt className="text-xs font-bold uppercase text-slate-500">{label}</dt>
          <dd className="mt-1 break-words text-sm font-bold text-slate-950">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function Timeline() {
  const steps = [
    ["Payment Confirmed", "Your payment has been recorded."],
    ["CareerKick Team Contact", "Our counselling team will contact you using your registered details."],
    ["Student Onboarding", "Profile and counselling information will be collected."],
    ["Counselling Support Begins", "Round-wise support starts according to your package."],
  ] as const;

  return (
    <div className="mt-7 text-left">
      <h2 className="text-lg font-bold text-slate-950">What happens next</h2>
      <ol className="mt-4 grid gap-3 sm:grid-cols-4">
        {steps.map(([title, body], index) => (
          <li key={title} className="rounded-2xl border border-slate-200 bg-white p-4">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#51A70A] text-sm font-bold text-white">{index + 1}</span>
            <h3 className="mt-3 text-sm font-bold text-slate-950">{title}</h3>
            <p className="mt-1 text-xs leading-5 text-slate-600">{body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function HelpBlock() {
  return (
    <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
      <p className="font-bold text-slate-950">Need help?</p>
      <div className="mt-3 flex flex-col justify-center gap-2 sm:flex-row">
        <a href={getTelLink(CONTACT_NUMBERS.primaryDigits)} className="inline-flex items-center justify-center gap-2 font-semibold text-[#276005]">
          <Phone className="h-4 w-4" />
          {CONTACT_NUMBERS.primaryDisplay}
        </a>
        <a href={getWhatsAppLink("Hello, I need help with my CareerKick payment.")} target="_blank" rel="noreferrer" className="font-semibold text-[#276005]">
          WhatsApp {CONTACT_NUMBERS.primaryDisplay}
        </a>
        <a href="mailto:info@careerkick.in" className="font-semibold text-[#276005]">info@careerkick.in</a>
      </div>
    </div>
  );
}
