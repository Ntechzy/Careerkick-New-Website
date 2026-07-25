import type { Metadata } from "next";
import HeroOurResults from "@/components/our-results/HeroOurResults";
import PositioningSection from "@/components/our-results/PositioningSection";
import AdmissionGraph from "@/components/our-results/AdmissionGraph";
import PartnerMarquee from "@/components/our-results/PartnerMarquee";
import AchievementsSection from "@/components/our-results/AchievementsSection";
import HowWork from "@/components/our-results/HowWork";
import RevenueImpact from "@/components/our-results/RevenueImpact";
import SmoothManagementSection from "@/components/our-results/SmoothManagementSection";
import ExpertTeamPortalSection from "@/components/our-results/ExpertTeamPortalSection";
import SuccessStories from "@/components/our-results/SuccessStories";
import { DataShow } from "@/components/our-results/DataShow";
// import BenefitsSection from "@/components/our-results/BenefitsSection";
// import ValueAddedServices from "@/components/our-results/ValueAddedServices";
import ThoughtLeadership from "@/components/our-results/ThoughtLeadership";
import TestimonialSection from "@/components/our-results/TestimonialSection";
import SocialPresence from "@/components/our-results/SocialPresence";
import CTASection from "@/components/our-results/CTASection";
import ContactSection from "@/components/our-results/ContactSection";

export const metadata: Metadata = {
  title: "Our Results | Careerkick",
  description:
    "See Careerkick results, counselling capabilities, student outcomes, and decision support areas.",
  alternates: {
    canonical: "/our-results",
  },
};

export default function OurResultsPage() {
  return (
    <>
      <HeroOurResults />
      <PositioningSection />
      <AdmissionGraph />
      <PartnerMarquee />
      <AchievementsSection />
      <HowWork />
      <RevenueImpact />
      <SmoothManagementSection />
      <ExpertTeamPortalSection />
      <SuccessStories />
      <DataShow />
      {/* <BenefitsSection /> */}
      {/* <ValueAddedServices /> */}
      <ThoughtLeadership />
      <TestimonialSection />
      <SocialPresence />
      <CTASection />
      <ContactSection />
    </>
  );
}
