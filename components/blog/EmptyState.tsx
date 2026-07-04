import Link from "next/link";

type EmptyStateProps = {
  title?: string;
  description?: string;
};

export function EmptyState({
  title = "No blog posts found",
  description = "Try another search term or explore all CareerKick articles.",
}: EmptyStateProps) {
  return (
    <div className="rounded-lg border border-white/10 bg-gradient-card p-8 text-center shadow-card">
      <p className="font-display text-2xl font-semibold text-white">{title}</p>
      <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-text-muted">
        {description}
      </p>
      <Link
        href="/blog"
        className="mt-6 inline-flex rounded-full border border-violet/30 bg-violet/10 px-5 py-3 text-sm font-semibold text-violet-glow transition-colors hover:border-violet/60 hover:bg-violet/15"
      >
        View all blogs
      </Link>
    </div>
  );
}
