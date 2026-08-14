import type { Metadata } from "next";
import { CheckoutPageClient } from "@/components/checkout/CheckoutPageClient";
import type { CounsellingPackage } from "@/lib/counsellingPackages";

export const metadata: Metadata = {
  title: "Secure Checkout | Careerkick",
  description:
    "Complete your Careerkick counselling enrollment with secure payment.",
  alternates: {
    canonical: "/checkout",
  },
};

type CheckoutPageProps = {
  searchParams?: {
    package?: string;
  };
};

type ApiPlan = {
  _id: string;
  title: string;
  description: string;
  totalAmount: number;
  isActive: boolean;
};

const fallbackApiBaseUrl = "http://localhost:5000/api";

function getApiBaseUrl() {
  return (
    process.env.API_BASE_URL ??
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    process.env.VITE_API_BASE_URL ??
    fallbackApiBaseUrl
  ).replace(/\/$/, "");
}

async function getApiPlanPackage(packageId?: string): Promise<CounsellingPackage | null> {
  if (!packageId) {
    return null;
  }

  try {
    const response = await fetch(`${getApiBaseUrl()}/plans?page=1&limit=100`, {
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as { data?: ApiPlan[] };
    const plan = payload.data?.find((item) => item._id === packageId && item.isActive);

    if (!plan) {
      return null;
    }

    return {
      id: plan._id,
      title: plan.title,
      subtitle: "Counselling Plan",
      description: plan.description,
      baseAmount: plan.totalAmount,
      taxRate: 0,
      defaultCourse: "Other",
      inclusions: [
        "Counselling guidance",
        "College selection assistance",
        "Choice filling support",
        "Documentation guidance",
        "Admission process assistance",
      ],
      validity:
        "Valid for the applicable counselling session/cycle and counselling rounds covered under the selected plan.",
    };
  } catch {
    return null;
  }
}

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const packageId = searchParams?.package;
  const selectedPackage = await getApiPlanPackage(packageId);

  return <CheckoutPageClient selectedPackage={selectedPackage ?? null} />;
}
