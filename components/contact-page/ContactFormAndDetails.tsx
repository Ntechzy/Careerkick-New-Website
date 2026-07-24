"use client";

import type { SVGProps } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  MessagesSquare,
} from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/contactLinks";

const cardEase = [0.22, 1, 0.36, 1] as const;

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="3.2" />
      <circle cx="17.1" cy="6.9" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6.5 9.5V18" />
      <path d="M6.5 6.4v.1" />
      <path d="M10.5 18v-4.6c0-2.1 1.2-3.4 3-3.4 1.8 0 2.8 1.1 2.8 3.2V18" />
      <path d="M10.5 13.4V18" />
      <path d="M6.5 9.5h4" />
    </svg>
  );
}

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M14.5 8.2h1.9V5.4h-2.3c-2.2 0-3.7 1.6-3.7 4v1.8H8.1v2.8h2.3V19h2.9v-5h2.5l.4-2.8h-2.9V9.8c0-.9.4-1.6 1.2-1.6Z" />
    </svg>
  );
}

function YoutubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21.5 7.7s-.2-1.5-.9-2.2c-.9-.9-1.9-.9-2.4-1C15.1 4.2 12 4.2 12 4.2h0s-3.1 0-6.2.3c-.5.1-1.5.1-2.4 1-.7.7-.9 2.2-.9 2.2S2.2 9.4 2.2 11v2c0 1.6.3 3.3.3 3.3s.2 1.5.9 2.2c.9.9 2.1.9 2.6 1 1.9.2 5.9.3 5.9.3s3.1 0 6.2-.3c.5-.1 1.5-.1 2.4-1 .7-.7.9-2.2.9-2.2s.3-1.7.3-3.3v-2c0-1.6-.3-3.3-.3-3.3Z" />
      <path d="m10 9 5 3-5 3V9Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

const contactPoints = [
  {
    label: "Phone",
    value: "+91 7393062116",
    href: "tel:+917393062116",
    icon: Phone,
  },
  {
    label: "Email",
    value: "info@careerkick.in",
    href: "mailto:info@careerkick.in",
    icon: Mail,
  },
  {
    label: "WhatsApp",
    value: "Chat with us",
    href: "https://wa.me/917393062116",
    icon: MessagesSquare,
  },
  {
    label: "Main Office",
    value: "Kanpur, Uttar Pradesh",
    href: "https://www.google.com/maps/search/?api=1&query=117%20N%2065%20Rani%20Ganj%20Ambedkar%20Nagar%20Navin%20Nagar%20Kakadeo%20Kanpur%20Uttar%20Pradesh%20208025",
    icon: MapPin,
  },
];

const socialLinks = [
  {
    label: "Instagram",
    href: SOCIAL_LINKS.instagram,
    icon: InstagramIcon,
  },
  {
    label: "LinkedIn",
    href: "https://in.linkedin.com/company/careerkick-services-kanpur",
    icon: LinkedinIcon,
  },
  {
    label: "Facebook",
    href: SOCIAL_LINKS.facebook,
    icon: FacebookIcon,
  },
  {
    label: "YouTube",
    href: SOCIAL_LINKS.youtube,
    icon: YoutubeIcon,
  },
];

export function ContactFormAndDetails() {
  return (
    <section className="relative overflow-hidden bg-base px-4 py-10 sm:py-12 md:px-8 lg:py-16">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[78%] -translate-x-1/2 rounded-full bg-[#51A70A]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-[#6DCC12]/10 blur-[140px]" />

      <div className="relative mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <motion.div
          initial={{ opacity: 0, x: -32, y: 20 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: cardEase }}
          className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.075),rgba(255,255,255,0.025)),linear-gradient(135deg,rgba(11,16,9,0.88),rgba(18,26,16,0.78))] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-7 lg:p-8"
        >
          <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#51A70A]/60 to-transparent" />
          <div className="pointer-events-none absolute -right-10 top-8 h-36 w-36 rounded-full bg-[#51A70A]/12 blur-3xl" />
          <div className="pointer-events-none absolute -left-12 top-12 h-40 w-40 rounded-full bg-white/8 blur-3xl" />

          <div className="relative flex items-center justify-between gap-4">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-[#8cef32]">
                Contact Form
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
                Send us your details
              </h2>
            </div>
          </div>

          <p className="relative mt-4 max-w-2xl text-sm leading-relaxed text-white sm:text-base lg:text-white">
            Fill out the form below and our team will get back to you with the
            right support.
          </p>

          <div className="relative mt-6 overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-3 shadow-[0_12px_36px_rgba(0,0,0,0.28)] sm:p-4">
            <div className="min-h-[560px] rounded-[1.2rem] border border-dashed border-white/10 bg-black/20 p-3 sm:min-h-[620px] sm:p-4">
              <div id="formsID7375" />
            </div>
          </div>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, x: 32, y: 20 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.08, ease: cardEase }}
          className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.075),rgba(255,255,255,0.025)),linear-gradient(135deg,rgba(11,16,9,0.88),rgba(18,26,16,0.78))] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-7 lg:p-8"
        >
          <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#51A70A]/60 to-transparent" />
          <div className="pointer-events-none absolute -left-12 top-8 h-44 w-44 rounded-full bg-[#51A70A]/12 blur-3xl" />
          <div className="pointer-events-none absolute -right-8 bottom-6 h-36 w-36 rounded-full bg-[#6DCC12]/10 blur-3xl" />

          <div className="relative">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-[#8cef32]">
              Direct Support
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
              Contact Details
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white sm:text-base lg:text-white">
              Reach out through any option below for a quick response or to
              connect with our admissions team.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {contactPoints.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: 0.12 + index * 0.06, ease: cardEase }}
                  className="group rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#51A70A]/35 hover:bg-[#51A70A]/10"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[#51A70A]/20 bg-[#51A70A]/10 text-[#8cef32]">
                      <item.icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
                        {item.label}
                      </p>
                      <p className="mt-1 font-display text-sm font-semibold text-white transition-colors group-hover:text-[#8cef32]">
                        {item.value}
                      </p>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl sm:p-5">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-[#8cef32]">
                Social Media
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    initial={{ opacity: 0, y: 14, scale: 0.98 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.45, delay: 0.18 + index * 0.05, ease: cardEase }}
                    className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 transition-all duration-300 hover:-translate-y-1 hover:border-[#51A70A]/35 hover:bg-[#51A70A]/10"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[#51A70A]/20 bg-[#51A70A]/10 text-[#8cef32] transition-colors group-hover:bg-[#51A70A]/15">
                      <social.icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="font-display text-sm font-semibold text-white transition-colors group-hover:text-[#8cef32]">
                        {social.label}
                      </p>
                      <p className="mt-0.5 truncate font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
                        Open profile
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
