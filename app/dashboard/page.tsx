"use client";

import { ArrowUpRight, BadgeIndianRupee, BarChart3, CheckCircle2, UsersRound } from "lucide-react";
import { useEffect, useState } from "react";

type DashboardStat = {
  label: string;
  value: string;
  detail: string;
  icon: typeof BarChart3;
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

const activity = [
  "NEET Counseling Premium plan updated",
  "Student payment annotations reviewed",
  "Three student logins completed",
  "Partial payment option reviewed",
];

const features = [
  "Admin and student login entry points",
  "Plan creation, update, view and delete workflow",
  "Coupon code management overview",
  "Light and dark dashboard modes",
];

function formatCompactAmount(value: number) {
  return `Rs ${new Intl.NumberFormat("en-IN", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value)}`;
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
    { label: "Active plans", value: "--", detail: "Loading plans", icon: BarChart3 },
    { label: "Students", value: "--", detail: "Loading students", icon: UsersRound },
    { label: "Revenue", value: "--", detail: "Loading collections", icon: BadgeIndianRupee },
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
          },
          {
            label: "Students",
            value: String(totalStudents),
            detail: `${totalStudents} payment-linked students`,
            icon: UsersRound,
          },
          {
            label: "Revenue",
            value: formatCompactAmount(totalRevenue),
            detail: `${formatCompactAmount(totalRevenue)} collected`,
            icon: BadgeIndianRupee,
          },
        ]);
      } catch {
        setStats([
          { label: "Active plans", value: "--", detail: "Unable to load plans", icon: BarChart3 },
          { label: "Students", value: "--", detail: "Unable to load students", icon: UsersRound },
          { label: "Revenue", value: "--", detail: "Unable to load revenue", icon: BadgeIndianRupee },
        ]);
      }
    }

    void loadStats();
  }, []);

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article
              key={stat.label}
              className="rounded-lg border border-[var(--dash-border)] bg-[var(--dash-surface)] p-5 shadow-[var(--dash-shadow)]"
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
            </article>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <div className="rounded-lg border border-[var(--dash-border)] bg-[var(--dash-surface)] p-5 shadow-[var(--dash-shadow)]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-black">Dashboard Overview</h2>
              <p className="mt-1 text-sm text-[var(--dash-muted)]">A quick view of counselling operations.</p>
            </div>
            <span className="rounded-md bg-[var(--dash-surface-strong)] px-3 py-2 text-xs font-black text-[var(--dash-primary)]">
              Live
            </span>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {features.map((feature) => (
              <div key={feature} className="flex items-center gap-3 rounded-md border border-[var(--dash-border)] bg-[var(--dash-surface-strong)] p-4">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-[var(--dash-primary)]" />
                <p className="text-sm font-bold">{feature}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-[var(--dash-border)] bg-[var(--dash-surface)] p-5 shadow-[var(--dash-shadow)]">
          <h2 className="text-lg font-black">Recent Activity</h2>
          <div className="mt-5 space-y-3">
            {activity.map((item) => (
              <div key={item} className="rounded-md border border-[var(--dash-border)] bg-[var(--dash-surface-strong)] p-4">
                <p className="text-sm font-bold">{item}</p>
                <p className="mt-1 text-xs font-semibold text-[var(--dash-muted)]">Just now</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
