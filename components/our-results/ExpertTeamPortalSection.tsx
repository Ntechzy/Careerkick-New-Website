"use client";

import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Monitor, Users } from "lucide-react";
import { useRef } from "react";

export default function ExpertTeamPortalSection(): JSX.Element {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-120px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.6,
  });
  const haloY = useTransform(smoothProgress, [0, 1], [40, -40]);
  const haloScale = useTransform(smoothProgress, [0, 1], [0.95, 1.05]);
  const cardY = useTransform(smoothProgress, [0, 1], [30, -30]);
  const imageY = useTransform(smoothProgress, [0, 1], [18, -18]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-base px-4 py-20 text-white lg:py-28"
    >
      <motion.div
        className="pointer-events-none absolute left-1/2 top-8 h-44 w-[84%] -translate-x-1/2 rounded-full blur-3xl"
          style={{
          background: "rgba(81,167,10,0.12)",
          y: haloY,
          scale: haloScale,
        }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="pointer-events-none absolute right-6 top-16 h-36 w-36 rounded-full blur-3xl"
        style={{ background: "rgba(81,167,10,0.08)" }}
        animate={{ y: [0, -16, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-10 left-8 h-28 w-28 rounded-full blur-3xl"
        style={{ background: "rgba(81,167,10,0.07)" }}
        animate={{ y: [0, 18, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center rounded-full border border-[#51A70A]/30 bg-[#51A70A]/10 px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[#8cef32]">
            People & Platform
          </span>
          <h2 className="font-display mt-4 text-3xl font-bold leading-[1.08] tracking-normal text-white sm:text-4xl md:text-5xl lg:text-6xl">
            Built by <span className="text-[#8cef32] text-glow">300+ Experts</span>,
            powered by our LMS.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm font-medium leading-relaxed text-white/70 sm:text-base lg:text-white">
            A dedicated team and a single portal that keeps every workflow aligned.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-10">
          <motion.article
            className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05] p-8 shadow-[0_18px_40px_rgba(0,0,0,0.24)] glass transition-all duration-500 hover:-translate-y-2"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.01 }}
            style={{ y: cardY }}
          >
            <div
              className="absolute right-6 top-6 h-20 w-20 rounded-full blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: "rgba(81,167,10,0.18)" }}
            />
            <div className="flex items-center gap-4">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#51A70A]/25 bg-[#51A70A]/10 text-[#8cef32]"
              >
                <Users className="h-6 w-6" />
              </div>
              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-[#8cef32]">
                  Expert Force
                </p>
                <p className="font-display text-3xl font-semibold text-white sm:text-4xl">
                  Team of 300+ experts
                </p>
              </div>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-white/70 sm:text-base lg:text-white">
              Specialists across admissions, marketing, counseling, and operations work in
              sync to deliver consistent outcomes.
            </p>
            <motion.div
              className="mt-6 grid gap-3 sm:grid-cols-3"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
              transition={{ duration: 0.6, delay: 0.24 }}
            >
              {["Admissions", "Marketing", "Operations"].map((pill) => (
                <div
                  key={pill}
                  className="rounded-2xl border border-[#51A70A]/15 bg-white/[0.05] px-4 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#8cef32]"
                >
                  {pill}
                </div>
              ))}
            </motion.div>
          </motion.article>

          <motion.article
            className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 shadow-[0_18px_40px_rgba(0,0,0,0.24)] glass transition-all duration-500 hover:-translate-y-2 sm:p-8"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.01 }}
          >
            <div
              className="absolute left-6 top-6 h-20 w-20 rounded-full blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: "rgba(81,167,10,0.18)" }}
            />
            <div className="mb-5 flex items-center gap-3">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#51A70A]/25 bg-[#51A70A]/10 text-[#8cef32]"
              >
                <Monitor className="h-5 w-5" />
              </div>
              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-[#8cef32]">
                  LMS Portal
                </p>
                <p className="font-display text-lg font-semibold text-white">
                  Manage everything in one place
                </p>
              </div>
            </div>

            <motion.div
              className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-black/20 shadow-[0_20px_40px_rgba(0,0,0,0.28)] glass"
              style={{ y: imageY }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.img
                src="https://res.cloudinary.com/dhlqc0ymy/image/upload/v1784108935/desktop_hyosq2.png"
                alt="LMS portal dashboard preview"
                className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                onError={(event) => {
                  event.currentTarget.src = "/logo-bg.png";
                  event.currentTarget.className = "h-full w-full bg-[#050704] object-contain object-center p-8 transition-transform duration-700 group-hover:scale-[1.03]";
                }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/10" />
            </motion.div>

            <p className="mt-5 text-sm leading-relaxed text-white/70 sm:text-base lg:text-white">
              This is our LMS portal for managing admissions, student communication, and
              performance reporting through one unified system.
            </p>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
