import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BriefcaseBusiness, Clock3, MapPin, Sparkles, Users2 } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { LOCAL_CAREER_OPENINGS, type CareerOpening } from "@/data/careers";
import { getCareerPostingsFromSanity } from "@/lib/sanityCareers";

export const metadata: Metadata = {
  title: "Careers | Careerkick",
  description:
    "Explore open roles at Careerkick and join a team focused on student admissions and growth.",
  alternates: {
    canonical: "/careers",
  },
};

const hiringNotes = [
  "Student-focused work culture",
  "Growth-minded team environment",
  "Full-time roles in Kanpur",
];

const defaultImage = "/logo-bg.png";

async function loadOpenings(): Promise<CareerOpening[]> {
  const sanityOpenings = await getCareerPostingsFromSanity();
  return sanityOpenings.length > 0 ? sanityOpenings : LOCAL_CAREER_OPENINGS;
}

export default async function CareersPage() {
  const openings = await loadOpenings();

  return (
    <main className="relative overflow-hidden bg-base px-3 pb-20 pt-24 sm:px-4 md:px-8 md:pb-24 md:pt-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[72%] -translate-x-1/2 rounded-full bg-[#51A70A]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -left-24 top-24 h-96 w-96 rounded-full bg-white/6 blur-[140px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(81,167,10,0.08),transparent_40%),linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent_18%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-8">
          <ScrollReveal>
            <div className="max-w-3xl">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-[#8cef32]">
                Careers
              </p>
              <h1 className="mt-4 max-w-2xl font-display text-3xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
                Build a career that helps students{" "}
                <span className="text-[#8cef32]">make better choices</span>.
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white sm:mt-6 sm:text-lg lg:text-white">
                Join a team that works closely with students, families, and
                admissions systems to create a calmer and smarter counselling
                experience.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08} className="lg:justify-self-end">
            <div className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03)),linear-gradient(135deg,rgba(11,16,9,0.88),rgba(18,26,16,0.78))] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:p-6">
              <div className="flex flex-wrap gap-2.5 sm:gap-3">
                {hiringNotes.map((note) => (
                  <span
                    key={note}
                    className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-[11px] font-medium text-white/75 sm:px-4 sm:text-xs"
                  >
                    {note}
                  </span>
                ))}
              </div>
              <div className="mt-4 grid gap-3 sm:mt-5 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <Users2 className="h-5 w-5 text-[#8cef32]" />
                  <p className="mt-3 text-2xl font-bold text-white">
                    {openings.length}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/50">
                    Open Roles
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <BriefcaseBusiness className="h-5 w-5 text-[#8cef32]" />
                  <p className="mt-3 text-2xl font-bold text-white">Full-time</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/50">
                    Job Type
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <MapPin className="h-5 w-5 text-[#8cef32]" />
                  <p className="mt-3 text-2xl font-bold text-white">Kanpur</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/50">
                    Location
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <section className="mt-10 sm:mt-12">
          <ScrollReveal>
            <div className="flex flex-col gap-2 sm:gap-3 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-[#8cef32]">
                  Open Positions
                </p>
                <h2 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
                  Current roles
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-relaxed text-white/62 md:max-w-md md:text-right">
                Showing live roles from Sanity when available. If no Sanity
                data is published, the local fallback roles below stay visible.
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-5 grid gap-4 sm:mt-6 sm:gap-5 lg:grid-cols-2">
            {openings.map((role, index) => (
              <ScrollReveal key={role.id} delay={index * 0.06}>
                <article className="group h-full overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03)),linear-gradient(135deg,rgba(11,16,9,0.94),rgba(18,26,16,0.82))] shadow-[0_22px_70px_rgba(0,0,0,0.42)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1">
                  <div className="relative h-60 overflow-hidden sm:h-72">
                    <Image
                      src={role.imageUrl || defaultImage}
                      alt={role.imageAlt || `${role.title} card image`}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,8,5,0.1),rgba(4,8,5,0.75))]" />
                    <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-3 p-4 sm:flex-row sm:items-end sm:justify-between sm:gap-4 sm:p-6">
                      <div className="max-w-[95%] sm:max-w-[75%]">
                        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8cef32]">
                          {role.department}
                        </p>
                        <h3 className="mt-2 max-w-[16ch] font-display text-xl font-bold leading-tight text-white sm:text-[2rem]">
                          {role.title}
                        </h3>
                      </div>
                      <span className="rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
                        {role.employmentType}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6">
                    <p className="text-sm leading-relaxed text-white sm:text-base lg:text-white">
                      {role.summary}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2">
                        <MapPin className="h-3.5 w-3.5 text-[#8cef32]" />
                        {role.location}
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2">
                        <Clock3 className="h-3.5 w-3.5 text-[#8cef32]" />
                        Immediate Opening
                      </span>
                    </div>

                    <div className="mt-5 grid gap-3 sm:gap-4 md:grid-cols-2">
                      <div className="rounded-[1.25rem] border border-white/10 bg-black/20 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8cef32]">
                          Responsibilities
                        </p>
                        <ul className="mt-3 space-y-2">
                          {role.responsibilities.map((item) => (
                            <li key={item} className="text-sm leading-relaxed text-white/72">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="rounded-[1.25rem] border border-white/10 bg-black/20 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8cef32]">
                          Requirements
                        </p>
                        <ul className="mt-3 space-y-2">
                          {role.requirements.map((item) => (
                            <li key={item} className="text-sm leading-relaxed text-white/72">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-sm text-white/60">
                        Published for Sanity sync and local fallback.
                      </p>
                      <Link
                        href="/contact"
                        className="inline-flex items-center justify-center rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow-violet sm:shrink-0"
                      >
                        {role.applyLabel ?? "Apply Now"}
                      </Link>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </section>

        <ScrollReveal>
          <section className="mt-10 rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl sm:p-6 md:mt-12 md:p-8">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-[#8cef32]">
              Why Careerkick
            </p>
            <div className="mt-4 grid gap-3 sm:gap-4 md:grid-cols-3">
              {[
                "Help students with a meaningful admission journey.",
                "Work with a team that values clarity and consistency.",
                "Grow inside a fast-moving education brand.",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[1.25rem] border border-white/10 bg-black/20 p-4 text-sm leading-relaxed text-white/72"
                >
                  {item}
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="mt-8 rounded-[1.75rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03)),linear-gradient(135deg,rgba(11,16,9,0.88),rgba(18,26,16,0.78))] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.38)] backdrop-blur-xl sm:p-6 md:p-8">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-[#8cef32]">
              Apply
            </p>
            <h2 className="mt-3 max-w-xl font-display text-2xl font-bold leading-tight text-white sm:text-3xl">
              Interested in joining the team?
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white sm:text-base lg:text-white">
              Send your resume through the contact page and mention the role
              you want to apply for. We will review the current openings and
              get back to you.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow-violet sm:w-auto"
            >
              Contact Us
            </Link>
          </section>
        </ScrollReveal>
      </div>
    </main>
  );
}
