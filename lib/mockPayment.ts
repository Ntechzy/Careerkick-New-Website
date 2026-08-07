import {
  calculateCheckoutPayment,
  formatIndianCurrency,
  getCounsellingPackage,
  type CounsellingPackage,
} from "@/lib/counsellingPackages";

export type PaymentMode = "full" | "partial";
export type PaymentMethod = "upi" | "card" | "netbanking" | "wallet";
export type DemoPaymentResult = "success" | "failure";

export type CheckoutStudentDetails = {
  studentName: string;
  mobile: string;
  email: string;
  whatsapp: string;
  course: string;
  stateOrDomicile: string;
  district: string;
  scoreOrRank: string;
  applicationNumber: string;
  category: string;
};

export type CheckoutSession = {
  packageId: string;
  packageTitle: string;
  packageSubtitle: string;
  student: CheckoutStudentDetails;
  baseAmount: number;
  taxRate: number;
  taxAmount: number;
  totalAmount: number;
  discountAmount: number;
  couponCode?: string;
  netAmount: number;
  amountPaid: number;
  dueAmount: number;
  paymentMode: PaymentMode;
  createdAt: string;
};

export type PaymentRecord = CheckoutSession & {
  transactionId?: string;
  attemptId?: string;
  paymentMethod: PaymentMethod;
  paymentStatus: "success" | "failed";
  paymentDate: string;
};

const CHECKOUT_SESSION_KEY = "careerkick.checkout.session";
const PAYMENT_RESULT_KEY = "careerkick.payment.result";
const PAYMENT_FAILURE_KEY = "careerkick.payment.failure";

export function getMinimumPartialPayment(netAmount: number) {
  return netAmount <= 5000 ? 1 : 5000;
}

export function maskIndianMobile(mobile: string) {
  const digits = mobile.replace(/\D/g, "").slice(-10);

  if (digits.length < 4) {
    return "+91";
  }

  return `+91 ${"\u2022".repeat(6)}${digits.slice(-4)}`;
}

export function createCheckoutSession({
  selectedPackage,
  student,
  couponCode,
  paymentMode,
  paymentAmount,
}: {
  selectedPackage: CounsellingPackage;
  student: CheckoutStudentDetails;
  couponCode?: string;
  paymentMode: PaymentMode;
  paymentAmount?: number;
}): CheckoutSession {
  const pricing = calculateCheckoutPayment({
    baseAmount: selectedPackage.baseAmount,
    taxRate: selectedPackage.taxRate,
    couponCode,
    paymentAmount,
  });

  return {
    packageId: selectedPackage.id,
    packageTitle: selectedPackage.title,
    packageSubtitle: selectedPackage.subtitle,
    student,
    baseAmount: pricing.baseAmount,
    taxRate: pricing.taxRate,
    taxAmount: pricing.taxAmount,
    totalAmount: pricing.totalAmount,
    discountAmount: pricing.discountAmount,
    couponCode: pricing.coupon?.code,
    netAmount: pricing.netAmount,
    amountPaid: pricing.amountPaid,
    dueAmount: pricing.dueAmount,
    paymentMode,
    createdAt: new Date().toISOString(),
  };
}

export function saveCheckoutSession(session: CheckoutSession) {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.setItem(CHECKOUT_SESSION_KEY, JSON.stringify(session));
}

export function getCheckoutSession() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const rawSession = window.sessionStorage.getItem(CHECKOUT_SESSION_KEY);
    return rawSession ? (JSON.parse(rawSession) as CheckoutSession) : null;
  } catch {
    return null;
  }
}

export function savePaymentRecord(record: PaymentRecord) {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.setItem(
    record.paymentStatus === "success" ? PAYMENT_RESULT_KEY : PAYMENT_FAILURE_KEY,
    JSON.stringify(record),
  );
}

export function getPaymentRecord(status: "success" | "failed") {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const rawRecord = window.sessionStorage.getItem(
      status === "success" ? PAYMENT_RESULT_KEY : PAYMENT_FAILURE_KEY,
    );
    return rawRecord ? (JSON.parse(rawRecord) as PaymentRecord) : null;
  } catch {
    return null;
  }
}

function randomHex(length = 8) {
  const bytes = new Uint8Array(length / 2);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();
}

export function generateTransactionId() {
  return `CKPAY${new Date().getFullYear()}${randomHex(8)}`;
}

export function generateAttemptId() {
  return `CKATTEMPT${randomHex(8)}`;
}

export async function processMockPayment({
  session,
  method,
  result,
}: {
  session: CheckoutSession;
  method: PaymentMethod;
  result: DemoPaymentResult;
}) {
  await new Promise((resolve) => window.setTimeout(resolve, 1900));

  const baseRecord = {
    ...session,
    paymentMethod: method,
    paymentDate: new Date().toISOString(),
  };

  if (result === "success") {
    return {
      ...baseRecord,
      transactionId: generateTransactionId(),
      paymentStatus: "success" as const,
    };
  }

  return {
    ...baseRecord,
    attemptId: generateAttemptId(),
    paymentStatus: "failed" as const,
  };
}

export function getPackageFromSession(session: CheckoutSession | null) {
  return getCounsellingPackage(session?.packageId) ?? null;
}

export function describePaymentAmount(session: CheckoutSession) {
  if (session.paymentMode === "partial") {
    return `${formatIndianCurrency(session.amountPaid)} now`;
  }

  return formatIndianCurrency(session.amountPaid);
}
