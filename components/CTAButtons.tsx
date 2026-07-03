"use client";

import { MagneticButton } from "@/components/ui/MagneticButton";

export function CTAButtons() {
  return (
    <div className="mx-auto mt-8 flex w-full max-w-2xl flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
      <MagneticButton className="w-full px-7 py-4 font-display text-base sm:w-auto">
        Start Your Counselling Journey
      </MagneticButton>
      <a
        href="#pricing"
        className="inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-6 py-4 text-sm font-semibold text-violet/90 backdrop-blur-xl transition-colors hover:border-violet/40 hover:text-[#444444] focus-visible:shadow-[0_0_0_2px_#C4F017,0_0_0_5px_#050704] sm:w-auto"
      >
        Explore Counselling Packages
      </a>
    </div>
  );
}
