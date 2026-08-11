import { CONTACT_NUMBERS, getTelLink } from "@/lib/contactLinks";

export function NewsletterCard() {
  return (
    <div className="rounded-lg border border-violet/20 bg-[linear-gradient(135deg,#ffffff_0%,#eff8ea_100%)] p-6 shadow-[0_12px_34px_rgba(31,61,21,0.08)]">
      <p className="font-mono text-[10px] font-medium uppercase tracking-widest text-violet">
        Careerkick Notes
      </p>
      <h3 className="mt-3 font-display text-2xl font-semibold text-[#13220f]">
        Never miss a counselling update.
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-[#52644b]">
        Get admission timelines, cut-off explainers, and choice filling guidance from the Careerkick desk.
      </p>
      <a
        href={getTelLink(CONTACT_NUMBERS.secondaryDigits)}
        className="mt-5 inline-flex rounded-full bg-gradient-brand px-5 py-3 text-sm font-semibold text-white shadow-card transition-shadow hover:shadow-glow-violet"
      >
        Talk to an Expert
      </a>
    </div>
  );
}
