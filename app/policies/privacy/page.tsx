import type { Metadata } from "next";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionLabel } from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Privacy Policy | Careerkick",
  description:
    "Read how CareerKick Services collects, uses, shares, protects, and retains information.",
  alternates: {
    canonical: "/policies/privacy",
  },
};

const sections = [
  {
    title: "Information We Collect",
    items: [
      {
        label: "Personal Data",
        body: "Name, email, phone, address, age, academic scores such as 12th marks, and preferences provided during registration, forms, or counselling sessions.",
      },
      {
        label: "Usage Data",
        body: "IP address, browser type, visit times, pages viewed, and similar information collected through cookies or analytics tools.",
      },
      {
        label: "Sensitive Information",
        body: "Educational background and career goals used only for assessments and counselling support. This information is not sold.",
      },
    ],
  },
  {
    title: "How We Use Your Information",
    items: [
      { body: "To deliver services such as counselling, admission guidance, and related support." },
      { body: "To improve the website through analytics and send counselling updates, including important dates, with opt-out options." },
      { body: "To comply with applicable laws, including KYC or payment-related requirements. We do not send marketing communication without consent." },
    ],
  },
  {
    title: "Sharing Your Information",
    items: [
      { label: "Service Providers", body: "Information may be shared with service providers such as payment gateways, including ICICI Bank, and cloud hosts, including Hostinger, where required to provide services." },
      { label: "Legal", body: "Information may be shared only when required by law, including Kanpur Nagar District court orders or tax authorities." },
      { label: "No Selling", body: "We do not sell or rent personal data to third parties. Anonymized data may be used for research, such as admission trends." },
    ],
  },
  {
    title: "Data Security and Retention",
    items: [
      { body: "We use industry-standard encryption and SSL, and access is limited to staff on a need-to-know basis." },
      { body: "Data is retained as needed for services, such as 3 years post-counselling, or as required by law. Data may be deleted on request where legally permitted." },
    ],
  },
  {
    title: "Your Rights",
    items: [
      { body: "You may request access, correction, or deletion of your data by emailing careerkick01@gmail.com." },
      { body: "Refunds are handled as per the company Refund Policy." },
    ],
  },
  {
    title: "Cookies, Third Parties, and Governing Law",
    items: [
      { body: "We use Google Analytics. Users may review Google's policies and use available opt-out options." },
      { body: "This policy is governed by the laws of India, with jurisdiction in Uttar Pradesh, Kanpur Nagar District court." },
      { body: "Changes will be posted on this page. Continued use of the website or services means acceptance of the updated policy." },
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="relative overflow-hidden bg-base px-4 pb-24 pt-28 md:px-8 md:pt-32">
      <div className="absolute -left-24 top-20 h-80 w-80 rounded-full bg-violet/10 blur-[120px]" />
      <div className="absolute -right-20 top-24 h-96 w-96 rounded-full bg-cyan/10 blur-[140px]" />
      <div className="grid-overlay absolute inset-0 opacity-60" />

      <div className="relative mx-auto max-w-5xl">
        <SectionLabel>Privacy Policy</SectionLabel>
        <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-text-muted lg:text-white">
          CareerKick Services respects your privacy. This policy explains how
          we collect, use, and protect information when you use careerkick.in or
          our counselling services, including NEET, JEE, and other guidance
          sessions.
        </p>

        <GlassCard className="mt-10 p-5 sm:p-7">
          <div className="space-y-8">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="font-display text-2xl font-semibold text-white">
                  {section.title}
                </h2>
                <div className="mt-4 space-y-3">
                  {section.items.map((item) => (
                    <div
                      key={`${section.title}-${"label" in item ? item.label : item.body}`}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-relaxed text-text-muted lg:text-white"
                    >
                      {"label" in item && item.label ? (
                        <p className="mb-1 font-semibold text-white">{item.label}</p>
                      ) : null}
                      <p>{item.body}</p>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </GlassCard>

        <p className="mt-6 text-sm leading-relaxed text-text-muted lg:text-white">
          Contact:{" "}
          <a href="mailto:careerkick01@gmail.com" className="text-[#8cef32] hover:underline">
            careerkick01@gmail.com
          </a>
        </p>
      </div>
    </main>
  );
}
