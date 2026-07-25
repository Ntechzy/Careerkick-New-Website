"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Target, Megaphone, Settings } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming you have standard shadcn cn utility

const pillars = [
  {
    icon: Target,
    title: "Strategic Admission Support",
    desc: "Targeted student outreach based on NEET ranks and serious admission intent.",
    image: "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1784108291/admission-support_qqkw4p.png",
    label: "Admission Support",
  },
  {
    icon: Megaphone,
    title: "Branding & Marketing",
    desc: "Positioning colleges as top choices for BAMS aspirants through sharper visibility and trust.",
    image: "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1784108299/branding_fzeydl.png",
    label: "Branding & Marketing",
  },
  {
    icon: Settings,
    title: "Process Optimization",
    desc: "Organizing admission processes for transparency, faster follow-ups, and better conversion flow.",
    image: "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1784108301/process-optimization_xfo4go.png",
    label: "Process Optimization",
  },
];

const HowWork = () => {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const activePillar = pillars[activeIndex];

  return (
    <section ref={ref} id="process" className="relative overflow-hidden bg-[#f7faf4] px-4 py-16 text-slate-950 sm:py-20 md:px-8 md:py-24 lg:py-28">
      {/* Background Glows */}
      <div className="pointer-events-none absolute left-0 top-0 h-80 w-80 rounded-full bg-[#51A70A]/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-12 h-96 w-96 rounded-full bg-emerald-300/15 blur-[130px]" />
      <div className="grid-overlay absolute inset-0 opacity-[0.12]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl space-y-4 text-center"
        >
          <span className="inline-flex items-center rounded-full border border-[#51A70A]/18 bg-[#51A70A]/10 px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[#367d07]">
            Three Pillars of Growth
          </span>
          <h2 className="font-display text-3xl font-bold leading-[1.08] tracking-normal text-slate-900 sm:text-4xl md:text-5xl lg:text-6xl">
            WHAT & HOW DO WE{" "}
            <span className="bg-gradient-brand bg-clip-text text-transparent">
              WORK?
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-sm font-medium leading-relaxed text-slate-700 sm:text-base md:text-lg lg:text-slate-700">
            100% seats filling, brand building in the Ayurveda industry, and a
            complete admission process that stays structured from enquiry to conversion.
          </p>
        </motion.div>

        {/* 2-Column Layout */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="mx-auto mt-12 grid max-w-6xl gap-8 lg:grid-cols-12 lg:items-start"
        >
          {/* Left Column: Tabs */}
          <div className="order-2 flex flex-col gap-4 lg:order-1 lg:col-span-5">
            <div className="mb-2 hidden lg:block">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#51A70A]">
                Growth Model
              </p>
              <p className="mt-2 text-sm font-light text-slate-700">
                Select a pillar to see how we drive results.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {pillars.map((pillar, index) => {
                const isActive = activeIndex === index;
                const PillarIcon = pillar.icon;

                return (
                  <button
                    key={pillar.title}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={cn(
                      "group relative flex w-full flex-col items-start rounded-[1.5rem] border p-5 text-left transition-all duration-300 sm:p-6",
                      isActive
                        ? "border-[#51A70A]/25 bg-[#51A70A]/10 shadow-[0_0_20px_rgba(81,167,10,0.08)]"
                        : "border-slate-200 bg-white shadow-sm hover:border-[#51A70A]/35 hover:bg-[#fbfdf9]"
                    )}
                  >
                    <div className="flex w-full items-center gap-4">
                      <div
                        className={cn(
                          "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-colors duration-300",
                          isActive
                            ? "bg-[#51A70A]/18 text-[#51A70A]"
                            : "bg-slate-100 text-slate-600 group-hover:text-[#367d07]"
                        )}
                      >
                        <PillarIcon className="h-6 w-6" />
                      </div>
                      <h3
                        className={cn(
                          "font-display text-lg font-bold transition-colors duration-300",
                          isActive ? "text-slate-900" : "text-slate-700 group-hover:text-slate-900"
                        )}
                      >
                        {pillar.title}
                      </h3>
                    </div>

                    {/* Animated Description (Expands when active) */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0, marginTop: 0 }}
                          animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                          exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                          <p className="pl-16 text-sm leading-relaxed text-slate-700">
                            {pillar.desc}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Active Border Indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activePillarOutline"
                        className="absolute inset-0 rounded-[1.5rem] border-2 border-[#51A70A]/35"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Image Display */}
          <div className="order-1 lg:order-2 lg:col-span-7 lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-[2.5rem] border border-[#51A70A]/15 bg-white p-2 shadow-[0_20px_70px_rgba(15,23,42,0.06)] sm:p-4">
              <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[#fbfdf9]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePillar.title}
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 1.05, filter: "blur(4px)" }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="relative aspect-[4/3] w-full lg:aspect-[16/11]"
                  >
                    <img
                      src={activePillar.image}
                      alt={activePillar.title}
                      className="h-full w-full object-cover object-center"
                      onError={(event) => {
                        event.currentTarget.src = "/logo-bg.png";
                        event.currentTarget.className = "h-full w-full bg-background object-contain object-center p-8";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/18 to-transparent" />
                    
                    {/* Label Overlay */}
                    <div className="absolute bottom-6 left-6 inline-flex items-center gap-2 rounded-full border border-[#51A70A]/20 bg-white/90 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-[#367d07] backdrop-blur-md">
                      {activePillar.label}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowWork;
