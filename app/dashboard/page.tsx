"use client";

import { ArrowUpRight, BadgeIndianRupee, BarChart3, CheckCircle2, PlayCircle, UsersRound } from "lucide-react";
import { DASHBOARD_TOUR_EVENT } from "@/components/dashboard/DashboardTour";
import Link from "next/link";
import { useEffect, useState } from "react";

type DashboardStat = {
  label: string;
  value: string;
  detail: string;
  icon: typeof BarChart3;
  href: string;
  tourId: string;
};

type BackendPlan = {
  _id?: string;
  id?: string;
  isActive?: boolean;
};

type BackendPayment = {
  studentId?: string | { _id?: string; id?: string; email?: string };
  studentEmail?: string;
  email?: string;
  paidAmount?: number;
  amountPaid?: number;
  amount?: number;
};

type ApiCollectionResponse<T> = {
  data?: T[] | { data?: T[]; plans?: T[]; payments?: T[]; records?: T[]; total?: number; totalCount?: number; count?: number };
  plans?: T[];
  payments?: T[];
  records?: T[];
  total?: number;
  totalCount?: number;
  count?: number;
};

const dashboardInstructions = [
  "Use the stat cards to jump directly to plans or student transaction records.",
  "Open Plans to create counselling plans, review plan details, update pricing or partial amounts, and remove inactive plans.",
  "Open Coupon Codes to select a plan tab, create coupons, validate coupon codes, edit coupon details, or delete coupons.",
  "Open Transactions to review student payments, view full payment details, update coupon or discount annotations, and delete payment records when required.",
  "Use the sidebar to switch sections, toggle light or dark mode, and logout when dashboard work is complete.",
];

function formatExactAmount(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function getCollection<T>(payload: ApiCollectionResponse<T>) {
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.data?.data)) return payload.data.data;
  if (Array.isArray(payload?.data?.plans)) return payload.data.plans;
  if (Array.isArray(payload?.data?.payments)) return payload.data.payments;
  if (Array.isArray(payload?.data?.records)) return payload.data.records;
  if (Array.isArray(payload?.plans)) return payload.plans;
  if (Array.isArray(payload?.payments)) return payload.payments;
  if (Array.isArray(payload?.records)) return payload.records;
  return [];
}

function getCollectionTotal<T>(payload: ApiCollectionResponse<T>, fallback: number) {
  const nested = Array.isArray(payload?.data) ? undefined : payload?.data;

  return payload?.total ?? payload?.totalCount ?? payload?.count ?? nested?.total ?? nested?.totalCount ?? nested?.count ?? fallback;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStat[]>([
    { label: "Active plans", value: "--", detail: "Loading plans", icon: BarChart3, href: "/dashboard/plans", tourId: "stat-active-plans" },
    { label: "Students", value: "--", detail: "Loading students", icon: UsersRound, href: "/dashboard/student-transactions", tourId: "stat-students" },
    { label: "Revenue", value: "--", detail: "Loading collections", icon: BadgeIndianRupee, href: "/dashboard/student-transactions", tourId: "stat-revenue" },
  ]);

  useEffect(() => {
    async function loadStats() {
      try {
        const token = window.localStorage.getItem("careerkick-dashboard-token");
        const headers = {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        };

        const [plansResponse, paymentsResponse] = await Promise.all([
          fetch("/api/plans?page=1&limit=20", {
            headers,
            cache: "no-store",
          }),
          fetch("/api/student-payment-details", {
            headers,
            cache: "no-store",
          }),
        ]);

        const plansData = await plansResponse.json();
        const paymentsData = await paymentsResponse.json();

        const planList = getCollection<BackendPlan>(plansData);
        const paymentList = getCollection<BackendPayment>(paymentsData);

        const activePlans = getCollectionTotal(plansData, planList.filter((plan) => plan.isActive !== false).length);
        const totalStudents = new Set(
          paymentList.map((payment: BackendPayment) => {
            if (typeof payment.studentId === "string") {
              return payment.studentId;
            }

            return (
              payment.studentId?._id ??
              payment.studentId?.id ??
              payment.studentId?.email ??
              payment.studentEmail ??
              payment.email ??
              ""
            );
          }).filter(Boolean),
        ).size;
        const totalRevenue = paymentList.reduce((sum: number, payment: BackendPayment) => {
          return sum + (payment.paidAmount ?? payment.amountPaid ?? payment.amount ?? 0);
        }, 0);

        setStats([
          {
            label: "Active plans",
            value: String(activePlans),
            detail: `${activePlans} currently active`,
            icon: BarChart3,
            href: "/dashboard/plans",
            tourId: "stat-active-plans",
          },
          {
            label: "Students",
            value: String(totalStudents),
            detail: `${totalStudents} payment-linked students`,
            icon: UsersRound,
            href: "/dashboard/student-transactions",
            tourId: "stat-students",
          },
          {
            label: "Revenue",
            value: formatExactAmount(totalRevenue),
            detail: `${formatExactAmount(totalRevenue)} collected`,
            icon: BadgeIndianRupee,
            href: "/dashboard/student-transactions",
            tourId: "stat-revenue",
          },
        ]);
      } catch {
        setStats([
          { label: "Active plans", value: "--", detail: "Unable to load plans", icon: BarChart3, href: "/dashboard/plans", tourId: "stat-active-plans" },
          { label: "Students", value: "--", detail: "Unable to load students", icon: UsersRound, href: "/dashboard/student-transactions", tourId: "stat-students" },
          { label: "Revenue", value: "--", detail: "Unable to load revenue", icon: BadgeIndianRupee, href: "/dashboard/student-transactions", tourId: "stat-revenue" },
        ]);
      }
    }

    void loadStats();
  }, []);

  function startDashboardTour() {
    window.dispatchEvent(new Event(DASHBOARD_TOUR_EVENT));
  }

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Link
              key={stat.label}
              href={stat.href}
              data-tour={stat.tourId}
              className="rounded-lg border border-[var(--dash-border)] bg-[var(--dash-surface)] p-5 shadow-[var(--dash-shadow)] transition hover:border-[var(--dash-primary)] hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-[var(--dash-muted)]">{stat.label}</p>
                  <p className="mt-3 text-3xl font-black tracking-tight">{stat.value}</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-[var(--dash-primary)] text-white">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <p className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[var(--dash-primary)]">
                {stat.detail}
                <ArrowUpRight className="h-4 w-4" />
              </p>
            </Link>
          );
        })}
      </section>

      <section>
        <div className="w-full rounded-lg border border-[var(--dash-border)] bg-[var(--dash-surface)] p-5 shadow-[var(--dash-shadow)]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-black">Dashboard Overview</h2>
              <p className="mt-1 text-sm text-[var(--dash-muted)]">How to use the dashboard sections.</p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <span className="rounded-md bg-[var(--dash-surface-strong)] px-3 py-2 text-center text-xs font-black text-[var(--dash-primary)]">
                Live
              </span>
              <button
                type="button"
                onClick={startDashboardTour}
                data-tour="dashboard-tour-button"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-[var(--dash-primary)] px-4 text-sm font-black text-white transition hover:bg-[var(--dash-primary-strong)]"
              >
                <PlayCircle className="h-4 w-4" />
                Start Tour
              </button>
            </div>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {dashboardInstructions.map((instruction) => (
              <div key={instruction} className="flex items-start gap-3 rounded-md border border-[var(--dash-border)] bg-[var(--dash-surface-strong)] p-4">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-[var(--dash-primary)]" />
                <p className="text-sm font-bold leading-6">{instruction}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
