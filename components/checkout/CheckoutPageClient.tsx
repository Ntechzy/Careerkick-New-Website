"use client";

import Link from "next/link";
import type React from "react";
import { useMemo, useState } from "react";
import { getAllStates, getDistricts } from "india-state-district";
import { z } from "zod";
import {
  AlertCircle,
  ArrowLeft,
  Check,
  CheckCircle2,
  Clock,
  HelpCircle,
  IndianRupee,
  Loader2,
  Lock,
  Mail,
  Phone,
  ShieldCheck,
  Tag,
} from "lucide-react";
import {
  calculateCheckoutPayment,
  calculateCounsellingTotal,
  COUNSELLING_PAYMENT_NOTES,
  COUPON_CODES,
  COURSE_OPTIONS,
  formatIndianCurrency,
  type CounsellingPackage,
} from "@/lib/counsellingPackages";
import { CONTACT_NUMBERS, getTelLink, getWhatsAppLink } from "@/lib/contactLinks";
import { cn } from "@/lib/utils";

type CheckoutPageClientProps = {
  selectedPackage: CounsellingPackage | null;
};

type FormState = {
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
  couponCode: string;
  paymentMode: "full" | "partial";
  partialPaymentAmount: string;
  policiesAccepted: boolean;
};

type FormErrors = Partial<Record<keyof FormState | "submit", string>>;

