"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GradientText } from "@/components/ui/GradientText";
import { GlassCard } from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";
import { videoTestimonials } from "@/data/videoTestimonials";
import type { VideoTestimonial } from "@/types";

const accentStyles: Record<VideoTestimonial["accent"], { border: string; badge: string; glow: string; ring: string }> = {
  violet: { border: "border-violet/30", badge: "bg-violet/10 text-violet-glow", glow: "shadow-[0_24px_70px_rgba(81,167,10,0.12)]", ring: "border-violet/30" },
  cyan: { border: "border-cyan/30", badge: "bg-cyan/10 text-cyan", glow: "shadow-[0_24px_70px_rgba(81,167,10,0.12)]", ring: "border-cyan/30" },
  emerald: { border: "border-emerald/30", badge: "bg-emerald/10 text-emerald-300", glow: "shadow-[0_24px_70px_rgba(52,211,153,0.12)]", ring: "border-emerald/30" },
  amber: { border: "border-[#fbbf24]/30", badge: "bg-[#fbbf24]/10 text-[#fbbf24]", glow: "shadow-[0_24px_70px_rgba(251,191,36,0.12)]", ring: "border-[#fbbf24]/30" },
};

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative overflow-hidden bg-base px-4 py-section-mobile md:px-8 md:py-section">
      <div className="absolute -left-28 top-14 h-80 w-80 rounded-full bg-violet/10 blur-[120px]" />
      <div className="absolute -right-28 top-20 h-96 w-96 rounded-full bg-cyan/10 blur-[130px]" />
      <div className="grid-overlay absolute inset-0 opacity-70" />

      <div className="relative mx-auto max-w-7xl">
        <ScrollReveal className="mx-auto max-w-4xl text-center">
          <SectionLabel className="mx-auto">Testimonials</SectionLabel>
          <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            Real Success, Real Stories -{" "}
            <GradientText>Hear from Our Happy Students!</GradientText>
          </h2>
          <p className="mx-auto mt-5 max-w-4xl text-base leading-relaxed text-text-muted sm:text-lg lg:text-white">
            Discover how we&apos;ve helped students and families move through counselling with more confidence.
          </p>
        </ScrollReveal>

        <div className="relative mt-10 md:hidden">
          <div className="mb-4 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#8cef32]">
            <span className="h-px w-8 bg-[#51A70A]/45" />
            <span>Swipe for more</span>
            <span className="h-px w-8 bg-[#51A70A]/45" />
          </div>

          <div className="pointer-events-none absolute bottom-12 right-0 top-16 z-20 w-8 bg-gradient-to-l from-base to-transparent" />
          <div className="pointer-events-none absolute bottom-12 left-0 top-16 z-20 w-8 bg-gradient-to-r from-base to-transparent" />

          <div className="flex snap-x snap-mandatory overflow-x-auto pb-7 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {videoTestimonials.map((item, index) => (
              <div
                key={item.id}
                className="flex w-full shrink-0 snap-center justify-center px-2"
              >
                <VideoPhoneCard item={item} index={index} />
              </div>
            ))}
          </div>

          <div className="mt-1 flex items-center justify-center gap-2">
            {videoTestimonials.map((item) => (
              <span
                key={`${item.id}-dot`}
                className="h-1.5 w-7 rounded-full bg-[#51A70A]/45"
                aria-hidden="true"
              />
            ))}
          </div>
        </div>

        <div className="mt-12 hidden gap-6 md:grid xl:grid-cols-4">
          {videoTestimonials.map((item, index) => (
            <ScrollReveal key={item.id} delay={index * 0.06} className="h-full">
              <VideoPhoneCard item={item} index={index} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function VideoPhoneCard({ item, index }: { item: VideoTestimonial; index: number }) {
  const accent = accentStyles[item.accent];
  const embedUrl = getYoutubeEmbedUrl(item.youtubeUrl);
  const isEmpty = !embedUrl;

  return (
    <GlassCard
      className={cn(
        "mx-auto h-full w-full max-w-[340px] overflow-hidden border-white/10 bg-surface-2/80 p-3 shadow-elevated backdrop-blur-xl md:max-w-[300px]",
        accent.glow,
        index % 2 === 1 && "xl:mt-10",
        index % 2 === 0 && "xl:-mt-2"
      )}
    >
      <div className={cn("relative aspect-[9/16] overflow-hidden rounded-[2rem] border-2 bg-[#030504] sm:rounded-[2.5rem]", accent.ring)}>
        <div className="pointer-events-none absolute left-1/2 top-3 z-20 h-1.5 w-20 -translate-x-1/2 rounded-full bg-white/15" />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-black/40 via-black/10 to-transparent" />

        <div className="absolute inset-0">
          {embedUrl ? (
            <iframe
              title={item.title}
              src={embedUrl}
              className="relative z-10 h-full w-full bg-black"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
              allowFullScreen
            />
          ) : (
            <div className="flex h-full w-full flex-col justify-between bg-[linear-gradient(180deg,#121a10_0%,#050704_55%,#0b1009_100%)] p-4">
              <div className="flex items-center justify-between">
                <span className={cn("rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.28em]", accent.badge)}>
                  {item.tag}
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.26em] text-white/55">
                  YouTube
                </span>
              </div>

              <div className="flex flex-1 items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-[#51A70A]/10 blur-2xl" />
                  <button
                    type="button"
                    className="relative flex h-20 w-20 items-center justify-center rounded-full border border-[#51A70A]/20 bg-[#ff174f] shadow-[0_16px_40px_rgba(255,23,79,0.35)]"
                    aria-label={`Play ${item.title}`}
                  >
                    <span className="ml-1 border-y-[14px] border-l-[20px] border-y-transparent border-l-white" />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-semibold text-white">{item.title}</p>
                <div className="h-1.5 w-full rounded-full bg-white/10">
                  <div className="h-full w-2/3 rounded-full bg-gradient-brand" />
                </div>
                <p className="text-xs leading-relaxed text-white/60">
                  Paste your YouTube URL in <span className="text-[#51A70A]">data/videoTestimonials.ts</span> to turn this frame into a live reel.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 hidden h-24 bg-gradient-to-t from-black/85 via-black/45 to-transparent md:block" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 hidden p-4 md:block">
          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">{item.title}</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.3em] text-white/60">{item.tag}</p>
            </div>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-600 text-white shadow-[0_12px_30px_rgba(255,23,79,0.32)]">
              <PlayIcon />
            </span>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

function getYoutubeVideoId(value: string) {
  const trimmed = value.trim();
  if (!trimmed) {
    return "";
  }

  const match = trimmed.match(/(?:youtu\.be\/|v=|shorts\/)([A-Za-z0-9_-]{6,})/);
  const embedMatch = trimmed.match(/embed\/([A-Za-z0-9_-]{6,})/);
  return match?.[1] ?? embedMatch?.[1] ?? "";
}

function getYoutubeEmbedUrl(value: string) {
  const videoId = getYoutubeVideoId(value);

  return videoId
    ? `https://www.youtube.com/embed/${videoId}?playsinline=1&rel=0&modestbranding=1`
    : value.trim();
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="M9 7L17 12L9 17V7Z" fill="currentColor" />
    </svg>
  );
}


