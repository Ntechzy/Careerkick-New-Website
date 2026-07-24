"use client";

import Image from "next/image";
import Link from "next/link";
import {
  BriefcaseBusiness,
  Clock3,
  MapPin,
  Search,
  Users2,
} from "lucide-react";
import { useMemo, useState } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";
import type { CareerOpening } from "@/data/careers";

const hiringNotes = [
  "Student-focused work culture",
  "Growth-minded team environment",
  "Full-time roles in Kanpur",
];

const defaultImage = "/logo-bg.png";

type CareersViewProps = {
  openings: CareerOpening[];
};

export function CareersView({ openings }: CareersViewProps) {
  const [query, setQuery] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("All");

  const domains = useMemo(
    () => ["All", ...Array.from(new Set(openings.map((role) => role.department)))],
    [openings],
  );

  const filteredOpenings = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return openings.filter((role) => {
      const matchesDomain =
        selectedDomain === "All" || role.department === selectedDomain;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        role.title.toLowerCase().includes(normalizedQuery) ||
        role.department.toLowerCase().includes(normalizedQuery);

      return matchesDomain && matchesQuery;
    });
  }, [openings, query, selectedDomain]);

  return (
    <main className="relative overflow-hidden bg-base px-3 pb-20 pt-24 sm:px-4 md:px-8 md:pb-24 md:pt-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[72%] -translate-x-1/2 rounded-full bg-[#51A70A]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -left-24 top-24 h-96 w-96 rounded-full bg-white/6 blur-[140px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(81,167,10,0.08),transparent_40%),linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent_18%)]" />

      <div className="relative mx-auto max-w-7xl">
        <ScrollReveal>
          <section className="mx-auto max-w-5xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-[#8cef32]">
              Careers
            </p>
            <h1 className="mx-auto mt-4 max-w-3xl font-display text-3xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
              Build a career that helps students{" "}
              <span className="text-[#8cef32]">make better choices</span>.
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-white sm:mt-6 sm:text-lg">
              Join a team that works closely with students, families, and
              admissions systems to create a calmer and smarter counselling
              experience.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-2.5 sm:gap-3">
              {hiringNotes.map((note) => (
                <span
                  key={note}
                  className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-[11px] font-medium text-white/75 sm:px-4 sm:text-xs"
                >
                  {note}
                </span>
              ))}
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <section className="mx-auto mt-8 max-w-4xl rounded-[1.75rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03)),linear-gradient(135deg,rgba(11,16,9,0.88),rgba(18,26,16,0.78))] p-4 text-center shadow-[0_20px_60px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:p-6">
            <div className="grid gap-3 sm:grid-cols-3">
              <StatCard
                icon={<Users2 className="h-5 w-5" />}
                value={`${openings.length}`}
                label="Open Roles"
              />
              <StatCard
                icon={<BriefcaseBusiness className="h-5 w-5" />}
                value="Full-time"
                label="Job Type"
              />
              <StatCard
                icon={<MapPin className="h-5 w-5" />}
                value="Kanpur"
                label="Location"
              />
            </div>
          </section>
        </ScrollReveal>

        <section className="mt-10 sm:mt-12">
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-[#8cef32]">
                Open Positions
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
                Find your role by title or domain
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/68">
                Search by job title, filter by domain, and explore roles that
                match how you want to contribute to Careerkick.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.06}>
            <div className="mx-auto mt-6 max-w-5xl rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-3 backdrop-blur-xl sm:p-4">
              <div className="grid gap-3 lg:grid-cols-[1fr_auto] lg:items-center">
                <label className="relative block">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8cef32]" />
                  <span className="sr-only">Search jobs by title or domain</span>
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search by title or domain"
                    className="h-13 w-full rounded-full border border-white/10 bg-black/24 py-3 pl-12 pr-4 text-sm font-semibold text-white placeholder:text-white/42"
                  />
                </label>

                <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                  {domains.map((domain) => (
                    <button
                      key={domain}
                      type="button"
                      onClick={() => setSelectedDomain(domain)}
                      className={cn(
                        "shrink-0 rounded-full border px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] transition-colors",
                        selectedDomain === domain
                          ? "border-[#51A70A]/45 bg-[#51A70A]/18 text-white"
                          : "border-white/10 bg-black/20 text-white/62 hover:text-white",
                      )}
                    >
                      {domain}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div className="mt-6 grid gap-4 sm:gap-5 lg:grid-cols-2">
            {filteredOpenings.map((role, index) => (
              <ScrollReveal key={role.id} delay={index * 0.04}>
                <JobCard role={role} />
              </ScrollReveal>
            ))}
          </div>

          {filteredOpenings.length === 0 && (
            <div className="mx-auto mt-8 max-w-2xl rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-8 text-center">
              <p className="font-display text-xl font-bold text-white">
                No matching roles found
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/64">
                Try a different title or select another domain.
              </p>
            </div>
          )}
        </section>

        <ScrollReveal>
          <section className="mt-10 rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5 text-center backdrop-blur-xl sm:p-6 md:mt-12 md:p-8">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-[#8cef32]">
              Why Careerkick
            </p>
            <div className="mt-4 grid gap-3 text-left sm:gap-4 md:grid-cols-3">
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
          <section className="mt-8 rounded-[1.75rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03)),linear-gradient(135deg,rgba(11,16,9,0.88),rgba(18,26,16,0.78))] p-5 text-center shadow-[0_20px_60px_rgba(0,0,0,0.38)] backdrop-blur-xl sm:p-6 md:p-8">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-[#8cef32]">
              Apply
            </p>
            <h2 className="mx-auto mt-3 max-w-xl font-display text-2xl font-bold leading-tight text-white sm:text-3xl">
              Interested in joining the team?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white sm:text-base lg:text-white">
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

function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#51A70A]/12 text-[#8cef32]">
        {icon}
      </div>
      <p className="mt-3 text-2xl font-bold text-white">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/50">
        {label}
      </p>
    </div>
  );
}

function JobCard({ role }: { role: CareerOpening }) {
  return (
    <article className="group h-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03)),linear-gradient(135deg,rgba(11,16,9,0.94),rgba(18,26,16,0.82))] shadow-[0_22px_70px_rgba(0,0,0,0.42)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1">
      <div className="flex h-full flex-col">
        <div className="relative aspect-[16/9] overflow-hidden bg-black/24">
          <Image
            src={role.imageUrl || defaultImage}
            alt={role.imageAlt || `${role.title} card image`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,8,5,0.02),rgba(4,8,5,0.48))]" />
          <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/45 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur">
            {role.employmentType}
          </div>
        </div>

        <div className="flex flex-1 min-w-0 flex-col p-5 sm:p-6">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8cef32]">
            {role.department}
          </p>
          <h3 className="mt-2 font-display text-2xl font-bold leading-tight text-white">
            {role.title}
          </h3>

          <p className="mt-4 text-sm leading-relaxed text-white/76">
            {role.summary}
          </p>

          <div className="mt-4 flex flex-wrap gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2">
              <MapPin className="h-3.5 w-3.5 text-[#8cef32]" />
              {role.location}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2">
              <Clock3 className="h-3.5 w-3.5 text-[#8cef32]" />
              Immediate Opening
            </span>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <DetailList title="Responsibilities" items={role.responsibilities} />
            <DetailList title="Requirements" items={role.requirements} />
          </div>

          <div className="mt-auto flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-white/60">Apply through the contact page.</p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow-violet sm:shrink-0"
            >
              {role.applyLabel ?? "Apply Now"}
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[1.25rem] border border-white/10 bg-black/20 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8cef32]">
        {title}
      </p>
      <ul className="mt-3 space-y-2">
        {items.slice(0, 3).map((item) => (
          <li key={item} className="text-sm leading-relaxed text-white/72">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
