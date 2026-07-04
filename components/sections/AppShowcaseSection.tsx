"use client";

/* eslint-disable @next/next/no-img-element */
import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/ui/AuroraBackground";

const channels = [
  {
    id: "careerkick-neet",
    title: "CAREERKICK NEET",
    subtitle: "Counselling updates, cut-offs, and admission explainers",
    subscribers: "206K subscribers",
    href: "https://www.youtube.com/@careerkickneet",
    imagePosition: "50% 0%",
    imageSrc: "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1783134623/careerkick-neet_ab5he6.jpg",
  },
  {
    id: "careerkick-jee",
    title: "CAREERKICK JEE",
    subtitle: "Counselling updates, cut-offs, and admission explainers",
    subscribers: "42.8K subscribers",
    href: "https://www.youtube.com/@CAREERKICKJEE",
    imagePosition: "50% 0%",
    imageSrc: "https://res.cloudinary.com/dhlqc0ymy/image/upload/v1783134620/careerkick-jee_jrbh9x.jpg",
  },
] as const;

const phoneVariants = {
  hidden: (index: number) => ({
    opacity: 0,
    y: 72,
    x: index === 0 ? 64 : -64,
    rotate: index === 0 ? -4 : 4,
    scale: 0.94,
  }),
  visible: (index: number) => ({
    opacity: 1,
    y: index === 0 ? 14 : 0,
    x: 0,
    rotate: index === 0 ? -6 : 6,
    scale: index === 0 ? 0.97 : 1,
    transition: {
      type: "spring",
      stiffness: 92,
      damping: 18,
      delay: index * 0.14,
    },
  }),
};

