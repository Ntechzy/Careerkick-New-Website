"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { GradientText } from "@/components/ui/GradientText";
import { GlassCard } from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";
import { faqItems } from "@/data/faq";
import { CONTACT_NUMBERS, getTelLink } from "@/lib/contactLinks";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);
  const [contactOpen, setContactOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <section id="faq" className="relative overflow-hidden bg-base px-4 py-section-mobile md:px-8 md:py-section">
      <div className="absolute -left-32 top-16 h-80 w-80 rounded-full bg-violet/10 blur-[120px]" />
      <div className="absolute -right-24 top-24 h-96 w-96 rounded-full bg-cyan/10 blur-[130px]" />
      <div className="grid-overlay absolute inset-0 opacity-60" />

      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <ScrollReveal className="max-w-xl">
          <SectionLabel>Frequently Asked Questions</SectionLabel>
          <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            <GradientText>Questions</GradientText> families ask before counselling starts.
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-text-muted sm:text-lg">
            Careerkick keeps the process calm for students and parents. These answers cover counselling flow, course options, documents, portal support and what happens after allotment.
          </p>

          <GlassCard className="mt-10 overflow-hidden border-white/10 bg-surface-2/80 p-5 shadow-elevated backdrop-blur-xl sm:p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-violet/15 text-2xl text-violet-glow">
                ?
              </div>
              <div className="min-w-0">
                <p className="font-display text-2xl font-semibold text-white">You have different questions?</p>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/70 sm:text-base lg:text-white">
                  Our team will answer your questions and help you understand the next step clearly.
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan/15 text-cyan">•</div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet/15 text-violet-glow">?</div>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <button
              type="button"
              onClick={() => setContactOpen((value) => !value)}
              className="mt-6 inline-flex w-full items-center justify-center rounded-full border border-[#51A70A]/20 bg-gradient-brand px-5 py-3.5 text-center text-sm font-semibold text-white shadow-glow-violet transition-transform duration-300 hover:-translate-y-0.5"
              aria-expanded={contactOpen}
              aria-controls="faq-contact-drawer"
            >
              Contact us
            </button>

            <AnimatePresence initial={false}>
              {contactOpen && (
                <motion.div
                  id="faq-contact-drawer"
                  initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.24, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <a
                      href={getTelLink(CONTACT_NUMBERS.primaryDigits)}
                      className="inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:border-[#51A70A]/35 hover:bg-[#51A70A]/10"
                    >
                      {CONTACT_NUMBERS.primaryDisplay}
                    </a>
                    <a
                      href={getTelLink(CONTACT_NUMBERS.secondaryDigits)}
                      className="inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:border-[#51A70A]/35 hover:bg-[#51A70A]/10"
                    >
                      {CONTACT_NUMBERS.secondaryDisplay}
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="space-y-3">
            {faqItems.map((item, index) => {
              const isOpen = index === openIndex;

              return (
                <GlassCard
                  key={item.question}
                  className={cn(
                    "overflow-hidden border-white/10 bg-surface-2/80 backdrop-blur-xl transition-all duration-300",
                    isOpen && "border-violet/30 shadow-elevated"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(index)}
                    className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-5"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                  >
                    <span className="font-display text-base font-semibold leading-snug text-white sm:text-lg">
                      {item.question}
                    </span>
                    <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition-transform duration-300", isOpen && "rotate-180")}>
                      <ChevronIcon />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-panel-${index}`}
                        role="region"
                        aria-label={item.question}
                        initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                        animate={reduceMotion ? { height: "auto", opacity: 1 } : { height: "auto", opacity: 1 }}
                        exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-5 sm:px-5">
                          <div className="h-px w-full bg-white/10" />
                          <p className="mt-4 text-sm leading-relaxed text-white/72 sm:text-base lg:text-white">
                            {item.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </GlassCard>
              );
            })}

          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

