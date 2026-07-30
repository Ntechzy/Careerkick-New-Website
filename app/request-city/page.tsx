import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { EventCityRequestForm } from "@/components/sections/EventCityRequestForm";
import { GradientText } from "@/components/ui/GradientText";
import { SectionLabel } from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Request Your City | Careerkick",
  description:
    "Request Careerkick to host a counselling event in your city.",
  alternates: {
    canonical: "/request-city",
  },
};

export default function RequestCityPage() {
  return (
    <main className="relative overflow-hidden bg-base px-4 py-section-mobile text-white md:px-8 md:py-section">
      <div className="absolute -left-28 top-16 h-80 w-80 rounded-full bg-violet/10 blur-[120px]" />
      <div className="absolute -right-28 top-20 h-96 w-96 rounded-full bg-cyan/10 blur-[130px]" />
      <div className="grid-overlay absolute inset-0 opacity-70" />

      <div className="relative mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
        <section>
          <SectionLabel>Request Your City</SectionLabel>
          <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            Bring Careerkick counselling to <GradientText>your city</GradientText>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg lg:text-white">
            Share your preferred city and contact details. Our team will use
            your request while planning upcoming counselling events.
          </p>

          <div className="mt-7 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.055] p-4 shadow-[0_16px_44px_rgba(0,0,0,0.22)] backdrop-blur-xl">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#51A70A]/25 bg-[#51A70A]/10 text-[#8cef32]">
              <MapPin className="h-5 w-5" aria-hidden="true" />
            </span>
            <p className="text-sm font-semibold leading-relaxed text-white sm:text-base">
              Fill the form once, and we will note your city request for future
              Careerkick event planning.
            </p>
          </div>
        </section>

        <EventCityRequestForm />
      </div>
    </main>
  );
}
