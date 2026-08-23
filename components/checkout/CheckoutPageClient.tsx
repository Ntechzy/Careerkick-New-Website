"use client";

import Image from "next/image";
import Link from "next/link";
import type React from "react";
import { useMemo, useState } from "react";
import { getAllStates, getDistricts } from "india-state-district";
import {
  AlertCircle,
  ArrowDown,
  ArrowLeft,
  Check,
  ChevronDown,
  IndianRupee,
  Loader2,
  Lock,
  PhoneCall,
  ShieldCheck,
  Tag,
} from "lucide-react";
import {
  calculateCheckoutPayment,
  COUNSELLING_PAYMENT_NOTES,
  COURSE_OPTIONS,
  formatIndianCurrency,
  type CounsellingPackage,
} from "@/lib/counsellingPackages";
import { CONTACT_NUMBERS, getTelLink } from "@/lib/contactLinks";
import { initiatePayment } from "@/lib/features/paymentSlice";
import { useAppDispatch } from "@/lib/hooks";
import {
  createCheckoutSession,
  getMinimumPartialPayment,
  saveCheckoutSession,
  type PaymentMode,
} from "@/lib/mockPayment";
import { cn } from "@/lib/utils";

type CheckoutPageClientProps = {
  selectedPackage: CounsellingPackage | null;
};

