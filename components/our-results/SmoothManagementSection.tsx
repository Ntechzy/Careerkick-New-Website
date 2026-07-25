"use client";
import {
  Globe,
  Users,
  Handshake,
  IndianRupee,
  Flag,
  UserCheck,
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import { ReactNode, useRef } from "react";

const managementItems = [
  {
    title: "Ground Level Things",
    icon: UserCheck,
  },
  {
    title: "Making College A Brand (Complete Year)",
    icon: Flag,
  },
  {
    title: "Social Media Handling",
    icon: Globe,
  },
  {
    title: "Strategic Admission Support",
    icon: Users,
  },
  {
    title: "Coordinating With Students",
    icon: Handshake,
  },
  {
    title: "Admission & Fee Management",
    icon: IndianRupee,
  },
];

export default function SmoothManagementSection(): JSX.Element {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#f7faf4] px-4 py-16 text-slate-900 sm:py-20 md:px-8 md:py-24 lg:py-28">
      <motion.div
        className="pointer-events-none absolute left-1/2 top-14 h-32 w-[88%] -translate-x-1/2 rounded-full bg-[#51A70A]/10 blur-3xl sm:h-40 sm:w-[72%]"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="pointer-events-none absolute left-4 top-8 grid grid-cols-4 gap-2 opacity-20 sm:left-10 sm:top-12">
        {[...Array(24)].map((_, i) => (
          <div key={i} className="h-1 w-1 rounded-full bg-[#51A70A]" />
        ))}
      </div>
      <div className="pointer-events-none absolute bottom-10 right-4 grid grid-cols-4 gap-2 opacity-20 sm:bottom-16 sm:right-10">
        {[...Array(24)].map((_, i) => (
          <div key={i} className="h-1 w-1 rounded-full bg-[#51A70A]" />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center rounded-full border border-[#51A70A]/18 bg-[#51A70A]/10 px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[#367d07]">
            Execution Support
          </span>
          <h2 className="font-display mt-4 text-3xl font-bold leading-[1.08] tracking-normal text-slate-900 sm:text-4xl md:text-5xl lg:text-6xl">
            WE MAKE THINGS VERY{" "}
            <span className="bg-gradient-brand bg-clip-text text-transparent">
              SMOOTH
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm font-medium leading-relaxed text-slate-700 sm:text-base md:text-lg">
            We Appoint 3 - 4 Team Members (For Complete Year) In Each College We Partner
          </p>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-[#51A70A]/80 sm:mt-6 sm:text-base">
            Who Manages
          </p>
        </motion.div>

        <motion.div
          className="relative mx-auto mt-10 max-w-6xl sm:mt-16"
          initial={{ opacity: 0, y: 42 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="absolute bottom-3 left-4 top-3 w-px bg-gradient-to-b from-transparent via-[#51A70A]/30 to-transparent sm:left-8 lg:hidden"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={inView ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            style={{ transformOrigin: "top" }}
          />
          <motion.div
            className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#51A70A]/35 to-transparent lg:block"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={inView ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            style={{ transformOrigin: "top" }}
          />

          <div className="grid gap-3 sm:gap-5 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-6">
            {managementItems.map((item, index) => {
              const isLeft = index % 2 === 0;
              const ItemIcon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: isLeft ? -28 : 28, y: 20 }}
                  animate={
                    inView
                      ? { opacity: 1, x: 0, y: 0 }
                      : { opacity: 0, x: isLeft ? -18 : 18, y: 12 }
                  }
                  transition={{
                    duration: 0.55,
                    delay: 0.24 + index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`relative flex ${isLeft ? "lg:justify-end" : "lg:justify-start"}`}
                >
                  <motion.div
                    className="absolute left-4 top-1/2 h-px w-6 -translate-y-1/2 bg-[#51A70A]/35 sm:left-8 sm:w-8 lg:hidden"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={inView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
                    transition={{ duration: 0.4, delay: 0.32 + index * 0.08, ease: "easeOut" }}
                    style={{ transformOrigin: "left" }}
                  />
                  <motion.div
                    className={`absolute top-1/2 hidden h-px w-12 -translate-y-1/2 border-t border-dashed border-primary/35 lg:block ${
                      isLeft ? "right-[-3.2rem]" : "left-[-3.2rem]"
                    }`}
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={inView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
                    transition={{ duration: 0.4, delay: 0.32 + index * 0.08, ease: "easeOut" }}
                    style={{ transformOrigin: isLeft ? "right" : "left" }}
                  />
                  <div className="group relative ml-10 w-[calc(100%-2.5rem)] max-w-xl overflow-hidden rounded-[1.35rem] border border-[#51A70A]/15 bg-white p-3.5 text-slate-900 shadow-[0_20px_60px_rgba(15,23,42,0.06)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(15,23,42,0.10)] sm:ml-16 sm:w-[calc(100%-4rem)] sm:rounded-[1.75rem] sm:p-5 lg:ml-0 lg:w-full">
                    <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#51A70A]/60 to-transparent" />
                    <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-full bg-[#51A70A]/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                    <div
                      className={`relative flex items-start gap-3.5 sm:items-center sm:gap-5 ${
                        isLeft ? "lg:flex-row-reverse lg:text-right" : "lg:flex-row"
                      }`}
                    >
                      <IconBox>
                        <ItemIcon className="h-6 w-6 sm:h-7 sm:w-7" />
                      </IconBox>

                      <div className="flex-1">
                        <p className="font-display text-sm font-semibold leading-snug text-slate-900 sm:text-lg">
                          {item.title}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

type IconBoxProps = {
  children: ReactNode;
};

function IconBox({ children }: IconBoxProps): JSX.Element {
  return (
    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-[#51A70A]/20 bg-[#51A70A]/10 text-[#51A70A] sm:h-16 sm:w-16 sm:rounded-2xl">
      {children}
    </div>
  );
}
