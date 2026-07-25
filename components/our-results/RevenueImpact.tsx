"use client";
import { motion, useInView } from "framer-motion";
import {
  ArrowUpRight,
  BarChart3,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { useRef } from "react";

const impacts = [
  {
    icon: BarChart3,
    title: "Maximize Institutional Profitability",
    desc: "Maximize institutional profitability by killing vacant seats problem.",
    note: "No vacant seats",
  },
  {
    icon: TrendingUp,
    title: "Increase Seat Fee Value",
    desc: "With continuous brand reputation & increase in demand, we help colleges increase their fee for the same seat.",
    note: "Higher fee power",
  },
  {
    icon: DollarSign,
    title: "Secure Full First-Year Fee Upfront",
    desc: "We ensure colleges receive the entire first-year fee in a single payment, eliminating the complexities of installments or part payments, thereby improving cash flow and operational efficiency",
    note: "Upfront revenue",
  },
];

const RevenueImpact = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { margin: "-100px", once: true });

  return (
    <section
      ref={sectionRef}
      id="growth"
      className="relative overflow-hidden bg-base px-4 py-20 text-white lg:py-32"
    >
      {/* Background Decor */}
      <div className="pointer-events-none absolute left-1/2 top-16 h-48 w-[70%] -translate-x-1/2 rounded-full bg-[#51A70A]/10 blur-3xl" />
      <div className="pointer-events-none absolute right-10 top-1/3 h-40 w-40 rounded-full bg-[#6DCC12]/8 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 grid-overlay opacity-70" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-16 max-w-3xl space-y-4 text-center"
        >
          <span className="inline-flex items-center rounded-full border border-[#51A70A]/30 bg-[#51A70A]/10 px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[#8cef32]">
            BAMS Admission Growth
          </span>
          <h2 className="font-display text-3xl font-bold leading-[1.08] tracking-normal text-white sm:text-4xl md:text-5xl lg:text-6xl">
            INCREASED <span className="text-[#8cef32] text-glow">REVENUE</span>{" "}
            POTENTIAL
          </h2>
          <p className="mx-auto max-w-2xl text-sm font-medium leading-relaxed text-white/70 sm:text-base lg:text-white">
            Every counselling push translates into stronger BAMS seat conversion,
            healthier fee visibility, and more dependable admission-season cashflow.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Side: Landscape Image Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative lg:col-span-6"
          >
            <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-surface shadow-2xl">
              {/* Landscape Aspect Ratio Box */}
              <div className="w-full overflow-hidden bg-surface-2">
                <video
                  src="https://res.cloudinary.com/dhlqc0ymy/video/upload/v1784108469/revenue2_rrcqpx.mp4"
                  poster="/revenue2.webp"
                  autoPlay
                  loop
                  muted
                  playsInline
                  aria-label="Revenue growth analysis"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Corner Label */}
                <div className="absolute bottom-6 left-6 flex items-center gap-2 rounded-full border border-[#51A70A]/20 bg-black/60 px-4 py-2 backdrop-blur-md">
                   <TrendingUp className="h-4 w-4 text-[#8cef32]" />
                   <span className="font-mono text-xs font-bold uppercase tracking-widest text-white">Market Analysis</span>
                </div>
              </div>
            </div>
            
            {/* Decorative Glow elements */}
            <div className="absolute -bottom-6 -right-6 -z-10 h-32 w-32 rounded-3xl bg-[#51A70A]/20 blur-2xl" />
            <div className="absolute -top-6 -left-6 -z-10 h-24 w-24 rounded-full bg-[#51A70A]/10 blur-xl" />
          </motion.div>

          {/* Right Side: Impact Cards */}
          <div className="flex flex-col gap-6 lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex w-fit items-center gap-3 rounded-full border border-[#51A70A]/20 bg-[#51A70A]/10 px-4 py-2 text-sm text-[#8cef32]"
            >
              <TrendingUp className="h-4 w-4 shrink-0" />
              <span className="font-medium">NEET-to-BAMS counselling compounding</span>
            </motion.div>

            <div className="flex flex-col gap-4 sm:gap-5">
              {impacts.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 40 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.12 }}
                  className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 p-5 transition-all duration-500 glass glass-hover hover:-translate-y-1 hover:neon-glow sm:p-6"
                >
                  <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#51A70A]/60 to-transparent" />
                  <div className="pointer-events-none absolute right-0 top-0 h-28 w-28 rounded-full bg-[#51A70A]/8 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-[#51A70A]/20 bg-[#51A70A]/10 sm:h-14 sm:w-14">
                      <item.icon className="h-6 w-6 text-[#8cef32]" />
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
                        <h3 className="font-display text-lg font-semibold text-white sm:text-xl">
                          {item.title}
                        </h3>
                        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8cef32]/75 sm:text-xs sm:tracking-[0.24em]">
                          {item.note}
                        </span>
                      </div>
                      <p className="mt-2 max-w-2xl text-sm font-light leading-relaxed text-white/70 sm:mt-3 sm:text-base lg:text-white">
                        {item.desc}
                      </p>
                    </div>

                    <ArrowUpRight className="hidden h-5 w-5 flex-shrink-0 text-[#8cef32] opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:block" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RevenueImpact;
