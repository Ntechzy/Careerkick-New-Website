"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const mistakes = [
  {
    number: "01",
    title: "Registering on the Wrong Counselling Portal",
    detail:
      "Applying through an incorrect or unauthorized portal can lead to disqualification.",
    icon: "portal",
  },
  {
    number: "02",
    title: "Lack of Awareness of Counselling Rules & Guidelines",
    detail: "Not understanding official regulations may result in critical errors.",
    icon: "rules",
  },
  {
    number: "03",
    title: "Uploading Incorrect, Blurred, or Fake Documents",
    detail: "Improper documentation can lead to rejection during verification.",
    icon: "document",
  },
  {
    number: "04",
    title: "Confusion Between All India Quota and State Quota",
    detail:
      "Misunderstanding AIQ 15% and State Quota 85% can affect your chances significantly.",
    icon: "quota",
  },
  {
    number: "05",
    title: "Missing Important Mop-Up Round Rules",
    detail:
      "Overlooking key rules can lead to last-minute seat losses or missed opportunities.",
    icon: "clock",
  },
  {
    number: "06",
    title: "Lack of Clarity on Withdrawal & Resignation Policies",
    detail:
      "Misunderstanding these rules may result in forfeiture of security deposits.",
    icon: "policy",
  },
];

const mistakeOrbitPositions = [
  { top: "4%", left: "50%" },
  { top: "24%", left: "84%" },
  { top: "62%", left: "88%" },
  { top: "92%", left: "50%" },
  { top: "62%", left: "12%" },
  { top: "24%", left: "16%" },
];

const containerVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut", staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

