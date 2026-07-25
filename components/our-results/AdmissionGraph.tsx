"use client";
import { motion, useInView } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { useMemo, useRef } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const clientGrowthData = [
  { year: "2019", clients: 200 },
  { year: "2020", clients: 500 },
  { year: "2021", clients: 2100 },
  { year: "2022", clients: 3000 },
  { year: "2023", clients: 3700 },
  { year: "2024", clients: 4200 },
  { year: "2025", clients: 6300 },
  { year: "2026", clients: 7000, isExpected: true, label: "7000+" },
];

const resetData = clientGrowthData.map((point) => ({
  ...point,
  clients: 0,
}));

const chartConfig = {
  clients: {
    label: "No. of admissions",
    color: "hsl(var(--primary))",
  },
} as const;

const AdmissionGraph = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-100px" });

  const chartData = useMemo(() => (inView ? clientGrowthData : resetData), [inView]);
  // Optional: keep this if you plan to use it later, otherwise it can be removed
  const peakClients = clientGrowthData[clientGrowthData.length - 1];

  return (
    <section
      ref={ref}
      id="client-growth"
      className="relative overflow-hidden bg-[#f7faf4] px-4 py-16 text-slate-900 sm:py-20 md:px-8 md:py-24 lg:py-28"
    >
      <div className="pointer-events-none absolute left-0 top-0 h-80 w-80 rounded-full bg-[#51A70A]/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-emerald-300/15 blur-[140px]" />
      <div className="grid-overlay absolute inset-0 opacity-[0.12]" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 34 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-4xl space-y-4 text-center"
        >
          <span className="inline-flex items-center rounded-full border border-[#51A70A]/18 bg-[#51A70A]/10 px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[#367d07]">
            Admission Growth
          </span>
          <h2 className="font-display text-3xl font-bold leading-[1.08] tracking-normal text-slate-900 sm:text-4xl md:text-5xl lg:text-6xl">
            WHAT WE HAVE DONE IN THE{" "}
            <span className="bg-gradient-brand bg-clip-text text-transparent">
              PAST
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 38 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 38 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mt-10 max-w-5xl rounded-3xl border border-[#51A70A]/15 bg-white p-4 shadow-[0_20px_70px_rgba(15,23,42,0.06)] sm:mt-12 sm:p-8 lg:p-10"
        >
          <div className="mb-4 flex items-start justify-between gap-4 sm:mb-6">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-[#51A70A] sm:text-sm sm:tracking-[0.28em]">
                2019 to 2026 admissions trajectory
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-[#fbfdf9] px-2 py-4 shadow-[0_18px_50px_rgba(15,23,42,0.05)] sm:px-5 sm:py-6">
            <div className="pointer-events-none absolute inset-x-8 top-0 h-32 rounded-full bg-[#51A70A]/12 blur-3xl" />

            <ChartContainer config={chartConfig} className="h-[260px] w-full sm:h-[320px]">
              <AreaChart
                key={inView ? "client-chart-active" : "client-chart-reset"}
                data={chartData}
                margin={{ top: 20, right: 12, left: -10, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="clientAreaFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-clients)" stopOpacity={0.55} />
                    <stop offset="95%" stopColor="var(--color-clients)" stopOpacity={0.04} />
                  </linearGradient>
                </defs>

                <CartesianGrid vertical={false} strokeDasharray="4 8" />
                <XAxis
                  dataKey="year"
                  axisLine={false}
                  tickLine={false}
                  tickMargin={12}
                  minTickGap={15}
                  tick={{ fontSize: 12, fill: "#667E5F", fontFamily: "var(--font-jetbrains)" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickMargin={8}
                  width={38}
                  domain={[0, 7500]}
                  ticks={[0, 1000, 2000, 3000, 4000, 5000, 6000, 7000]}
                  tickFormatter={(value) => `${value / 1000}k`}
                  tick={{ fill: "#667E5F", fontFamily: "var(--font-jetbrains)" }}
                />
                <ChartTooltip
                  cursor={{ stroke: "#51A70A", strokeOpacity: 0.18, strokeWidth: 1 }}
                  content={
                    <ChartTooltipContent
                      indicator="dot"
                      formatter={(value, _, item) => {
                        const label = item.payload?.isExpected ? "7000+ (Expected)" : `${value}`;
                        return (
                          <div className="flex min-w-[9rem] items-center justify-between gap-2 sm:min-w-[11rem] sm:gap-3">
                            <span className="text-xs text-slate-600 sm:text-sm">No. of admissions</span>
                            <span className="font-mono text-xs font-semibold text-slate-900 sm:text-sm">{label}</span>
                          </div>
                        );
                      }}
                    />
                  }
                />

                <Area
                  type="monotone"
                  dataKey="clients"
                  stroke="var(--color-clients)"
                  strokeWidth={3.5}
                  fill="url(#clientAreaFill)"
                  dot={{
                    r: 4.5,
                    fill: "var(--color-clients)",
                    stroke: "rgba(255,255,255,0.75)",
                    strokeWidth: 1.5,
                  }}
                  activeDot={{
                    r: 6.5,
                    fill: "var(--color-clients)",
                    stroke: "rgba(255,255,255,0.95)",
                    strokeWidth: 2,
                  }}
                  isAnimationActive
                  animationDuration={1450}
                  animationEasing="ease-out"
                />
              </AreaChart>
            </ChartContainer>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:mt-6 sm:grid-cols-3 sm:gap-4">
            <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3 shadow-sm sm:px-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 sm:text-xs">2019</p>
              <p className="mt-1 font-display text-xl font-bold text-[#51A70A] sm:text-2xl">200</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3 shadow-sm sm:px-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 sm:text-xs">2025</p>
              <p className="mt-1 font-display text-xl font-bold text-[#51A70A] sm:text-2xl">6300</p>
            </div>
            <div className="col-span-2 rounded-2xl border border-[#51A70A]/18 bg-[#51A70A]/10 px-3 py-3 sm:col-span-1 sm:px-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#367d07] sm:text-xs">2026 (Expected)</p>
              <p className="counter-glow mt-1 font-display text-xl font-bold text-[#51A70A] sm:text-2xl">7000+</p>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-center gap-2 text-center text-[#51A70A] sm:mt-8">
            <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-xs font-semibold sm:text-sm">Steady year-on-year admission momentum</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AdmissionGraph;
