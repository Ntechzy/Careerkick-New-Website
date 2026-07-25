"use client";
import React, { useEffect, useState, useRef } from "react";
import { Spotlight } from "../../components/ui/Spotlight";
import { cn } from "@/lib/utils";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { motion, useInView, animate } from "framer-motion";

export function DataShow() {
  return (
    <section className="relative w-full overflow-hidden bg-[#f7faf4] px-4 py-16 text-slate-900 sm:py-20 md:px-8 md:py-24 lg:py-28">
      {/* Grid Background */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 select-none opacity-[0.12] [background-size:40px_40px] sm:[background-size:60px_60px]",
          "[background-image:linear-gradient(to_right,rgba(81,167,10,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(81,167,10,0.2)_1px,transparent_1px)]",
        )}
      />

      {/* Spotlight & Glows */}
      <Spotlight
        className="-top-20 left-0 md:-top-20 md:left-60"
        fill="#51A70A"
      />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-[-5%] h-[300px] w-full -translate-x-1/2 rounded-full bg-[#51A70A]/10 blur-[80px] sm:top-[-10%] sm:h-[500px] sm:w-[800px] sm:blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4 sm:space-y-6 pb-12 sm:pb-20"
        >
          <div className="inline-block rounded-full border border-[#51A70A]/18 bg-[#51A70A]/10 px-3 py-1 text-[8px] font-bold uppercase tracking-[0.2em] text-[#367d07] shadow-[0_0_15px_rgba(81,167,10,0.08)] backdrop-blur-sm sm:px-4 sm:py-1.5 sm:text-[10px] sm:tracking-[0.3em]">
            YouTube Metrics • REAL-TIME DATA
          </div>
          <h2 className="font-display text-3xl font-bold leading-[1.08] tracking-normal text-slate-900 sm:text-4xl md:text-5xl lg:text-6xl">
            Careerkick NEET{" "}
            <span className="text-[#51A70A] text-glow">YOUTUBE</span> CHANNEL
          </h2>
          <p className="mx-auto max-w-3xl px-4 text-sm font-medium leading-relaxed text-slate-700 sm:text-xl">
            We have 100+ BAMS Influencers Where We Publish College Video To
            Build A Authentic Brand
          </p>
        </motion.div>

        {/* --- ULTRA PRO MAX REALISTIC MACBOOK MOCKUP --- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative mx-auto max-w-7xl origin-center scale-[0.85] group perspective-1000 sm:scale-100"
        >
          {/* Main Laptop Body (Chassis) */}
          <div className="relative rounded-xl border border-[#51A70A]/15 bg-white p-[6px] shadow-[0_30px_60px_-15px_rgba(15,23,42,0.14)] transition-transform duration-700 ease-out sm:rounded-2xl sm:p-[10px] sm:group-hover:rotate-x-1 sm:group-hover:shadow-[0_60px_120px_-20px_rgba(15,23,42,0.18),0_0_30px_rgba(81,167,10,0.08)]">
            {/* Inner Display Assembly (Bezel) */}
            <div className="relative aspect-[16/9] overflow-hidden rounded-md bg-[#fbfdf9] shadow-inner sm:rounded-lg">
              {/* Webcam Dot */}
              <div className="absolute top-1 sm:top-2 left-1/2 -translate-x-1/2 flex gap-1 z-30">
                <div className="w-1 h-1 rounded-full border border-slate-300 bg-slate-200 shadow-inner sm:h-1.5 sm:w-1.5"></div>
                <div className="h-0.5 w-0.5 rounded-full bg-emerald-500/50 blur-[1px] sm:h-1 sm:w-1"></div>{" "}
                {/* Active Light */}
              </div>

              {/* Screen Content (The actual Image) */}
              <div className="relative h-full w-full overflow-hidden rounded-md bg-[#111111]">
                <img
                  src="https://res.cloudinary.com/dhlqc0ymy/image/upload/v1784110186/mac_w3cbup.png"
                  alt="YouTube Analytics Dashboard"
                  className="absolute inset-0 h-full w-full object-cover object-center opacity-95 transition-all duration-700 sm:group-hover:scale-[1.01] sm:group-hover:opacity-100"
                  onError={(event) => {
                    event.currentTarget.src = "/logo-bg.png";
                    event.currentTarget.className = "absolute inset-0 h-full w-full bg-[#fbfdf9] object-contain object-center p-8 opacity-90 transition-all duration-700 sm:group-hover:scale-[1.01] sm:group-hover:opacity-100";
                  }}
                />

                {/* Dynamic Screen Glare (Animated on Hover) */}
                <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-tr from-transparent via-white/[0.06] to-white/[0.12] opacity-100 transition-opacity duration-700 sm:group-hover:opacity-0" />
                <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-bl from-transparent via-white/[0.02] to-white/[0.05] opacity-0 transition-opacity duration-700 sm:group-hover:opacity-100" />

                {/* Subtle Screen Ambient Glow on Body */}
                <div className="pointer-events-none absolute -inset-10 bg-[#51A70A]/5 opacity-0 blur-3xl transition-opacity duration-700 sm:group-hover:opacity-100" />
              </div>
            </div>

            {/* Chamfered Edge Highlight */}
            <div className="pointer-events-none absolute inset-0 rounded-xl border-t-2 border-white/10 sm:rounded-2xl"></div>

            {/* MacBook "Chin" with Logo Area */}
            <div className="mt-[2px] flex h-4 w-full items-center justify-center bg-white sm:h-6">
              <div className="h-0.5 w-12 rounded-full bg-slate-200 sm:h-1 sm:w-20"></div>{" "}
              {/* Space Grey Aesthetic */}
            </div>
          </div>

          {/* Separate Laptop Base (Chassis Bottom) */}
          <div className="relative -ml-[0.5%] h-3 w-[101%] overflow-hidden rounded-b-lg border-t border-slate-200 bg-white shadow-2xl sm:h-5 sm:rounded-b-xl">
            {/* Base Highlight/Shadow */}
            <div className="absolute inset-x-0 top-0 h-px bg-white/70"></div>
            <div className="absolute inset-x-0 bottom-0 h-1 bg-slate-100"></div>
            {/* Thumb Notch */}
            <div className="absolute left-1/2 top-0 h-1.5 w-16 -translate-x-1/2 rounded-b-md border border-slate-200 border-t-0 bg-[#fbfdf9] sm:h-2 sm:w-24"></div>
          </div>

          {/* Floating Badge (Updated Size/Detail) */}
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [-12, -8, -12] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 sm:-top-12 -right-4 sm:-right-12 z-20"
          >
            <Badge className="h-14 w-14 sm:h-24 sm:w-24 shadow-[0_10px_30px_rgba(0,0,0,0.5)]" />
          </motion.div>
        </motion.div>
        {/* --- END REALISTIC MACBOOK MOCKUP --- */}

        {/* Analytics Data Grid with Count-up */}
        <div className="mx-4 mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[#51A70A]/15 bg-[#f1f5ea] shadow-[0_20px_40px_-15px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:mx-0 sm:mt-24 sm:grid-cols-2 sm:rounded-3xl md:grid-cols-4">
          <StatCard
            label="Views"
            value={263.3}
            suffix="k"
            status="Optimal performance range"
            trend="neutral"
            delay={0.1}
          />
          <StatCard
            label="Engaged views"
            value={127.0}
            suffix="k"
            status="66% surge vs period"
            trend="up"
            delay={0.2}
          />
          <StatCard
            label="Likes"
            value={3.0}
            suffix="k"
            status="77% surge vs period"
            trend="up"
            delay={0.3}
          />
          <StatCard
            label="Subscribers"
            value={182}
            prefix="+"
            status="Consistent growth dynamic"
            trend="neutral"
            delay={0.4}
          />
        </div>
      </div>
    </section>
  );
}