export function CounsellingMistakesSection() {
  const [showNumber, setShowNumber] = useState(false);
  const [activeMistakeIndex, setActiveMistakeIndex] = useState(0);
  const phoneNumber = "+919198350985";
  const activeMistake = mistakes[activeMistakeIndex] ?? mistakes[0];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveMistakeIndex((current) => (current + 1) % mistakes.length);
    }, 3200);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-base px-3 py-12 text-white sm:px-4 sm:py-14 md:px-8 md:py-20">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-red-500/12 blur-[120px]"
        animate={{ x: [0, 16, 0], y: [0, -12, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-36 bottom-10 h-[440px] w-[440px] rounded-full bg-cyan/10 blur-[140px]"
        animate={{ x: [0, -16, 0], y: [0, 14, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-gradient-glow opacity-35 blur-3xl" />
      <div className="grid-overlay pointer-events-none absolute inset-0 opacity-60" />

      <div className="relative mx-auto max-w-7xl">
        <ScrollReveal>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="relative overflow-hidden rounded-[26px] border border-white/10 bg-[#050704] shadow-[0_30px_100px_rgba(0,0,0,0.45)] sm:rounded-[32px]"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_12%,rgba(239,68,68,0.24),transparent_28%),radial-gradient(circle_at_12%_82%,rgba(245,158,11,0.13),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.08)_0%,transparent_35%,rgba(239,68,68,0.08)_100%)]" />
            <div className="grid-overlay pointer-events-none absolute inset-0 opacity-15" />

            <motion.div
              aria-hidden="true"
              className="absolute -right-10 top-10 h-28 w-28 rounded-full border border-red-400/20 bg-white/[0.03] backdrop-blur-md"
              animate={{ y: [0, -8, 0], rotate: [0, 8, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              aria-hidden="true"
              className="absolute right-16 top-28 h-4 w-4 rounded-full bg-red-400 shadow-[0_0_28px_rgba(248,113,113,0.6)]"
              animate={{ scale: [1, 1.45, 1], opacity: [0.65, 1, 0.65] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="pointer-events-none absolute -bottom-6 -left-4 select-none font-display text-[4.5rem] font-black leading-none text-white/[0.035] sm:-bottom-10 sm:-left-7 sm:text-[8rem] md:-bottom-14 md:text-[12rem] lg:text-[15rem]">
              ALERT
            </div>

            <div className="relative z-10 grid gap-9 p-4 sm:gap-10 sm:p-7 md:p-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-12 lg:p-12 xl:p-14">
              <motion.div variants={itemVariants} className="flex flex-col items-start">
                <motion.div
                  className="inline-flex rounded-full border border-red-400/35 bg-red-500/10 px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-red-200 shadow-sm backdrop-blur-xl sm:text-xs"
                  animate={{
                    boxShadow: [
                      "0 0 0 rgba(239,68,68,0)",
                      "0 0 24px rgba(239,68,68,0.18)",
                      "0 0 0 rgba(239,68,68,0)",
                    ],
                  }}
                  transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
                >
                  Avoid seat loss
                </motion.div>

                <h2 className="mt-5 max-w-2xl font-display text-2xl font-bold leading-[1.06] tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
                  <span className="text-white">One counselling mistake can</span>
                  <motion.span
                    className="block bg-gradient-brand bg-clip-text pb-1 text-transparent"
                    animate={{ backgroundPositionX: ["0%", "100%", "0%"] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    style={{ backgroundSize: "200% 100%" }}
                  >
                    cost you a seat.
                  </motion.span>
                </h2>

                <p className="mt-5 max-w-xl text-sm font-medium leading-relaxed text-white/75 sm:text-base lg:text-white">
                  UG medical counselling is rule-heavy. One wrong portal,
                  document, quota choice, or round decision can change the entire
                  allotment outcome.
                </p>

                <div className="mt-7 grid w-full max-w-xl grid-cols-1 gap-3 sm:grid-cols-2">
                  <StatPill label="6 common errors" value="Watch for" />
                  <StatPill label="Seat safety" value="Stronger checks" />
                </div>

                <div className="mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                  <motion.a
                    href={`tel:${phoneNumber}`}
                    className="inline-flex w-full items-center justify-center rounded-full bg-gradient-brand px-6 py-4 font-display text-base font-bold text-white shadow-[0_18px_44px_rgba(81,167,10,0.24)] transition-shadow hover:shadow-glow-violet focus-visible:shadow-[0_0_0_2px_#51A70A,0_0_0_6px_#050704] sm:w-auto"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Book Free Call
                  </motion.a>

                  <div
                    className="relative w-full sm:w-auto"
                    onMouseEnter={() => setShowNumber(true)}
                    onMouseLeave={() => setShowNumber(false)}
                    onFocus={() => setShowNumber(true)}
                    onBlur={() => setShowNumber(false)}
                  >
                    <motion.a
                      href={`tel:${phoneNumber}`}
                      className="inline-flex w-full items-center justify-center rounded-full border border-white/12 bg-white/[0.06] px-6 py-4 font-display text-base font-bold text-white backdrop-blur-xl transition-colors hover:border-[#51A70A]/40 hover:bg-white/[0.1] sm:w-auto"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Call Expert
                    </motion.a>

                    <motion.div
                      initial={false}
                      animate={
                        showNumber
                          ? { opacity: 1, y: 0, scale: 1 }
                          : { opacity: 0, y: 10, scale: 0.96 }
                      }
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="pointer-events-none absolute left-1/2 top-full z-20 mt-3 w-max -translate-x-1/2"
                    >
                      <div className="rounded-2xl border border-white/10 bg-[#0d1d09]/95 px-4 py-3 shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8cef32]">
                          Call now
                        </p>
                        <p className="mt-1 font-display text-lg font-bold tracking-[0.12em] text-white">
                          {phoneNumber}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="relative flex min-h-[430px] items-center justify-center sm:min-h-[500px] lg:min-h-[540px] lg:justify-end"
              >
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-[82%] w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/10 blur-[80px]" />

                <motion.div
                  className="relative w-full max-w-[460px]"
                  whileHover={{ y: -8, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 220, damping: 18 }}
                >
                  <div className="relative overflow-hidden rounded-[26px] border border-white/12 bg-white/[0.06] p-3 shadow-[0_28px_90px_rgba(0,0,0,0.38)] backdrop-blur-2xl sm:rounded-[32px] sm:p-5">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(248,113,113,0.18),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.08),transparent)]" />

                    <div className="relative rounded-[22px] border border-white/10 bg-black/35 p-3 sm:rounded-[26px] sm:p-6">
                      <div className="mb-4 flex items-center justify-between gap-3 sm:mb-5">
                        <div>
                          <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.22em] text-red-200 sm:text-[10px] sm:tracking-[0.24em]">
                            Risk radar
                          </p>
                          <p className="mt-1 font-display text-lg font-bold text-white sm:text-2xl">
                            Counselling audit
                          </p>
                        </div>
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-amber/25 bg-amber/10 font-display text-xl font-black text-amber sm:h-11 sm:w-11 sm:text-2xl">
                          !
                        </span>
                      </div>

                      <div className="relative mx-auto flex min-h-[330px] w-full max-w-[300px] items-center justify-center sm:min-h-[390px] sm:max-w-[340px]">
                        <motion.div
                          className="absolute inset-0 rounded-full border border-red-400/15"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.div
                          className="absolute inset-[10%] rounded-full border border-dashed border-white/14"
                          animate={{ rotate: -360 }}
                          transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.div
                          className="absolute inset-[22%] rounded-full border border-red-400/20 bg-red-500/5"
                          animate={{ scale: [1, 1.04, 1] }}
                          transition={{
                            duration: 3.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />

                        {mistakes.map((mistake, index) => {
                          const active = index === activeMistakeIndex;
                          const position = mistakeOrbitPositions[index];

                          return (
                            <motion.button
                              key={mistake.number}
                              type="button"
                              onClick={() => setActiveMistakeIndex(index)}
                              className={`absolute z-20 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-[9px] font-black transition-all duration-300 sm:h-10 sm:w-10 sm:text-[10px] ${
                                active
                                  ? "border-red-200/70 bg-red-500 text-white shadow-[0_0_24px_rgba(248,113,113,0.34)]"
                                  : "border-white/10 bg-white/[0.08] text-white/60 backdrop-blur-xl hover:border-red-300/45 hover:text-white"
                              }`}
                              style={{
                                top: position.top,
                                left: position.left,
                              }}
                              animate={active ? { scale: [1, 1.12, 1] } : { scale: 1 }}
                              transition={{
                                duration: 1.4,
                                repeat: active ? Infinity : 0,
                                ease: "easeInOut",
                              }}
                              aria-label={`Show mistake ${mistake.number}`}
                            >
                              {mistake.number}
                            </motion.button>
                          );
                        })}

                        <AnimatePresence mode="wait">
                          <motion.div
                            key={activeMistake.number}
                            initial={{ opacity: 0, y: 18, scale: 0.94 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -18, scale: 0.94 }}
                            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                            className="relative z-30 w-full max-w-[220px] rounded-[24px] border border-red-300/18 bg-[#160707]/95 p-3 text-center shadow-[0_24px_70px_rgba(0,0,0,0.42)] backdrop-blur-2xl sm:max-w-[270px] sm:rounded-[28px] sm:p-5"
                          >
                            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-2xl border border-red-300/25 bg-red-500/12 text-red-200 shadow-inner sm:h-14 sm:w-14">
                              <MistakeIcon name={activeMistake.icon} />
                            </div>

                            <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-red-300/18 bg-red-500/10 px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-red-200 sm:mt-4 sm:px-3 sm:text-[10px] sm:tracking-[0.2em]">
                              <CrossIcon />
                              Mistake {activeMistake.number}
                            </div>

                            <h4 className="mt-3 font-display text-sm font-bold leading-snug text-white sm:mt-4 sm:text-lg">
                              {activeMistake.title}
                            </h4>

                            <p className="mt-2 text-[11px] font-medium leading-relaxed text-white/68 sm:mt-3 sm:text-sm">
                              {activeMistake.detail}
                            </p>
                          </motion.div>
                        </AnimatePresence>
                      </div>

                      <div className="mt-4 flex items-center justify-center gap-2 sm:mt-5">
                        {mistakes.map((mistake, index) => {
                          const active = index === activeMistakeIndex;

                          return (
                            <button
                              key={`dot-${mistake.number}`}
                              type="button"
                              onClick={() => setActiveMistakeIndex(index)}
                              className={`h-2 rounded-full transition-all duration-300 ${
                                active
                                  ? "w-8 bg-red-400"
                                  : "w-2 bg-white/20 hover:bg-red-200/50"
                              }`}
                              aria-label={`Go to mistake ${mistake.number}`}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <motion.div
      className="rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-3 shadow-sm backdrop-blur-xl"
      whileHover={{ y: -3, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
    >
      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8cef32]">
        {label}
      </div>
      <div className="mt-1 font-display text-sm font-bold text-white">{value}</div>
    </motion.div>
  );
}

function CrossIcon() {
  return (
    <svg
      className="h-3.5 w-3.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function MistakeIcon({ name }: { name: string }) {
  const common = "h-5 w-5 sm:h-6 sm:w-6";

  switch (name) {
    case "portal":
      return (
        <svg
          className={common}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="4" width="18" height="14" rx="2" />
          <path d="M8 21h8" />
          <path d="M12 18v3" />
          <path d="m9 9 6 6" />
          <path d="m15 9-6 6" />
        </svg>
      );
    case "rules":
      return (
        <svg
          className={common}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4 19.5V5a2 2 0 0 1 2-2h11" />
          <path d="M6 17h12a2 2 0 0 1 0 4H6a2 2 0 0 1 0-4Z" />
          <path d="M9 7h6" />
          <path d="M9 11h4" />
        </svg>
      );
    case "document":
      return (
        <svg
          className={common}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
          <path d="M14 2v6h6" />
          <path d="m9 14 6 6" />
          <path d="m15 14-6 6" />
        </svg>
      );
    case "quota":
      return (
        <svg
          className={common}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 3v18" />
          <path d="M5 7h14" />
          <path d="m6 7-3 6h6Z" />
          <path d="m18 7-3 6h6Z" />
        </svg>
      );
    case "clock":
      return (
        <svg
          className={common}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
          <path d="m17 3 2 2" />
        </svg>
      );
    default:
      return (
        <svg
          className={common}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 21s7-4 7-11V5l-7-3-7 3v5c0 7 7 11 7 11Z" />
          <path d="M9 12h6" />
          <path d="M12 9v6" />
        </svg>
      );
  }
}