export default function AppShowcaseSection() {
  return (
    <section className="relative overflow-hidden bg-base px-3 py-16 sm:px-4 sm:py-24 md:px-8 lg:py-28 xl:py-section">
      <AuroraBackground />
      <div className="absolute -left-36 top-24 h-80 w-80 rounded-full bg-violet/10 blur-[110px]" />
      <div className="absolute -right-28 bottom-24 h-96 w-96 rounded-full bg-violet/10 blur-[120px]" />
      <div className="grid-overlay absolute inset-0 opacity-80" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          className="relative mx-auto flex min-h-[360px] w-full max-w-[360px] items-end justify-center overflow-visible sm:min-h-[560px] sm:max-w-4xl lg:min-h-[640px]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          <div className="absolute bottom-0 left-1/2 h-24 w-[92%] -translate-x-1/2 rounded-full bg-gradient-glow opacity-30 blur-3xl sm:h-32 sm:w-[74%]" />
          <div className="absolute bottom-0 left-1/2 h-20 w-full max-w-4xl -translate-x-1/2 bg-gradient-to-t from-base via-base/80 to-transparent sm:h-24" />

          <div className="relative z-10 flex w-full items-end justify-center">
            {channels.map((channel, index) => (
              <motion.div
                key={channel.id}
                custom={index}
                variants={phoneVariants}
                className="-mx-5 shrink-0 sm:mx-4 md:mx-8"
              >
                <a
                  href={channel.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${channel.title} on YouTube`}
                  className="block transition-transform duration-300 hover:scale-[1.015] focus-visible:rounded-[3rem]"
                >
                  <IphoneMockup emphasis={index === 1}>
                    <ChannelScreen channel={channel} />
                  </IphoneMockup>
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="relative z-30 mx-auto mt-8 max-w-3xl text-center sm:mt-10 md:mt-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <span className="mb-4 inline-flex rounded-full border border-violet/30 bg-violet/10 px-3 py-2 text-center font-mono text-[10px] font-medium uppercase tracking-widest text-violet-glow sm:mb-5 sm:px-4 sm:text-xs">
            YouTube channels
          </span>
          <h2 className="font-display text-3xl font-bold leading-tight tracking-normal text-white sm:text-5xl md:text-6xl">
            Learn counselling through{" "}
            <span className="bg-gradient-brand bg-clip-text text-transparent">
              CareerKick videos.
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-text-muted sm:mt-6 sm:text-base md:text-lg md:text-white">
            Watch NEET counselling updates, college planning tips, cut-off
            analysis, and choice filling guidance across our YouTube channels.
          </p>
          <div className="mx-auto mt-6 grid max-w-2xl gap-3 sm:grid-cols-2">
            {channels.map((channel) => (
              <a
                key={channel.id}
                href={channel.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-4 text-left shadow-card backdrop-blur-xl"
              >
                <p className="font-display text-base font-semibold text-white sm:text-lg">
                  {channel.title}
                </p>
                <p className="mt-1 font-mono text-xs font-semibold uppercase tracking-widest text-violet-glow">
                  {channel.subscribers}
                </p>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function IphoneMockup({
  children,
  emphasis = false,
}: {
  children: React.ReactNode;
  emphasis?: boolean;
}) {
  return (
    <div
      className={`relative h-[322px] w-[154px] rounded-[2rem] bg-gradient-to-br from-[#f8faf7] via-[#151816] to-[#050605] p-[3px] shadow-[0_32px_80px_rgba(0,0,0,0.55),inset_0_0_0_1px_rgba(255,255,255,0.35)] ring-1 ring-white/20 sm:h-[500px] sm:w-[240px] sm:rounded-[3rem] md:h-[560px] md:w-[270px] ${
        emphasis
          ? "shadow-[0_40px_100px_rgba(81,167,10,0.22),0_28px_80px_rgba(0,0,0,0.65)]"
          : ""
      }`}
    >
      <div className="absolute -left-[4px] top-20 h-10 w-[4px] rounded-l-full bg-gradient-to-b from-[#5b625c] to-[#171a18] sm:-left-[5px] sm:top-24 sm:h-12 sm:w-[5px]" />
      <div className="absolute -left-[4px] top-32 h-8 w-[4px] rounded-l-full bg-gradient-to-b from-[#5b625c] to-[#171a18] sm:-left-[5px] sm:top-40 sm:h-9 sm:w-[5px]" />
      <div className="absolute -right-[4px] top-28 h-12 w-[4px] rounded-r-full bg-gradient-to-b from-[#5b625c] to-[#171a18] sm:-right-[5px] sm:top-32 sm:h-16 sm:w-[5px]" />
      <div className="pointer-events-none absolute inset-[3px] rounded-[2rem] border border-white/15 sm:rounded-[2.8rem]" />
      <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-[#050606] p-[5px] sm:rounded-[2.78rem] sm:p-[7px] md:p-2">
        <div className="relative h-full w-full overflow-hidden rounded-[1.65rem] bg-white shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)] sm:rounded-[2.25rem] md:rounded-[2.35rem]">
          <div className="absolute left-1/2 top-1.5 z-30 flex h-4 w-16 -translate-x-1/2 items-center justify-end rounded-full bg-black pr-1.5 shadow-[0_2px_6px_rgba(0,0,0,0.35)] sm:top-2 sm:h-6 sm:w-24 sm:pr-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#161b1c] shadow-[inset_0_0_2px_rgba(255,255,255,0.35)] sm:h-2 sm:w-2" />
          </div>
          <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-32 bg-gradient-to-br from-white/50 via-white/10 to-transparent" />
          <div className="pointer-events-none absolute -right-16 top-10 z-20 h-[120%] w-28 rotate-12 bg-white/15 blur-sm" />
          <div className="relative z-10 flex h-7 items-center justify-between px-4 pt-2 text-[8px] font-bold text-zinc-900 sm:h-10 sm:px-6 sm:pt-3 sm:text-[10px]">
            <span>9:41</span>
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-2.5 rounded-sm border border-zinc-900 sm:h-2 sm:w-3" />
              <span className="h-1.5 w-2.5 rounded-sm bg-zinc-900 sm:h-2 sm:w-3" />
            </span>
          </div>
          <div className="relative z-10 h-[calc(100%-1.75rem)] w-full overflow-hidden sm:h-[calc(100%-2.5rem)]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function ChannelScreen({ channel }: { channel: (typeof channels)[number] }) {
  const hasImage = Boolean(channel.imageSrc);

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0f0f0f] text-white">
      <div className="absolute inset-0 bg-zinc-950">
        {hasImage ? (
          <img
            src={channel.imageSrc}
            alt={channel.title}
            className="h-full w-full object-cover"
            style={{ objectPosition: channel.imagePosition }}
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center bg-[linear-gradient(180deg,#181818_0%,#050505_100%)] px-5 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-[0_18px_50px_rgba(220,38,38,0.35)] sm:h-20 sm:w-20">
              <PlayIcon large />
            </span>
            <p className="mt-5 text-sm font-bold sm:text-lg">
              Add image URL
            </p>
            <p className="mt-2 text-[10px] leading-relaxed text-white/55 sm:text-xs">
              Paste your channel screenshot or thumbnail URL into imageSrc.
            </p>
          </div>
        )}
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/25 via-black/5 to-transparent" />
      {!hasImage && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
      )}

      {!hasImage && <div className="absolute inset-x-0 bottom-0 px-3 pb-3 sm:px-4 sm:pb-4">
        <div className="rounded-2xl border border-white/10 bg-black/45 px-3 py-3 shadow-card backdrop-blur-md sm:px-4 sm:py-4">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-600 text-white sm:h-9 sm:w-9">
              <PlayIcon />
            </span>
            <div className="min-w-0">
              <p className="truncate text-[10px] font-bold sm:text-xs">
                {channel.title}
              </p>
              <p className="mt-0.5 text-[8px] font-semibold text-violet-glow sm:text-[10px]">
                {channel.subscribers}
              </p>
            </div>
          </div>
        </div>
      </div>}
    </div>
  );
}

function PlayIcon({ large = false }: { large?: boolean }) {
  return (
    <svg
      className={large ? "h-8 w-8" : "h-4 w-4"}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M8 5.5v13l10-6.5-10-6.5Z" />
    </svg>
  );
}