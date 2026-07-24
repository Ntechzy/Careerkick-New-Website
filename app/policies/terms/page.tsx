import type { Metadata } from "next";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionLabel } from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Terms & Conditions | Careerkick",
  description:
    "Read the Careerkick Services terms and conditions for website usage and counselling guidance.",
  alternates: {
    canonical: "/policies/terms",
  },
};

const sections = [
  {
    title: "Introduction",
    body: "By accessing the Careerkick Services website, including careerkick.in or sites.google.com/view/careerkickservices, you agree to these Terms and Conditions, forming a legally binding agreement. These terms apply to all users seeking guidance on admissions, college predictors, and career planning.",
  },
  {
    title: "Services Provided",
    body: "We provide informational tools such as college predictors, cut-offs, reviews, and mentorship for IIT-JEE, NEET, and medical courses. Services are advisory only, and users should verify all details with official authorities.",
  },
  {
    title: "User Conduct and Content",
    body: "Users must post only lawful and non-harmful content. By submitting content such as reviews, users grant us a license to display those submissions. Users must comply with the Indian IT Act, 2000.",
  },
  {
    title: "Intellectual Property",
    body: "Site content is copyrighted. Personal fair use is permitted, but commercial exploitation, copying, or unauthorized use is not permitted.",
  },
  {
    title: "Fees and Payments",
    body: "Premium services are available as per company policy. Payments are processed securely through third-party payment providers.",
  },
  {
    title: "Disclaimers and Limitations",
    body: "Services are provided as is and as available, without warranties of any kind, express or implied, including accuracy, completeness, timeliness, or fitness for a particular purpose.",
  },
  {
    title: "Privacy",
    body: "Privacy is handled as per the Privacy Policy and India's DPDP Act, 2023.",
  },
  {
    title: "Termination",
    body: "We may end or restrict access for breaches of these Terms and Conditions.",
  },
  {
    title: "Governing Law",
    body: "These Terms and Conditions are governed by Indian law. Kanpur courts shall have jurisdiction, and arbitration may apply as per the Arbitration and Conciliation Act, 1996.",
  },
];

export default function TermsPage() {
  return (
    <main className="relative overflow-hidden bg-base px-4 pb-24 pt-28 md:px-8 md:pt-32">
      <div className="absolute -left-24 top-20 h-80 w-80 rounded-full bg-violet/10 blur-[120px]" />
      <div className="absolute -right-20 top-24 h-96 w-96 rounded-full bg-cyan/10 blur-[140px]" />
      <div className="grid-overlay absolute inset-0 opacity-60" />

      <div className="relative mx-auto max-w-5xl">
        <SectionLabel>Terms & Conditions</SectionLabel>
        <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
          Terms & Conditions
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-text-muted lg:text-white">
          Careerkick Services offers counselling and guidance for competitive
          exams like IIT-JEE and NEET. These Terms and Conditions explain the
          boundaries of website usage, advisory services, payments, user
          conduct, and legal jurisdiction.
        </p>

        <GlassCard className="mt-10 border-[#51A70A]/30 bg-[#51A70A]/10 p-5 sm:p-7">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-[#8cef32]">
            Disclaimer on Admission Guarantees
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold text-white">
            No Guarantee of Admission or Success
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white sm:text-base lg:text-white">
            Careerkick Services does not guarantee admission to any college,
            course, or institution, nor success in exams like IIT-JEE or NEET.
            Outcomes depend solely on merit, exam performance, official cut-offs,
            and institutional decisions. We provide guidance based on historical
            data and trends, but all predictions, counselling, and advice are
            estimates without warranty. Users use our services at their own risk,
            and we are not liable for rejections, delays, or any
            admission-related losses. This disclaimer applies to free and premium
            services alike.
          </p>
        </GlassCard>

        <GlassCard className="mt-8 p-5 sm:p-7">
          <div className="space-y-6">
            {sections.map((section) => (
              <section key={section.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
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

        <p className="mt-6 text-sm leading-relaxed text-text-muted lg:text-white">
          Contact:{" "}
          <a href="mailto:careerkick01@gmail.com" className="text-[#8cef32] hover:underline">
            careerkick01@gmail.com
          </a>
          . Website:{" "}
          <a href="https://careerkick.in/" target="_blank" rel="noreferrer" className="text-[#8cef32] hover:underline">
            careerkick.in
          </a>
        </p>
      </div>
    </main>
  );
}
