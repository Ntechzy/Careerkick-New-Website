import type { Metadata } from "next";
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
// import { StudentImageTestimonialsSection } from "@/components/sections/StudentImageTestimonialsSection";
import { WebinarsSection } from "@/components/sections/WebinarsSection";
import { CounsellingProcessSection } from "@/components/CounsellingProcessSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { EventsSection } from "@/components/sections/EventsSection";
import { ImportantEventsSection } from "@/components/sections/ImportantEventsSection";
import { EBookButton } from "@/components/EBookButton";
import { IntroAnimation } from "@/components/IntroAnimation";
import { AdmittedStudentsSection } from "@/components/sections/AdmittedStudentsSection";
import { OfficesSection } from "@/components/sections/OfficesSection";
import { CounsellingMistakesSection } from "@/components/sections/CounsellingMistakesSection";
import { MidHomepageCtaSection } from "@/components/sections/MidHomepageCtaSection";
import OfficeMapSection from "@/components/OfficeMapSection";
import { getLatestPosts } from "@/lib/wordpress";
import { getCounsellingNotifications } from "@/lib/sanityNotifications";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    type: "website",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
};

export default async function Home() {
  const [latestPosts, counsellingNotifications] = await Promise.all([
    getLatestPosts(6),
    getCounsellingNotifications(),
  ]);

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.ogImage}`,
    sameAs: [],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <IntroAnimation />
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
      <ProcessSection />
      <AdmittedStudentsSection />
      <TestimonialsSection />
      {/* <StudentImageTestimonialsSection /> */}
      <ImportantEventsSection />
      <EventsSection />
      <FaqSection />
      <OfficeMapSection />
      {/* <HowItWorksSection /> */}
      {/* <PlatformSection /> */}
      {/* <CollegeSection /> */}
      {/* <WebinarsSection /> */}
      {/* <PricingSection /> */}
      {/* <AppDownloadSection /> */}
    </>
  );
}

