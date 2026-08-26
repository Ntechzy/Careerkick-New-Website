import { ArrowUpRight, BadgeIndianRupee, BarChart3, CheckCircle2, Percent, UsersRound } from "lucide-react";

const stats = [
  { label: "Active plans", value: "12", detail: "+3 this month", icon: BarChart3 },
  { label: "Students", value: "1,248", detail: "184 new leads", icon: UsersRound },
  { label: "Revenue", value: "₹18.4L", detail: "82% collected", icon: BadgeIndianRupee },
  { label: "Coupons", value: "9", detail: "5 currently active", icon: Percent },
];

const activity = [
  "NEET Counseling Premium plan updated",
  "CAREER500 coupon used on checkout",
  "Three student logins completed",
  "Partial payment option reviewed",
];

const features = [
  "Admin and student login entry points",
  "Plan creation, update, view and delete workflow",
  "Coupon code management overview",
  "Light and dark dashboard modes",
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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
