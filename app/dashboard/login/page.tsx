"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  GraduationCap,
  ShieldCheck,
  Mail,
  LockKeyhole,
  LayoutDashboard,
  Users,
  BarChart3,
  CalendarDays,
  Bell,
  CheckCircle2,
} from "lucide-react";
import { DASHBOARD_AUTH_KEY } from "@/components/dashboard/DashboardShell";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "admin", label: "Admin", icon: ShieldCheck },
  { id: "student", label: "Student", icon: GraduationCap },
] as const;

export default function DashboardLoginPage() {
  const router = useRouter();

  const [activeTab, setActiveTab] =
    useState<(typeof tabs)[number]["id"]>("admin");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    setIsLoggingIn(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        alert("Invalid credentials");
        return;
      }

      const payload = await response.json();
      const token =
        payload?.token ??
        payload?.data?.token ??
        payload?.accessToken ??
        payload?.data?.accessToken;

      if (token) {
        window.localStorage.setItem("careerkick-dashboard-token", token);
      }

      window.localStorage.setItem(DASHBOARD_AUTH_KEY, "true");
      document.cookie = `${DASHBOARD_AUTH_KEY}=true; path=/; max-age=86400; samesite=lax`;

      router.replace("/dashboard");
    } catch {
      alert("Unable to connect to login service.");
    } finally {
      setIsLoggingIn(false);
    }
  }

  return (
    <main className="flex h-screen items-center justify-center overflow-hidden bg-[var(--dash-surface-strong)] px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
      <section className="max-h-[calc(100vh-2rem)] w-full max-w-[1280px] overflow-hidden rounded-[28px] border border-[var(--dash-border)] bg-[var(--dash-surface)] shadow-[var(--dash-shadow)]">
        <div className="grid h-[calc(100vh-2rem)] max-h-[760px] min-h-0 lg:grid-cols-[1fr_1.05fr]">
          {/* =========================================================
              LEFT SIDE - LOGIN FORM
          ========================================================== */}
          <div className="flex min-h-0 items-center justify-center px-6 py-6 sm:px-10 lg:px-14 xl:px-20">
            <div className="w-full max-w-[440px]">
              {/* Logo */}
              <div className="mb-7">
                <Image
                  src="/logo.png"
                  alt="Careerkick"
                  width={156}
                  height={45}
                  priority
                  className="h-auto w-[156px] object-contain"
                />
              </div>

              {/* Heading */}
              <div>
                <h1 className="text-[28px] font-black leading-tight tracking-[-0.03em] text-[var(--dash-text)] sm:text-[32px]">
                  Log in to your account.
                </h1>

                <p className="mt-3 text-sm font-semibold leading-6 text-[var(--dash-muted)]">
                  Enter your email address and password to log in.
                </p>
              </div>

              {/* Admin / Student Tabs */}
              <div className="mt-6 grid grid-cols-2 gap-1.5 rounded-xl bg-[var(--dash-surface-strong)] p-1.5">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const active = activeTab === tab.id;

                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 text-sm font-black text-[var(--dash-muted)] transition-all duration-200",
                        active &&
                          "bg-[var(--dash-surface)] text-[var(--dash-text)] shadow-sm",
                      )}
                    >
                      <Icon className="h-4 w-4" />

                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Login Form */}
              <form className="mt-5 space-y-3" onSubmit={handleLogin}>
                {/* Email */}
                <div>
                  <label
                    htmlFor={`${activeTab}-email`}
                    className="sr-only"
                  >
                    Email
                  </label>

                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[var(--dash-muted)]" />

                    <input
                      id={`${activeTab}-email`}
                      name="email"
                      type="email"
                      className="h-12 w-full rounded-xl border border-[var(--dash-border)] bg-[var(--dash-surface-strong)] pl-12 pr-4 text-sm font-semibold text-[var(--dash-text)] outline-none transition placeholder:text-[var(--dash-muted)] focus:border-[var(--dash-primary)] focus:bg-[var(--dash-surface)] focus:ring-2 focus:ring-[var(--dash-primary)]/10"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor={`${activeTab}-password`}
                    className="sr-only"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[var(--dash-muted)]" />

                    <input
                      id={`${activeTab}-password`}
                      name="password"
                      type="password"
                      className="h-12 w-full rounded-xl border border-[var(--dash-border)] bg-[var(--dash-surface-strong)] pl-12 pr-4 text-sm font-semibold text-[var(--dash-text)] outline-none transition placeholder:text-[var(--dash-muted)] focus:border-[var(--dash-primary)] focus:bg-[var(--dash-surface)] focus:ring-2 focus:ring-[var(--dash-primary)]/10"
                    />
                  </div>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-xl bg-gradient-brand px-4 text-sm font-black text-white shadow-[0_16px_34px_rgba(81,167,10,0.25)] transition duration-200 hover:brightness-105 active:scale-[0.99]"
                >
                  {isLoggingIn ? "Logging in..." : `Login as ${activeTab}`}
                </button>
              </form>
            </div>
          </div>

          {/* =========================================================
              RIGHT SIDE - VISUAL PANEL
          ========================================================== */}
          <div className="hidden min-h-0 p-3 lg:block">
            <div className="relative flex h-full min-h-0 overflow-hidden rounded-[24px] bg-gradient-brand px-10 py-8 text-white xl:px-14">
              {/* Decorative background shapes */}
              <div className="pointer-events-none absolute -left-16 -top-16 h-44 w-44 rounded-full border border-white/10" />

              <div className="pointer-events-none absolute -right-16 top-14 h-40 w-40 rounded-full bg-white/[0.04]" />

              <div className="pointer-events-none absolute bottom-[-80px] right-[-60px] h-64 w-64 rounded-[70px] border-2 border-white/[0.08]" />

              <div className="pointer-events-none absolute bottom-16 left-10 h-24 w-24 rotate-12 rounded-[28px] border-2 border-white/[0.08]" />

              {/* Content */}
              <div className="relative z-10 flex w-full flex-col">
                {/* Top */}
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-white/70">
                    Secure access
                  </p>

                  <h2 className="mt-4 max-w-[430px] text-3xl font-black leading-[1.15] tracking-[-0.03em] xl:text-4xl">
                    Careerkick dashboard login
                  </h2>

                  <p className="mt-4 max-w-[450px] text-sm font-semibold leading-6 text-white/75">
                    Access admin controls or student counselling details
                    from one bright dashboard.
                  </p>
                </div>

                {/* Dashboard Mockup */}
                <div className="flex flex-1 items-center justify-center py-9">
                  <div className="relative w-full max-w-[560px]">
                    {/* Main Dashboard Card */}
                    <div className="overflow-hidden rounded-2xl border border-white/20 bg-[var(--dash-surface)] shadow-2xl">
                      {/* Mock header */}
                      <div className="flex h-12 items-center justify-between border-b border-[var(--dash-border)] px-4">
                        <div className="flex items-center gap-2">
                          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--dash-primary)] text-white">
                            <GraduationCap className="h-3.5 w-3.5" />
                          </div>

                          <span className="text-[10px] font-black text-[var(--dash-text)]">
                            Careerkick
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-[var(--dash-muted)]">
                          <Bell className="h-3.5 w-3.5" />

                          <div className="h-7 w-7 rounded-full bg-[var(--dash-surface-strong)]" />
                        </div>
                      </div>

                      <div className="grid grid-cols-[115px_1fr]">
                        {/* Sidebar */}
                        <div className="min-h-[305px] border-r border-[var(--dash-border)] bg-[var(--dash-surface-strong)] p-3">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 rounded-lg bg-[var(--dash-primary)] px-2.5 py-2 text-white">
                              <LayoutDashboard className="h-3 w-3" />

                              <span className="text-[8px] font-black">
                                Dashboard
                              </span>
                            </div>

                            <div className="flex items-center gap-2 px-2.5 py-2 text-[var(--dash-muted)]">
                              <Users className="h-3 w-3" />

                              <span className="text-[8px] font-bold">
                                Students
                              </span>
                            </div>

                            <div className="flex items-center gap-2 px-2.5 py-2 text-[var(--dash-muted)]">
                              <CalendarDays className="h-3 w-3" />

                              <span className="text-[8px] font-bold">
                                Follow-ups
                              </span>
                            </div>

                            <div className="flex items-center gap-2 px-2.5 py-2 text-[var(--dash-muted)]">
                              <BarChart3 className="h-3 w-3" />

                              <span className="text-[8px] font-bold">
                                Reports
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Dashboard Content */}
                        <div className="bg-[var(--dash-surface)] p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="h-2 w-16 rounded-full bg-[var(--dash-text)]/80" />

                              <div className="mt-2 h-1.5 w-24 rounded-full bg-[var(--dash-border)]" />
                            </div>

                            <div className="h-7 w-20 rounded-md bg-[var(--dash-primary)]" />
                          </div>

                          {/* Stats */}
                          <div className="mt-5 grid grid-cols-3 gap-2">
                            <div className="rounded-lg border border-[var(--dash-border)] p-3">
                              <div className="h-1.5 w-10 rounded-full bg-[var(--dash-border)]" />

                              <div className="mt-3 h-3 w-14 rounded-full bg-[var(--dash-text)]/80" />
                            </div>

                            <div className="rounded-lg border border-[var(--dash-border)] p-3">
                              <div className="h-1.5 w-10 rounded-full bg-[var(--dash-border)]" />

                              <div className="mt-3 h-3 w-12 rounded-full bg-[var(--dash-text)]/80" />
                            </div>

                            <div className="rounded-lg border border-[var(--dash-border)] p-3">
                              <div className="h-1.5 w-10 rounded-full bg-[var(--dash-border)]" />

                              <div className="mt-3 h-3 w-10 rounded-full bg-[var(--dash-text)]/80" />
                            </div>
                          </div>

                          {/* Fake Chart */}
                          <div className="mt-4 rounded-xl border border-[var(--dash-border)] p-4">
                            <div className="flex h-[90px] items-end gap-2">
                              <div className="h-[30%] flex-1 rounded-t bg-[var(--dash-primary)]/20" />
                              <div className="h-[55%] flex-1 rounded-t bg-[var(--dash-primary)]/30" />
                              <div className="h-[45%] flex-1 rounded-t bg-[var(--dash-primary)]/25" />
                              <div className="h-[80%] flex-1 rounded-t bg-[var(--dash-primary)]/50" />
                              <div className="h-[60%] flex-1 rounded-t bg-[var(--dash-primary)]/35" />
                              <div className="h-full flex-1 rounded-t bg-[var(--dash-primary)]" />
                              <div className="h-[72%] flex-1 rounded-t bg-[var(--dash-primary)]/45" />
                            </div>
                          </div>

                          {/* Bottom rows */}
                          <div className="mt-4 space-y-2">
                            {[1, 2, 3].map((item) => (
                              <div
                                key={item}
                                className="flex items-center justify-between rounded-lg border border-[var(--dash-border)] px-3 py-2"
                              >
                                <div className="flex items-center gap-2">
                                  <div className="h-6 w-6 rounded-full bg-[var(--dash-surface-strong)]" />

                                  <div>
                                    <div className="h-1.5 w-16 rounded-full bg-[var(--dash-text)]/60" />

                                    <div className="mt-1 h-1 w-10 rounded-full bg-[var(--dash-border)]" />
                                  </div>
                                </div>

                                <CheckCircle2 className="h-3.5 w-3.5 text-[var(--dash-primary)]" />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Floating Student Card */}
                    <div className="absolute -bottom-8 -left-5 w-[175px] rounded-2xl border border-[var(--dash-border)] bg-[var(--dash-surface)] p-4 shadow-xl">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--dash-primary)] text-white">
                          <GraduationCap className="h-4 w-4" />
                        </div>

                        <div>
                          <p className="text-[10px] font-black text-[var(--dash-text)]">
                            Students
                          </p>

                          <p className="mt-0.5 text-[8px] font-semibold text-[var(--dash-muted)]">
                            Admission overview
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex h-10 items-end gap-1">
                        <div className="h-[40%] flex-1 rounded-t bg-[var(--dash-primary)]/20" />
                        <div className="h-[65%] flex-1 rounded-t bg-[var(--dash-primary)]/40" />
                        <div className="h-[50%] flex-1 rounded-t bg-[var(--dash-primary)]/30" />
                        <div className="h-full flex-1 rounded-t bg-[var(--dash-primary)]" />
                        <div className="h-[70%] flex-1 rounded-t bg-[var(--dash-primary)]/50" />
                      </div>
                    </div>

                    {/* Floating Security Badge */}
                    <div className="absolute -right-4 -top-6 flex h-[84px] w-[84px] items-center justify-center rounded-[28px] border border-white/70 bg-white shadow-xl">
                      <ShieldCheck className="h-9 w-9 text-[var(--dash-primary)]" />
                    </div>
                  </div>
                </div>

                {/* Bottom Text */}
                <div className="mx-auto max-w-[450px] text-center">
                  <h3 className="text-2xl font-black leading-tight tracking-[-0.02em] xl:text-[28px]">
                    Manage your dashboard
                    <br />
                    from one place.
                  </h3>

                  <p className="mt-3 text-sm font-semibold text-white/75">
                    Securely access your Careerkick dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
