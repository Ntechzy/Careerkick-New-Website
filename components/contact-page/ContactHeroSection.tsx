"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SOCIAL_LINKS } from "@/lib/contactLinks";

const stats = [
  {
    label: "Admissions support",
    href: "tel:+917393062116",
    ariaLabel: "Call Careerkick admissions support at 7393062116",
  },
  {
    label: "Office visits",
    href: "https://maps.app.goo.gl/gSmSq3VtVXv9mLib8",
    ariaLabel: "Open Careerkick office location in Google Maps",
    external: true,
  },
  {
    label: "Social media reach",
    href: SOCIAL_LINKS.instagram,
    ariaLabel: "Open Careerkick Instagram page",
    external: true,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 26, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export function ContactHeroSection() {
  return (
    <section className="relative overflow-hidden bg-base px-4 pb-10 pt-28 sm:pb-14 md:px-8 md:pt-32 lg:pb-16">
      <div className="pointer-events-none absolute -left-28 top-14 h-80 w-80 rounded-full bg-[#51A70A]/12 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 top-20 h-96 w-96 rounded-full bg-[#6DCC12]/10 blur-[130px]" />
      <div className="grid-overlay absolute inset-0 opacity-70" />

      <div className="relative mx-auto max-w-7xl">
        <ScrollReveal className="mx-auto max-w-4xl text-center">
          <span className="inline-flex rounded-full border border-[#51A70A]/30 bg-[#51A70A]/10 px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.24em] text-[#8cef32]">
            Contact
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold leading-[1.02] tracking-normal text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Contact{" "}
            <span className="text-[#8cef32] text-glow">Careerkick</span>{" "}
            Today!!
          </h1>
          <p className="relative z-20 mx-auto mt-5 max-w-3xl text-sm font-medium leading-relaxed text-white sm:text-base md:text-lg lg:text-white">
            Reach the team for admissions guidance, form submissions, office
            visits, and social channels that stay close to your counselling
            journey.
          </p>
        </ScrollReveal>

        <motion.div
          className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-3 sm:gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
          }}
        >
          {stats.map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
              aria-label={item.ariaLabel}
              variants={fadeUp}
              className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 text-center font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white/76 backdrop-blur-xl transition-colors hover:border-[#51A70A]/45 hover:bg-[#51A70A]/12 hover:text-white focus-visible:border-[#51A70A]/55 sm:text-xs"
            >
              {item.label}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
