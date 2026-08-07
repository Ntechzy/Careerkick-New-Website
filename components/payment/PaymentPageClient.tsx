"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import type React from "react";
import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  Building2,
  Check,
  CreditCard,
  Landmark,
  Loader2,
  Lock,
  QrCode,
  ShieldCheck,
  Smartphone,
  WalletCards,
} from "lucide-react";
import { formatIndianCurrency } from "@/lib/counsellingPackages";
import {
  getCheckoutSession,
  maskIndianMobile,
  processMockPayment,
  savePaymentRecord,
  type CheckoutSession,
  type DemoPaymentResult,
  type PaymentMethod,
} from "@/lib/mockPayment";
import { cn } from "@/lib/utils";

type PaymentStatus = "idle" | "processing" | "success" | "failed";

const PAYMENT_METHODS = [
  { id: "upi", label: "UPI", icon: Smartphone },
  { id: "card", label: "Credit / Debit Card", icon: CreditCard },
  { id: "netbanking", label: "Net Banking", icon: Landmark },
  { id: "wallet", label: "Wallets", icon: WalletCards },
] as const;

const UPI_APPS = ["Google Pay", "PhonePe", "Paytm", "BHIM"] as const;
const BANKS = ["HDFC Bank", "ICICI Bank", "State Bank of India", "Axis Bank", "Kotak Mahindra Bank"] as const;
const OTHER_BANKS = ["Bank of Baroda", "Canara Bank", "Punjab National Bank", "Union Bank of India"] as const;
const WALLETS = ["Amazon Pay", "Paytm", "PhonePe"] as const;

