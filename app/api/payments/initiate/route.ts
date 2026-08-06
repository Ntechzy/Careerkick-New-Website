import { NextResponse } from "next/server";
import {
  calculateCounsellingTotal,
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
};

function isValidEmail(value = "") {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidIndianPhone(value = "") {
  const digits = value.replace(/\D/g, "");
  return /^[6-9]\d{9}$/.test(digits);
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

  const pricing = calculateCounsellingTotal(selectedPackage.baseAmount, selectedPackage.taxRate);
  const email = (body.email ?? "").trim().toLowerCase();
  const mobile = (body.mobile ?? "").replace(/\D/g, "");
  const whatsapp = (body.whatsapp ?? "").replace(/\D/g, "");
  const enrollmentDraft: CounsellingEnrollmentPayload = {
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
    paymentStatus: "pending",
    createdAt: new Date().toISOString(),
  };

  if (!process.env.EAZYPAY_INITIATE_URL) {
    return NextResponse.json(
      {
        message:
          "Payment gateway initiation is not configured yet.",
        enrollmentDraft,
      },
      { status: 501 },
    );
  }

  return NextResponse.json(
    {
      message:
        "Server-side EazyPay initiation must be implemented here using merchant credentials kept outside client code.",
      enrollmentDraft,
    },
    { status: 501 },
  );
}
