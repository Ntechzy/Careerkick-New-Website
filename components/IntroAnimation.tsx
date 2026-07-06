"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const particles = [
  { x: "12%", y: "24%", size: 3, delay: 0.05 },
  { x: "22%", y: "72%", size: 2, delay: 0.25 },
  { x: "37%", y: "18%", size: 2, delay: 0.38 },
  { x: "64%", y: "78%", size: 3, delay: 0.18 },
  { x: "78%", y: "22%", size: 2, delay: 0.32 },
  { x: "88%", y: "64%", size: 3, delay: 0.46 },
];

export function IntroAnimation() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = previousOverflow;
    }, reduceMotion ? 850 : 2700);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
    };
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[999] grid place-items-center overflow-hidden bg-base text-white"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.025,
            filter: "blur(12px)",
            transition: { duration: 0.9, ease: [0.19, 1, 0.22, 1] },
          }}
          aria-label="Careerkick intro animation"
        >
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(109,204,18,0.22),transparent_30%),radial-gradient(circle_at_16%_16%,rgba(255,209,92,0.09),transparent_28%),radial-gradient(circle_at_84%_76%,rgba(140,160,255,0.1),transparent_32%)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
          />

          <div className="grid-overlay absolute inset-0 opacity-40 [mask-image:radial-gradient(circle_at_center,black,transparent_70%)]" />

          <motion.div
            className="absolute left-1/2 top-1/2 h-[min(88vw,560px)] w-[min(88vw,560px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet/15 shadow-[inset_0_0_70px_rgba(81,167,10,0.14),0_0_100px_rgba(81,167,10,0.12)]"
            initial={{ scale: 0.78, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
          />

          {particles.map((particle) => (
            <motion.span
              key={`${particle.x}-${particle.y}`}
              className="absolute rounded-full bg-violet-glow shadow-[0_0_22px_rgba(109,204,18,0.65)]"
              style={{
                left: particle.x,
                top: particle.y,
                width: particle.size,
                height: particle.size,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={
                reduceMotion
                  ? { opacity: 0.55, scale: 1 }
                  : {
                      opacity: [0, 0.75, 0.35],
                      scale: [0.6, 1.25, 0.9],
                      y: [-4, 8, -2],
                    }
              }
              transition={{
                delay: particle.delay,
                duration: reduceMotion ? 0.2 : 3.8,
                repeat: reduceMotion ? 0 : Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
            />
          ))}

          <motion.div
            className="absolute left-1/2 top-1/2 h-[min(72vw,430px)] w-[min(72vw,430px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_0deg,transparent,rgba(109,204,18,0.48),transparent_34%,rgba(255,209,92,0.22),transparent_62%)] blur-sm"
            initial={{ opacity: 0, rotate: -80, scale: 0.82 }}
            animate={reduceMotion ? { opacity: 0.5, scale: 1 } : { opacity: 0.65, rotate: 280, scale: 1 }}
            transition={{ duration: reduceMotion ? 0.4 : 2.4, ease: [0.19, 1, 0.22, 1] }}
          />

          <motion.div
            className="relative z-10 flex w-full max-w-[600px] flex-col items-center px-6 text-center"
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.18, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          >

            <motion.div
              className="relative mt-7 overflow-hidden"
              initial={{ clipPath: "inset(0 50% 0 50%)" }}
              animate={{ clipPath: "inset(0 0% 0 0%)" }}
              transition={{ delay: 0.72, duration: 0.95, ease: [0.19, 1, 0.22, 1] }}
            >
              <Image
                src="/logo-bg.png"
                alt="Careerkick"
                width={1000}
                height={250}
                priority
                className="h-auto w-[min(72vw,390px)] object-contain"
              />
              <motion.span
                className="absolute inset-y-0 left-0 w-16 -skew-x-12 bg-white/30 blur-md"
                initial={{ x: "-120%" }}
                animate={{ x: "760%" }}
                transition={{ delay: 1.05, duration: 0.85, ease: "easeInOut" }}
              />
            </motion.div>

            <motion.p
              className="mt-5 max-w-md font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-text-muted sm:text-xs"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.5 }}
            >
              Admission guidance starts here
            </motion.p>

            <div className="mt-7 h-1.5 w-full max-w-xs overflow-hidden rounded-full border border-white/10 bg-white/[0.05]">
              <motion.div
                className="h-full rounded-full bg-gradient-brand shadow-[0_0_24px_rgba(109,204,18,0.75)]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.9, duration: reduceMotion ? 0.35 : 1.25, ease: [0.19, 1, 0.22, 1] }}
              />
            </div>
          </motion.div>

          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-base via-base/75 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          />

          <motion.div
            className="absolute inset-y-0 right-0 w-1/2 bg-base"
            initial={{ x: "0%" }}
            animate={{ x: "105%" }}
            transition={{ delay: 1.95, duration: 0.72, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="absolute inset-y-0 left-0 w-1/2 bg-base"
            initial={{ x: "0%" }}
            animate={{ x: "-105%" }}
            transition={{ delay: 1.95, duration: 0.72, ease: [0.76, 0, 0.24, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
