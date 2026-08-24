import Link from "next/link";
import type { BlogTerm } from "@/types/wordpress";
import { cn } from "@/lib/utils";

type BlogCategoriesProps = {
  categories: BlogTerm[];
  selected?: string;
  search?: string;
};

function buildHref(category?: string, search?: string) {
  const params = new URLSearchParams();

  if (category) {
    params.set("category", category);
  }

  if (search) {
    params.set("search", search);
  }

  const query = params.toString();
  return query ? `/blog?${query}` : "/blog";
}

export function BlogCategories({ categories, selected, search }: BlogCategoriesProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href={buildHref(undefined, search)}
        className={cn(
          "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
          !selected
            ? "border-violet/35 bg-violet/10 text-violet"
            : "border-[var(--blog-border)] bg-[var(--blog-panel)] text-[var(--blog-muted)] hover:border-violet/35 hover:text-violet",
        )}
      >
        All
      </Link>
      {categories.map((category) => (
        <Link
          key={category.id}
          href={buildHref(String(category.id), search)}
          className={cn(
          "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
          selected === String(category.id)
              ? "border-violet/35 bg-violet/10 text-violet"
              : "border-[var(--blog-border)] bg-[var(--blog-panel)] text-[var(--blog-muted)] hover:border-violet/35 hover:text-violet",
          )}
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
}
