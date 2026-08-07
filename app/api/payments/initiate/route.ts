import { NextResponse } from "next/server";
import {
  calculateCheckoutPayment,
  getCounsellingPackage,
} from "@/lib/counsellingPackages";
import type { CounsellingEnrollmentPayload } from "@/types/payment";

type InitiatePaymentRequest = {
  packageId?: string;
  studentName?: string;
  email?: string;
  mobile?: string;
  whatsapp?: string;
  course?: string;
  stateOrDomicile?: string;
  district?: string;
  scoreOrRank?: string;
  applicationNumber?: string;
  category?: string;
  couponCode?: string;
  paymentAmount?: number;
};

function isValidEmail(value = "") {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidIndianPhone(value = "") {
  const digits = value.replace(/\D/g, "");
  return /^[6-9]\d{9}$/.test(digits);
}

function getMinimumPartialPayment(netAmount: number) {
  if (netAmount <= 5000) {
    return 1;
  }

  return 5000;
}

export async function POST(request: Request) {
  let body: InitiatePaymentRequest;

  try {
    body = (await request.json()) as InitiatePaymentRequest;
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const selectedPackage = getCounsellingPackage(body.packageId);

  if (!selectedPackage) {
    return NextResponse.json(
      { message: "Please select a valid counselling package." },
      { status: 400 },
    );
  }

  if (!body.studentName?.trim()) {
    return NextResponse.json({ message: "Student name is required." }, { status: 400 });
  }

  if (!isValidIndianPhone(body.mobile)) {
    return NextResponse.json({ message: "Enter a valid mobile number." }, { status: 400 });
  }

  if (!isValidIndianPhone(body.whatsapp)) {
    return NextResponse.json({ message: "Enter a valid WhatsApp number." }, { status: 400 });
  }

  if (!isValidEmail(body.email)) {
    return NextResponse.json({ message: "Enter a valid email address." }, { status: 400 });
  }

  if (!body.course?.trim()) {
    return NextResponse.json({ message: "Course interested in is required." }, { status: 400 });
  }

  const pricing = calculateCheckoutPayment({
    baseAmount: selectedPackage.baseAmount,
    taxRate: selectedPackage.taxRate,
    couponCode: body.couponCode,
    paymentAmount: body.paymentAmount,
  });

  if (pricing.couponError) {
    return NextResponse.json({ message: pricing.couponError }, { status: 400 });
  }

  if (pricing.amountPaid <= 0) {
    return NextResponse.json({ message: "Enter a valid payment amount." }, { status: 400 });
  }

  if (pricing.amountPaid < getMinimumPartialPayment(pricing.netAmount)) {
    return NextResponse.json(
      {
        message: `Partial payment must be at least Rs. ${getMinimumPartialPayment(
          pricing.netAmount,
        ).toLocaleString("en-IN")}.`,
      },
      { status: 400 },
    );
  }

  const email = (body.email ?? "").trim().toLowerCase();
  const mobile = (body.mobile ?? "").replace(/\D/g, "");
  const whatsapp = (body.whatsapp ?? "").replace(/\D/g, "");
  const enrollmentId = `CK-${Date.now().toString(36).toUpperCase()}`;
  const enrollmentDraft: CounsellingEnrollmentPayload = {
    enrollmentId,
    studentName: body.studentName.trim(),
    email,
    mobile,
    whatsapp,
    course: body.course.trim(),
    stateOrDomicile: body.stateOrDomicile?.trim(),
    district: body.district?.trim(),
    scoreOrRank: body.scoreOrRank?.trim(),
    applicationNumber: body.applicationNumber?.trim(),
    category: body.category?.trim(),
    packageId: selectedPackage.id,
    packageName: `${selectedPackage.title} - ${selectedPackage.subtitle}`,
    baseAmount: pricing.baseAmount,
    taxAmount: pricing.taxAmount,
    totalAmount: pricing.totalAmount,
    discountAmount: pricing.discountAmount,
    netAmount: pricing.netAmount,
    amountPaid: pricing.amountPaid,
    dueAmount: pricing.dueAmount,
    couponCode: pricing.coupon?.code,
    paymentStatus: pricing.paymentStatus,
    paymentGatewayReference: `DUMMY-${enrollmentId}`,
    createdAt: new Date().toISOString(),
  };

  const params = new URLSearchParams({
    enrollment: enrollmentId,
    paid: String(pricing.amountPaid),
    due: String(pricing.dueAmount),
    total: String(pricing.netAmount),
  });
  const redirectUrl =
    pricing.dueAmount > 0
      ? `/checkout/pending?${params.toString()}`
      : `/checkout/success?${params.toString()}`;

  return NextResponse.json({
    message: "Dummy payment created successfully.",
    redirectUrl,
    enrollmentDraft,
  });
}
