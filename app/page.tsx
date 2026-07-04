import { AppDownloadSection } from "@/components/sections/AppDownloadSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { AdmissionGuidanceSection } from "@/components/sections/AdmissionGuidanceSection";
import AppShowcaseSection from "@/components/sections/AppShowcaseSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { CollegeSection } from "@/components/sections/CollegeSection";
import GoodbyeSection from "@/components/sections/GoodByeSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { PlatformSection } from "@/components/sections/PlatformSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { WebinarsSection } from "@/components/sections/WebinarsSection";
import { CounsellingProcessSection } from "@/components/CounsellingProcessSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { EventsSection } from "@/components/sections/EventsSection";
import { ImportantEventsSection } from "@/components/sections/ImportantEventsSection";
import { EBookButton } from "@/components/EBookButton";
import { BlogsSection } from "@/components/home/BlogsSection";

export default function Home() {
  return (
    <>
      <EBookButton />
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <ServicesSection />
      <CounsellingProcessSection />
      <AdmissionGuidanceSection />
      <GoodbyeSection />
      <TestimonialsSection />
      <ImportantEventsSection />
      <EventsSection />
      <AppShowcaseSection />
      <BlogsSection />
      <FaqSection />
      {/* <HowItWorksSection /> */}
      {/* <PlatformSection /> */}
      {/* <CollegeSection /> */}
      {/* <WebinarsSection /> */}
      {/* <PricingSection /> */}
      {/* <BlogSection /> */}
      {/* <AppDownloadSection /> */}
    </>
  );
}

