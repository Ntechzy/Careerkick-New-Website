import type { Metadata } from "next";
import { BlogCategories } from "@/components/blog/BlogCategories";
import { BlogGrid } from "@/components/blog/BlogGrid";
import { BlogPagination } from "@/components/blog/BlogPagination";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { FeaturedBlog } from "@/components/blog/FeaturedBlog";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { getCategories, getLatestPosts, getPosts } from "@/lib/wordpress";

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
  const currentPage = Math.max(1, Number(searchParams?.page ?? "1") || 1);
  const selectedCategory = searchParams?.category;
  const search = searchParams?.search?.trim();
  const perPage = 12;

  const [postsWithExtra, categories, recentPosts] = await Promise.all([
    getPosts({
      page: currentPage,
      perPage: perPage + 1,
      category: selectedCategory,
      search,
    }),
    getCategories(),
    getLatestPosts(5),
  ]);

  const posts = postsWithExtra.slice(0, perPage);
  const hasNextPage = postsWithExtra.length > perPage;
  const featuredPost = currentPage === 1 && !search ? posts[0] : null;
  const gridPosts = featuredPost ? posts.slice(1) : posts;
  const resultLabel = search
    ? `Search results for "${search}"`
    : selectedCategory
      ? "Filtered articles"
      : "Latest articles";

  return (
    <main className="bg-base">
      <section className="relative overflow-hidden px-4 pb-14 pt-32 md:px-8 md:pb-20 md:pt-40">
        <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-violet/10 blur-[120px]" />
        <div className="absolute -right-40 top-40 h-96 w-96 rounded-full bg-violet/10 blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet/10 shadow-[inset_0_0_80px_rgba(81,167,10,0.1)]" />
        <div className="grid-overlay absolute inset-0 opacity-50" />

        <div className="relative mx-auto max-w-7xl">
          <SectionLabel>Careerkick Journal</SectionLabel>
          <div>
            <h1 className="font-display text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
              Admission strategy, cut-offs, and counselling clarity.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-text-muted md:text-lg">
              Read practical Careerkick articles for NEET and JEE aspirants, from deadline tracking to choice filling and college planning.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              {["NEET Counselling", "JEE Updates", "Choice Filling"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-text-muted"
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
            <div className="sticky top-20 z-30 mb-8 rounded-lg border border-white/10 bg-base/80 p-3 shadow-card backdrop-blur-xl">
              <BlogCategories categories={categories} selected={selectedCategory} search={search} />
            </div>

            {featuredPost && (
              <div className="mb-10">
                <div className="mb-4 flex items-center gap-3">
                  <span className="h-px flex-1 bg-gradient-to-r from-violet/50 to-transparent" />
                  <p className="font-mono text-[10px] uppercase tracking-widest text-violet-glow">
                    Featured read
                  </p>
                </div>
                <FeaturedBlog post={featuredPost} />
              </div>
            )}

            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-violet-glow">
                  {resultLabel}
                </p>
                <h2 className="mt-2 font-display text-3xl font-semibold text-white">
                  Explore Careerkick insights
                </h2>
              </div>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-text-faint">
                Page {currentPage}
              </span>
            </div>

            <BlogGrid posts={gridPosts} />
            <BlogPagination
              currentPage={currentPage}
              hasNextPage={hasNextPage}
              category={selectedCategory}
              search={search}
            />
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
