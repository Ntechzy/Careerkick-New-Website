import type { Metadata } from "next";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionLabel } from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Refund Policy | Careerkick",
  description:
    "Read the Careerkick refund policy for counselling and related educational consultancy services.",
  alternates: {
    canonical: "/policies/refund",
  },
};

const definitions = [
  ["Firm", "Careerkick, an educational consultancy firm."],
  ["Applicant", "The student or candidate who has paid fees to the Firm for counselling and related services."],
  ["Service Fee", "The amount paid by the Applicant to the Firm for educational counselling, guidance, application processing, and related services, excluding fees directly payable to educational institutions, examination bodies, or visa authorities."],
  ["Date of Registration", "The date on which the Applicant formally registers for the Firm's services and makes the initial payment."],
  ["Date of Withdrawal", "The date on which the Firm receives a formal written request from the Applicant for withdrawal or cancellation of engagement."],
  ["Administrative Charges", "A reasonable fee deducted to cover administrative costs, processing efforts, and resources expended, regardless of the extent of counselling services rendered."],
];

const deductionItems = [
  "Administrative Charges: INR 5,000 shall be deducted from the Service Fee for administrative and processing costs, regardless of the stage of service delivery.",
  "Services Rendered: Fees equal to 20% of the total counselling fee for services already delivered or partially delivered shall be deemed non-refundable. These services may include counselling sessions, profile evaluation, college or university shortlisting, application assistance, document review, and correspondence with institutions.",
  "Third-Party Fees: Any fees paid by the Firm on behalf of the Applicant to third parties, including college or university application fees or other external charges, are strictly non-refundable by the Firm.",
  "GST: The refund amount, if any, shall be calculated exclusive of GST, currently 18%, apart from administrative charges and services already rendered. Refunds will be processed as per applicable tax laws, subject to recoverability by the Firm.",
];

const scenarios = [
  {
    title: "College Not Allotted",
    body: "If no college or university is allotted despite the Firm's counselling and application efforts, and the Applicant met all eligibility criteria and actively participated in the process, a refund may be considered after applicable deductions.",
  },
  {
    title: "Revised Cutoff or Counselling Not Commenced",
    body: "If the counselling process does not commence or is significantly altered due to revised cutoffs, government policy changes, or regulatory directives, and the Applicant withdraws before substantial services are rendered, a refund may be considered after applicable deductions.",
  },
  {
    title: "Withdrawal by Candidate",
    body: "If withdrawal is requested before significant counselling or application processing, a refund may be provided after deductions. If withdrawal is requested after substantial services are rendered or applications are processed, the Service Fee shall be largely non-refundable, subject to the Firm's discretion.",
  },
  {
    title: "Candidate Performs Self-Counselling",
    body: "If the Applicant chooses self-counselling and stops using the Firm's services, the refund amount will be determined based on the stage of services already provided at the Date of Withdrawal, after applicable deductions.",
  },
  {
    title: "Not Willing to Take Admission in Allotted College",
    body: "If a college or university is successfully allotted as a direct result of the Firm's counselling and application assistance, but the Applicant chooses not to take admission, the Firm's primary service is deemed rendered and the Service Fee shall be non-refundable after applicable deductions.",
  },
  {
    title: "Not Willing to Study the Selected Course",
    body: "If the Applicant decides not to pursue the course for which counselling was paid after services have commenced, the refund will be determined based on services already rendered at the Date of Withdrawal, after applicable deductions.",
  },
];

const procedure = [
  "All refund requests must be made in writing by the Applicant and addressed to Careerkick at careerkick01@gmail.com.",
  "The request must clearly state the reason for refund, date of registration, amount paid, and include supporting documents, if any.",
  "The Firm may request additional information or documentation from the Applicant to process the request.",
];

const paymentDisclaimer = [
  "Applicants should make payments only through the official bank account or authorized payment QR codes issued directly by Careerkick Services.",
  "Careerkick is not responsible for payments made to unauthorized, incorrect, tampered, or third-party QR codes, bank accounts, or payment links not officially provided by Careerkick Services.",
  "Payments made through unauthorized channels are invalid for registration, service confirmation, or refund processing.",
  "Careerkick will not issue receipts, service confirmations, refunds, recovery, or compensation for payments made to unauthorized or fraudulent payment channels. The responsibility and risk shall lie solely with the Applicant.",
  "Applicants are strongly advised to verify official payment details from Careerkick before making any payment.",
];

