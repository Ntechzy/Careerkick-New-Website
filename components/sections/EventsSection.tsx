import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientText } from "@/components/ui/GradientText";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { cn } from "@/lib/utils";
import { upcomingEvents } from "@/data/upcomingEvents";
import type { UpcomingEventCard } from "@/types";

const registrationUrl = "https://event.careerkick.in/";

const accentStyles: Record<UpcomingEventCard["accent"], { border: string; badge: string; glow: string; ring: string }> = {
  violet: { border: "border-violet/30", badge: "bg-violet/10 text-violet-glow", glow: "shadow-[0_28px_80px_rgba(81,167,10,0.12)]", ring: "border-violet/30" },
  cyan: { border: "border-cyan/30", badge: "bg-cyan/10 text-cyan", glow: "shadow-[0_28px_80px_rgba(81,167,10,0.12)]", ring: "border-cyan/30" },
  emerald: { border: "border-emerald/30", badge: "bg-emerald/10 text-emerald-300", glow: "shadow-[0_28px_80px_rgba(52,211,153,0.12)]", ring: "border-emerald/30" },
  amber: { border: "border-[#fbbf24]/30", badge: "bg-[#fbbf24]/10 text-[#fbbf24]", glow: "shadow-[0_28px_80px_rgba(251,191,36,0.12)]", ring: "border-[#fbbf24]/30" },
  blue: { border: "border-blue/30", badge: "bg-blue/10 text-blue-300", glow: "shadow-[0_28px_80px_rgba(96,165,250,0.12)]", ring: "border-blue/30" },
};

