"use client";

import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { charVariant, containerVariant, fadeInVariant } from "@/lib/animations";

const heading = ["Careerkick", "Shape Your Medical Future"];
const phoneNumber = "7393062116";
const studentStoryUrl = "https://youtube.com/shorts/MalUsmT9GHQ?si=UxgYdHj0FHgNRm_n";
const rows = [
  ["UR/EWS", "50th", "715-213", "9,96,935"],
  ["OBC", "40th", "212-177", "81,111"],
  ["SC", "40th", "212-177", "29,947"],
  ["ST", "40th", "212-177", "12,452"],
  ["UR/EWS-PwBD", "45th", "212-194", "480"],
  ["OBC-PwBD", "40th", "193-177", "185"],
  ["SC-PwBD", "40th", "193-177", "64"],
  ["ST-PwBD", "40th", "191-178", "11"],
];

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-base px-4 pb-20 pt-24 sm:pb-24 sm:pt-28 md:px-8 md:pt-32">
      <AuroraBackground />
      <div className="grid-overlay absolute inset-0 opacity-80" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-10">
        <div className="relative z-20 mx-auto max-w-5xl min-w-0 text-center">
          <motion.h1
            className="mt-4 font-display text-3xl font-bold leading-[1.15] tracking-normal text-white sm:text-4xl md:mt-7 md:text-5xl lg:text-6xl xl:text-7xl"
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
                    (lineIndex === 1 && index >= 11);
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
            className="relative z-30 mx-auto mt-5 max-w-3xl text-sm font-semibold leading-relaxed sm:text-base md:mt-7 md:text-lg lg:text-xl"
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
            className="relative z-30 mx-auto mt-6 flex w-full max-w-3xl justify-center"
            initial="hidden"
            animate="visible"
            variants={fadeInVariant}
            transition={{ delay: 1.35 }}
          >
            <div className="relative overflow-hidden rounded-full border border-[#51A70A]/35 bg-[#51A70A]/10 px-4 py-3 shadow-[0_0_42px_rgba(81,167,10,0.18)] backdrop-blur-xl sm:px-6">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <p className="relative text-center font-display text-sm font-semibold leading-relaxed text-white sm:text-base md:text-lg lg:text-white">
                On a mission to counsel{" "}
                <span className="font-bold text-[#8cef32] lg:text-[#8cef32]">
                  1 crore+ students
                </span>{" "}
                towards their dream medical college
              </p>
            </div>
          </motion.div>

          <motion.div
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
            initial="hidden"
            animate="visible"
            variants={fadeInVariant}
            transition={{ delay: 1.6 }}
          >
            <MagneticButton
              href={`tel:${phoneNumber}`}
              className="w-full px-8 py-4 font-display text-base sm:w-auto sm:text-lg"
            >
              Book Free Call
            </MagneticButton>
            <a
              href={studentStoryUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/80 transition-colors hover:text-white sm:w-auto"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
                Play
              </span>
              Watch Student Stories
            </a>
          </motion.div>

          <motion.div
            className="mt-8 flex flex-col items-center justify-center gap-3 font-body text-xs leading-relaxed text-white/70 sm:flex-row sm:flex-wrap sm:gap-4 sm:text-sm"
            initial="hidden"
            animate="visible"
            variants={fadeInVariant}
            transition={{ delay: 2 }}
          >
            <span className="inline-flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#51A70A]/30 bg-[#51A70A]/12 text-[#8cef32]">
                <TrustIcon name="users" />
              </span>
              Trusted by 1,00,0000+ aspirants
            </span>
            <span className="hidden h-4 w-px bg-white/18 sm:block" />
            <span className="inline-flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#51A70A]/30 bg-[#51A70A]/12 text-[#8cef32]">
                <TrustIcon name="star" />
              </span>
              4.9/5 student rating
            </span>
            <span className="hidden h-4 w-px bg-white/18 sm:block" />
            <span className="inline-flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#51A70A]/30 bg-[#51A70A]/12 text-[#8cef32]">
                <TrustIcon name="map" />
              </span>
              PAN-India admission support
            </span>
          </motion.div>
        </div>

        <motion.div
          className="relative z-10 mx-auto w-full min-w-0 max-w-5xl animate-float px-0 sm:px-4"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          <div className="overflow-hidden rounded-2xl border border-slate-500/20 bg-white/10 shadow-[0_24px_70px_rgba(81,167,10,0.18),0_8px_24px_rgba(81,167,10,0.1)] backdrop-blur-2xl backdrop-saturate-150">
            <div className="border-b border-white/8 bg-white/5 px-5 py-4 text-center sm:px-6">
              <h3 className="font-display text-sm font-bold leading-tight tracking-tight text-white sm:text-base lg:text-lg lg:text-white">
                Category-wise NEET UG Qualifying Marks
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] border-collapse text-left text-xs text-white/90 sm:text-sm">
                <thead>
                  <tr className="border-y border-slate-500/20 bg-gradient-to-r from-[#51A70A] to-[#3d8807] text-white">
                    <th className="px-5 py-3 font-display font-bold sm:px-6">Category</th>
                    <th className="whitespace-nowrap px-4 py-3 text-right font-display font-bold sm:px-6">Percentile</th>
                    <th className="whitespace-nowrap px-4 py-3 text-right font-display font-bold sm:px-6">Qualifying Marks</th>
                    <th className="whitespace-nowrap px-4 py-3 text-right font-display font-bold sm:px-6">Qualified Candidates</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-500/15">
                  {rows.map((row, index) => (
                    <tr
                      key={row.join("-")}
                      className={
                        index % 2 === 1
                          ? "bg-white/[0.08] hover:bg-white/[0.12]"
                          : "bg-white/[0.04] hover:bg-white/[0.08]"
                      }
                    >
                      {row.map((cell, cellIndex) => (
                        <td
                          key={`${row[0]}-${cell}`}
                          className={
                            cellIndex === 0
                              ? "px-5 py-3 font-semibold text-white sm:px-6"
                              : "whitespace-nowrap px-4 py-3 text-right font-semibold text-white/90 sm:px-6"
                          }
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TrustIcon({ name }: { name: "users" | "star" | "map" }) {
  const common = "h-4 w-4";

  if (name === "users") {
    return (
      <svg
        className={common}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    );
  }

  if (name === "star") {
    return (
      <svg
        className={common}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" />
      </svg>
    );
  }

  return (
    <svg
      className={common}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 21s7-5.2 7-12a7 7 0 0 0-14 0c0 6.8 7 12 7 12Z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