export default function RefundPolicyPage() {
  return (
    <main className="relative overflow-hidden bg-base px-4 pb-24 pt-28 md:px-8 md:pt-32">
      <div className="absolute -left-24 top-20 h-80 w-80 rounded-full bg-violet/10 blur-[120px]" />
      <div className="absolute -right-20 top-24 h-96 w-96 rounded-full bg-cyan/10 blur-[140px]" />
      <div className="grid-overlay absolute inset-0 opacity-60" />

      <div className="relative mx-auto max-w-5xl">
        <SectionLabel>Refund Policy</SectionLabel>
        <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
          Refund Policy
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-text-muted lg:text-white">
          This Refund Policy outlines the terms and conditions governing refunds
          of fees paid by students or candidates to Careerkick Services for
          counselling and related services. It is framed in accordance with
          applicable Indian laws, including the Consumer Protection Act, 2019,
          and general principles governing service contracts.
        </p>

        <GlassCard className="mt-10 p-5 sm:p-7">
          <div className="space-y-9">
            <PolicySection title="1. Definitions">
              <div className="grid gap-3">
                {definitions.map(([label, body]) => (
                  <InfoCard key={label} label={label} body={body} />
                ))}
              </div>
            </PolicySection>

            <PolicySection title="2. General Refund Principles">
              <InfoCard body="The Firm is committed to transparent and fair refund processes. All refund requests will be processed in accordance with this Policy and prevailing Indian laws. Education services are considered services under the Consumer Protection Act, 2019, and deficiency in service or unfair trade practice may lead to legal recourse. Refunds are subject to deductions for administrative charges and services already rendered." />
            </PolicySection>

            <PolicySection title="3. Refund Conditions and Deductions">
              <h3 className="font-display text-xl font-semibold text-white">
                3.1 Deductions Applicable to All Refunds
              </h3>
              <div className="mt-4 grid gap-3">
                {deductionItems.map((item) => (
                  <InfoCard key={item} body={item} />
                ))}
              </div>
              <h3 className="mt-7 font-display text-xl font-semibold text-white">
                3.2 Specific Refund Scenarios
              </h3>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {scenarios.map((item) => (
                  <InfoCard key={item.title} label={item.title} body={item.body} />
                ))}
              </div>
            </PolicySection>

            <PolicySection title="4. Procedure for Refund Request">
              <div className="grid gap-3">
                {procedure.map((item) => (
                  <InfoCard key={item} body={item} />
                ))}
              </div>
            </PolicySection>

            <PolicySection title="5. Refund Processing Timeline">
              <InfoCard body="Approved refunds will be processed within 120 working days from the date of approval of the refund request. Refunds will be made through the original payment method where possible, or through bank transfer to the Applicant's verified bank account." />
            </PolicySection>

            <PolicySection title="6. Governing Law and Jurisdiction">
              <InfoCard body="This Refund Policy shall be governed by and construed in accordance with the laws of India. Any dispute arising out of or in connection with this Policy shall be subject to the exclusive jurisdiction of the courts in Kanpur Nagar Court." />
            </PolicySection>

            <PolicySection title="7. Amendment to the Policy">
              <InfoCard body="Careerkick reserves the right to amend or modify this Refund Policy at any time, with or without prior notice. Changes will be effective immediately upon posting on the Firm's official website or communication to Applicants." />
            </PolicySection>

            <PolicySection title="8. Payment Disclaimer and Authorized Payment Channels">
              <div className="grid gap-3">
                {paymentDisclaimer.map((item) => (
                  <InfoCard key={item} body={item} />
                ))}
              </div>
            </PolicySection>
          </div>
        </GlassCard>
      </div>
    </main>
  );
}

function PolicySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-2xl font-semibold text-white">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function InfoCard({ label, body }: { label?: string; body: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-relaxed text-text-muted lg:text-white">
      {label ? <p className="mb-1 font-semibold text-white">{label}</p> : null}
      <p>{body}</p>
    </div>
  );
}
