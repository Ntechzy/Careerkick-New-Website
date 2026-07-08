import { AppDownloadSection } from "@/components/sections/AppDownloadSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { AdmissionGuidanceSection } from "@/components/sections/AdmissionGuidanceSection";
import { CollegeSection } from "@/components/sections/CollegeSection";
import GoodbyeSection from "@/components/sections/GoodByeSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { PlatformSection } from "@/components/sections/PlatformSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { StudentImageTestimonialsSection } from "@/components/sections/StudentImageTestimonialsSection";
import { WebinarsSection } from "@/components/sections/WebinarsSection";
import { CounsellingProcessSection } from "@/components/CounsellingProcessSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { EventsSection } from "@/components/sections/EventsSection";
import { ImportantEventsSection } from "@/components/sections/ImportantEventsSection";
import { EBookButton } from "@/components/EBookButton";
import { AdmittedStudentsSection } from "@/components/sections/AdmittedStudentsSection";
import { OfficesSection } from "@/components/sections/OfficesSection";
import { CounsellingMistakesSection } from "@/components/sections/CounsellingMistakesSection";
import { MidHomepageCtaSection } from "@/components/sections/MidHomepageCtaSection";
import OfficeMapSection from "@/components/OfficeMapSection";
import { getLatestPosts } from "@/lib/wordpress";
import { getCounsellingNotifications } from "@/lib/sanityNotifications";

export default async function Home() {
  const latestPosts = await getLatestPosts(6);
  const counsellingNotifications = await getCounsellingNotifications();

  return (
    <>
      <EBookButton />
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <MidHomepageCtaSection />
      <CounsellingMistakesSection />
      <GoodbyeSection />
      <ServicesSection />
      <CounsellingProcessSection
        blogPosts={latestPosts}
        notifications={counsellingNotifications}
      />
      <AdmissionGuidanceSection />
      <TestimonialsSection />
      <StudentImageTestimonialsSection />
      <ImportantEventsSection />
      <EventsSection />
      <OfficeMapSection />
      <AdmittedStudentsSection />
      <FaqSection />
      {/* <HowItWorksSection /> */}
      {/* <PlatformSection /> */}
      {/* <CollegeSection /> */}
      {/* <WebinarsSection /> */}
      {/* <PricingSection /> */}
      {/* <AppDownloadSection /> */}
    </>
  );
}

