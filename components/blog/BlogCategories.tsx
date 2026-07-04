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
            ? "border-violet/40 bg-violet/15 text-violet-glow"
            : "border-white/10 bg-white/[0.04] text-text-muted hover:border-violet/40 hover:text-white",
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
              ? "border-violet/40 bg-violet/15 text-violet-glow"
              : "border-white/10 bg-white/[0.04] text-text-muted hover:border-violet/40 hover:text-white",
          )}
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
}
