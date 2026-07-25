"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const trustPoints = [
  "Course selection clarity",
  "Counselling portal planning",
  "Choice filling support",
  "Deadline and document checks",
];
const phoneNumber = "7393062116";

export function MidHomepageCtaSection() {
  return (
    <section className="relative overflow-hidden bg-[#f7faf4] px-4 py-10 text-slate-900 md:px-8 md:py-14">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#51A70A]/35 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#51A70A]/20 to-transparent" />
      <div className="absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[#51A70A]/10 blur-[110px]" />
      <div className="absolute -right-24 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-emerald/10 blur-[120px]" />
      <div className="grid-overlay absolute inset-0 opacity-[0.18]" />

      <ScrollReveal className="relative mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl border border-[#51A70A]/20 bg-white p-4 shadow-[0_20px_60px_rgba(16,24,40,0.08)] backdrop-blur-xl sm:p-5 md:p-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(81,167,10,0.10),transparent_32%),radial-gradient(circle_at_86%_78%,rgba(109,204,18,0.08),transparent_30%)]" />
          <div className="relative grid gap-6 rounded-[24px] border border-slate-100 bg-[#fbfdf8] p-5 sm:p-6 lg:grid-cols-[1fr_auto] lg:items-center lg:p-8">
            <div className="max-w-3xl">
              <div className="inline-flex rounded-full border border-[#51A70A]/30 bg-white px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.26em] text-[#51A70A] shadow-sm sm:px-4 sm:py-2 sm:text-xs">
                Ready for the next step?
              </div>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-normal text-slate-900 sm:text-4xl md:text-5xl">
                Turn your NEET score into a{" "}
                <span className="bg-gradient-brand bg-clip-text text-transparent">clear admission plan.</span>
              </h2>
              <p className="mt-4 max-w-2xl text-sm font-medium leading-relaxed text-slate-700 sm:text-base lg:text-slate-800">
                Speak with Careerkick before counselling choices become rushed. We help you understand course options, portals, quotas, documents, and college priorities.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {trustPoints.map((point) => (
                  <span
                    key={point}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 sm:text-sm"
                  >
                    {point}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:w-[260px] lg:flex-col">
              <motion.a
                href={`tel:${phoneNumber}`}
                className="inline-flex w-full items-center justify-center rounded-full bg-gradient-brand px-6 py-4 font-display text-base font-bold text-white shadow-card transition-shadow hover:shadow-glow-violet focus-visible:shadow-[0_0_0_2px_#51A70A,0_0_0_6px_#f7faf4]"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Book Free Call
              </motion.a>
              <a
                href="/services"
                className="inline-flex w-full items-center justify-center rounded-full border border-[#51A70A]/20 bg-white px-6 py-4 text-sm font-semibold text-slate-700 transition-colors hover:border-[#51A70A]/40 hover:bg-[#51A70A]/5 hover:text-slate-900 focus-visible:shadow-[0_0_0_2px_#51A70A,0_0_0_6px_#f7faf4]"
              >
                Explore Services
              </a>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
