import type { Metadata } from "next";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionLabel } from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Disclaimer | Careerkick",
  description:
    "Read the Careerkick disclaimer for counselling guidance, admission predictions, official verification, third-party links, and limitation of liability.",
  alternates: {
    canonical: "/policies/disclaimer",
  },
};

const sections = [
  {
    title: "Advisory Nature of Services",
    body: "Careerkick provides educational information, counselling support, college prediction, admission planning, cut-off analysis, and related guidance for students and parents. Our services are advisory in nature and are intended to help users make informed decisions. They should not be treated as an official allotment, legal opinion, government notification, or guarantee of admission.",
  },
  {
    title: "No Guarantee of Admission, Seat Allotment, or Result",
    body: "Careerkick does not guarantee admission to any college, course, university, medical institution, or counselling round. Admission outcomes depend on several factors, including official eligibility rules, NEET or other entrance scores, category, domicile, reservation rules, rank, preferences, seat matrix, document verification, fee payment, reporting, institutional approvals, and decisions made by competent authorities.",
  },
  {
    title: "Accuracy of Information",
    body: "We make reasonable efforts to keep website content, cut-off data, fee details, seat information, college information, deadlines, and counselling updates useful and current. However, admission rules, seat availability, fee structures, schedules, cut-offs, and institutional details may change without prior notice. Careerkick does not warrant that every item of information will always be complete, current, error-free, or suitable for every student's individual situation.",
  },
  {
    title: "Official Verification Required",
    body: "Users must verify final and binding information from official sources before taking any admission-related action. These may include the Medical Counselling Committee (MCC), National Testing Agency (NTA), National Medical Commission (NMC), state counselling authorities, universities, colleges, and other competent government or institutional bodies. In case of any conflict between Careerkick content and official information, the official information will prevail.",
  },
  {
    title: "Predictions and Historical Data",
    body: "College predictors, chance analysis, rank guidance, cut-off comparisons, and counselling strategies are based on available data, previous trends, user inputs, and professional judgement. They are estimates only. Previous year cut-offs or allotment patterns do not assure the same result in any current or future counselling round.",
  },
  {
    title: "User Responsibility",
    body: "Students and parents are responsible for providing accurate personal, academic, category, domicile, document, and preference information. Users are also responsible for checking official notices, completing registrations, uploading valid documents, paying fees, selecting choices, reporting to allotted institutions, and meeting deadlines. Careerkick is not responsible for losses arising from incorrect information supplied by users or missed official procedures.",
  },
  {
    title: "Third-Party Websites and Services",
    body: "The website may include links, references, videos, embedded content, payment gateways, maps, social media platforms, or other third-party services. These are provided for convenience. Careerkick does not control third-party content, policies, availability, accuracy, or security, and is not responsible for any loss or issue arising from use of such third-party services.",
  },
  {
    title: "Limitation of Liability",
    body: "To the maximum extent permitted by applicable law, Careerkick, its team, counsellors, partners, and representatives shall not be liable for any direct, indirect, incidental, consequential, financial, academic, admission-related, or opportunity loss arising from use of the website, counselling services, predictions, recommendations, or any reliance placed on the information provided.",
  },
  {
    title: "Professional and Legal Advice",
    body: "Information on this website is not a substitute for official advice, legal advice, financial advice, or professional advice from competent authorities. Where required, users should seek appropriate professional guidance and confirm all obligations directly with official bodies or institutions.",
  },
  {
    title: "Updates to This Disclaimer",
    body: "Careerkick may update this Disclaimer from time to time. Continued use of the website or services after updates are posted means that the user accepts the revised Disclaimer.",
  },
];

export default function DisclaimerPage() {
  return (
    <main className="relative overflow-hidden bg-base px-4 pb-24 pt-28 md:px-8 md:pt-32">
      <div className="absolute -left-24 top-20 h-80 w-80 rounded-full bg-violet/10 blur-[120px]" />
      <div className="absolute -right-20 top-24 h-96 w-96 rounded-full bg-cyan/10 blur-[140px]" />
      <div className="grid-overlay absolute inset-0 opacity-60" />

      <div className="relative mx-auto max-w-5xl">
        <SectionLabel>Disclaimer</SectionLabel>
        <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
          Disclaimer
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-text-muted lg:text-white">
          This Disclaimer explains the limits of Careerkick&apos;s website
          content, counselling support, admission predictions, cut-off analysis,
          and related services. By using this website or our services, you
          acknowledge and agree to the points below.
        </p>

        <GlassCard className="mt-10 border-[#51A70A]/30 bg-[#51A70A]/10 p-5 sm:p-7">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-[#8cef32]">
            Important
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold text-white">
            Official information always prevails.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white sm:text-base lg:text-white">
            Careerkick is an independent guidance platform. We are not a
            government body, examination authority, counselling authority,
            university, or medical college. Users must verify final admission
            rules, schedules, seat matrix, cut-offs, eligibility, fees, and
            allotment results from the relevant official authority before making
            decisions.
          </p>
        </GlassCard>

        <GlassCard className="mt-8 p-5 sm:p-7">
          <div className="space-y-6">
            {sections.map((section) => (
              <section
                key={section.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <h2 className="font-display text-2xl font-semibold text-white">
                  {section.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-text-muted lg:text-white">
                  {section.body}
                </p>
              </section>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="mt-8 p-5 sm:p-7">
          <h2 className="font-display text-2xl font-semibold text-white">
            Official Sources to Check
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              { label: "MCC", href: "https://mcc.nic.in/" },
              { label: "NTA", href: "https://nta.ac.in/" },
              { label: "NMC", href: "https://www.nmc.org.in/" },
            ].map((source) => (
              <a
                key={source.label}
                href={source.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm font-semibold text-[#8cef32] transition-colors hover:text-white"
              >
                {source.label}
              </a>
            ))}
          </div>
        </GlassCard>

        <p className="mt-6 text-sm leading-relaxed text-text-muted lg:text-white">
          Last updated: July 25, 2026. For questions, contact{" "}
          <a href="mailto:careerkick01@gmail.com" className="text-[#8cef32] hover:underline">
            careerkick01@gmail.com
          </a>
          .
        </p>
      </div>
    </main>
  );
}