const CATEGORY_OPTIONS = [
  "General / Unreserved",
  "General-EWS",
  "OBC",
  "SC",
  "ST",
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

const initialForm = (selectedPackage: CounsellingPackage | null): FormState => ({
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
  partialPaymentAmount: selectedPackage
    ? String(Math.min(10000, selectedPackage.baseAmount))
    : "",
  policiesAccepted: false,
});

const nextSteps = [
  {
    title: "Payment Confirmation",
    body: "The student receives confirmation after successful payment verification.",
  },
  {
    title: "Counselling Onboarding",
    body: "Careerkick contacts the student using the registered contact details.",
  },
  {
    title: "Student Profile",
    body: "Relevant academic and counselling information is collected.",
  },
  {
    title: "Counselling Begins",
    body: "The counselling team starts support according to the selected package.",
  },
] as const;

function getMinimumPartialPayment(netAmount: number) {
  if (netAmount <= 5000) {
    return 1;
  }

  return 5000;
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

const checkoutFormSchema = z.object({
  studentName: z
    .string()
    .trim()
    .min(2, "Enter the student's full name.")
    .max(80, "Name should be 80 characters or less.")
    .regex(/^[A-Za-z][A-Za-z .'-]*$/, "Use a valid name without numbers or special symbols."),
  mobile: z
    .string()
    .trim()
    .min(1, "Enter a mobile number.")
    .refine(
      (value) => /^[6-9]\d{9}$/.test(normalizeIndianMobile(value)),
      "Enter a valid mobile number.",
    ),
  email: z
    .string()
    .trim()
    .min(1, "Enter an email address.")
    .email("Enter a valid email address.")
    .max(120, "Email should be 120 characters or less."),
  whatsapp: z
    .string()
    .trim()
    .min(1, "Enter a WhatsApp number.")
    .refine(
      (value) => /^[6-9]\d{9}$/.test(normalizeIndianMobile(value)),
      "Enter a valid WhatsApp number.",
    ),
  course: z
    .string()
    .trim()
    .refine(
      (value) => COURSE_OPTIONS.some((course) => course === value),
      "Select the course interested in.",
    ),
  stateOrDomicile: z
    .string()
    .trim()
    .refine(
      (value) => !value || STATE_CODES.includes(value),
      "Select a valid Indian state or domicile.",
    ),
  district: z.string().trim().max(80, "District should be 80 characters or less."),
  scoreOrRank: z
    .string()
    .trim()
    .max(30, "Score or rank should be 30 characters or less.")
    .regex(/^\d*$/, "Use numbers only for score or rank."),
  applicationNumber: z
    .string()
    .trim()
    .max(30, "Application or roll number should be 30 characters or less.")
    .regex(/^[A-Za-z0-9 /-]*$/, "Use a valid application or roll number."),
  category: z
    .string()
    .trim()
    .refine(
      (value) => !value || CATEGORY_OPTIONS.some((category) => category === value),
      "Select a valid category.",
    ),
  couponCode: z.string().trim().max(24, "Coupon code should be 24 characters or less."),
  paymentMode: z.enum(["full", "partial"]),
  partialPaymentAmount: z
    .string()
    .trim()
    .regex(/^\d*$/, "Use numbers only for partial payment amount."),
  policiesAccepted: z.literal(true, {
    errorMap: () => ({ message: "Please accept the policies before payment." }),
  }),
}).superRefine((values, context) => {
  if (!values.district) {
    return;
  }

  const districts = values.stateOrDomicile ? getDistricts(values.stateOrDomicile) : [];

  if (!districts.includes(values.district)) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["district"],
      message: "Select a valid district for the selected state.",
    });
  }
});

function getFieldError<Key extends keyof FormState>(field: Key, values: FormState) {
  const result = checkoutFormSchema.safeParse(values);

  if (result.success) {
    return undefined;
  }

  return result.error.issues.find((issue) => issue.path[0] === field)?.message;
}

function validateForm(values: FormState) {
  const errors: FormErrors = {};
  const result = checkoutFormSchema.safeParse(values);

  if (!result.success) {
    result.error.issues.forEach((issue) => {
      const field = issue.path[0] as keyof FormState | undefined;

      if (field && !errors[field]) {
        errors[field] = issue.message;
      }
    });
  }

  return errors;
}

export function CheckoutPageClient({ selectedPackage }: CheckoutPageClientProps) {
  const [form, setForm] = useState<FormState>(() => initialForm(selectedPackage));
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const districtOptions = useMemo(
    () => (form.stateOrDomicile ? getDistricts(form.stateOrDomicile) : []),
    [form.stateOrDomicile],
  );

  const pricing = useMemo(
    () =>
      selectedPackage
        ? calculateCounsellingTotal(selectedPackage.baseAmount, selectedPackage.taxRate)
        : null,
    [selectedPackage],
  );
  const checkoutPricing = useMemo(() => {
    if (!selectedPackage) {
      return null;
    }

    const requestedPaymentAmount =
      form.paymentMode === "partial"
        ? Number.parseInt(form.partialPaymentAmount || "0", 10)
        : undefined;

    return calculateCheckoutPayment({
      baseAmount: selectedPackage.baseAmount,
      taxRate: selectedPackage.taxRate,
      couponCode: form.couponCode,
      paymentAmount: requestedPaymentAmount,
    });
  }, [form.couponCode, form.partialPaymentAmount, form.paymentMode, selectedPackage]);

  const updateField = <Key extends keyof FormState>(field: Key, value: FormState[Key]) => {
    setForm((current) => {
      const nextForm = {
        ...current,
        [field]: value,
        ...(field === "stateOrDomicile" ? { district: "" } : {}),
        ...(field === "paymentMode" && value === "partial" && !current.partialPaymentAmount && selectedPackage
          ? { partialPaymentAmount: String(Math.min(10000, selectedPackage.baseAmount)) }
          : {}),
      };
      const nextFieldError = getFieldError(field, nextForm);

      setErrors((currentErrors) => ({
        ...currentErrors,
        [field]: nextFieldError,
        ...(field === "stateOrDomicile" ? { district: undefined } : {}),
        ...(field === "paymentMode" ? { partialPaymentAmount: undefined } : {}),
        ...(field === "couponCode" ? { couponCode: undefined } : {}),
        submit: undefined,
      }));

      return nextForm;
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedPackage || !pricing || !checkoutPricing) {
      setErrors({ submit: "Please select a valid counselling package first." });
      return;
    }

    const nextErrors = validateForm(form);
    if (checkoutPricing.couponError) {
      nextErrors.couponCode = checkoutPricing.couponError;
    }

    if (form.paymentMode === "partial") {
      if (checkoutPricing.amountPaid <= 0) {
        nextErrors.partialPaymentAmount = "Enter a partial payment amount.";
      } else if (checkoutPricing.amountPaid < getMinimumPartialPayment(checkoutPricing.netAmount)) {
        nextErrors.partialPaymentAmount = `Partial payment must be at least ${formatIndianCurrency(getMinimumPartialPayment(checkoutPricing.netAmount))}.`;
      } else if (checkoutPricing.dueAmount <= 0) {
        nextErrors.partialPaymentAmount = "Use full payment when no due amount remains.";
      }
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/payments/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageId: selectedPackage.id,
          studentName: form.studentName,
          mobile: normalizeIndianMobile(form.mobile),
          email: form.email,
          whatsapp: normalizeIndianMobile(form.whatsapp),
          course: form.course,
          stateOrDomicile: form.stateOrDomicile ? getStateName(form.stateOrDomicile) : "",
          district: form.district,
          scoreOrRank: form.scoreOrRank,
          applicationNumber: form.applicationNumber,
          category: form.category,
          couponCode: form.couponCode,
          paymentAmount: checkoutPricing.amountPaid,
        }),
      });

      const result = (await response.json()) as {
        message?: string;
        redirectUrl?: string;
      };

      if (!response.ok || !result.redirectUrl) {
        throw new Error(result.message ?? "Payment could not be started.");
      }

      window.location.assign(result.redirectUrl);
    } catch (error) {
      setErrors({
        submit:
          error instanceof Error
            ? error.message
            : "Payment could not be started. Please try again.",
      });
      setSubmitting(false);
    }
  };

  if (!selectedPackage || !pricing || !checkoutPricing) {
    return (
      <main className="relative overflow-hidden bg-base px-4 pb-24 pt-28 text-white md:px-8 md:pt-32">
        <Background />
        <section className="relative mx-auto max-w-3xl rounded-lg border border-white/10 bg-gradient-card p-6 text-center shadow-elevated sm:p-10">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#51A70A]/25 bg-[#51A70A]/10 text-[#8cef32]">
            <AlertCircle className="h-6 w-6" />
          </span>
          <h1 className="mt-5 font-display text-3xl font-bold sm:text-4xl">
            Select a counselling plan first
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-text-muted sm:text-base">
            Checkout needs a valid package ID so pricing can be resolved from
            trusted CareerKick package data.
          </p>
          <Link
            href="/services#pricing"
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-card transition hover:shadow-glow-violet"
          >
            <ArrowLeft className="h-4 w-4" />
            Choose Plan
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="relative overflow-hidden bg-base px-4 pb-24 pt-28 text-white md:px-8 md:pt-32">
      <Background />
      <div className="relative mx-auto max-w-7xl">
        <header className="max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#51A70A]/30 bg-[#51A70A]/10 px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#8cef32]">
            <ShieldCheck className="h-4 w-4" />
            Secure Checkout
          </div>
          <h1 className="mt-5 font-display text-4xl font-bold leading-tight sm:text-5xl">
            Complete your counselling enrollment
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg">
            Review your selected plan, add student details, accept the service
            policies, and continue to secure payment.
          </p>
        </header>

        <form onSubmit={handleSubmit} noValidate className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(360px,0.95fr)] lg:items-start">
          <div className="space-y-6">
            <StudentDetailsForm
              form={form}
              errors={errors}
              districtOptions={districtOptions}
              updateField={updateField}
            />
            <PostPaymentSteps />
            <CheckoutSupport />
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24">
            <SelectedPlanCard selectedPackage={selectedPackage} />
            <OrderSummary
              pricing={checkoutPricing}
              selectedPackage={selectedPackage}
              form={form}
              errors={errors}
              submitting={submitting}
              updateField={updateField}
            />
            <PaymentPolicyNotes />
          </aside>
        </form>
      </div>
    </main>
  );
}

