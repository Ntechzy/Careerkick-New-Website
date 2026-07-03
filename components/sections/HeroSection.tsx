"use client";

import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { GradientText } from "@/components/ui/GradientText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { charVariant, containerVariant, fadeInVariant } from "@/lib/animations";

const heading = ["Careerkick", "Shape Your Medical Future"];
const rows = [
  ["2022", "5,000+", "students", "received", "guidance"],
  ["2023", "7,000+", "students", "received", "guidance"],
  ["2024", "9,000+", "students", "received", "guidance"],
  ["2025", "12,000+", "students", "received", "guidance"],
];

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-base px-4 pb-20 pt-24 sm:pb-24 sm:pt-28 md:px-8 md:pt-32">
      <AuroraBackground />
      <div className="grid-overlay absolute inset-0 opacity-80" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-12 xl:gap-16">
        <div className="relative z-20 mx-auto max-w-3xl min-w-0 text-center lg:mx-0 lg:max-w-none lg:text-left">
          <motion.h1
            className="mt-4 font-display text-4xl font-bold leading-[1.15] tracking-normal text-white sm:text-5xl md:mt-7 md:text-6xl lg:text-7xl xl:text-8xl"
            variants={containerVariant}
            initial="hidden"
            animate="visible"
          >
            {heading.map((line, lineIndex) => (
              <span key={line} className="block">
                {line.split("").map((char, index) => {
                  if (char === " ") {
                    return <span key={`${line}-${index}`}> </span>;
                  }

                  const highlighted =
                    (lineIndex === 0 && index >= 6) ||
                    (lineIndex === 1 && index >= 9);
                  return (
                    <motion.span
                      key={`${line}-${index}`}
                      variants={charVariant}
                      className={
                        highlighted
                          ? "bg-gradient-brand bg-clip-text text-transparent"
                          : undefined
                      }
                    >
                      {char}
                    </motion.span>
                  );
                })}
              </span>
            ))}
          </motion.h1>

          <p
            className="relative z-30 mx-auto mt-5 max-w-2xl text-sm font-semibold leading-relaxed sm:text-base md:mt-7 md:text-lg lg:mx-0 lg:max-w-xl lg:text-xl xl:max-w-2xl"
            style={{
              color: "#FFFFFF",
              opacity: 1,
              textShadow: "0 2px 12px rgba(0, 0, 0, 0.9)",
              mixBlendMode: "normal",
            }}
          >
            Expert NEET counselling for MBBS in India with accurate college
            prediction, personalized guidance, and complete admission support
            for your NEET 2026 journey.
          </p>

          <motion.div
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
            initial="hidden"
            animate="visible"
            variants={fadeInVariant}
            transition={{ delay: 1.6 }}
          >
            <MagneticButton className="w-full px-8 py-4 font-display text-base sm:w-auto sm:text-lg">
              Book Free Call
            </MagneticButton>
            <a
              href="#platform"
              className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/80 transition-colors hover:text-white sm:w-auto"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
                Play
              </span>
              Watch Student Stories
            </a>
          </motion.div>

          <motion.p
            className="mt-8 font-body text-xs leading-relaxed text-white/60 sm:text-sm"
            initial="hidden"
            animate="visible"
            variants={fadeInVariant}
            transition={{ delay: 2 }}
          >
            Trusted by 1,20,000+ aspirants{" "}
            <span className="px-1.5 text-violet sm:px-2">/</span> 4.9/5 student
            rating <span className="px-1.5 text-violet sm:px-2">/</span>{" "}
            PAN-India admission support
          </motion.p>
        </div>

        <motion.div
          className="relative z-10 mx-auto w-full min-w-0 max-w-md animate-float lg:max-w-[540px]"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          <div className="absolute inset-x-4 -bottom-8 h-24 rounded-full bg-gradient-glow opacity-70 blur-3xl sm:inset-x-8 sm:-bottom-10 sm:h-32" />
          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-surface-2/80 p-4 shadow-elevated backdrop-blur-xl sm:p-5 md:p-6">
            <div className="mb-4 flex items-center justify-between gap-2 sm:mb-5 sm:gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-cyan sm:text-xs">
                  Careerkick
                </p>
                <p className="mt-0.5 text-xs text-white/80 sm:mt-1 sm:text-sm">
                  Students Guidance Data
                </p>
              </div>
              <div className="flex shrink-0 items-center rounded-full border border-cyan/30 bg-cyan/10 px-2.5 py-1 font-mono text-[10px] text-cyan sm:px-3 sm:text-xs">
                <span className="mr-1.5 inline-block h-1.5 w-1.5 shrink-0 animate-pulse-soft rounded-full bg-cyan sm:mr-2 sm:h-2 sm:w-2" />
                BEST guidance
              </div>
            </div>

            <div className="grid grid-cols-5 gap-1 border-b border-white/10 pb-2.5 font-mono text-[8px] uppercase tracking-widest text-white/60 sm:gap-3 sm:pb-3 sm:text-[10px]">
              <span>Year</span>
              <span>Students</span>
              <span>Profile</span>
              <span>Support</span>
              <span>Status</span>
            </div>

            <div className="space-y-1.5 pt-2.5 sm:space-y-2 sm:pt-3">
              {rows.map((row, index) => (
                <div
                  key={row.join("-")}
                  className="grid grid-cols-5 items-center gap-1 rounded-md border border-white/5 bg-white/[0.03] px-2 py-2.5 text-[9px] text-white/80 sm:gap-3 sm:px-3 sm:py-3 sm:text-xs [animation:heroDataFloat_10s_ease-in-out_infinite]"
                  style={{ animationDelay: `${index * 2}s` }}
                >
                  {row.map((cell) => (
                    <span key={cell} className="truncate">
                      {cell}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
