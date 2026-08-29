"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { BarChart3, CreditCard, LayoutDashboard, LogOut, Moon, Percent, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { DashboardTour } from "@/components/dashboard/DashboardTour";
import { cn } from "@/lib/utils";

export const DASHBOARD_AUTH_KEY = "careerkick-dashboard-auth";
export const DASHBOARD_ROLE_KEY = "careerkick-dashboard-role";
export const DASHBOARD_USER_KEY = "careerkick-dashboard-user";

type DashboardRole = "admin" | "student";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, tourId: "nav-dashboard", roles: ["admin", "student"] },
  { label: "Plans", href: "/dashboard/plans", icon: BarChart3, tourId: "nav-plans", roles: ["admin"] },
  { label: "Coupon Codes", href: "/dashboard/coupons", icon: Percent, tourId: "nav-coupons", roles: ["admin"] },
  { label: "Transactions", href: "/dashboard/student-transactions", icon: CreditCard, tourId: "nav-transactions", roles: ["admin"] },
  { label: "My Transactions", href: "/dashboard/my-transactions", icon: CreditCard, tourId: "nav-my-transactions", roles: ["student"] },
] satisfies Array<{
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
  tourId: string;
  roles: DashboardRole[];
}>;

export function DashboardShell({
  children,
  fontClassName,
  initialRole,
}: {
  children: React.ReactNode;
  fontClassName: string;
  initialRole: DashboardRole;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [role, setRole] = useState<DashboardRole>(initialRole);
  const isLoginPage = pathname === "/dashboard/login";

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("careerkick-dashboard-theme");
    if (savedTheme === "dark" || savedTheme === "light") {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    const savedRole = window.localStorage.getItem(DASHBOARD_ROLE_KEY);
    if (savedRole === "admin" || savedRole === "student") {
      setRole(savedRole);
      return;
    }

    setRole(initialRole);
  }, [initialRole, pathname]);

  const isDark = theme === "dark";
  const visibleNavItems = navItems.filter((item) => item.roles.includes(role));

  function logout() {
    window.localStorage.removeItem(DASHBOARD_AUTH_KEY);
    window.localStorage.removeItem(DASHBOARD_ROLE_KEY);
    window.localStorage.removeItem(DASHBOARD_USER_KEY);
    window.localStorage.removeItem("careerkick-dashboard-token");
    document.cookie = `${DASHBOARD_AUTH_KEY}=; path=/; max-age=0; samesite=lax`;
    document.cookie = `${DASHBOARD_ROLE_KEY}=; path=/; max-age=0; samesite=lax`;
    router.replace("/dashboard/login");
  }

  if (isLoginPage) {
    return (
      <div className={cn("dashboard-theme min-h-screen", isDark && "dashboard-dark", fontClassName)}>
        {children}
      </div>
    );
  }

  return (
    <div className={cn("dashboard-theme min-h-screen", isDark && "dashboard-dark", fontClassName)}>
      <div className="flex min-h-screen">
        <aside className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--dash-border)] bg-[var(--dash-surface)]/95 px-3 py-2 backdrop-blur-xl lg:static lg:inset-auto lg:flex lg:w-72 lg:flex-col lg:border-r lg:border-t-0 lg:px-4 lg:py-5">
          <div className="hidden px-2 lg:flex">
            <Image
              src={isDark ? "/logo-bg.png" : "/logo-black-bg.png"}
              alt="Careerkick"
              width={168}
              height={49}
              priority
              className="h-auto w-[168px] object-contain"
            />
          </div>

          <nav data-tour="dashboard-navigation" className={cn("grid gap-2 lg:mt-8 lg:flex lg:flex-col", role === "student" ? "grid-cols-2" : "grid-cols-4")}>
            {visibleNavItems.map((item) => {
              const Icon = item.icon;
              const active =
                item.href === "/dashboard" ? pathname === item.href : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  data-tour={item.tourId}
                  className={cn(
                    "flex min-h-14 flex-col items-center justify-center gap-1 rounded-md px-2 text-center text-[11px] font-bold text-[var(--dash-muted)] transition lg:min-h-0 lg:flex-row lg:justify-start lg:gap-3 lg:px-3 lg:py-3 lg:text-sm",
                    active &&
                      "bg-[var(--dash-primary)] text-white shadow-[0_14px_30px_rgba(22,163,74,0.25)]",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div data-tour="dashboard-account-actions" className="mt-auto hidden rounded-lg border border-[var(--dash-border)] bg-[var(--dash-surface-strong)] p-3 lg:block">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--dash-muted)]">Mode</p>
            <button
              type="button"
              onClick={() => {
                const nextTheme = isDark ? "light" : "dark";
                setTheme(nextTheme);
                window.localStorage.setItem("careerkick-dashboard-theme", nextTheme);
              }}
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[var(--dash-text)] px-3 py-2 text-sm font-bold text-[var(--dash-bg)]"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              {isDark ? "Light mode" : "Dark mode"}
            </button>
            {!isLoginPage ? (
              <button
                type="button"
                onClick={logout}
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md border border-[var(--dash-border)] px-3 py-2 text-sm font-bold text-[var(--dash-danger)]"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            ) : null}
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col pb-24 lg:pb-0">
          <header data-tour="dashboard-header" className="sticky top-0 z-30 border-b border-[var(--dash-border)] bg-[var(--dash-bg)]/88 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--dash-primary)]">
                  Control center
                </p>
                <h1 className="mt-1 text-xl font-black leading-tight sm:text-2xl">Dashboard</h1>
              </div>
              <div className="flex items-center gap-2 lg:hidden">
                <button
                  type="button"
                  onClick={() => {
                    const nextTheme = isDark ? "light" : "dark";
                    setTheme(nextTheme);
                    window.localStorage.setItem("careerkick-dashboard-theme", nextTheme);
                  }}
                  data-tour="dashboard-mobile-theme"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[var(--dash-border)] bg-[var(--dash-surface)] text-[var(--dash-text)] transition hover:border-[var(--dash-primary)] hover:text-[var(--dash-primary)]"
                  aria-label="Toggle dashboard theme"
                >
                  {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </button>
                <button
                  type="button"
                  onClick={logout}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[var(--dash-border)] bg-[var(--dash-surface)] text-[var(--dash-danger)] transition hover:border-[var(--dash-danger)] hover:bg-red-50"
                  aria-label="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </div>
          </header>
          <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
        </div>
      </div>
      <DashboardTour role={role} />
    </div>
  );
}
