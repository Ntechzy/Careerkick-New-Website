import Link from "next/link";
import type { BlogTerm, WPPost } from "@/types/wordpress";
import { formatPostDate } from "@/lib/wordpress";
import { BlogCategories } from "@/components/blog/BlogCategories";
import { BlogSearch } from "@/components/blog/BlogSearch";
import { NewsletterCard } from "@/components/blog/NewsletterCard";

type BlogSidebarProps = {
  categories: BlogTerm[];
  recentPosts: WPPost[];
  selectedCategory?: string;
  search?: string;
};

export function BlogSidebar({ categories, recentPosts, selectedCategory, search }: BlogSidebarProps) {
  return (
    <aside className="space-y-5 lg:sticky lg:top-24">
      <div className="rounded-lg border border-[#dce9d4] bg-white p-5 shadow-[0_12px_34px_rgba(31,61,21,0.08)]">
        <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-violet">
          Search
        </p>
        <BlogSearch defaultValue={search} />
      </div>

      <div className="rounded-lg border border-[#dce9d4] bg-white p-5 shadow-[0_12px_34px_rgba(31,61,21,0.08)]">
        <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-violet">
          Categories
        </p>
        <BlogCategories categories={categories} selected={selectedCategory} search={search} />
      </div>

      <div className="rounded-lg border border-[#dce9d4] bg-white p-5 shadow-[0_12px_34px_rgba(31,61,21,0.08)]">
        <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-violet">
          Recent Posts
        </p>
        <div className="space-y-4">
          {recentPosts.slice(0, 5).map((post, index) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group grid grid-cols-[auto_1fr] gap-3 rounded-md border border-[#e5efde] bg-[#f7faf4] p-3 transition-colors hover:border-violet/30 hover:bg-violet/5"
            >
              <span className="font-mono text-[10px] text-violet">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="block min-w-0">
                <span className="line-clamp-2 text-sm font-semibold leading-snug text-[#182413] transition-colors group-hover:text-violet">
                  {post.title}
                </span>
                <time dateTime={post.date} className="mt-1 block font-mono text-[10px] uppercase tracking-widest text-[#728067]">
                  {formatPostDate(post.date)}
                </time>
              </span>
            </Link>
          ))}
        </div>
      </div>

      <NewsletterCard />
    </aside>
  );
}
