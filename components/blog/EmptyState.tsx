import Link from "next/link";

type EmptyStateProps = {
  title?: string;
  description?: string;
};

export function EmptyState({
  title = "No blog posts found",
  description = "Try another search term or explore all Careerkick articles.",
}: EmptyStateProps) {
  return (
    <div className="rounded-lg border border-[var(--blog-border)] bg-[var(--blog-panel)] p-8 text-center shadow-[var(--blog-shadow)]">
      <p className="font-display text-2xl font-semibold text-[var(--blog-text)]">{title}</p>
      <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[var(--blog-muted)]">
        {description}
      </p>
      <Link
        href="/blog"
        className="mt-6 inline-flex rounded-full border border-violet/30 bg-violet/10 px-5 py-3 text-sm font-semibold text-violet transition-colors hover:border-violet/60 hover:bg-violet/15"
      >
        View all blogs
      </Link>
    </div>
  );
}