type StudentFormState = {
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

type FormState = StudentFormState & {
  couponCode: string;
  paymentMode: PaymentMode;
  partialPaymentAmount: string;
  policiesAccepted: boolean;
};

type FormErrors = Partial<Record<keyof FormState | "submit", string>>;

const CATEGORY_OPTIONS = [
  "General",
  "OBC",
  "SC",
  "ST",
  "EWS",
] as const;

const POLICY_SECTIONS = [
  {
    title: "Important Payment Information",
    preview: "Full or partial payment can be recorded during checkout.",
    body: COUNSELLING_PAYMENT_NOTES.join(" "),
  },
  {
    title: "Admission Disclaimer",
    preview: "Counselling support does not guarantee admission.",
    body:
      "CareerKick provides counselling, guidance and admission-support services. Admission or seat allotment is subject to the student's eligibility, rank/score, preferences, seat availability, counselling authority rules and participating institutions. Purchasing a counselling package does not guarantee admission to any particular college, course or seat.",
  },
  {
    title: "Refund & Cancellation Policy",
    preview: "Refund rules are shown here for review before payment.",
    body:
      "If the candidate does not secure a college admission, the counselling fee will be refunded after deducting the applicable 18% GST.",
  },
  {
    title: "Terms & Conditions",
    preview: "Review the service scope and excluded third-party charges.",
    body:
      "This payment is towards CareerKick's professional counselling and admission-guidance services. Government counselling registration fees, security deposits, college fees, hostel fees and other third-party charges are not included unless specifically stated in the selected package.",
  },
] as const;

const NEXT_STEPS = [
  "Payment confirmation",
  "Counselling onboarding",
  "Student profile completion",
  "Counselling begins",
] as const;

const INDIAN_STATES = getAllStates();
const STATE_OPTIONS = INDIAN_STATES.map((state) => ({
  value: state.code,
  label: state.name,
}));
const STATE_CODES = INDIAN_STATES.map((state) => state.code);

function getStateName(stateCode: string) {
  return INDIAN_STATES.find((state) => state.code === stateCode)?.name ?? stateCode;
}

function normalizeIndianMobile(value: string) {
  let digits = value.replace(/\D/g, "");

  if (digits.length === 12 && digits.startsWith("91")) {
    digits = digits.slice(2);
  }

  if (digits.length === 11 && digits.startsWith("0")) {
    digits = digits.slice(1);
  }

  return digits;
}

function getExamType(course: string) {
  return course.toLowerCase().includes("jee") ? "JEE" : "NEET";
}

function initialForm(selectedPackage: CounsellingPackage | null): FormState {
  return {
    studentName: "",
    mobile: "",
    email: "",
    whatsapp: "",
    course: selectedPackage?.defaultCourse ?? "",
    stateOrDomicile: "",
    district: "",
    scoreOrRank: "",
    applicationNumber: "",
    category: "",
    couponCode: "",
    paymentMode: "full",
    partialPaymentAmount: selectedPackage ? String(Math.min(15000, selectedPackage.baseAmount)) : "",
    policiesAccepted: false,
  };
}

function validateField(field: keyof FormState, values: FormState) {
  if (field === "studentName" && values.studentName.trim().length < 2) {
    return "Enter the student's full name.";
  }

  if (field === "mobile" && !/^[6-9]\d{9}$/.test(normalizeIndianMobile(values.mobile))) {
    return "Enter a valid 10-digit Indian mobile number.";
  }

  if (field === "whatsapp" && !/^[6-9]\d{9}$/.test(normalizeIndianMobile(values.whatsapp))) {
    return "Enter a valid 10-digit WhatsApp number.";
  }

  if (field === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    return "Enter a valid email address.";
  }

  if (field === "course" && !COURSE_OPTIONS.some((course) => course === values.course)) {
    return "Select the course interested in.";
  }

  if (field === "stateOrDomicile" && values.stateOrDomicile && !STATE_CODES.includes(values.stateOrDomicile)) {
    return "Select a valid state or domicile.";
  }

  if (field === "district") {
    const districts = values.stateOrDomicile ? getDistricts(values.stateOrDomicile) : [];

    if (values.district && !districts.includes(values.district)) {
      return "Select a valid district for the selected state.";
    }
  }

  if (field === "scoreOrRank" && values.scoreOrRank && !/^\d+$/.test(values.scoreOrRank.trim())) {
    return "Use numbers only for score or rank.";
  }

  if (
    field === "applicationNumber" &&
    values.applicationNumber &&
    !/^[A-Za-z0-9 /-]+$/.test(values.applicationNumber.trim())
  ) {
    return "Use a valid application or roll number.";
  }

  if (field === "category" && values.category && !CATEGORY_OPTIONS.some((category) => category === values.category)) {
    return "Select a valid category.";
  }

  if (field === "policiesAccepted" && !values.policiesAccepted) {
    return "Please accept the policies before continuing.";
  }

  return undefined;
}

function validateForm(values: FormState, netAmount: number) {
  const fields: Array<keyof FormState> = [
    "studentName",
    "mobile",
    "email",
    "whatsapp",
    "course",
    "stateOrDomicile",
    "district",
    "scoreOrRank",
    "applicationNumber",
    "category",
    "policiesAccepted",
  ];
  const errors: FormErrors = {};

  fields.forEach((field) => {
    const error = validateField(field, values);

    if (error) {
      errors[field] = error;
    }
  });

  if (values.paymentMode === "partial") {
    const amount = Number(values.partialPaymentAmount || 0);
    const minimumAmount = getMinimumPartialPayment(netAmount);

    if (!Number.isFinite(amount) || amount <= 0) {
      errors.partialPaymentAmount = "Enter a partial payment amount.";
    } else if (amount < minimumAmount) {
      errors.partialPaymentAmount = `Minimum payment is ${formatIndianCurrency(minimumAmount)}.`;
    } else if (amount >= netAmount) {
      errors.partialPaymentAmount = "Use full payment when paying the complete amount.";
    }
  }

  return errors;
}

function isStudentDetailsReady(values: FormState) {
  const requiredStudentFields: Array<keyof FormState> = [
    "studentName",
    "mobile",
    "email",
    "whatsapp",
    "course",
  ];

  return requiredStudentFields.every((field) => !validateField(field, values));
}

export function CheckoutPageClient({ selectedPackage }: CheckoutPageClientProps) {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState<FormState>(() => initialForm(selectedPackage));
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [couponOpen, setCouponOpen] = useState(false);
  const studentDetailsReady = isStudentDetailsReady(form);
  const districtOptions = useMemo(
    () => (form.stateOrDomicile ? getDistricts(form.stateOrDomicile) : []),
    [form.stateOrDomicile],
  );

  const requestedPaymentAmount =
    form.paymentMode === "partial" ? Number.parseInt(form.partialPaymentAmount || "0", 10) : undefined;

  const pricing = useMemo(() => {
    if (!selectedPackage) {
      return null;
    }

    return calculateCheckoutPayment({
      baseAmount: selectedPackage.baseAmount,
      taxRate: selectedPackage.taxRate,
      couponCode: form.couponCode,
      paymentAmount: requestedPaymentAmount,
    });
  }, [form.couponCode, requestedPaymentAmount, selectedPackage]);

  const updateField = <Key extends keyof FormState>(field: Key, value: FormState[Key]) => {
    setForm((current) => {
      const nextForm = {
        ...current,
        [field]: value,
        ...(field === "stateOrDomicile" ? { district: "" } : {}),
      };

      setErrors((currentErrors) => ({
        ...currentErrors,
        [field]: validateField(field, nextForm),
        ...(field === "stateOrDomicile" ? { district: undefined } : {}),
        ...(field === "couponCode" ? { couponCode: undefined } : {}),
        submit: undefined,
      }));

      return nextForm;
    });
  };

  const handleCouponApply = () => {
    if (!pricing) {
      return;
    }

    setErrors((current) => ({
      ...current,
      couponCode: pricing.couponError,
      submit: undefined,
    }));
  };

  const handleSubmit = async (event?: React.FormEvent) => {
    event?.preventDefault();

    if (!selectedPackage || !pricing) {
      setErrors({ submit: "Selected package could not be found." });
      return;
    }

    const nextErrors = validateForm(form, pricing.netAmount);

    if (pricing.couponError) {
      nextErrors.couponCode = pricing.couponError;
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSubmitting(true);
    const session = createCheckoutSession({
      selectedPackage,
      couponCode: form.couponCode,
      paymentMode: form.paymentMode,
      paymentAmount: form.paymentMode === "partial" ? requestedPaymentAmount : undefined,
      student: {
        studentName: form.studentName.trim(),
        mobile: normalizeIndianMobile(form.mobile),
        email: form.email.trim().toLowerCase(),
        whatsapp: normalizeIndianMobile(form.whatsapp),
        course: form.course,
        stateOrDomicile: form.stateOrDomicile ? getStateName(form.stateOrDomicile) : "",
        district: form.district,
        scoreOrRank: form.scoreOrRank.trim(),
        applicationNumber: form.applicationNumber.trim(),
        category: form.category,
      },
    });

    saveCheckoutSession(session);
    const paymentResult = await dispatch(
      initiatePayment({
        planId: selectedPackage.id,
        amount: pricing.amountPaid,
        student: {
          name: form.studentName.trim(),
          email: form.email.trim().toLowerCase(),
          number: normalizeIndianMobile(form.mobile),
          whatsappNo: normalizeIndianMobile(form.whatsapp),
          course: form.course,
          state: form.stateOrDomicile ? getStateName(form.stateOrDomicile) : "",
          district: form.district,
          examType: getExamType(form.course),
          examScoreOrRank: Number.parseInt(form.scoreOrRank || "0", 10),
          examAppOrRollNo: form.applicationNumber.trim(),
          category: form.category,
        },
      }),
    );

    if (initiatePayment.fulfilled.match(paymentResult)) {
      saveCheckoutSession({
        ...session,
        merchantTxnNo: paymentResult.payload.merchantTxnNo ?? undefined,
      });
      window.location.assign(paymentResult.payload.redirectUrl);
      return;
    }

    setSubmitting(false);
    setErrors({
      submit:
        paymentResult.payload ??
        paymentResult.error.message ??
        "Unable to initiate payment.",
    });
  };

  if (!selectedPackage || !pricing) {
    return <InvalidPackageState />;
  }

  return (
    <main className="min-h-screen bg-[#F6F8F5] pb-28 text-slate-900 md:pb-16">
      <CheckoutHeader />
      <div className="mx-auto max-w-[1180px] px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <CheckoutProgress />

        <div className="mt-5 sm:mt-6">
          <h1 className="text-2xl font-bold leading-tight text-slate-950 sm:text-4xl">Complete Your Enrollment</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Enter the student&apos;s details and review your counselling package before proceeding to payment.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="mt-5 grid gap-5 sm:mt-7 lg:grid-cols-[minmax(0,1fr)_370px] lg:items-start lg:gap-6">
          <div className="order-1 space-y-4 sm:space-y-5">
            <StudentDetailsForm
              form={form}
              errors={errors}
              districtOptions={districtOptions}
              updateField={updateField}
            />
            {studentDetailsReady ? <ScrollForPaymentPrompt /> : null}
            <SelectedPlanCard selectedPackage={selectedPackage} />
            <InfoStrip text={selectedPackage.validity} />
            <NextStepsAccordion />
            <PolicyAccordions />
          </div>

          <aside className="order-2 lg:sticky lg:top-6">
            <OrderSummary
              form={form}
              errors={errors}
              pricing={pricing}
              selectedPackage={selectedPackage}
              couponOpen={couponOpen}
              submitting={submitting}
              setCouponOpen={setCouponOpen}
              updateField={updateField}
              handleCouponApply={handleCouponApply}
            />
          </aside>
        </form>
      </div>

      <MobileCheckoutBar
        amount={pricing.amountPaid}
        submitting={submitting}
        onContinue={() => void handleSubmit()}
      />
    </main>
  );
}

function ScrollForPaymentPrompt() {
  return (
    <div
      role="status"
      className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-[#276005] shadow-sm md:hidden"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#51A70A]">
        <ArrowDown className="h-5 w-5" />
      </span>
      <span>Your details are complete. Scroll down to review the payment summary and continue.</span>
    </div>
  );
}

function CheckoutHeader() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="CareerKick home">
          <Image src="/logo.png" alt="CareerKick" width={132} height={42} className="h-8 w-auto object-contain sm:h-10" priority />
        </Link>
        <div className="flex min-w-0 items-center gap-2 text-sm sm:gap-4">
          <span className="hidden items-center gap-2 font-semibold text-slate-700 sm:inline-flex">
            <ShieldCheck className="h-4 w-4 text-[#51A70A]" />
            Secure Checkout
          </span>
          <a
            href={getTelLink(CONTACT_NUMBERS.primaryDigits)}
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 text-xs font-bold text-[#276005] sm:border-0 sm:bg-transparent sm:px-0 sm:text-sm"
          >
            <PhoneCall className="h-4 w-4 sm:hidden" />
            <span className="hidden sm:inline">Need Help?</span>
            <span>{CONTACT_NUMBERS.primaryDisplay}</span>
          </a>
        </div>
      </div>
    </header>
  );
}

function CheckoutProgress() {
  const steps = ["Student Details", "Review", "Payment"];

  return (
    <ol className="grid grid-cols-3 gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm sm:flex sm:items-center sm:p-3">
      {steps.map((step, index) => (
        <li
          key={step}
          className={cn(
            "flex min-w-0 flex-col items-center gap-1 rounded-xl px-2 py-2 text-center text-[11px] font-semibold leading-tight text-slate-500 sm:flex-1 sm:flex-row sm:gap-2 sm:p-0 sm:text-left sm:text-sm",
            index === 0 ? "bg-emerald-50 sm:bg-transparent" : "",
          )}
        >
          <span
            className={cn(
              "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs sm:h-7 sm:w-7",
              index === 0 ? "border-[#51A70A] bg-[#51A70A] text-white" : "border-slate-300 bg-white text-slate-500",
            )}
          >
            {index + 1}
          </span>
          <span className={cn("min-w-0", index === 0 ? "text-slate-950" : "")}>{step}</span>
          {index < steps.length - 1 ? <span className="ml-auto hidden h-px flex-1 bg-slate-200 sm:block" aria-hidden="true" /> : null}
        </li>
      ))}
    </ol>
  );
}

function StudentDetailsForm({
  form,
  errors,
  districtOptions,
  updateField,
}: {
  form: FormState;
  errors: FormErrors;
  districtOptions: string[];
  updateField: <Key extends keyof FormState>(field: Key, value: FormState[Key]) => void;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <h2 className="text-lg font-bold text-slate-950 sm:text-xl">Student Details</h2>
      <p className="mt-1 text-sm text-slate-600">
        We&apos;ll use these details for payment confirmation and counselling onboarding.
      </p>
      <div className="mt-5 grid gap-4 sm:mt-6 sm:grid-cols-2">
        <TextField id="studentName" label="Student Full Name" value={form.studentName} error={errors.studentName} required onChange={(value) => updateField("studentName", value)} />
        <TextField id="mobile" label="Mobile Number" type="tel" inputMode="numeric" value={form.mobile} error={errors.mobile} required onChange={(value) => updateField("mobile", value)} />
        <TextField id="email" label="Email Address" type="email" value={form.email} error={errors.email} required onChange={(value) => updateField("email", value)} />
        <TextField id="whatsapp" label="WhatsApp Number" type="tel" inputMode="numeric" value={form.whatsapp} error={errors.whatsapp} required onChange={(value) => updateField("whatsapp", value)} />
        <SelectField id="course" label="Course Interested In" value={form.course} error={errors.course} required options={COURSE_OPTIONS} placeholder="Select course" onChange={(value) => updateField("course", value)} />
        <SelectField id="stateOrDomicile" label="State / Domicile" value={form.stateOrDomicile} error={errors.stateOrDomicile} options={STATE_OPTIONS} placeholder="Select state" onChange={(value) => updateField("stateOrDomicile", value)} />
        <SelectField id="district" label="District" value={form.district} error={errors.district} options={districtOptions} placeholder={form.stateOrDomicile ? "Select district" : "Select state first"} disabled={!form.stateOrDomicile} onChange={(value) => updateField("district", value)} />
        <TextField id="scoreOrRank" label="NEET/JEE Score or Rank" value={form.scoreOrRank} error={errors.scoreOrRank} onChange={(value) => updateField("scoreOrRank", value)} />
        <TextField id="applicationNumber" label="NEET/JEE Application / Roll Number" value={form.applicationNumber} error={errors.applicationNumber} onChange={(value) => updateField("applicationNumber", value)} />
        <SelectField id="category" label="Category" value={form.category} error={errors.category} options={CATEGORY_OPTIONS} placeholder="Select category" onChange={(value) => updateField("category", value)} />
      </div>
    </section>
  );
}

function TextField({
  id,
  label,
  value,
  error,
  required,
  type = "text",
  inputMode,
  onChange,
}: {
  id: keyof FormState;
  label: string;
  value: string;
  error?: string;
  required?: boolean;
  type?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-slate-800">
        {label}
        {required ? <span className="text-[#51A70A]"> *</span> : null}
      </label>
      <input
        id={id}
        type={type}
        inputMode={inputMode}
        value={value}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(event) => onChange(event.target.value)}
        className={cn(
          "mt-2 min-h-[52px] w-full rounded-xl border bg-white px-4 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[#51A70A] focus:ring-4 focus:ring-[#51A70A]/15 sm:h-12 sm:min-h-0 sm:text-sm",
          error ? "border-red-300" : "border-slate-300",
        )}
      />
      {error ? <p id={`${id}-error`} className="mt-1.5 text-sm font-medium text-red-600">{error}</p> : null}
    </div>
  );
}

function SelectField({
  id,
  label,
  value,
  error,
  required,
  options,
  placeholder,
  disabled,
  onChange,
}: {
  id: keyof FormState;
  label: string;
  value: string;
  error?: string;
  required?: boolean;
  options: readonly string[] | Array<{ value: string; label: string }>;
  placeholder: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-slate-800">
        {label}
        {required ? <span className="text-[#51A70A]"> *</span> : null}
      </label>
      <select
        id={id}
        value={value}
        required={required}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(event) => onChange(event.target.value)}
        className={cn(
          "mt-2 min-h-[52px] w-full rounded-xl border bg-white px-4 text-base text-slate-950 outline-none transition focus:border-[#51A70A] focus:ring-4 focus:ring-[#51A70A]/15 disabled:bg-slate-100 disabled:text-slate-400 sm:h-12 sm:min-h-0 sm:text-sm",
          error ? "border-red-300" : "border-slate-300",
        )}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => {
          const optionValue = typeof option === "string" ? option : option.value;
          const optionLabel = typeof option === "string" ? option : option.label;

          return (
            <option key={optionValue} value={optionValue}>
              {optionLabel}
            </option>
          );
        })}
      </select>
      {error ? <p id={`${id}-error`} className="mt-1.5 text-sm font-medium text-red-600">{error}</p> : null}
    </div>
  );
}

