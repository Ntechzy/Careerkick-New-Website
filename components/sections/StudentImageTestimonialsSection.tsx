"use client";

import Image from "next/image";
import { useMemo, type CSSProperties } from "react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { studentImageTestimonials } from "@/data/studentImageTestimonials";

export function StudentImageTestimonialsSection() {
  const carouselItems = useMemo(
    () => [...studentImageTestimonials, ...studentImageTestimonials],
    []
  );

  return (
    <section className="relative overflow-hidden bg-[#f7faf4] px-4 py-16 text-slate-950 md:px-8 md:py-24">
      <div className="absolute -left-24 top-14 h-72 w-72 rounded-full bg-[#51A70A]/10 blur-[120px]" />
      <div className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-emerald/10 blur-[130px]" />
      <div className="grid-overlay absolute inset-0 opacity-[0.14]" />

      <div className="relative mx-auto max-w-7xl">
        <ScrollReveal className="mx-auto max-w-4xl text-center">
          <div className="flex justify-center">
            <SectionLabel>Student Stories</SectionLabel>
          </div>
          <h2 className="mx-auto mt-4 max-w-4xl font-display text-3xl font-bold leading-[1.08] tracking-normal text-slate-900 sm:text-4xl md:text-5xl">
            Real faces,{" "}
            <span className="bg-gradient-brand bg-clip-text text-transparent">
              real counselling journeys.
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-slate-700 sm:text-base md:text-lg">
            Hear from students and families who moved through counselling with
            more clarity, better decisions, and a lot less stress.
          </p>
        </ScrollReveal>

        <div className="mt-10 overflow-hidden">
          <div
            className="mask-fade-x overflow-hidden"
            style={{ "--marquee-duration": "42s" } as CSSProperties}
          >
            <div className="flex w-max gap-4 whitespace-nowrap animate-marquee hover:[animation-play-state:paused] sm:gap-5">
              {carouselItems.map((item, index) => (
                <motion.article
                  key={`${item.id}-${index}`}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="group w-[240px] shrink-0 overflow-hidden rounded-[28px] border border-[#51A70A]/14 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08),0_12px_0_rgba(81,167,10,0.05)] sm:w-[280px]"
                >
                  <div className="p-3 sm:p-4">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] bg-slate-100">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 640px) 240px, 280px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0)_35%,rgba(5,7,4,0.08)_100%)]" />
                    </div>

                    <div className="mt-4 space-y-2">
                      <h3 className="font-display text-lg font-semibold leading-tight text-slate-950">
                        {item.name}
                      </h3>
                      <p className="text-sm leading-relaxed text-slate-700">
                        {item.testimonial}
                      </p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
