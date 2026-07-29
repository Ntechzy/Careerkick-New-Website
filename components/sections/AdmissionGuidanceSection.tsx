"use client";

import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const admissionData = [
  { year: "2022", students: 5000, label: "5,000+", shortLabel: "5k+" },
  { year: "2023", students: 7000, label: "7,000+", shortLabel: "7k+" },
  { year: "2024", students: 9000, label: "9,000+", shortLabel: "9k+" },
  { year: "2025", students: 12000, label: "12,000+", shortLabel: "12k+" },
] as const;

export function AdmissionGuidanceSection() {
  return (
    <section className="relative overflow-hidden bg-base px-4 py-section-mobile md:px-8 md:py-section">
      <AuroraBackground />
      <div className="absolute -left-28 top-20 h-72 w-72 rounded-full bg-violet/10 blur-[100px]" />
      <div className="absolute -right-24 bottom-12 h-80 w-80 rounded-full bg-violet/10 blur-[110px]" />
      <div className="grid-overlay absolute inset-0 opacity-80" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14">
        <ScrollReveal className="max-w-2xl">
          <span className="mb-5 inline-flex rounded-full border border-violet/30 bg-violet/10 px-4 py-2 font-mono text-[10px] font-medium uppercase tracking-widest text-violet-glow sm:text-xs">
            Year-wise admission impact
          </span>
          <h2 className="font-display text-3xl font-bold leading-tight tracking-normal text-white sm:text-4xl md:text-5xl">
            More aspirants <span className="bg-gradient-brand bg-clip-text text-transparent">admitted every year.</span>
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-white sm:text-base md:text-lg md:text-white">
            Careerkick has helped thousands of NEET and JEE aspirants secure college allotments and move confidently into admission over the years.
          </p>
          <p className="mt-4 max-w-xl rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-xs font-medium leading-relaxed text-white/65 sm:text-sm">
            These numbers represent students admitted through counselling support, allotment planning, and admission assistance.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.12}>
          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-surface-2/80 p-4 shadow-elevated backdrop-blur-xl sm:p-5 md:p-6">
            <div className="absolute inset-x-10 -bottom-12 h-36 rounded-full bg-gradient-glow opacity-45 blur-3xl" />
            <div className="relative">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-violet-glow sm:text-xs">Students admitted</p>
                  <h3 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">Admissions Growth Over the Last Four Years</h3>
                </div>
                <div className="rounded-full border border-violet/30 bg-violet/10 px-3 py-1.5 font-mono text-[10px] text-violet-glow sm:text-xs">
                  +140%
                </div>
              </div>

              <div className="relative h-[280px] rounded-lg border border-white/10 bg-base/60 px-1 pb-3 pt-5 sm:h-[380px] sm:px-3 sm:pb-5 sm:pt-7">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={admissionData} margin={{ top: 20, right: 20, bottom: 10, left: 0 }}>
                    <defs>
                      <linearGradient id="guidanceBar" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#51A70A" stopOpacity={0.98} />
                        <stop offset="52%" stopColor="#51A70A" stopOpacity={0.92} />
                        <stop offset="100%" stopColor="#51A70A" stopOpacity={0.78} />
                      </linearGradient>
                      <linearGradient id="guidanceArea" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#51A70A" stopOpacity={0.34} />
                        <stop offset="100%" stopColor="#51A70A" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                    <XAxis
                      dataKey="year"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#51A70A", fontSize: 12, fontFamily: "var(--font-jakarta)" }}
                      dy={8}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#667E9F", fontSize: 11, fontFamily: "var(--font-jakarta)" }}
                      tickFormatter={(value) => `${Number(value) / 1000}k`}
                      domain={[0, 13000]}
                      width={48}
                    />
                    <Tooltip content={<GuidanceTooltip />} cursor={{ fill: "rgba(81,167,10,0.08)" }} />
                    <Area
                      type="monotone"
                      dataKey="students"
                      fill="url(#guidanceArea)"
                      stroke="#51A70A"
                      strokeWidth={3}
                      dot={{ r: 5, fill: "#51A70A", stroke: "#050704", strokeWidth: 3 }}
                      activeDot={{ r: 7, fill: "#51A70A", stroke: "#050704", strokeWidth: 3 }}
                      isAnimationActive
                      animationDuration={900}
                    />
                    <Bar
                      dataKey="students"
                      fill="url(#guidanceBar)"
                      radius={[8, 8, 4, 4]}
                      maxBarSize={44}
                      isAnimationActive
                      animationDuration={900}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 grid grid-cols-4 gap-2 sm:gap-3">
                {admissionData.map((item) => (
                  <div key={item.year} className="rounded-lg border border-white/10 bg-white/[0.03] px-2 py-3 text-center">
                    <p className="font-display text-lg font-bold text-white sm:text-2xl">{item.shortLabel}</p>
                    <p className="mt-1 font-mono text-[10px] font-semibold text-violet-glow sm:text-xs">{item.year}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function GuidanceTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ payload: (typeof admissionData)[number] }>;
  label?: string;
}) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="rounded-lg border border-white/10 bg-surface-2/95 px-4 py-3 shadow-elevated backdrop-blur-xl">
      <p className="font-mono text-[10px] uppercase tracking-widest text-violet-glow">{label}</p>
      <p className="mt-1 font-display text-xl font-bold text-white">{payload[0].payload.label}</p>
      <p className="mt-1 text-xs text-text-muted">students admitted</p>
    </div>
  );
}

