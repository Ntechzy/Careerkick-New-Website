"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Download, ExternalLink, FileText, GraduationCap, X, ZoomIn, ZoomOut } from "lucide-react";

const pdfUrl = "/top_20_bams_college_list_popup.pdf";

export function BamsCollegePopup() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);

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
      className="m-auto max-h-[92dvh] w-[calc(100vw-1.5rem)] max-w-[1000px] overflow-hidden rounded-2xl border border-white/15 bg-[#0b1608] p-0 text-white shadow-[0_32px_120px_rgba(0,0,0,0.5)] backdrop:bg-black/75 backdrop:backdrop-blur-sm sm:w-[calc(100vw-3rem)] sm:rounded-3xl"
    >
      <div className="flex h-[min(680px,92dvh)] flex-col sm:h-[min(820px,92dvh)]" data-lenis-prevent>
        <header className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-6 sm:py-4">
          <span id="bams-popup-title" className="flex min-w-0 flex-wrap items-center gap-1.5 text-[10px] font-semibold tracking-wide text-[#c8d4c1] min-[360px]:text-xs sm:gap-2 sm:text-sm">
            <GraduationCap className="h-5 w-5 shrink-0 text-[#8ce044]" aria-hidden="true" />
            CAREERKICK <span className="text-white/25">/</span> COLLEGE GUIDE
          </span>
          <button
            type="button"
            autoFocus
            onClick={() => setOpen(false)}
            aria-label="Close college guide popup"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/15"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </header>

          <section aria-label="College list PDF preview" className="flex min-h-0 flex-1 flex-col bg-[#e9eee6]">
            <div className="flex shrink-0 items-center justify-between border-b border-[#d9e2d3] bg-[#f5f8f2] px-4 py-2.5 text-[11px] font-medium text-[#52644b] sm:px-5">
              <span className="flex items-center gap-1.5"><FileText className="h-3.5 w-3.5" aria-hidden="true" /> PDF preview</span>
              <button type="button" onClick={() => setZoomed((value) => !value)} aria-pressed={zoomed} className="inline-flex min-h-11 items-center gap-1.5 rounded-md px-2 text-[#365f20] transition-colors hover:bg-[#e4eddd]">
                {zoomed ? <ZoomOut className="h-4 w-4" aria-hidden="true" /> : <ZoomIn className="h-4 w-4" aria-hidden="true" />}
                {zoomed ? "Fit to width" : "Zoom preview"}
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-auto overscroll-contain p-2 sm:p-4" tabIndex={0} aria-label="Scrollable PDF page preview">
              <a href={pdfUrl} target="_blank" rel="noopener noreferrer" aria-label="Open full-size college list PDF in a new tab" className={`block overflow-hidden rounded-sm bg-white shadow-lg ${zoomed ? "w-[1100px]" : "w-full"}`}>
                <Image
                  src="/top_20_bams_college_list_popup-preview.webp"
                  alt="Preview of the Top 20 BAMS Colleges list. Open the full PDF to read or download all college details."
                  width={1600}
                  height={1237}
                  sizes="(max-width: 1023px) 95vw, 1000px"
                  className="h-auto w-full"
                  unoptimized
                  loading="eager"
                />
              </a>
            </div>
          </section>

        <footer className="grid shrink-0 grid-cols-1 gap-2 border-t border-white/10 bg-[#0b1608] p-3 min-[360px]:grid-cols-2 sm:gap-3 sm:p-5">
          <a href={pdfUrl} download="Top-20-BAMS-Colleges.pdf" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#6dcc12] px-3 py-3 text-sm font-bold text-[#102207] transition-colors hover:bg-[#8ce044]">
            <Download className="h-4 w-4" aria-hidden="true" /> Download PDF
          </a>
          <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-3 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">
            <ExternalLink className="h-4 w-4" aria-hidden="true" /> Open full PDF
          </a>
        </footer>
      </div>
    </dialog>
  );
}
