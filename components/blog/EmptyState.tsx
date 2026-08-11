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
    <div className="rounded-lg border border-[#dce9d4] bg-white p-8 text-center shadow-[0_12px_34px_rgba(31,61,21,0.08)]">
      <p className="font-display text-2xl font-semibold text-[#13220f]">{title}</p>
      <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[#52644b]">
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
