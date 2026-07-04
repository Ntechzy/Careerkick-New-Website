export function NewsletterCard() {
  return (
    <div className="rounded-lg border border-violet/20 bg-gradient-card p-6 shadow-card">
      <p className="font-mono text-[10px] font-medium uppercase tracking-widest text-violet-glow">
        CareerKick Notes
      </p>
      <h3 className="mt-3 font-display text-2xl font-semibold text-white">
        Never miss a counselling update.
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-text-muted">
        Get admission timelines, cut-off explainers, and choice filling guidance from the CareerKick desk.
      </p>
      <a
        href="#contact"
        className="mt-5 inline-flex rounded-full bg-gradient-brand px-5 py-3 text-sm font-semibold text-white shadow-card transition-shadow hover:shadow-glow-violet"
      >
        Talk to an Expert
      </a>
    </div>
  );
}
