import Link from "next/link";
import { BlogCard } from "@/components/blog/BlogCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getLatestPosts } from "@/lib/wordpress";

export async function BlogsSection() {
  const posts = await getLatestPosts(6);

  if (posts.length === 0) {
    return null;
  }

  return (
    <section id="blog" className="relative overflow-hidden bg-surface px-4 py-section-mobile md:px-8 md:py-section">
      <div className="absolute -left-32 top-16 h-80 w-80 rounded-full bg-violet/10 blur-[110px]" />
      <div className="absolute -right-36 bottom-20 h-96 w-96 rounded-full bg-violet/10 blur-[120px]" />
      <div className="grid-overlay absolute inset-0 opacity-50" />

      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <ScrollReveal className="max-w-3xl">
            <SectionLabel>CareerKick Blog</SectionLabel>
            <h2 className="font-display text-4xl font-bold leading-tight text-white md:text-6xl">
              From our desk: JEE & NEET admission clarity.
            </h2>
            <p className="mt-5 max-w-2xl text-text-muted md:text-lg">
              Practical updates, counselling strategy, cut-off explainers, and admission guidance written for students and parents.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <Link
              href="/blog"
              className="inline-flex rounded-full border border-violet/30 bg-violet/10 px-6 py-3 font-semibold text-violet-glow shadow-card transition-colors hover:border-violet/60 hover:bg-violet/15"
            >
              View All Blogs
            </Link>
          </ScrollReveal>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {posts.map((post, index) => (
            <ScrollReveal key={post.id} delay={index * 0.04} className="h-full">
              <BlogCard post={post} compact priority={index < 3} />
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-10 rounded-lg border border-white/10 bg-white/[0.03] p-4 shadow-card backdrop-blur-xl sm:flex sm:items-center sm:justify-between sm:p-5">
          <div>
            <p className="font-display text-xl font-semibold text-white">
              Need help decoding counselling updates?
            </p>
            <p className="mt-1 text-sm text-text-muted">
              Explore the full blog library or speak with the CareerKick team.
            </p>
          </div>
          <Link
            href="/blog"
            className="mt-5 inline-flex rounded-full bg-gradient-brand px-6 py-3 font-semibold text-white shadow-card transition-shadow hover:shadow-glow-violet sm:mt-0"
          >
            Browse Insights
          </Link>
        </div>
      </div>
    </section>
  );
}
