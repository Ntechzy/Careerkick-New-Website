import type { Metadata } from "next";
import { BlogCategories } from "@/components/blog/BlogCategories";
import { BlogGrid } from "@/components/blog/BlogGrid";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { BlogThemeToggle } from "@/components/blog/BlogThemeToggle";
import { FeaturedBlog } from "@/components/blog/FeaturedBlog";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { getAllPosts, getCategories, getLatestPosts } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "Blog | Careerkick",
  description: "Explore Careerkick guides on NEET counselling, JEE counselling, cut-offs, choice filling, admissions, and college planning.",
  alternates: {
    canonical: "https://careerkick.in/blog",
  },
  openGraph: {
    title: "Blog | Careerkick",
    description: "Premium admission guidance, counselling updates, and practical exam insights from Careerkick.",
    url: "https://careerkick.in/blog",
    type: "website",
  },
};

type BlogPageProps = {
  searchParams?: {
    page?: string;
    category?: string;
    search?: string;
  };
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const selectedCategory = searchParams?.category;
  const search = searchParams?.search?.trim();

  const [posts, categories, recentPosts] = await Promise.all([
    getAllPosts({
      category: selectedCategory,
      search,
    }),
    getCategories(),
    getLatestPosts(5),
  ]);

  const featuredPost = !search ? posts[0] : null;
  const gridPosts = featuredPost ? posts.slice(1) : posts;
  const resultLabel = search
    ? `Search results for "${search}"`
    : selectedCategory
      ? "Filtered articles"
      : "Latest articles";

  return (
    <main className="blog-theme-page bg-[var(--blog-bg)] text-[var(--blog-text)]">
      <section className="relative overflow-hidden bg-[var(--blog-hero)] px-4 pb-14 pt-32 md:px-8 md:pb-20 md:pt-40">
        <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-violet/12 blur-[120px]" />
        <div className="absolute -right-40 top-40 h-96 w-96 rounded-full bg-amber/20 blur-[120px]" />
        <div className="grid-overlay absolute inset-0 opacity-80" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <SectionLabel className="mb-0 border-violet/25 bg-[var(--blog-panel)] text-violet shadow-sm">
              Careerkick Journal
            </SectionLabel>
            <BlogThemeToggle />
          </div>
          <div>
            <h1 className="font-display text-4xl font-bold leading-tight text-[var(--blog-text)] md:text-6xl lg:text-7xl">
              Admission strategy, cut-offs, and counselling clarity.
            </h1>
            <p className="blog-hero-copy mt-6 max-w-3xl text-base leading-relaxed text-[var(--blog-muted)] md:text-lg">
              Read practical Careerkick articles for NEET and JEE aspirants, from deadline tracking to choice filling and college planning.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              {["NEET Counselling", "JEE Updates", "Choice Filling"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[var(--blog-border)] bg-[var(--blog-panel)] px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-[var(--blog-faint)] shadow-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-section-mobile md:px-8 md:pb-section">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_340px]">
          <div>
            <div className="sticky top-20 z-30 mb-8 rounded-lg border border-[var(--blog-border)] bg-[var(--blog-panel)]/90 p-3 shadow-[var(--blog-shadow)] backdrop-blur-xl">
              <BlogCategories categories={categories} selected={selectedCategory} search={search} />
            </div>

            {featuredPost && (
              <div className="mb-10">
                <div className="mb-4 flex items-center gap-3">
                  <span className="h-px flex-1 bg-gradient-to-r from-violet/45 to-transparent" />
                  <p className="font-mono text-[10px] uppercase tracking-widest text-violet">
                    Featured read
                  </p>
                </div>
                <FeaturedBlog post={featuredPost} />
              </div>
            )}

            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-violet">
                  {resultLabel}
                </p>
                <h2 className="mt-2 font-display text-3xl font-semibold text-[var(--blog-text)]">
                  Explore Careerkick insights
                </h2>
              </div>
              <span className="rounded-full border border-[var(--blog-border)] bg-[var(--blog-panel)] px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-[var(--blog-faint)] shadow-sm">
                {posts.length} {posts.length === 1 ? "article" : "articles"}
              </span>
            </div>

            <BlogGrid posts={gridPosts} />
          </div>

          <BlogSidebar
            categories={categories}
            recentPosts={recentPosts}
            selectedCategory={selectedCategory}
            search={search}
          />
        </div>
      </section>
    </main>
  );
}
