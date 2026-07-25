"use client";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type StatItem = {
  value: number;
  label: string;
  eyebrow: string;
  format: (value: number) => string;
};

const formatLac = (value: number) => {
  const lacValue = value / 100000;
  const formatted =
    lacValue < 10
      ? lacValue.toFixed(1).replace(/\.0$/, "")
      : lacValue.toFixed(0);
  return `${formatted} Lac+`;
};

const formatCount = (value: number) =>
  `${Math.round(value).toLocaleString("en-IN")}+`;

const stats: StatItem[] = [
  {
    value: 100000,
    label: "Allotments",
    eyebrow: "Student Flow",
    format: formatLac,
  },
  {
    value: 1000000,
    label: "Students Reached",
    eyebrow: "Market Reach",
    format: formatLac,
  },
  {
    value: 1000,
    label: "Institutional Tieups",
    eyebrow: "Partner Network",
    format: formatCount,
  },
  {
    value: 7,
    label: "Years of Excellence",
    eyebrow: "Track Record",
    format: formatCount,
  },
];

const AnimatedCounter = ({
  target,
  inView,
  format,
}: {
  target: number;
  inView: boolean;
  format: (value: number) => string;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame = 0;
    let timeout = 0;

    if (!inView) {
      setCount(0);
      return undefined;
    }

    timeout = window.setTimeout(() => {
      const start = performance.now();
      const duration = 1400;

      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);

        setCount(target * eased);

        if (progress < 1) {
          frame = window.requestAnimationFrame(tick);
        }
      };

      frame = window.requestAnimationFrame(tick);
    }, 180);

    return () => {
      window.clearTimeout(timeout);
      window.cancelAnimationFrame(frame);
    };
  }, [inView, target]);

  return (
    <span className="inline-block whitespace-nowrap text-3xl font-bold text-white sm:text-4xl">
      {format(count)}
    </span>
  );
};

const AchievementsSection = () => {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { amount: 0.08 });

  return (
    <section
      ref={ref}
      id="our-scale"
      className="section-shell relative overflow-hidden bg-base text-white"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(81,167,10,0.16),transparent_28%),radial-gradient(circle_at_82%_16%,rgba(109,204,18,0.12),transparent_26%),linear-gradient(180deg,rgba(5,7,4,0.98)_0%,rgba(11,16,9,0.98)_52%,rgba(5,7,4,1)_100%)]" />
      <div className="pointer-events-none absolute inset-0 grid-overlay opacity-60" />
      <div className="pointer-events-none absolute left-[18%] top-16 h-40 w-40 rounded-full bg-[#51A70A]/12 blur-3xl" />
      <div className="pointer-events-none absolute right-[14%] top-24 h-48 w-48 rounded-full bg-[#6DCC12]/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-12 left-1/2 h-44 w-3/5 -translate-x-1/2 rounded-full bg-[#51A70A]/10 blur-3xl" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div
          className="glass mx-auto max-w-6xl rounded-[2rem] px-4 py-10 shadow-[0_30px_80px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.08)] sm:px-6 sm:py-12 lg:px-10 lg:py-14"
          style={{
            backdropFilter: "blur(14px)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mx-auto mb-12 max-w-3xl text-center"
          >
            <span className="font-mono text-xs font-medium uppercase tracking-widest text-[#8cef32]">
              Our Scale
            </span>
            <h2
              className="font-display mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl"
            >
              Numbers That <span className="text-[#8cef32] text-glow">Speak</span>
            </h2>
            <p
              className="mt-4 text-sm font-light leading-relaxed text-white/70 sm:text-base lg:text-white"
            >
              Performance markers that show how consistently our campaigns,
              partnerships, and admission systems create momentum.
            </p>
          </motion.div>

          <div className="mx-auto grid max-w-6xl gap-4 sm:gap-6 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: index * 0.08 }}
                className="group relative h-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.05] p-6 text-center shadow-[0_18px_40px_rgba(0,0,0,0.22)] glass transition-all duration-500 hover:-translate-y-1 hover:neon-glow sm:p-8"
              >
                <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
                <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-full bg-[#51A70A]/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative flex h-full flex-col items-center justify-center pt-2">
                  <span className="font-mono text-xs font-medium uppercase tracking-widest text-[#8cef32]">
                    {stat.eyebrow}
                  </span>

                  <div className="mt-4 flex min-h-[4.5rem] items-center justify-center sm:min-h-[5.5rem]">
                    <AnimatedCounter
                      target={stat.value}
                      inView={inView}
                      format={stat.format}
                    />
                  </div>

                  <div className="mt-3 flex min-h-[3.5rem] items-center justify-center">
                    <p
                      className="font-display text-sm font-medium text-white"
                    >
                      {stat.label}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center gap-2 text-xs text-white/65">
                    <span>Live Momentum</span>
                    <ArrowUpRight
                      className="h-4 w-4"
                      style={{ color: "#8cef32" }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
