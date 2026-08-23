export type CounsellingPackage = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  baseAmount: number;
  taxRate?: number;
  gstInclusive?: boolean;
  highlight?: boolean;
  image?: string;
  defaultCourse: string;
  inclusions: string[];
  validity: string;
};

export const GST_RATE = 0.18;
export const GST_INCLUSIVE_PLAN_AMOUNT = 30000;

export function isGstInclusivePlanAmount(amount: number) {
  return Math.round(amount) === GST_INCLUSIVE_PLAN_AMOUNT;
}

export type CouponType = "percentage" | "flat";

export type CouponCode = {
  code: string;
  label: string;
  type: CouponType;
  value: number;
  minimumOrderAmount?: number;
  maxDiscount?: number;
};

export const COUPON_CODES: CouponCode[] = [
  {
    code: "CAREER500",
    label: "Coupon applied successfully",
    type: "flat",
    value: 500,
  },
  {
    code: "CK1000",
    label: "Coupon applied successfully",
    type: "flat",
    value: 1000,
  },
];

export const COUNSELLING_PAYMENT_NOTES = [
  "Full or partial payment can be recorded during checkout. Any unpaid balance remains due until cleared by the student.",
  "If the candidate does not secure a college admission, the counselling fee will be refunded after deducting the applicable 18% GST.",
] as const;

export const COURSE_OPTIONS = [
  "MBBS",
  "BDS",
  "BAMS",
  "BHMS",
  "BUMS",
  "BSc Nursing",
  "Veterinary",
  "BPT",
  "JEE / Engineering",
  "Other",
] as const;

export const COUNSELLING_PACKAGES: CounsellingPackage[] = [
  {
    id: "mbbs-govt-counselling",
    title: "Government MBBS / BDS / AYUSH / Veterinary / Other Courses Counselling",
    subtitle: "Government Counselling",
    description:
      "Complete counselling support for Government MBBS, BDS, BAMS, BHMS, BUMS, Veterinary and other medical-course admissions.",
    baseAmount: 30000,
    taxRate: 0,
    gstInclusive: true,
    highlight: true,
    defaultCourse: "MBBS",
    image:
      "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1775547636/mbbs_govt_jfwmon.webp",
    inclusions: [
      "Counselling guidance",
      "Counselling registration guidance",
      "College selection assistance",
      "Choice filling support",
      "Round-wise counselling support",
      "Documentation guidance",
      "Seat allotment guidance",
      "Admission process assistance",
    ],
    validity:
      "Valid for the applicable counselling session/cycle and counselling rounds covered under the selected package.",
  },
  {
    id: "mbbs-private-counselling",
    title: "Private MBBS Counselling",
    subtitle: "Private MBBS",
    description:
      "End-to-end guidance for private MBBS admissions, from choice filling to final admission.",
    baseAmount: 75000,
    taxRate: 0,
    defaultCourse: "MBBS",
    image:
      "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1775547637/mbbs_private_xlx12n.webp",
    inclusions: [
      "Counselling guidance",
      "Counselling registration guidance",
      "College selection assistance",
      "Choice filling support",
      "Round-wise counselling support",
      "Documentation guidance",
      "Seat allotment guidance",
      "Admission process assistance",
    ],
    validity:
      "Valid for the applicable counselling session/cycle and counselling rounds covered under the selected package.",
  },
  {
    id: "google-meet-nikhil-sir",
    title: "Google Meet with Nikhil Sir",
    subtitle: "One-to-one Counselling",
    description:
      "One-to-one professional counselling discussion and personalised guidance.",
    baseAmount: 5000,
    taxRate: 0,
    defaultCourse: "Other",
    image:
      "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1775547637/mbbs_private_xlx12n.webp",
    inclusions: [
      "Counselling guidance",
      "Counselling registration guidance",
      "College selection assistance",
      "Choice filling support",
      "Round-wise counselling support",
      "Documentation guidance",
      "Seat allotment guidance",
      "Admission process assistance",
    ],
    validity:
      "Valid for the applicable counselling session/cycle and counselling rounds covered under the selected package.",
  },
];

export function getCounsellingPackage(packageId?: string | null) {
  return COUNSELLING_PACKAGES.find((item) => item.id === packageId);
}

export function calculateCounsellingTotal(baseAmount: number, taxRate = GST_RATE) {
  const taxAmount = Math.round(baseAmount * taxRate);

  return {
    baseAmount,
    taxRate,
    taxAmount,
    totalAmount: baseAmount + taxAmount,
  };
}

export function getCouponCode(code?: string | null) {
  const normalizedCode = code?.trim().toUpperCase();

  if (!normalizedCode) {
    return null;
  }

  return COUPON_CODES.find((coupon) => coupon.code === normalizedCode) ?? null;
}

export function calculateCouponDiscount(totalAmount: number, code?: string | null) {
  const coupon = getCouponCode(code);

  if (!coupon) {
    return {
      coupon: null,
      discountAmount: 0,
      error: code?.trim() ? "This coupon code is not valid." : undefined,
    };
  }

  if (coupon.minimumOrderAmount && totalAmount < coupon.minimumOrderAmount) {
    return {
      coupon,
      discountAmount: 0,
      error: `${coupon.code} applies on orders of ${formatIndianCurrency(coupon.minimumOrderAmount)} or above.`,
    };
  }

  const rawDiscount =
    coupon.type === "percentage"
      ? Math.round((totalAmount * coupon.value) / 100)
      : coupon.value;
  const cappedDiscount = coupon.maxDiscount
    ? Math.min(rawDiscount, coupon.maxDiscount)
    : rawDiscount;

  return {
    coupon,
    discountAmount: Math.min(cappedDiscount, totalAmount),
    error: undefined,
  };
}

export function calculateCheckoutPayment({
  baseAmount,
  taxRate = GST_RATE,
  couponCode,
  paymentAmount,
}: {
  baseAmount: number;
  taxRate?: number;
  couponCode?: string | null;
  paymentAmount?: number | null;
}) {
  const pricing = calculateCounsellingTotal(baseAmount, taxRate);
  const couponResult = calculateCouponDiscount(pricing.totalAmount, couponCode);
  const netAmount = Math.max(pricing.totalAmount - couponResult.discountAmount, 0);
  const amountPaid = Math.min(Math.max(Math.round(paymentAmount ?? netAmount), 0), netAmount);
  const dueAmount = Math.max(netAmount - amountPaid, 0);

  return {
    ...pricing,
    coupon: couponResult.coupon,
    couponCode: couponResult.coupon?.code ?? couponCode?.trim().toUpperCase() ?? "",
    couponError: couponResult.error,
    discountAmount: couponResult.discountAmount,
    netAmount,
    amountPaid,
    dueAmount,
    paymentStatus: dueAmount > 0 ? ("pending" as const) : ("success" as const),
  };
}

export function formatIndianCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}
