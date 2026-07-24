"use client";
import { motion } from "framer-motion";
import { SOCIAL_ICON_URLS, SOCIAL_LINKS } from "@/lib/contactLinks";

const cardEase = [0.22, 1, 0.36, 1] as const;

const socialLinks = [
  {
    name: "Instagram",
    href: SOCIAL_LINKS.instagram,
    imageUrl: SOCIAL_ICON_URLS.instagram,
    Icon: InstagramIcon,
  },
  {
    name: "LinkedIn",
    href: "https://in.linkedin.com/company/careerkick-services-kanpur",
    imageUrl: "",
    Icon: LinkedInIcon,
  },
  {
    name: "Facebook",
    href: SOCIAL_LINKS.facebook,
    imageUrl: SOCIAL_ICON_URLS.facebook,
    Icon: FacebookIcon,
  },
];

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect
        x="3.25"
        y="3.25"
        width="17.5"
        height="17.5"
        rx="5.25"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M7.15 9.3V17.25M7.2 6.95a1.25 1.25 0 1 1-.001 2.501A1.25 1.25 0 0 1 7.2 6.95Zm4.3 10.3V9.3h3.05v1.2c.52-.87 1.48-1.48 2.9-1.48 2.27 0 3.3 1.47 3.3 4.12v4.13h-3.25v-3.76c0-1.27-.45-2.14-1.57-2.14-.86 0-1.37.57-1.59 1.12-.08.19-.1.46-.1.73v4.05H11.5Z"
        fill="currentColor"
      />
      <rect
        x="3.25"
        y="3.25"
        width="17.5"
        height="17.5"
        rx="4.75"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M13.55 20V12.9H16l.38-2.77h-2.83V8.36c0-.8.24-1.35 1.39-1.35H16.5V4.55c-.28-.04-1.23-.11-2.34-.11-2.31 0-3.89 1.37-3.89 4.01v1.68H7.9v2.77h2.37V20h3.28Z"
        fill="currentColor"
      />
      <rect
        x="3.25"
        y="3.25"
        width="17.5"
        height="17.5"
        rx="4.75"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export default function CTASection() {
  return (
    <section className="section-shell relative w-full overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-60" style={{ background: "radial-gradient(circle at 18% 18%, rgba(81,167,10,0.14) 0%, transparent 30%), radial-gradient(circle at 82% 22%, rgba(109,204,18,0.10) 0%, transparent 28%), radial-gradient(circle at 50% 100%, rgba(81,167,10,0.08) 0%, transparent 34%)" }} />
      <div className="grid-overlay absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute left-[14%] top-16 h-56 w-56 rounded-full bg-[#51A70A]/10 blur-3xl" />
      <div className="pointer-events-none absolute right-[10%] bottom-10 h-64 w-64 rounded-full bg-[#6DCC12]/8 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -36, y: 18 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.85, ease: cardEase }}
            className="mx-auto flex max-w-xl flex-col items-center text-center lg:mx-0 lg:items-start lg:text-left"
          >
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.75, delay: 0.08, ease: cardEase }}
                className="font-display text-[2rem] font-bold leading-[1.08] tracking-normal text-white sm:text-[3rem] lg:text-[4.25rem]"
            >
              Join 100+ colleges <br />
              growing with{" "}
              <span className="text-[#8cef32] text-glow">Careerkick</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: 0.16, ease: cardEase }}
              className="mt-5 max-w-lg text-base text-white/72 sm:mt-6 sm:text-xl lg:text-white"
            >
              Start your journey towards success today.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: 0.24, ease: cardEase }}
              className="mt-8 flex w-full flex-col gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4 lg:justify-start"
            >
              {/* <button className="w-full rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-white/10 sm:w-auto">
                Learn more
              </button> */}

              <motion.button
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="w-full rounded-full bg-gradient-brand px-6 py-3 font-display text-sm font-semibold text-white shadow-[0_18px_44px_rgba(81,167,10,0.24)] transition hover:shadow-[0_22px_52px_rgba(81,167,10,0.34)] sm:w-auto"
              >
                Get started
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: 0.32, ease: cardEase }}
              className="mt-6 w-full"
            >
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.65, delay: 0.38, ease: cardEase }}
                className="mx-auto max-w-md text-sm leading-relaxed text-white/65 lg:mx-0"
              >
                You can also message us on Instagram, LinkedIn, or Facebook for
                getting started.
              </motion.p>

              <div className="mt-4 flex w-full items-center justify-center gap-3 lg:justify-start">
                {socialLinks.map(
                  ({ name, href, imageUrl, Icon }, index) => (
                    <motion.a
                      key={name}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Message us on ${name}`}
                      initial={{ opacity: 0, y: 18, scale: 0.92 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.42 + index * 0.08,
                        ease: cardEase,
                      }}
                      whileHover={{ y: -5, scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      className="group inline-flex shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-left text-sm font-medium text-white shadow-[0_12px_24px_rgba(0,0,0,0.24)] transition hover:-translate-y-0.5 hover:border-[#51A70A]/35 hover:bg-[#51A70A]/10"
                    >
                      <motion.span
                        animate={{
                          y: [0, -2, 0],
                          rotate: [0, -1.5, 0, 1.5, 0],
                        }}
                        transition={{
                          duration: 4.5,
                          repeat: Infinity,
                          delay: index * 0.18,
                          ease: "easeInOut",
                        }}
                        className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-surface text-white sm:h-11 sm:w-11"
                      >
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt=""
                            className="h-full w-full object-cover transition group-hover:scale-110"
                          />
                        ) : (
                          <Icon className="relative h-5 w-5 transition group-hover:scale-110" />
                        )}
                      </motion.span>
                      <span className="sr-only">{name}</span>
                    </motion.a>
                  ),
                )}
              </div>
            </motion.div>
          </motion.div>

          <div className="relative flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, x: 48, y: 26 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.9, delay: 0.14, ease: cardEase }}
              className="relative w-full max-w-[760px] px-1 pb-10 pt-2 sm:px-2 sm:pb-16"
            >
              <div className="pointer-events-none absolute left-1/2 top-[18%] h-40 w-[82%] -translate-x-1/2 rounded-full bg-[#51A70A]/15 blur-3xl sm:top-[22%] sm:h-56 sm:w-[76%]" />

              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, -0.4, 0.4, 0] }}
                transition={{
                  duration: 7.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative ml-auto w-[94%] max-w-[680px] sm:w-full"
              >
                <motion.div
                  whileHover={{ y: -6, rotate: -0.5 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="relative rounded-[1.35rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.075),rgba(255,255,255,0.025)),linear-gradient(135deg,rgba(11,16,9,0.88),rgba(18,26,16,0.78))] p-[6px] shadow-[0_28px_60px_rgba(0,0,0,0.45)] sm:rounded-[2rem] sm:p-[10px] sm:shadow-[0_40px_90px_rgba(0,0,0,0.48)]"
                >
                  <div className="absolute left-1/2 top-[10px] z-10 h-[8px] w-24 -translate-x-1/2 rounded-full bg-white/10 sm:top-[14px] sm:h-[10px] sm:w-28" />
                  <div className="absolute left-1/2 top-[12px] z-10 h-[4px] w-[44px] -translate-x-1/2 rounded-full bg-white/20 sm:top-[17px] sm:h-[5px] sm:w-[52px]" />

                    <div className="overflow-hidden rounded-[1rem] border border-white/10 bg-base sm:rounded-[1.6rem]">
                    <div className="aspect-[16/10] w-full">
                      <img
                        src="https://res.cloudinary.com/dhlqc0ymy/image/upload/v1784143519/desktop_yxiuof.png"
                        alt="Dashboard preview"
                        className="h-full w-full object-cover object-top"
                        onError={(event) => {
                          event.currentTarget.src = "/logo-bg.png";
                          event.currentTarget.className = "h-full w-full bg-base object-contain object-center p-8";
                        }}
                      />
                    </div>
                  </div>
                </motion.div>

                <div className="relative mx-auto h-[14px] w-[94%] rounded-b-[2rem] bg-gradient-to-b from-white/10 via-white/5 to-white/0 shadow-[0_18px_34px_rgba(0,0,0,0.28)] sm:h-[16px]" />
                <div className="mx-auto h-[8px] w-[24%] rounded-b-full bg-white/18 sm:h-[10px]" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 12, 0], rotate: [0, 0.8, 0, -0.8, 0] }}
                transition={{
                  duration: 6.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-1 left-[-5%] w-[33%] min-w-[118px] max-w-[190px] sm:bottom-5 sm:left-[-18%] sm:w-[32%] sm:min-w-[150px] sm:max-w-[220px]"
              >
                <motion.div
                  whileHover={{ y: -5, rotate: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="relative rounded-[2.1rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.075),rgba(255,255,255,0.025)),linear-gradient(135deg,rgba(11,16,9,0.88),rgba(18,26,16,0.78))] p-[6px] shadow-[0_24px_50px_rgba(0,0,0,0.35)] sm:rounded-[3rem] sm:p-[8px] sm:shadow-[0_35px_70px_rgba(0,0,0,0.42)]"
                >
                  <div className="absolute -left-[3px] top-[84px] h-8 w-[3px] rounded-full bg-white/18 sm:top-[122px] sm:h-12" />
                  <div className="absolute -left-[3px] top-[120px] h-10 w-[3px] rounded-full bg-white/18 sm:top-[176px] sm:h-14" />
                  <div className="absolute -right-[3px] top-[102px] h-12 w-[3px] rounded-full bg-white/18 sm:top-[158px] sm:h-16" />

                  <div className="absolute left-1/2 top-[6px] z-10 flex h-6 w-[48%] -translate-x-1/2 items-center justify-center rounded-b-[1.1rem] bg-base sm:top-[8px] sm:h-8 sm:w-[46%] sm:rounded-b-[1.25rem]">
                    <div className="h-[4px] w-9 rounded-full bg-white/18 sm:w-12" />
                    <div className="ml-2 h-[8px] w-[8px] rounded-full bg-white/25 ring-2 ring-white/18" />
                  </div>

                    <div className="overflow-hidden rounded-[1.8rem] border border-white/10 bg-base sm:rounded-[2.35rem]">
                    <div className="aspect-[9/19.5] w-full">
                      <img
                        src="https://res.cloudinary.com/dhlqc0ymy/image/upload/v1784143519/mobile_r3m56g.png"
                        alt="Mobile dashboard preview"
                        className="h-full w-full object-cover object-left-top"
                        onError={(event) => {
                          event.currentTarget.src = "/logo-bg.png";
                          event.currentTarget.className = "h-full w-full bg-base object-contain object-center p-4";
                        }}
                      />
                    </div>
                  </div>

                  <div className="absolute bottom-[9px] left-1/2 h-[4px] w-[34%] -translate-x-1/2 rounded-full bg-[#8cef32]/20 sm:bottom-3" />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
