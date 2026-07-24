"use client";

import { useEffect, useState } from "react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { getWhatsAppLink } from "@/lib/contactLinks";

const packages = [
  {
    title: "Ayush Counselling",
    description: "Govt + Private Colleges",
    price: "INR 25,000",
    highlight: false,
  },
  {
    title: "MBBS Counselling (Govt College)",
    description: "Complete admission support",
    price: "INR 30,000",
    highlight: true,
  },
  {
    title: "MBBS Counselling (Private College)",
    description: "Complete admission support",
    price: "INR 50,000",
    highlight: false,
  },
  {
    title: "BDS / BSc Nursing / Veterinary / BPT",
    description: "All-inclusive counselling support",
    price: "INR 20,000",
    highlight: false,
  },
] as const;

export function CTAButtons() {
  const [packagesOpen, setPackagesOpen] = useState(false);

  useEffect(() => {
    if (!packagesOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPackagesOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [packagesOpen]);

  return (
    <>
      <div className="mx-auto mt-8 flex w-full max-w-2xl flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
        <MagneticButton
          href={getWhatsAppLink("Hello, I want to start my counselling journey.")}
          className="w-full px-7 py-4 font-display text-base sm:w-auto"
        >
          Start Your Counselling Journey
        </MagneticButton>
        <button
          type="button"
          onClick={() => setPackagesOpen(true)}
          className="inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-6 py-4 text-sm font-semibold text-violet/90 backdrop-blur-xl transition-colors hover:border-violet/40 hover:text-[#444444] focus-visible:shadow-[0_0_0_2px_#51A70A,0_0_0_5px_#050704] sm:w-auto"
        >
          Explore Counselling Packages
        </button>
      </div>

      {packagesOpen && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 px-3 py-4 backdrop-blur-md sm:px-5"
          role="dialog"
          aria-modal="true"
          aria-labelledby="counselling-packages-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setPackagesOpen(false);
            }
          }}
        >
          <div className="relative flex max-h-[calc(100dvh-2rem)] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#fafaf6] text-slate-900 shadow-[0_30px_90px_rgba(0,0,0,0.45)]">
            <div className="sticky top-0 z-10 border-b border-slate-200 bg-[#fafaf6]/95 px-4 py-4 backdrop-blur sm:px-6">
              <button
                type="button"
                onClick={() => setPackagesOpen(false)}
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-bold text-slate-700 transition-colors hover:border-[#56b016]/40 hover:text-[#56b016] sm:right-4 sm:top-4"
                aria-label="Close counselling packages"
              >
                X
              </button>
              <p className="pr-12 font-mono text-[10px] font-semibold uppercase tracking-[0.32em] text-[#56b016] sm:text-xs">
                Paid Counselling
              </p>
              <h2 id="counselling-packages-title" className="mt-2 pr-12 font-display text-2xl font-bold leading-tight text-slate-950 sm:text-3xl md:text-4xl">
                Designed for Medical & Allied Courses
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
                Choose the support that matches your course, budget, and admission goals.
              </p>
            </div>

            <div className="overflow-y-auto px-4 py-5 sm:px-6 sm:py-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {packages.map((item) => (
                  <article
                    key={item.title}
                    className={`flex min-h-[15rem] flex-col rounded-2xl border bg-white p-5 shadow-[0_14px_38px_rgba(0,0,0,0.08)] ${
                      item.highlight ? "border-[#56b016]/35 ring-1 ring-[#56b016]/20" : "border-slate-200"
                    }`}
                  >
                    {item.highlight && (
                      <span className="mb-4 w-fit rounded-full bg-[#56b016] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
                        Most Popular
                      </span>
                    )}
                    <h3 className="font-display text-xl font-semibold leading-tight text-slate-950">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {item.description}
                    </p>
                    <div className="mt-auto pt-6">
                      <p className="font-display text-2xl font-bold text-[#56b016]">
                        {item.price}
                      </p>
                      <a
                        href={getWhatsAppLink(`Hello, I am interested in the ${item.title} plan priced at ${item.price}. Could you please provide more details?`)}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-[#56b016] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#4b9914]"
                      >
                        Get Guidance
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

