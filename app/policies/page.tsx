import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileText, ShieldCheck, RotateCcw } from "lucide-react";

export const metadata: Metadata = {
  title: "Policies | Careerkick",
  description:
    "Read Careerkick's Privacy Policy, Refund Policy, and Terms & Conditions in one place.",
  alternates: {
    canonical: "/policies",
  },
};

const policies = [
  {
    id: "privacy-policy",
    label: "Privacy Policy",
    href: "/policies/privacy",
    icon: ShieldCheck,
    summary: "How we collect, use, and protect your personal information.",
  },
  {
    id: "refund-policy",
    label: "Refund Policy",
    href: "/policies/refund",
    icon: RotateCcw,
    summary: "When refunds may apply and how requests are handled.",
  },
  {
    id: "terms-conditions",
    label: "Terms & Conditions",
    href: "/policies/terms",
    icon: FileText,
    summary: "The rules for using the website and our advisory services.",
  },
] as const;

export default function PoliciesPage() {
  return (
    <main className="relative overflow-hidden bg-base px-4 pb-24 pt-28 md:px-8 md:pt-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[70%] -translate-x-1/2 rounded-full bg-[#51A70A]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 top-24 h-96 w-96 rounded-full bg-white/6 blur-[140px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(81,167,10,0.08),transparent_40%),linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent_18%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="max-w-4xl">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-[#8cef32]">
            Policies
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
            Privacy, refund, and terms in one{" "}
            <span className="text-[#8cef32]">simple place</span>.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/70 sm:text-lg">
            Choose a policy below to open the full page for that topic.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {policies.map((policy) => {
            const Icon = policy.icon;
            return (
              <Link
                key={policy.id}
                href={policy.href}
                className="group rounded-[1.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03)),linear-gradient(135deg,rgba(11,16,9,0.88),rgba(18,26,16,0.76))] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#51A70A]/20 bg-[#51A70A]/10 text-[#8cef32]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <h2 className="font-display text-xl font-semibold text-white">
                      {policy.label}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-white/68">
                      {policy.summary}
                    </p>
                  </div>
                </div>
                <div className="mt-5 inline-flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8cef32]">
                  Read section
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
