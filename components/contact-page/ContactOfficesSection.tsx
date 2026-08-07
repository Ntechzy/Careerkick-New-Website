"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { offices } from "@/data/offices";
import type { OfficeBranch } from "@/types";

const cardEase = [0.22, 1, 0.36, 1] as const;

export function ContactOfficesSection() {
  return (
    <section id="contact-offices" className="relative scroll-mt-24 overflow-hidden bg-base px-4 py-12 sm:py-16 md:px-8 lg:py-20">
      <div className="pointer-events-none absolute -left-28 top-16 h-80 w-80 rounded-full bg-[#51A70A]/12 blur-[120px]" />
      <div className="pointer-events-none absolute -right-28 bottom-10 h-96 w-96 rounded-full bg-[#6DCC12]/10 blur-[130px]" />
      <div className="grid-overlay absolute inset-0 opacity-70" />

      <div className="relative mx-auto max-w-7xl">
        <ScrollReveal className="mx-auto max-w-4xl text-center">
          <span className="inline-flex rounded-full border border-[#51A70A]/30 bg-[#51A70A]/10 px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.24em] text-[#8cef32]">
            Our Offices
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold leading-[1.06] tracking-normal text-white sm:text-4xl md:text-5xl lg:text-6xl">
            Find the nearest{" "}
            <span className="text-[#8cef32] text-glow">Careerkick</span>{" "}
            branch
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-white/72 sm:text-base md:text-lg">
            Every office page below is linked to its map route and contact
            numbers so visitors can reach the right branch quickly.
          </p>
        </ScrollReveal>

        <motion.div
          className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
          }}
        >
          {offices.map((office, index) => (
            <OfficeCard key={office.id} office={office} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function OfficeCard({ office, index }: { office: OfficeBranch; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 26, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.05, ease: cardEase }}
      className="group overflow-hidden rounded-[1.65rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.075),rgba(255,255,255,0.025)),linear-gradient(135deg,rgba(11,16,9,0.88),rgba(18,26,16,0.78))] shadow-[0_20px_60px_rgba(0,0,0,0.4)] backdrop-blur-xl"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={office.image}
          alt={`${office.branch} branch`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 1280px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/40 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-white/85 backdrop-blur-md">
          {office.status === "coming-soon" ? "Coming Soon" : "Open"}
        </span>
      </div>

      <div className="space-y-4 p-5">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8cef32]">
            Office
          </p>
          <h3 className="mt-2 font-display text-2xl font-bold text-white transition-colors group-hover:text-[#8cef32]">
            {office.branch}
          </h3>
        </div>

        <p className="text-sm leading-relaxed text-white/68">
          {office.address}
        </p>

        <div className="space-y-2">
          {office.contacts.length > 0 ? (
            office.contacts.map((contact) => (
              <a
                key={contact}
                href={`tel:${contact.replace(/\s+/g, "")}`}
                className="block rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-center font-mono text-xs font-semibold uppercase tracking-[0.16em] text-white/78 transition-all hover:border-[#51A70A]/35 hover:bg-[#51A70A]/10 hover:text-[#8cef32]"
              >
                {contact}
              </a>
            ))
          ) : (
            <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-center font-mono text-xs uppercase tracking-[0.16em] text-white/45">
              Contact details coming soon
            </div>
          )}
        </div>

        <a
          href={office.mapUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-full items-center justify-center rounded-full bg-gradient-brand px-4 py-3 font-display text-sm font-semibold text-white transition-all hover:shadow-[0_22px_52px_rgba(81,167,10,0.34)]"
        >
          Open Map
        </a>
      </div>
    </motion.article>
  );
}