export function EventsSection() {
  const today = startOfToday();
  const futureEvents = upcomingEvents
    .map((event, index) => ({ event, index, date: parseEventDate(event.date) }))
    .filter(({ date }) => date >= today)
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const nextUpcomingIndex = futureEvents.length > 0 ? futureEvents[0].index : 0;

  return (
    <section id="events" className="relative overflow-hidden bg-base px-4 py-section-mobile md:px-8 md:py-section">
      <div className="absolute -left-28 top-16 h-80 w-80 rounded-full bg-violet/10 blur-[120px]" />
      <div className="absolute -right-28 top-20 h-96 w-96 rounded-full bg-cyan/10 blur-[130px]" />
      <div className="grid-overlay absolute inset-0 opacity-70" />

      <div className="relative mx-auto max-w-7xl">
        <ScrollReveal className="mx-auto max-w-4xl text-center">
          <SectionLabel className="mx-auto">Upcoming Events</SectionLabel>
          <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            Our Upcoming <GradientText>Events</GradientText>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg lg:text-white">
            A focused set of counselling events for students and parents who want direct guidance on admission planning, college options and next steps.
          </p>
        </ScrollReveal>

        <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
          {upcomingEvents.map((event, index) => {
            const accent = accentStyles[event.accent];
            const eventDate = parseEventDate(event.date);
            const isPast = eventDate < today;
            const videoUrl = event.videoUrl?.trim();
            const hasVideo = Boolean(videoUrl);
            const isUpcoming = index === nextUpcomingIndex;
            const badgeText = isPast ? (hasVideo ? "Replay" : "Closed") : isUpcoming ? "Next" : "Upcoming";

            return (
              <ScrollReveal key={event.id} delay={0.05 + index * 0.05} className="mx-auto h-full w-full max-w-[340px] sm:max-w-none">
                <GlassCard
                  className={cn(
                    "group h-full overflow-hidden border-white/10 bg-surface-2/80 shadow-card backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1",
                    isUpcoming && "border-[#51A70A]/50 shadow-[0_20px_70px_rgba(81,167,10,0.18)]"
                  )}
                >
                  {isPast ? (
                    <div className="flex h-full min-h-[420px] flex-col overflow-hidden rounded-[28px] bg-black/40">
                      <div className="relative min-h-[340px] flex-1 overflow-hidden">
                        {hasVideo ? (
                          <>
                            <video
                              className="h-full w-full object-cover"
                              autoPlay
                              muted
                              loop
                              playsInline
                              preload="metadata"
                              poster={event.imageSrc}
                            >
                              <source src={videoUrl} />
                              Your browser does not support the video tag.
                            </video>
                            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(5,7,4,0.75),transparent_40%),linear-gradient(to_bottom,rgba(5,7,4,0.15),transparent_25%)]" />
                            <div className="absolute left-4 top-4">
                              <span className={cn("rounded-full px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.28em] sm:px-3 sm:text-[10px]", accent.badge)}>
                                Replay
                              </span>
                            </div>
                          </>
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-[#081609] px-4 text-center">
                            <div>
                              <p className="font-display text-sm font-bold text-white sm:text-base">
                                Replay coming soon
                              </p>
                              <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.22em] text-white/55">
                                Add videoUrl in data
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="border-t border-white/10 px-4 py-4 text-center">
                        <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">
                          {event.title}
                        </h3>
                        <div className="mt-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                          Registration closed
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 sm:p-5">
                      <div className="flex items-center justify-between gap-3">
                        <span className={cn("rounded-full px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.28em] sm:px-3 sm:text-[10px]", accent.badge)}>
                          {badgeText}
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.28em] text-white/60 sm:px-3 sm:text-[10px]">
                          2026
                        </span>
                      </div>

                      <div className={cn("mx-auto mt-5 w-4/5 max-w-[220px] overflow-hidden rounded-full border-2 bg-white p-1.5 sm:mt-4 sm:w-full sm:max-w-none sm:p-2", accent.ring, isUpcoming && "ring-4 ring-[#51A70A]/10")}>
                        <div className="relative aspect-square w-full overflow-hidden rounded-full bg-white">
                          <Image
                            src={event.imageSrc}
                            alt={event.title}
                            fill
                            sizes="(max-width: 1280px) 50vw, 20vw"
                            className="object-cover"
                            priority={index < 2}
                          />
                        </div>
                      </div>

                      <h3 className="mt-4 text-center font-display text-xl font-semibold text-white sm:mt-5 sm:text-2xl">{event.title}</h3>
                      <p className="mt-2 text-center text-xs leading-relaxed text-white/75 sm:mt-3 sm:text-sm lg:text-white">
                        {isUpcoming ? event.location : event.title}
                      </p>
                      <p className="mt-2 text-center font-display text-base font-semibold text-white/90 sm:mt-3 sm:text-lg">{event.date}</p>
                      <a
                        href={registrationUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-gradient-brand px-4 py-3 text-sm font-bold text-base shadow-card transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-glow-violet focus-visible:shadow-[0_0_0_2px_#51A70A,0_0_0_5px_#050704]"
                      >
                        Registration open
                      </a>
                    </div>
                  )}
                </GlassCard>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal className="mt-8 sm:mt-10 lg:mt-12">
          <div className="relative overflow-hidden rounded-full border border-[#51A70A]/20 bg-white/[0.055] px-4 py-4 shadow-[0_18px_54px_rgba(0,0,0,0.34),0_0_44px_rgba(81,167,10,0.08)] backdrop-blur-xl sm:px-5">
            <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#8cef32]/70 to-transparent" />
            <div className="relative flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
              <div className="flex items-center gap-3">
                <span className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#51A70A]/25 bg-[#51A70A]/10 text-[#8cef32] shadow-[0_14px_36px_rgba(81,167,10,0.18)] sm:inline-flex">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="font-display text-base font-bold leading-snug text-white sm:text-lg">
                  Want Careerkick in your city? Tell us where to host our next counselling event.
                </p>
              </div>

              <Link
                href="/request-city"
                className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-bold text-base shadow-[0_16px_38px_rgba(81,167,10,0.24)] transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-glow-violet focus-visible:shadow-[0_0_0_2px_#51A70A,0_0_0_5px_#050704]"
              >
                Request your city
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function parseEventDate(dateText: string) {
  const parsed = new Date(dateText);
  return Number.isNaN(parsed.getTime()) ? new Date("9999-12-31T00:00:00Z") : parsed;
}

function startOfToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}
