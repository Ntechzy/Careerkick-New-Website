"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { MagneticButton } from "@/components/ui/MagneticButton";
import {
  COUNSELLING_PACKAGES,
  COUNSELLING_PAYMENT_NOTES,
  formatIndianCurrency,
} from "@/lib/counsellingPackages";
import { getWhatsAppLink } from "@/lib/contactLinks";

type CounsellingPackagesModalProps = {
  onClose: () => void;
};

export function CounsellingPackagesModal({ onClose }: CounsellingPackagesModalProps) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div
      data-lenis-prevent
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 px-3 py-4 backdrop-blur-md sm:px-5 sm:py-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="counselling-packages-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        data-lenis-prevent
        className="relative flex max-h-[calc(100dvh-1.5rem)] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#fafaf6] text-slate-900 shadow-[0_30px_90px_rgba(0,0,0,0.45)]"
      >
        <div className="shrink-0 border-b border-slate-200 bg-[#fafaf6]/95 px-4 py-4 text-center backdrop-blur sm:px-6 sm:py-5">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-bold text-slate-700 transition-colors hover:border-[#56b016]/40 hover:text-[#56b016] sm:right-4 sm:top-4"
            aria-label="Close counselling packages"
          >
            X
          </button>
          <p className="px-10 font-mono text-[10px] font-semibold uppercase tracking-[0.32em] text-[#56b016] sm:text-xs">
            Paid Counselling
          </p>
          <h2 id="counselling-packages-title" className="mx-auto mt-2 max-w-3xl px-2 font-display text-2xl font-bold leading-tight text-slate-950 sm:text-3xl lg:text-[2.35rem]">
            Designed for Medical & Allied Courses
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Choose the support that matches your course, budget, and admission goals.
          </p>
        </div>

        <div
          data-lenis-prevent
          className="min-h-0 flex-1 overscroll-contain overflow-y-auto px-4 py-4 sm:px-6 sm:py-5"
          onTouchMove={(event) => event.stopPropagation()}
          onWheel={(event) => event.stopPropagation()}
        >
          <div className="mx-auto mb-4 max-w-4xl rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-left shadow-[0_12px_30px_rgba(220,38,38,0.08)]">
            <ul className="list-disc space-y-1.5 pl-5 text-sm font-semibold leading-relaxed text-red-700">
              {COUNSELLING_PAYMENT_NOTES.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
          <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-3 md:gap-5">
            {COUNSELLING_PACKAGES.map((item) => (
              <article
                key={item.id}
                className={`flex min-h-[19rem] flex-col rounded-2xl border bg-white p-5 text-center shadow-[0_14px_38px_rgba(0,0,0,0.08)] transition-transform duration-300 hover:-translate-y-1 md:min-h-[21rem] ${
                  item.highlight ? "border-[#56b016]/35 ring-1 ring-[#56b016]/20" : "border-slate-200"
                }`}
              >
                {item.highlight && (
                  <span className="mx-auto mb-3 w-fit rounded-full bg-[#56b016] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
                    Most Popular
                  </span>
                )}
                <h3 className="mx-auto max-w-[16rem] font-display text-xl font-semibold leading-tight text-slate-950 md:text-[1.35rem]">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm font-semibold text-[#56b016]">
                  {item.subtitle}
                </p>
                <p className="mx-auto mt-3 max-w-[17rem] text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>
                <div className="mt-auto pt-5">
                  <p className="font-display text-3xl font-bold leading-none text-[#56b016]">
                    {formatIndianCurrency(item.baseAmount)}
                  </p>
                  {(item.taxRate ?? 0.18) > 0 ? (
                    <p className="mt-1 h-4 text-xs uppercase tracking-[0.18em] text-slate-400">
                      +GST
                    </p>
                  ) : (
                    <span aria-hidden="true" className="mt-1 block h-4" />
                  )}
                  <Link
                    href={`/checkout?package=${item.id}`}
                    onClick={onClose}
                    className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[#56b016] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#4b9914]"
                  >
                    Select Plan
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <div className="hidden">
            <ul className="space-y-2 text-sm font-semibold leading-relaxed text-red-700">
              {COUNSELLING_PAYMENT_NOTES.map((note) => (
                <li key={note} className="flex gap-2">
                  <span aria-hidden="true">•</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export function CTAButtons() {
  const [packagesOpen, setPackagesOpen] = useState(false);

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

      {packagesOpen ? (
        <CounsellingPackagesModal onClose={() => setPackagesOpen(false)} />
      ) : null}
    </>
  );
}