function Background() {
  return (
    <>
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[72%] -translate-x-1/2 rounded-full bg-[#51A70A]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 top-40 h-96 w-96 rounded-full bg-white/6 blur-[140px]" />
      <div className="grid-overlay pointer-events-none absolute inset-0 opacity-50" />
    </>
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
    <section className="rounded-lg border border-white/10 bg-gradient-card p-5 shadow-card sm:p-6">
      <h2 className="font-display text-2xl font-semibold">Student Details</h2>
      <p className="mt-2 text-sm leading-relaxed text-text-muted">
        Use the student&apos;s active contact details for payment confirmation
        and counselling onboarding.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <TextField
          id="studentName"
          label="Student Full Name"
          value={form.studentName}
          error={errors.studentName}
          required
          onChange={(value) => updateField("studentName", value)}
        />
        <TextField
          id="mobile"
          label="Mobile Number"
          type="tel"
          inputMode="numeric"
          value={form.mobile}
          error={errors.mobile}
          required
          onChange={(value) => updateField("mobile", value)}
        />
        <TextField
          id="email"
          label="Email Address"
          type="email"
          value={form.email}
          error={errors.email}
          required
          onChange={(value) => updateField("email", value)}
        />
        <TextField
          id="whatsapp"
          label="WhatsApp Number"
          type="tel"
          inputMode="numeric"
          value={form.whatsapp}
          error={errors.whatsapp}
          required
          onChange={(value) => updateField("whatsapp", value)}
        />
        <SelectField
          id="course"
          label="Course Interested In"
          value={form.course}
          error={errors.course}
          required
          options={COURSE_OPTIONS}
          placeholder="Select course"
          onChange={(value) => updateField("course", value)}
        />
        <SelectField
          id="stateOrDomicile"
          label="State / Domicile"
          value={form.stateOrDomicile}
          error={errors.stateOrDomicile}
          options={STATE_OPTIONS}
          placeholder="Select state"
          onChange={(value) => updateField("stateOrDomicile", value)}
        />
        <SelectField
          id="district"
          label="District"
          value={form.district}
          error={errors.district}
          options={districtOptions}
          placeholder={form.stateOrDomicile ? "Select district" : "Select state first"}
          disabled={!form.stateOrDomicile}
          onChange={(value) => updateField("district", value)}
        />
        <TextField
          id="scoreOrRank"
          label="NEET/JEE Score or Rank"
          value={form.scoreOrRank}
          onChange={(value) => updateField("scoreOrRank", value)}
        />
        <TextField
          id="applicationNumber"
          label="NEET/JEE Application/Roll Number"
          value={form.applicationNumber}
          onChange={(value) => updateField("applicationNumber", value)}
        />
        <SelectField
          id="category"
          label="Category"
          value={form.category}
          error={errors.category}
          options={CATEGORY_OPTIONS}
          placeholder="Select category"
          onChange={(value) => updateField("category", value)}
        />
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
  const errorId = `${id}-error`;

  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-white">
        {label}
        {required ? <span className="text-[#8cef32]"> *</span> : null}
      </label>
      <input
        id={id}
        type={type}
        inputMode={inputMode}
        value={value}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => onChange(event.target.value)}
        className={cn(
          "mt-2 h-12 w-full rounded-lg border bg-white px-4 text-sm font-semibold text-[#071305] placeholder:text-[#071305]/50 shadow-inner transition focus:border-[#51A70A] focus:ring-4 focus:ring-[#51A70A]/20",
          error ? "border-red-300" : "border-white/10",
        )}
      />
      {error ? (
        <p id={errorId} className="mt-2 text-sm font-medium text-red-200">
          {error}
        </p>
      ) : null}
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
  options: readonly (string | { value: string; label: string })[];
  placeholder: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}) {
  const errorId = `${id}-error`;

  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-white">
        {label}
        {required ? <span className="text-[#8cef32]"> *</span> : null}
      </label>
      <select
        id={id}
        value={value}
        required={required}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => onChange(event.target.value)}
        className={cn(
          "mt-2 h-12 w-full rounded-lg border bg-white px-4 text-sm font-semibold text-[#071305] shadow-inner transition focus:border-[#51A70A] focus:ring-4 focus:ring-[#51A70A]/20 disabled:cursor-not-allowed disabled:bg-white/70 disabled:text-[#071305]/55",
          error ? "border-red-300" : "border-white/10",
        )}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option
            key={typeof option === "string" ? option : option.value}
            value={typeof option === "string" ? option : option.value}
          >
            {typeof option === "string" ? option : option.label}
          </option>
        ))}
      </select>
      {error ? (
        <p id={errorId} className="mt-2 text-sm font-medium text-red-200">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function SelectedPlanCard({ selectedPackage }: { selectedPackage: CounsellingPackage }) {
  return (
    <section className="rounded-lg border border-white/10 bg-gradient-card p-5 shadow-card sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8cef32]">
            Selected Plan
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold leading-tight">
            {selectedPackage.title}
          </h2>
          <p className="mt-1 text-sm font-semibold text-[#8cef32]">
            {selectedPackage.subtitle}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-text-muted">
            {selectedPackage.description}
          </p>
        </div>
        <Link
          href="/services#pricing"
          className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-white transition hover:border-[#51A70A]/45"
        >
          Change Plan
        </Link>
      </div>

      <div className="mt-5 grid gap-3">
        {selectedPackage.inclusions.map((item) => (
          <div key={item} className="flex items-start gap-3 text-sm text-white/78">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#51A70A]/25 bg-[#51A70A]/10 text-[#8cef32]">
              <Check className="h-3.5 w-3.5" />
            </span>
            <span>{item}</span>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-lg border border-white/10 bg-white/[0.04] p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8cef32]">
          Service Validity
        </p>
        <p className="mt-2 text-sm leading-relaxed text-text-muted">
          {selectedPackage.validity}
        </p>
      </div>
    </section>
  );
}

function OrderSummary({
  pricing,
  selectedPackage,
  form,
  errors,
  submitting,
  updateField,
}: {
  pricing: ReturnType<typeof calculateCheckoutPayment>;
  selectedPackage: CounsellingPackage;
  form: FormState;
  errors: FormErrors;
  submitting: boolean;
  updateField: <Key extends keyof FormState>(field: Key, value: FormState[Key]) => void;
}) {
  const couponError = errors.couponCode ?? pricing.couponError;

  return (
    <section className="rounded-lg border border-[#51A70A]/25 bg-[linear-gradient(135deg,rgba(255,255,255,0.09),rgba(255,255,255,0.03)),linear-gradient(135deg,rgba(11,16,9,0.96),rgba(18,26,16,0.88))] p-5 shadow-elevated sm:p-6">
      <h2 className="font-display text-2xl font-semibold">Order Summary</h2>
      <div className="mt-5 space-y-3 border-b border-white/10 pb-5 text-sm">
        <SummaryRow label="Counselling Fee" value={formatIndianCurrency(pricing.baseAmount)} />
        {pricing.taxRate > 0 ? (
          <SummaryRow
            label={`GST (${Math.round(pricing.taxRate * 100)}%)`}
            value={formatIndianCurrency(pricing.taxAmount)}
          />
        ) : null}
        {pricing.discountAmount > 0 ? (
          <SummaryRow
            label={`Coupon Discount (${pricing.coupon?.code})`}
            value={`- ${formatIndianCurrency(pricing.discountAmount)}`}
          />
        ) : null}
      </div>

      <div className="mt-5 rounded-lg border border-white/10 bg-black/20 p-4">
        <div className="flex items-center gap-2">
          <Tag className="h-4 w-4 text-[#8cef32]" />
          <label htmlFor="couponCode" className="text-sm font-semibold text-white">
            Coupon Code
          </label>
        </div>
        <input
          id="couponCode"
          value={form.couponCode}
          placeholder="Try CK10"
          aria-invalid={Boolean(couponError)}
          aria-describedby={couponError ? "couponCode-error" : undefined}
          onChange={(event) => updateField("couponCode", event.target.value.toUpperCase())}
          className={cn(
            "mt-3 h-12 w-full rounded-lg border bg-white px-4 font-mono text-sm font-bold uppercase tracking-[0.12em] text-[#071305] placeholder:text-[#071305]/45 shadow-inner transition focus:border-[#51A70A] focus:ring-4 focus:ring-[#51A70A]/20",
            couponError ? "border-red-300" : "border-white/10",
          )}
        />
        {couponError ? (
          <p id="couponCode-error" className="mt-2 text-sm font-medium text-red-200">
            {couponError}
          </p>
        ) : pricing.coupon ? (
          <p className="mt-2 text-sm font-semibold text-[#8cef32]">
            {pricing.coupon.label} applied.
          </p>
        ) : (
          <p className="mt-2 text-xs leading-relaxed text-text-muted">
            Dummy codes: {COUPON_CODES.map((coupon) => coupon.code).join(", ")}
          </p>
        )}
      </div>

      <div className="mt-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
            Net Payable
          </p>
          <p className="mt-1 text-sm text-text-muted">{selectedPackage.title}</p>
        </div>
        <p className="font-display text-3xl font-bold text-[#8cef32] sm:text-4xl">
          {formatIndianCurrency(pricing.netAmount)}
        </p>
      </div>

      <div className="mt-5 rounded-lg border border-white/10 bg-white/[0.04] p-4">
        <p className="text-sm font-semibold text-white">Payment Type</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {[
            { label: "Full Payment", value: "full" },
            { label: "Partial Payment", value: "partial" },
          ].map((option) => (
            <label
              key={option.value}
              className={cn(
                "flex cursor-pointer items-center justify-center rounded-full border px-3 py-2 text-center text-xs font-bold transition",
                form.paymentMode === option.value
                  ? "border-[#51A70A]/55 bg-[#51A70A]/15 text-[#8cef32]"
                  : "border-white/10 bg-black/20 text-white/70 hover:border-[#51A70A]/35",
              )}
            >
              <input
                type="radio"
                name="paymentMode"
                value={option.value}
                checked={form.paymentMode === option.value}
                onChange={() => updateField("paymentMode", option.value as FormState["paymentMode"])}
                className="sr-only"
              />
              {option.label}
            </label>
          ))}
        </div>

        {form.paymentMode === "partial" ? (
          <div className="mt-4">
            <label htmlFor="partialPaymentAmount" className="flex items-center gap-2 text-sm font-semibold text-white">
              <IndianRupee className="h-4 w-4 text-[#8cef32]" />
              Pay Now Amount
            </label>
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
                "mt-2 h-12 w-full rounded-lg border bg-white px-4 text-sm font-semibold text-[#071305] shadow-inner transition focus:border-[#51A70A] focus:ring-4 focus:ring-[#51A70A]/20",
                errors.partialPaymentAmount ? "border-red-300" : "border-white/10",
              )}
            />
            {errors.partialPaymentAmount ? (
              <p id="partialPaymentAmount-error" className="mt-2 text-sm font-medium text-red-200">
                {errors.partialPaymentAmount}
              </p>
            ) : null}
          </div>
        ) : null}

        <dl className="mt-4 grid gap-3 rounded-lg border border-[#51A70A]/20 bg-[#51A70A]/8 p-4 text-sm">
          <SummaryRow label="Pay Now" value={formatIndianCurrency(pricing.amountPaid)} />
          <SummaryRow label="Pending Due" value={formatIndianCurrency(pricing.dueAmount)} />
        </dl>
      </div>

      <NoticeBox
        className="mt-5"
        icon={<AlertCircle className="h-5 w-5" />}
        title="Important"
        body="This payment is towards CareerKick's professional counselling and admission-guidance services. Government counselling registration fees, security deposits, college fees, hostel fees and other third-party charges are not included unless specifically stated in the selected package."
      />

      <NoticeBox
        className="mt-4"
        icon={<ShieldCheck className="h-5 w-5" />}
        title="Admission Disclaimer"
        body="CareerKick provides counselling, guidance and admission-support services. Admission or seat allotment is subject to the student's eligibility, rank/score, preferences, seat availability, counselling authority rules and participating institutions. Purchasing a counselling package does not guarantee admission to any particular college, course or seat."
      />

      <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-lg border border-white/10 bg-black/20 p-4 text-sm leading-relaxed text-text-muted transition focus-within:border-[#51A70A]/45">
        <input
          type="checkbox"
          checked={form.policiesAccepted}
          required
          aria-invalid={Boolean(errors.policiesAccepted)}
          aria-describedby={errors.policiesAccepted ? "policiesAccepted-error" : undefined}
          onChange={(event) => updateField("policiesAccepted", event.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 rounded border-white/20 accent-[#51A70A]"
        />
        <span>
          I have read and agree to CareerKick&apos;s{" "}
          <Link href="/policies/terms" className="font-semibold text-[#8cef32] hover:underline">
            Terms & Conditions
          </Link>
          ,{" "}
          <Link href="/policies/privacy" className="font-semibold text-[#8cef32] hover:underline">
            Privacy Policy
          </Link>
          {" "}and{" "}
          <Link href="/policies/refund" className="font-semibold text-[#8cef32] hover:underline">
            Refund & Cancellation Policy
          </Link>
          .
        </span>
      </label>
      {errors.policiesAccepted ? (
        <p id="policiesAccepted-error" className="mt-2 text-sm font-medium text-red-200">
          {errors.policiesAccepted}
        </p>
      ) : null}

      {errors.submit ? (
        <div role="alert" className="mt-4 rounded-lg border border-red-300/25 bg-red-500/10 p-4 text-sm leading-relaxed text-red-100">
          {errors.submit}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 py-4 text-base font-bold text-white shadow-card transition hover:shadow-glow-violet disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Lock className="h-5 w-5" />}
        Pay {formatIndianCurrency(pricing.amountPaid)} Securely
      </button>
      <p className="mt-3 flex items-center justify-center gap-2 text-sm font-medium text-text-muted">
        <Lock className="h-4 w-4 text-[#8cef32]" />
        Secure payment
      </p>
    </section>
  );
}

function PaymentPolicyNotes() {
  return (
    <section className="rounded-lg border border-red-300/30 bg-red-500/10 p-4 shadow-card sm:p-5">
      <ul className="space-y-2 text-sm font-semibold leading-relaxed text-red-100">
        {COUNSELLING_PAYMENT_NOTES.map((note) => (
          <li key={note} className="flex gap-2">
            <span aria-hidden="true">•</span>
            <span>{note}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-text-muted">{label}</span>
      <span className="font-semibold text-white">{value}</span>
    </div>
  );
}

function NoticeBox({
  icon,
  title,
  body,
  className,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  className?: string;
}) {
  return (
    <div className={cn("rounded-lg border border-[#51A70A]/18 bg-[#51A70A]/8 p-4", className)}>
      <div className="flex items-start gap-3">
        <span className="mt-0.5 text-[#8cef32]">{icon}</span>
        <div>
          <p className="font-semibold text-white">{title}</p>
          <p className="mt-1 text-sm leading-relaxed text-text-muted">{body}</p>
        </div>
      </div>
    </div>
  );
}

function PostPaymentSteps() {
  return (
    <section className="rounded-lg border border-white/10 bg-gradient-card p-5 shadow-card sm:p-6">
      <h2 className="font-display text-2xl font-semibold">What happens after payment?</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {nextSteps.map((step, index) => (
          <div key={step.title} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#51A70A]/30 bg-[#51A70A]/10 text-sm font-bold text-[#8cef32]">
                {index + 1}
              </span>
              <div>
                <h3 className="font-semibold text-white">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-text-muted">{step.body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CheckoutSupport() {
  return (
    <section className="rounded-lg border border-white/10 bg-gradient-card p-5 shadow-card sm:p-6">
      <h2 className="font-display text-2xl font-semibold">Need help with your payment?</h2>
      <p className="mt-2 text-sm leading-relaxed text-text-muted">
        Contact the CareerKick counselling team using the official details below.
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <SupportLink
          href={getTelLink(CONTACT_NUMBERS.primaryDigits)}
          icon={<Phone className="h-4 w-4" />}
          label="Call"
          value={CONTACT_NUMBERS.primaryDisplay}
        />
        <SupportLink
          href={getWhatsAppLink("Hello, I need help with my CareerKick counselling payment.")}
          icon={<HelpCircle className="h-4 w-4" />}
          label="WhatsApp"
          value={CONTACT_NUMBERS.primaryDisplay}
          external
        />
        <SupportLink
          href="mailto:info@careerkick.in"
          icon={<Mail className="h-4 w-4" />}
          label="Email"
          value="info@careerkick.in"
        />
      </div>
    </section>
  );
}

function SupportLink({
  href,
  icon,
  label,
  value,
  external,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  value: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="rounded-lg border border-white/10 bg-white/[0.04] p-4 transition hover:border-[#51A70A]/40"
    >
      <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#8cef32]">
        {icon}
        {label}
      </span>
      <span className="mt-2 block text-sm font-semibold text-white">{value}</span>
    </a>
  );
}

export function PaymentStatePage({
  status,
  paymentDetails,
}: {
  status: "success" | "failure" | "pending";
  paymentDetails?: {
    enrollment?: string;
    paid?: string;
    due?: string;
    total?: string;
  };
}) {
  const config = {
    success: {
      icon: CheckCircle2,
      label: "Payment Successful",
      title: "Your counselling enrollment has been received.",
      body: "This page should be shown only after server-side gateway verification confirms a successful payment.",
      tone: "text-[#8cef32]",
      cta: "Continue",
      href: "/",
    },
    failure: {
      icon: AlertCircle,
      label: "Payment Unsuccessful",
      title: "We couldn't confirm your payment.",
      body: "If money has been debited, please avoid making another payment immediately and contact support with your Enrollment/Order ID.",
      tone: "text-red-200",
      cta: "Retry Payment",
      href: "/services#pricing",
    },
    pending: {
      icon: Clock,
      label: "Payment Verification in Progress",
      title: "Your payment status is being verified.",
      body: "Some transactions take extra time to confirm. CareerKick should update this state after verified gateway callback or server-side polling.",
      tone: "text-amber",
      cta: "Contact Counselling Team",
      href: getWhatsAppLink("Hello, I need help checking my CareerKick payment status."),
    },
  }[status];
  const Icon = config.icon;
  const paidAmount = Number(paymentDetails?.paid ?? 0);
  const dueAmount = Number(paymentDetails?.due ?? 0);
  const totalAmount = Number(paymentDetails?.total ?? 0);

  return (
    <main className="relative overflow-hidden bg-base px-4 pb-24 pt-28 text-white md:px-8 md:pt-32">
      <Background />
      <section className="relative mx-auto max-w-3xl rounded-lg border border-white/10 bg-gradient-card p-6 text-center shadow-elevated sm:p-10">
        <span className={cn("mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]", config.tone)}>
          <Icon className="h-7 w-7" />
        </span>
        <p className="mt-5 font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[#8cef32]">
          {config.label}
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{config.title}</h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed !text-white sm:text-base">
          {config.body}
        </p>

        <div className="mx-auto mt-7 max-w-xl rounded-lg border border-white/10 bg-white/[0.04] p-4 text-left">
          <dl className="grid gap-3 text-sm sm:grid-cols-2">
            <ResultItem label="Enrollment ID" value={paymentDetails?.enrollment ?? "Created by backend"} />
            <ResultItem label="Transaction ID" value={paymentDetails?.enrollment ? `DUMMY-${paymentDetails.enrollment}` : "Verified server-side"} />
            <ResultItem label="Payment Status" value={config.label} />
            <ResultItem
              label="Amount Paid"
              value={paidAmount > 0 ? formatIndianCurrency(paidAmount) : "From trusted order record"}
            />
            <ResultItem
              label="Net Amount"
              value={totalAmount > 0 ? formatIndianCurrency(totalAmount) : "From trusted order record"}
            />
            <ResultItem
              label="Pending Due"
              value={dueAmount > 0 ? formatIndianCurrency(dueAmount) : formatIndianCurrency(0)}
            />
          </dl>
        </div>

        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href={config.href}
            className="inline-flex items-center justify-center rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-card transition hover:shadow-glow-violet"
          >
            {config.cta}
          </Link>
          <a
            href={getWhatsAppLink("Hello, I need help with my CareerKick payment.")}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white transition hover:border-[#51A70A]/45"
          >
            Contact Support: 7393062116
          </a>
        </div>
      </section>
    </main>
  );
}

function ResultItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-text-faint">{label}</dt>
      <dd className="mt-1 font-semibold text-white">{value}</dd>
    </div>
  );
}
