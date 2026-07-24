import type { Metadata } from "next";
import { CareersView } from "@/components/careers/CareersView";
import { LOCAL_CAREER_OPENINGS, type CareerOpening } from "@/data/careers";
import { getCareerPostingsFromSanity } from "@/lib/sanityCareers";

export const metadata: Metadata = {
  title: "Careers | Careerkick",
  description:
    "Explore open roles at Careerkick and join a team focused on student admissions and growth.",
  alternates: {
    canonical: "/careers",
  },
};

async function loadOpenings(): Promise<CareerOpening[]> {
  const sanityOpenings = await getCareerPostingsFromSanity();
  return sanityOpenings.length > 0 ? sanityOpenings : LOCAL_CAREER_OPENINGS;
}

export default async function CareersPage() {
  const openings = await loadOpenings();

  return <CareersView openings={openings} />;
}