function SelectedPlanCard({ selectedPackage }: { selectedPackage: CounsellingPackage }) {
  const [open, setOpen] = useState(false);
  const featuredInclusions = selectedPackage.inclusions.slice(0, 5);
  const remainingInclusions = selectedPackage.inclusions.slice(5);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-[#276005]">Selected Counselling Plan</p>
          <h2 className="mt-1 text-lg font-bold text-slate-950 sm:text-xl">{selectedPackage.title}</h2>
          <p className="mt-1 text-sm text-slate-600">{selectedPackage.subtitle}</p>
          <p className="mt-3 text-xl font-bold text-slate-950 sm:text-2xl">
            {formatIndianCurrency(selectedPackage.baseAmount)}
            <span className="text-sm font-semibold text-slate-500">
              {selectedPackage.gstInclusive ? " 18% GST inclusive" : " + GST"}
            </span>
          </p>
        </div>
        <Link href="/services#pricing" className="inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-slate-300 px-4 text-sm font-semibold text-slate-800 transition hover:border-[#51A70A] hover:text-[#276005] sm:h-10 sm:w-auto">
          Change Plan
        </Link>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {featuredInclusions.map((item) => (
          <div key={item} className="flex items-start gap-2 text-sm text-slate-700">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#51A70A]" />
            <span>{item}</span>
          </div>
        ))}
      </div>

      {remainingInclusions.length > 0 ? (
        <div className="mt-4">
          <button type="button" onClick={() => setOpen((current) => !current)} aria-expanded={open} className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-[#276005]">
            View all inclusions
            <ChevronDown className={cn("h-4 w-4 transition", open ? "rotate-180" : "")} />
          </button>
          {open ? (
            <div className="mt-3 grid gap-2 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-2">
              {remainingInclusions.map((item) => (
                <div key={item} className="flex items-start gap-2 text-sm text-slate-700">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#51A70A]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}

function InfoStrip({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 text-sm leading-6 text-slate-700">
      <span className="font-semibold text-slate-950">Service validity: </span>
      {text}
    </div>
  );
}

function NextStepsAccordion() {
  return (
    <Accordion title="What happens after payment?" preview="A quick look at the onboarding flow after payment.">
      <ol className="grid gap-3 sm:grid-cols-2">
        {NEXT_STEPS.map((step, index) => (
          <li key={step} className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#51A70A] text-xs font-bold text-white">{index + 1}</span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </Accordion>
  );
}

function PolicyAccordions() {
  return (
    <section className="space-y-3">
      {POLICY_SECTIONS.map((section) => (
        <Accordion key={section.title} title={section.title} preview={section.preview}>
          <p className="text-sm leading-6 text-slate-700">{section.body}</p>
        </Accordion>
      ))}
    </section>
  );
}

function Accordion({
  title,
  preview,
  children,
}: {
  title: string;
  preview: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="flex w-full items-center justify-between gap-3 p-4 text-left sm:gap-4 sm:p-5"
      >
        <span>
          <span className="block text-base font-bold text-slate-950">{title}</span>
          <span className="mt-1 block text-sm text-slate-600">{preview}</span>
        </span>
        <ChevronDown className={cn("h-5 w-5 shrink-0 text-slate-500 transition", open ? "rotate-180" : "")} />
      </button>
      {open ? <div className="border-t border-slate-200 px-4 pb-4 pt-4 sm:px-5 sm:pb-5">{children}</div> : null}
    </section>
  );
}

function OrderSummary({
  form,
  errors,
  pricing,
  selectedPackage,
  couponOpen,
  submitting,
  setCouponOpen,
  updateField,
  handleCouponApply,
}: {
  form: FormState;
  errors: FormErrors;
  pricing: ReturnType<typeof calculateCheckoutPayment>;
  selectedPackage: CounsellingPackage;
  couponOpen: boolean;
  submitting: boolean;
  setCouponOpen: (value: boolean) => void;
  updateField: <Key extends keyof FormState>(field: Key, value: FormState[Key]) => void;
  handleCouponApply: () => void;
}) {
  const couponError = errors.couponCode ?? pricing.couponError;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-950 sm:text-xl">Order Summary</h2>
          <p className="mt-1 text-sm text-slate-600">{selectedPackage.subtitle}</p>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-[#276005] lg:hidden">
          Review
        </span>
      </div>

      <div className="mt-5 space-y-3 border-b border-slate-200 pb-5 text-sm">
        <SummaryRow label="Counselling Fee" value={formatIndianCurrency(pricing.baseAmount)} />
        {selectedPackage.gstInclusive ? <SummaryRow label="GST (18%)" value="Included" /> : null}
        {pricing.taxRate > 0 ? <SummaryRow label={`GST (${Math.round(pricing.taxRate * 100)}%)`} value={formatIndianCurrency(pricing.taxAmount)} /> : null}
        {pricing.discountAmount > 0 ? <SummaryRow label="Discount" value={`-${formatIndianCurrency(pricing.discountAmount)}`} /> : null}
      </div>

      <div className="mt-5 flex items-end justify-between gap-4">
        <span className="text-sm font-semibold text-slate-600">Total</span>
        <span className="text-xl font-bold text-slate-950 sm:text-2xl">{formatIndianCurrency(pricing.netAmount)}</span>
      </div>

      <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <button type="button" onClick={() => setCouponOpen(!couponOpen)} aria-expanded={couponOpen} className="flex min-h-10 w-full items-center justify-between text-sm font-semibold text-slate-800">
          <span className="inline-flex items-center gap-2">
            <Tag className="h-4 w-4 text-[#51A70A]" />
            Have a coupon?
          </span>
          <ChevronDown className={cn("h-4 w-4 transition", couponOpen ? "rotate-180" : "")} />
        </button>
        {couponOpen ? (
          <div className="mt-3">
            <div className="grid gap-2 sm:flex">
              <input
                id="couponCode"
                value={form.couponCode}
                placeholder="Enter coupon code"
                aria-invalid={Boolean(couponError)}
                aria-describedby={couponError ? "couponCode-error" : undefined}
                onChange={(event) => updateField("couponCode", event.target.value.toUpperCase())}
                className={cn(
                  "min-h-[48px] min-w-0 flex-1 rounded-xl border bg-white px-3 text-base font-semibold uppercase tracking-[0.08em] text-slate-950 outline-none focus:border-[#51A70A] focus:ring-4 focus:ring-[#51A70A]/15 sm:h-11 sm:min-h-0 sm:text-sm",
                  couponError ? "border-red-300" : "border-slate-300",
                )}
              />
              <button type="button" onClick={handleCouponApply} className="min-h-[48px] rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 sm:min-h-0">
                Apply
              </button>
            </div>
            {couponError ? <p id="couponCode-error" className="mt-2 text-sm font-medium text-red-600">{couponError}</p> : null}
            {pricing.coupon && !couponError ? <p className="mt-2 text-sm font-semibold text-green-700">Coupon applied successfully</p> : null}
          </div>
        ) : null}
      </div>

      <PaymentTypeControl form={form} pricing={pricing} errors={errors} updateField={updateField} />

      <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700 focus-within:border-[#51A70A]">
        <input
          type="checkbox"
          checked={form.policiesAccepted}
          required
          aria-invalid={Boolean(errors.policiesAccepted)}
          aria-describedby={errors.policiesAccepted ? "policiesAccepted-error" : undefined}
          onChange={(event) => updateField("policiesAccepted", event.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 rounded border-slate-300 accent-[#51A70A]"
        />
        <span>
          I agree to CareerKick&apos;s{" "}
          <Link href="/policies/terms" target="_blank" className="font-semibold text-[#276005] hover:underline">Terms & Conditions</Link>
          ,{" "}
          <Link href="/policies/privacy" target="_blank" className="font-semibold text-[#276005] hover:underline">Privacy Policy</Link>
          {" "}and{" "}
          <Link href="/policies/refund" target="_blank" className="font-semibold text-[#276005] hover:underline">Refund & Cancellation Policy</Link>.
        </span>
      </label>
      {errors.policiesAccepted ? <p id="policiesAccepted-error" className="mt-2 text-sm font-medium text-red-600">{errors.policiesAccepted}</p> : null}

      {errors.submit ? <div role="alert" className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{errors.submit}</div> : null}

      <button type="submit" disabled={submitting} className="mt-5 hidden min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#51A70A] px-5 py-3 text-base font-bold text-white shadow-sm transition hover:bg-[#438c08] disabled:cursor-not-allowed disabled:opacity-70 md:flex">
        {submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Lock className="h-5 w-5" />}
        {submitting ? "Preparing Payment..." : `Continue to Payment - ${formatIndianCurrency(pricing.amountPaid)}`}
      </button>
      <p className="mt-3 flex items-center justify-center gap-2 text-sm font-medium text-slate-600 md:mt-3">
        <Lock className="h-4 w-4 text-[#51A70A]" />
        Secure checkout experience
      </p>
    </section>
  );
}

function PaymentTypeControl({
  form,
  pricing,
  errors,
  updateField,
}: {
  form: FormState;
  pricing: ReturnType<typeof calculateCheckoutPayment>;
  errors: FormErrors;
  updateField: <Key extends keyof FormState>(field: Key, value: FormState[Key]) => void;
}) {
  return (
    <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4">
      <p className="text-sm font-bold text-slate-950">Payment Type</p>
      <div className="mt-3 grid grid-cols-2 rounded-xl bg-slate-100 p-1">
        {(["full", "partial"] as const).map((mode) => (
          <button
            key={mode}
            type="button"
            aria-pressed={form.paymentMode === mode}
            onClick={() => updateField("paymentMode", mode)}
            className={cn(
              "min-h-10 rounded-lg px-2 py-2 text-sm font-semibold leading-tight transition sm:px-3",
              form.paymentMode === mode ? "bg-white text-[#276005] shadow-sm" : "text-slate-600 hover:text-slate-950",
            )}
          >
            {mode === "full" ? "Full Payment" : "Partial Payment"}
          </button>
        ))}
      </div>

      {form.paymentMode === "partial" ? (
        <div className="mt-4 space-y-3">
          <SummaryRow label="Total payable" value={formatIndianCurrency(pricing.netAmount)} />
          <label htmlFor="partialPaymentAmount" className="block text-sm font-semibold text-slate-800">
            Amount to pay now
          </label>
          <div className="relative">
            <IndianRupee className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              id="partialPaymentAmount"
              type="number"
              min={getMinimumPartialPayment(pricing.netAmount)}
              max={pricing.netAmount - 1}
              value={form.partialPaymentAmount}
              aria-invalid={Boolean(errors.partialPaymentAmount)}
              aria-describedby={errors.partialPaymentAmount ? "partialPaymentAmount-error" : undefined}
              onChange={(event) => updateField("partialPaymentAmount", event.target.value)}
              className={cn(
                "min-h-[52px] w-full rounded-xl border bg-white pl-9 pr-4 text-base font-semibold text-slate-950 outline-none focus:border-[#51A70A] focus:ring-4 focus:ring-[#51A70A]/15 sm:h-12 sm:min-h-0 sm:text-sm",
                errors.partialPaymentAmount ? "border-red-300" : "border-slate-300",
              )}
            />
          </div>
          <p className="text-xs text-slate-500">Minimum payment: {formatIndianCurrency(getMinimumPartialPayment(pricing.netAmount))}</p>
          {errors.partialPaymentAmount ? <p id="partialPaymentAmount-error" className="text-sm font-medium text-red-600">{errors.partialPaymentAmount}</p> : null}
        </div>
      ) : null}

      <dl className="mt-4 space-y-2 rounded-xl bg-emerald-50 p-3 text-sm">
        <SummaryRow label="Pay Now" value={formatIndianCurrency(pricing.amountPaid)} />
        <SummaryRow label="Pending" value={formatIndianCurrency(pricing.dueAmount)} />
      </dl>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-slate-600">{label}</span>
      <span className="text-right font-bold text-slate-950">{value}</span>
    </div>
  );
}

function MobileCheckoutBar({
  amount,
  submitting,
  onContinue,
}: {
  amount: number;
  submitting: boolean;
  onContinue: () => void;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-4 py-3 shadow-[0_-8px_24px_rgba(15,23,42,0.08)] backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-3 pb-[env(safe-area-inset-bottom)]">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-slate-500">Pay now</p>
          <p className="truncate text-lg font-bold text-slate-950">{formatIndianCurrency(amount)}</p>
        </div>
        <button type="button" disabled={submitting} onClick={onContinue} className="inline-flex min-h-[50px] min-w-[150px] items-center justify-center gap-2 rounded-xl bg-[#51A70A] px-5 text-sm font-bold text-white shadow-sm disabled:opacity-70">
          {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
          {submitting ? "Preparing..." : "Continue"}
        </button>
      </div>
    </div>
  );
}

function InvalidPackageState() {
  return (
    <main className="bg-[#F6F8F5] px-4 py-20 text-slate-900">
      <section className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
          <AlertCircle className="h-6 w-6" />
        </span>
        <h1 className="mt-5 text-2xl font-bold text-slate-950">Selected package could not be found</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Please choose a valid counselling plan before continuing to checkout.
        </p>
        <Link href="/services#pricing" className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-[#51A70A] px-5 py-3 text-sm font-bold text-white">
          <ArrowLeft className="h-4 w-4" />
          View Counselling Plans
        </Link>
      </section>
    </main>
  );
}
