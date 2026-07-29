"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";
import { faqItems } from "@/data/faq";
import { CONTACT_NUMBERS, getTelLink } from "@/lib/contactLinks";


export function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);
  const [contactOpen, setContactOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <section id="faq" className="relative overflow-hidden bg-base px-3 py-16 sm:px-4 sm:py-20 md:px-8 lg:py-28">
      <div className="absolute -left-32 top-16 h-80 w-80 rounded-full bg-violet/10 blur-[120px]" />
      <div className="absolute -right-24 top-24 h-96 w-96 rounded-full bg-cyan/10 blur-[130px]" />
      <div className="grid-overlay absolute inset-0 opacity-60" />

      <div className="relative mx-auto grid max-w-7xl items-start gap-8 sm:gap-10 lg:grid-cols-[minmax(300px,0.82fr)_minmax(0,1.18fr)] lg:gap-14 xl:gap-16">
        <ScrollReveal className="mx-auto flex w-full max-w-md flex-col items-center lg:mx-0 lg:max-w-none lg:items-start">
          <div className="relative aspect-[4/3] w-full max-w-[240px] sm:max-w-[300px] md:max-w-[340px] lg:max-w-[360px]">
            <Image
              src="https://res.cloudinary.com/dhlqc0ymy/image/upload/v1785259106/131-1317456_faq-icon-removebg-preview_ivkwuy.png"
              alt="Careerkick FAQ"
              fill
              sizes="(min-width: 1024px) 360px, (min-width: 640px) 300px, 240px"
              className="object-contain drop-shadow-[0_30px_70px_rgba(0,0,0,0.42)]"
            />
          </div>

          <GlassCard className="mt-6 w-full overflow-hidden border-white/10 bg-surface-2/80 p-4 shadow-elevated backdrop-blur-xl sm:mt-8 sm:p-6 lg:mt-10">
            <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:text-left">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-violet/15 text-xl text-violet-glow sm:h-14 sm:w-14 sm:text-2xl">
                ?
              </div>
              <div className="min-w-0">
                <p className="font-display text-xl font-semibold leading-snug text-white sm:text-2xl">You have different questions?</p>
                <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-white/70 sm:mx-0 sm:text-base lg:text-white">
                  Our team will answer your questions and help you understand the next step clearly.
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan/15">
                <span className="h-2 w-2 rounded-full bg-cyan" aria-hidden="true" />
              </div>
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

        <ScrollReveal delay={0.1} className="w-full">
          <div className="mx-auto w-full max-w-3xl space-y-3 lg:mx-0 lg:max-w-none">
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
                    className="flex w-full items-start justify-between gap-3 px-4 py-3.5 text-left sm:items-center sm:gap-4 sm:px-5 sm:py-4"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                  >
                    <span className="min-w-0 flex-1 font-display text-[0.95rem] font-semibold leading-snug text-white sm:text-lg">
                      {item.question}
                    </span>
                    <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition-transform duration-300 sm:h-9 sm:w-9", isOpen && "rotate-180")}>
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
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 sm:px-5 sm:pb-5">
                          <div className="h-px w-full bg-white/10" />
                          <p className="mt-3 text-sm leading-relaxed text-white/72 sm:mt-4 sm:text-base lg:text-white">
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