export function PaymentPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const packageId = searchParams.get("package") ?? "mbbs-govt-counselling";
  const [session, setSession] = useState<CheckoutSession | null>(null);
  const [method, setMethod] = useState<PaymentMethod>("upi");
  const [status, setStatus] = useState<PaymentStatus>("idle");
  const [demoResult, setDemoResult] = useState<DemoPaymentResult>("success");
  const [upiApp, setUpiApp] = useState("Google Pay");
  const [card, setCard] = useState({ number: "", expiry: "", cvv: "", name: "", save: false });
  const [bank, setBank] = useState("HDFC Bank");
  const [wallet, setWallet] = useState("Amazon Pay");

  useEffect(() => {
    const savedSession = getCheckoutSession();

    if (!savedSession) {
      router.replace(`/checkout?package=${packageId}`);
      return;
    }

    setSession(savedSession);
  }, [packageId, router]);

  const cardNetwork = useMemo(() => detectCardNetwork(card.number), [card.number]);
  const canPay = useMemo(() => {
    if (!session || status === "processing") {
      return false;
    }

    if (method === "upi") {
      return Boolean(upiApp);
    }

    if (method === "card") {
      return isValidCard(card);
    }

    if (method === "netbanking") {
      return Boolean(bank);
    }

    return Boolean(wallet);
  }, [bank, card, method, session, status, upiApp, wallet]);

  const ctaLabel = session ? getCtaLabel(method, session.amountPaid) : "Pay";

  const handlePayment = async () => {
    if (!session || !canPay) {
      return;
    }

    setStatus("processing");
    const record = await processMockPayment({ session, method, result: demoResult });
    savePaymentRecord(record);

    if (record.paymentStatus === "success") {
      setStatus("success");
      router.push("/payment/success");
    } else {
      setStatus("failed");
      router.push("/payment/failed");
    }
  };

  if (!session) {
    return (
      <main className="min-h-screen bg-[#F6F8F5] px-4 py-16 text-slate-900">
        <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <Loader2 className="mx-auto h-6 w-6 animate-spin text-[#51A70A]" />
          <p className="mt-3 text-sm font-semibold text-slate-600">Restoring checkout details...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F6F8F5] px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1080px]">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" aria-label="CareerKick home" className="inline-flex">
            <Image src="/logo.png" alt="CareerKick" width={138} height={44} className="h-11 w-auto object-contain" priority />
          </Link>
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
            <Lock className="h-4 w-4 text-[#51A70A]" />
            256-bit secure checkout
          </div>
        </header>

        <Link href={`/checkout?package=${session.packageId}`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#276005]">
          <ArrowLeft className="h-4 w-4" />
          Back to Checkout
        </Link>

        <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-[#276005]">
                <ShieldCheck className="h-4 w-4" />
                Secure Payment
              </p>
              <h1 className="mt-3 text-3xl font-bold text-slate-950">Pay CareerKick</h1>
              <p className="mt-2 text-4xl font-bold text-slate-950">{formatIndianCurrency(session.amountPaid)}</p>
              <dl className="mt-4 grid gap-2 text-sm text-slate-600 sm:grid-cols-3">
                <PaymentHeaderItem label="Student" value={session.student.studentName} />
                <PaymentHeaderItem label="Mobile" value={maskIndianMobile(session.student.mobile)} />
                <PaymentHeaderItem label="Package" value={session.packageSubtitle} />
              </dl>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
              Demo payment interface - no real transaction will be processed.
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="grid lg:grid-cols-[260px_minmax(0,1fr)]">
              <PaymentMethodList method={method} processing={status === "processing"} setMethod={setMethod} />
              <div className="min-h-[440px] p-5 sm:p-6">
                {status === "processing" ? (
                  <PaymentProcessing />
                ) : (
                  <>
                    {method === "upi" ? <UPIPayment selectedApp={upiApp} setSelectedApp={setUpiApp} amount={session.amountPaid} /> : null}
                    {method === "card" ? <CardPayment card={card} setCard={setCard} network={cardNetwork} /> : null}
                    {method === "netbanking" ? <NetBankingPayment bank={bank} setBank={setBank} /> : null}
                    {method === "wallet" ? <WalletPayment wallet={wallet} setWallet={setWallet} /> : null}
                    <button
                      type="button"
                      disabled={!canPay}
                      onClick={() => void handlePayment()}
                      className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#51A70A] px-5 py-3 text-base font-bold text-white transition hover:bg-[#438c08] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <Lock className="h-5 w-5" />
                      {ctaLabel}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          <PaymentOrderSummary session={session} />
        </section>

        {process.env.NODE_ENV === "development" ? (
          <section className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-sm shadow-sm">
            <p className="font-bold text-slate-950">Demo Mode</p>
            <div className="mt-3 inline-grid grid-cols-2 rounded-xl bg-slate-100 p-1">
              {(["success", "failure"] as const).map((result) => (
                <button
                  key={result}
                  type="button"
                  onClick={() => setDemoResult(result)}
                  className={cn(
                    "rounded-lg px-4 py-2 text-sm font-semibold transition",
                    demoResult === result ? "bg-white text-[#276005] shadow-sm" : "text-slate-600",
                  )}
                >
                  Payment {result === "success" ? "Success" : "Failure"}
                </button>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}

function PaymentHeaderItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase text-slate-500">{label}</dt>
      <dd className="mt-1 font-semibold text-slate-900">{value || "Not provided"}</dd>
    </div>
  );
}

function PaymentMethodList({
  method,
  processing,
  setMethod,
}: {
  method: PaymentMethod;
  processing: boolean;
  setMethod: (method: PaymentMethod) => void;
}) {
  return (
    <nav className="border-b border-slate-200 bg-slate-50 p-3 lg:border-b-0 lg:border-r">
      <p className="px-2 pb-2 text-xs font-bold uppercase text-slate-500">Payment Methods</p>
      <div className="grid gap-2 sm:grid-cols-4 lg:grid-cols-1">
        {PAYMENT_METHODS.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              type="button"
              disabled={processing}
              aria-pressed={method === item.id}
              onClick={() => setMethod(item.id)}
              className={cn(
                "flex h-12 items-center gap-3 rounded-xl border px-3 text-left text-sm font-semibold transition",
                method === item.id
                  ? "border-[#51A70A] bg-white text-[#276005] shadow-sm"
                  : "border-transparent text-slate-600 hover:border-slate-200 hover:bg-white",
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

function UPIPayment({
  selectedApp,
  setSelectedApp,
  amount,
}: {
  selectedApp: string;
  setSelectedApp: (app: string) => void;
  amount: number;
}) {
  return (
    <div>
      <h2 className="text-xl font-bold text-slate-950">Pay using UPI</h2>
      <p className="mt-1 text-sm text-slate-600">Choose an app or scan the demo QR using any UPI app.</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {UPI_APPS.map((app) => (
          <button
            key={app}
            type="button"
            aria-pressed={selectedApp === app}
            onClick={() => setSelectedApp(app)}
            className={cn(
              "flex h-14 items-center gap-3 rounded-xl border px-4 text-sm font-bold transition",
              selectedApp === app ? "border-[#51A70A] bg-emerald-50 text-[#276005]" : "border-slate-200 text-slate-700 hover:border-[#51A70A]/50",
            )}
          >
            <Smartphone className="h-5 w-5" />
            {app}
          </button>
        ))}
      </div>
      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <DemoQr />
          <div>
            <p className="flex items-center gap-2 font-bold text-slate-950">
              <QrCode className="h-5 w-5 text-[#51A70A]" />
              Scan QR Code
            </p>
            <p className="mt-2 text-sm text-slate-600">Scan using any UPI app</p>
            <p className="mt-3 text-2xl font-bold text-slate-950">{formatIndianCurrency(amount)}</p>
            <p className="mt-2 text-xs font-semibold text-amber-700">Demo Payment - No actual money will be charged</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DemoQr() {
  const cells = Array.from({ length: 81 }, (_, index) => index);

  return (
    <div className="grid h-40 w-40 shrink-0 grid-cols-9 gap-1 rounded-xl border border-slate-200 bg-white p-3" aria-label="Demo QR code placeholder">
      {cells.map((cell) => (
        <span
          key={cell}
          className={cn(
            "rounded-[2px]",
            cell % 2 === 0 || cell % 7 === 0 || [0, 1, 2, 9, 18, 6, 15, 24, 56, 63, 72, 64, 65, 73, 74].includes(cell)
              ? "bg-slate-950"
              : "bg-slate-100",
          )}
        />
      ))}
    </div>
  );
}

function CardPayment({
  card,
  setCard,
  network,
}: {
  card: { number: string; expiry: string; cvv: string; name: string; save: boolean };
  setCard: React.Dispatch<React.SetStateAction<{ number: string; expiry: string; cvv: string; name: string; save: boolean }>>;
  network: string;
}) {
  const updateCard = (field: keyof typeof card, value: string | boolean) => {
    setCard((current) => ({ ...current, [field]: value }));
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-slate-950">Pay by Card</h2>
      <p className="mt-1 text-sm text-slate-600">Enter demo card details to continue.</p>
      <div className="mt-5 grid gap-4">
        <TextInput label="Card Number" value={card.number} inputMode="numeric" placeholder="1234 5678 9012 3456" onChange={(value) => updateCard("number", formatCardNumber(value))} trailing={network} />
        <div className="grid gap-4 sm:grid-cols-2">
          <TextInput label="Expiry" value={card.expiry} inputMode="numeric" placeholder="MM / YY" onChange={(value) => updateCard("expiry", formatExpiry(value))} />
          <TextInput label="CVV" value={card.cvv} inputMode="numeric" placeholder="..." onChange={(value) => updateCard("cvv", value.replace(/\D/g, "").slice(0, 4))} />
        </div>
        <TextInput label="Name on Card" value={card.name} placeholder="Student or parent name" onChange={(value) => updateCard("name", value)} />
        <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
          <input type="checkbox" checked={card.save} onChange={(event) => updateCard("save", event.target.checked)} className="mt-1 h-4 w-4 accent-[#51A70A]" />
          <span>Save card securely for faster payments</span>
        </label>
        <p className="rounded-xl bg-amber-50 p-3 text-xs leading-5 text-amber-800">
          Demo only. Sensitive payment details such as full card numbers and CVV must never be stored directly in production frontend storage.
        </p>
      </div>
    </div>
  );
}

function NetBankingPayment({ bank, setBank }: { bank: string; setBank: (bank: string) => void }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-slate-950">Net Banking</h2>
      <p className="mt-1 text-sm text-slate-600">Select your bank to simulate a secure authorization redirect.</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {BANKS.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={bank === item}
            onClick={() => setBank(item)}
            className={cn(
              "flex h-14 items-center gap-3 rounded-xl border px-4 text-sm font-bold transition",
              bank === item ? "border-[#51A70A] bg-emerald-50 text-[#276005]" : "border-slate-200 text-slate-700 hover:border-[#51A70A]/50",
            )}
          >
            <Building2 className="h-5 w-5" />
            {item}
          </button>
        ))}
      </div>
      <label htmlFor="otherBank" className="mt-5 block text-sm font-semibold text-slate-800">Other Banks</label>
      <select id="otherBank" value={OTHER_BANKS.includes(bank as any) ? bank : ""} onChange={(event) => event.target.value && setBank(event.target.value)} className="mt-2 h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-950 outline-none focus:border-[#51A70A] focus:ring-4 focus:ring-[#51A70A]/15">
        <option value="">Select another bank</option>
        {OTHER_BANKS.map((item) => <option key={item} value={item}>{item}</option>)}
      </select>
      <p className="mt-4 rounded-xl bg-slate-50 p-3 text-sm text-slate-600">Continue with {bank}</p>
    </div>
  );
}

function WalletPayment({ wallet, setWallet }: { wallet: string; setWallet: (wallet: string) => void }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-slate-950">Pay with Wallet</h2>
      <p className="mt-1 text-sm text-slate-600">Choose a wallet for this simulated payment.</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {WALLETS.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={wallet === item}
            onClick={() => setWallet(item)}
            className={cn(
              "flex h-14 items-center gap-3 rounded-xl border px-4 text-sm font-bold transition",
              wallet === item ? "border-[#51A70A] bg-emerald-50 text-[#276005]" : "border-slate-200 text-slate-700 hover:border-[#51A70A]/50",
            )}
          >
            <WalletCards className="h-5 w-5" />
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

function TextInput({
  label,
  value,
  placeholder,
  inputMode,
  trailing,
  onChange,
}: {
  label: string;
  value: string;
  placeholder?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  trailing?: string;
  onChange: (value: string) => void;
}) {
  const id = label.replace(/\W+/g, "-").toLowerCase();

  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-slate-800">{label}</label>
      <div className="relative mt-2">
        <input
          id={id}
          value={value}
          inputMode={inputMode}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 pr-20 text-sm text-slate-950 outline-none focus:border-[#51A70A] focus:ring-4 focus:ring-[#51A70A]/15"
        />
        {trailing ? <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold uppercase text-[#276005]">{trailing}</span> : null}
      </div>
    </div>
  );
}

function PaymentOrderSummary({ session }: { session: CheckoutSession }) {
  return (
    <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-6">
      <h2 className="text-lg font-bold text-slate-950">Order Summary</h2>
      <p className="mt-1 text-sm font-semibold text-slate-600">{session.packageSubtitle}</p>
      <div className="mt-5 space-y-3 border-b border-slate-200 pb-4 text-sm">
        <SummaryRow label="Counselling Fee" value={formatIndianCurrency(session.baseAmount)} />
        {session.taxAmount > 0 ? <SummaryRow label="GST" value={formatIndianCurrency(session.taxAmount)} /> : null}
        <SummaryRow label="Discount" value={`-${formatIndianCurrency(session.discountAmount)}`} />
      </div>
      <div className="mt-4 space-y-3 text-sm">
        {session.paymentMode === "partial" ? (
          <>
            <SummaryRow label="Total Package" value={formatIndianCurrency(session.netAmount)} />
            <SummaryRow label="Paying Now" value={formatIndianCurrency(session.amountPaid)} />
            <SummaryRow label="Remaining" value={formatIndianCurrency(session.dueAmount)} />
          </>
        ) : (
          <SummaryRow label="Total" value={formatIndianCurrency(session.amountPaid)} />
        )}
      </div>
    </aside>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-slate-600">{label}</span>
      <span className="font-bold text-slate-950">{value}</span>
    </div>
  );
}

function PaymentProcessing() {
  return (
    <div className="flex min-h-[380px] flex-col items-center justify-center text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-[#51A70A]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </span>
      <h2 className="mt-5 text-2xl font-bold text-slate-950">Processing Payment</h2>
      <p className="mt-2 text-sm text-slate-600">Please don&apos;t close this window.</p>
    </div>
  );
}

function getCtaLabel(method: PaymentMethod, amount: number) {
  const formattedAmount = formatIndianCurrency(amount);

  if (method === "upi") {
    return `Pay ${formattedAmount} with UPI`;
  }

  if (method === "card") {
    return `Pay ${formattedAmount} Securely`;
  }

  if (method === "netbanking") {
    return "Continue to Bank";
  }

  return `Pay ${formattedAmount} with Wallet`;
}

function formatCardNumber(value: string) {
  return value
    .replace(/\D/g, "")
    .slice(0, 19)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 4);

  if (digits.length <= 2) {
    return digits;
  }

  return `${digits.slice(0, 2)} / ${digits.slice(2)}`;
}

function detectCardNetwork(number: string) {
  const digits = number.replace(/\D/g, "");

  if (digits.startsWith("4")) {
    return "Visa";
  }

  if (/^(5[1-5]|2)/.test(digits)) {
    return "Mastercard";
  }

  if (/^(60|65|81|82)/.test(digits)) {
    return "RuPay";
  }

  return "";
}

function isValidCard(card: { number: string; expiry: string; cvv: string; name: string }) {
  const digits = card.number.replace(/\D/g, "");
  const expiryDigits = card.expiry.replace(/\D/g, "");

  return digits.length >= 12 && expiryDigits.length === 4 && /^\d{3,4}$/.test(card.cvv) && card.name.trim().length >= 2;
}
