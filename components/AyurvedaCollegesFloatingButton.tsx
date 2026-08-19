import { GraduationCap } from "lucide-react";

export function AyurvedaCollegesFloatingButton() {
  return (
    <a
      href="/ayurveda-colleges-2026-27"
      aria-label="Open Ayurveda Colleges"
      className="fixed bottom-4 right-4 z-[95] inline-flex h-16 w-16 flex-col items-center justify-center gap-1 rounded-full border border-[#51A70A]/30 bg-gradient-brand pt-0.5 font-display text-[11px] font-extrabold uppercase leading-none text-base shadow-[0_16px_36px_rgba(81,167,10,0.24)] transition-transform duration-300 hover:scale-[1.04] hover:shadow-glow-violet focus-visible:shadow-[0_0_0_2px_#51A70A,0_0_0_5px_#050704] sm:bottom-6 sm:right-6 sm:h-14 sm:w-auto sm:flex-row sm:gap-2 sm:px-5 sm:pt-0 sm:text-sm sm:normal-case lg:h-16 lg:px-6"
    >
      <GraduationCap className="h-5 w-5 shrink-0 sm:h-5 sm:w-5" aria-hidden="true" />
      <span className="tracking-[0.08em] sm:hidden">BAMS</span>
      <span className="hidden leading-tight sm:inline">
        Ayurveda Colleges
      </span>
    </a>
  );
}
