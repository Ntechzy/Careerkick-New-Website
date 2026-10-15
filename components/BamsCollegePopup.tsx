"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Download, ArrowUpRight, ScanLine, X, ZoomIn, ZoomOut, MoveHorizontal } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const imageUrl = "/top_20_bams_college_list_popup.webp";

export function BamsCollegePopup() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const showPopup = () => setOpen(true);
    window.addEventListener("careerkick:intro-complete", showPopup);
    return () => window.removeEventListener("careerkick:intro-complete", showPopup);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !dialog) return;

    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";

    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="bams-popup-title"
      onCancel={() => setOpen(false)}
      onClose={() => setOpen(false)}
      onClick={(event) => {
        if (event.target === event.currentTarget) setOpen(false);
      }}
      data-lenis-prevent
      className="m-auto max-h-[92dvh] w-[calc(100vw-1.25rem)] max-w-[560px] overflow-hidden rounded-[24px] border border-[#b8e38c]/40 bg-[#102315] p-0 text-white shadow-[0_0_0_1px_rgba(182,226,143,0.08),0_40px_140px_rgba(0,0,0,0.65),0_0_100px_rgba(109,204,18,0.12)] backdrop:bg-[#020a05]/80 backdrop:backdrop-blur-md sm:w-[min(560px,72dvh)] sm:rounded-[32px]"
    >
      <motion.div
        initial={false}
        animate={{ opacity: open ? 1 : 0, y: open ? 0 : 16 }}
        transition={{ duration: reduceMotion ? 0 : 0.3 }}
        className="flex h-[min(740px,92dvh)] min-w-0 flex-col sm:h-[min(860px,92dvh)]"
      >
        <header className="relative isolate shrink-0 overflow-hidden px-4 pb-4 pt-5 sm:px-7 sm:pb-6 sm:pt-7">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(157,226,88,0.22),transparent_65%),linear-gradient(120deg,#17351d,#0b1c12)]" />
          <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-24 -z-10 h-64 w-64 rounded-full border-[32px] border-[#b6eb81]/[0.06] sm:right-16" />
          <div aria-hidden="true" className="mb-3 h-1 w-9 rounded-full bg-[#b9ee83] sm:mb-5 sm:w-12" />
          <h2 id="bams-popup-title" className="pr-10 text-[clamp(1rem,4.3vw,1.25rem)] font-bold leading-relaxed tracking-tight text-[#f3f9e9] sm:pr-12 sm:text-2xl sm:leading-snug">
            Round 1 Prefrence List / Choice Filling / Year of Establishment
          </h2>
          <button
            type="button"
            autoFocus
            onClick={() => setOpen(false)}
            aria-label="Close college guide popup"
            className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.08] text-[#e2edda] backdrop-blur-sm transition-colors hover:bg-white/20 sm:right-5 sm:top-5"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </header>

          <section aria-label="College list image" className="mx-2 flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-[18px] border border-white/10 bg-[#f2f5eb] sm:mx-3 sm:rounded-[24px]">
            <div className="flex shrink-0 flex-wrap items-center justify-between gap-x-1 border-b border-[#213a1c]/10 bg-[#fbfdf7] px-2 py-1.5 sm:px-5 sm:py-2">
              <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.1em] text-[#47613e] sm:text-xs"><ScanLine className="h-4 w-4 shrink-0" aria-hidden="true" /> COLLEGE LIST</span>
              <button type="button" onClick={() => setZoomed((value) => !value)} aria-controls="bams-image-viewport" aria-pressed={zoomed} className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full border border-[#d5e3c8] bg-[#eaf2e2] px-2.5 text-[11px] font-semibold text-[#365f20] transition-colors hover:bg-[#e0e9d6] active:scale-95 sm:px-3 sm:text-xs">
                {zoomed ? <ZoomOut className="h-4 w-4" aria-hidden="true" /> : <ZoomIn className="h-4 w-4" aria-hidden="true" />}
                {zoomed ? "Fit to screen" : "Zoom image"}
              </button>
            </div>
            <div id="bams-image-viewport" className="min-h-0 min-w-0 flex-1 overflow-auto overscroll-contain bg-[radial-gradient(#27451e14_1px,transparent_1px)] bg-[size:16px_16px] p-1.5 [-webkit-overflow-scrolling:touch] sm:p-4" tabIndex={0} aria-label="Scrollable college list image">
              <a href={imageUrl} target="_blank" rel="noopener noreferrer" aria-label="Open full-size college list image in a new tab" className={`relative mx-auto block overflow-hidden rounded-xl border border-[#dce5d2] bg-white shadow-[0_8px_30px_rgba(25,49,16,0.1)] ${zoomed ? "w-[1650px]" : "w-full"}`}>
                <Image
                  src={imageUrl}
                  alt="Top 20 BAMS colleges with seat intake, year of establishment, and expected cutoff."
                  width={1650}
                  height={1275}
                  sizes="(max-width: 575px) 95vw, 560px"
                  className="h-auto w-full"
                  unoptimized
                  loading="eager"
                />
              </a>
            </div>
            <p className="flex shrink-0 items-center justify-center gap-1.5 border-t border-[#213a1c]/10 bg-[#fbfdf7] px-2 py-2 text-center text-[10px] leading-relaxed text-[#52664a] sm:text-xs" aria-live="polite">
              <MoveHorizontal className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              {zoomed ? "Swipe or scroll to explore the enlarged list" : "Use zoom to read the college details"}
            </p>
          </section>

        <footer className="grid shrink-0 grid-cols-1 gap-1 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 sm:grid-cols-2 sm:gap-3 sm:px-6 sm:pb-5 sm:pt-4 [@media(max-height:500px)]:grid-cols-2">
          <a href={imageUrl} download="Top-20-BAMS-Colleges.webp" className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[#c3f28e] px-3 py-3 text-sm font-bold text-[#183110] shadow-[0_4px_20px_rgba(180,234,117,0.12)] transition-colors hover:bg-[#d4ffa7] active:bg-[#b3e378]">
            <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" /> Download image
          </a>
          <a href={imageUrl} target="_blank" rel="noopener noreferrer" className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-transparent px-3 py-2.5 text-xs font-semibold text-[#d7e8c9] transition-colors hover:bg-white/10 active:bg-white/15 sm:min-h-12 sm:border-[#c3f28e]/25 sm:bg-white/5 sm:text-sm">
            View full image <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
        </footer>
      </motion.div>
    </dialog>
  );
}
