import Link from "next/link";
import { cn } from "@/lib/utils";

type BlogPaginationProps = {
  currentPage: number;
  hasNextPage: boolean;
  category?: string;
  search?: string;
};

function pageHref(page: number, category?: string, search?: string) {
  const params = new URLSearchParams();

  if (page > 1) {
    params.set("page", String(page));
  }

  if (category) {
    params.set("category", category);
  }

  if (search) {
    params.set("search", search);
  }

  const query = params.toString();
  return query ? `/blog?${query}` : "/blog";
}

export function BlogPagination({ currentPage, hasNextPage, category, search }: BlogPaginationProps) {
  const canGoBack = currentPage > 1;

  if (!canGoBack && !hasNextPage) {
    return null;
  }

  return (
    <nav className="mt-12 flex items-center justify-center gap-3" aria-label="Blog pagination">
      <Link
        href={pageHref(currentPage - 1, category, search)}
        aria-disabled={!canGoBack}
        className={cn(
          "rounded-full border px-5 py-3 text-sm font-semibold transition-colors",
          canGoBack
            ? "border-[var(--blog-border)] bg-[var(--blog-panel)] text-[var(--blog-text)] hover:border-violet/40"
            : "pointer-events-none border-[var(--blog-border-soft)] bg-[var(--blog-panel-soft)] text-[var(--blog-faint)] opacity-45",
        )}
      >
        Previous
      </Link>
      <span className="rounded-full border border-violet/25 bg-violet/10 px-4 py-3 font-mono text-xs text-violet">
        Page {currentPage}
      </span>
      <Link
        href={pageHref(currentPage + 1, category, search)}
        aria-disabled={!hasNextPage}
        className={cn(
          "rounded-full border px-5 py-3 text-sm font-semibold transition-colors",
          hasNextPage
            ? "border-[var(--blog-border)] bg-[var(--blog-panel)] text-[var(--blog-text)] hover:border-violet/40"
            : "pointer-events-none border-[var(--blog-border-soft)] bg-[var(--blog-panel-soft)] text-[var(--blog-faint)] opacity-45",
        )}
      >
        Next
      </Link>
    </nav>
  );
}