const StatCard = ({
  label,
  value,
  suffix = "",
  prefix = "",
  status,
  trend,
  delay,
}: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2.5,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (latest) => setDisplayValue(latest),
      });
      return () => controls.stop();
    } else {
      setDisplayValue(0);
    }
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      viewport={{ once: false }}
      className="group relative flex flex-col items-center space-y-2 overflow-hidden bg-white p-6 text-center transition-all duration-300 hover:bg-[#fbfdf9] sm:space-y-3.5 sm:p-10"
    >
      <div className="pointer-events-none absolute inset-0 bg-[#51A70A]/5 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

      <span className="relative z-10 text-[10px] font-bold uppercase tracking-[0.1em] text-[#367d07] sm:text-xs sm:tracking-[0.2em]">
        {label}
      </span>
      <div className="flex items-center gap-2 relative z-10">
        <h3 className="font-display text-3xl font-extrabold tracking-tight text-slate-950 tabular-nums sm:text-5xl">
          {prefix}
          {displayValue.toFixed(value % 1 === 0 ? 0 : 1)}
          {suffix}
        </h3>
        {trend === "up" ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            className="flex h-6 w-6 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)] sm:h-8 sm:w-8"
          >
            <ArrowUpRight size={14} className="sm:w-5 sm:h-5" strokeWidth={3} />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            className="flex h-6 w-6 items-center justify-center rounded-full border border-[#51A70A]/20 bg-[#51A70A]/10 text-[#51A70A] sm:h-8 sm:w-8"
          >
            <CheckCircle2 size={14} className="sm:w-5 sm:h-5" />
          </motion.div>
        )}
      </div>
      <p className="relative z-10 max-w-[180px] text-[10px] font-medium leading-relaxed text-slate-600 sm:text-[12px]">
        {status}
      </p>
    </motion.div>
  );
};

const Badge = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-xl border border-[#51A70A]/15 bg-white p-2 shadow-2xl backdrop-blur-md sm:rounded-3xl sm:p-4",
        className,
      )}
    >
      <img
        src="/logo.png"
        alt="Careerkick Logo"
        className="w-full h-full object-contain"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#51A70A]/20 via-transparent to-white/20" />
      <div className="pointer-events-none absolute inset-0 rounded-xl shadow-[inner_0_2px_10px_rgba(15,23,42,0.08)] sm:rounded-3xl"></div>
    </div>
  );
};
