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
      <div className="rounded-lg border border-white/10 bg-gradient-card p-5 shadow-card backdrop-blur-xl">
        <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-violet-glow">
          Search
        </p>
        <BlogSearch defaultValue={search} />
      </div>

      <div className="rounded-lg border border-white/10 bg-gradient-card p-5 shadow-card backdrop-blur-xl">
        <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-violet-glow">
          Categories
        </p>
        <BlogCategories categories={categories} selected={selectedCategory} search={search} />
      </div>

      <div className="rounded-lg border border-white/10 bg-gradient-card p-5 shadow-card backdrop-blur-xl">
        <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-violet-glow">
          Recent Posts
        </p>
        <div className="space-y-4">
          {recentPosts.slice(0, 5).map((post, index) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group grid grid-cols-[auto_1fr] gap-3 rounded-md border border-white/5 bg-white/[0.02] p-3 transition-colors hover:border-violet/30 hover:bg-violet/5"
            >
              <span className="font-mono text-[10px] text-violet-glow">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="block min-w-0">
                <span className="line-clamp-2 text-sm font-semibold leading-snug text-white transition-colors group-hover:text-violet-glow">
                  {post.title}
                </span>
                <time dateTime={post.date} className="mt-1 block font-mono text-[10px] uppercase tracking-widest text-text-faint">
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
