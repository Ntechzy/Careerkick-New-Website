import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { Breadcrumb } from "@/components/blog/Breadcrumb";
import { NewsletterCard } from "@/components/blog/NewsletterCard";
import { RelatedBlogs } from "@/components/blog/RelatedBlogs";
import { ShareButtons } from "@/components/blog/ShareButtons";
import {
  formatPostDate,
  getAllPosts,
  getCategories,
  getLatestPosts,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/wordpress";

type SingleBlogPageProps = {
  params: {
    slug: string;
  };
};

export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: SingleBlogPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Blog Not Found | CareerKick",
    };
  }

  const image = post.featuredImage?.url;

  return {
    title: `${post.title} | CareerKick`,
    description: post.excerpt,
    alternates: {
      canonical: `https://careerkick.in/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://careerkick.in/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.modified,
      images: image ? [{ url: image, alt: post.featuredImage?.alt || post.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: image ? [image] : undefined,
    },
  };
}

export default async function SingleBlogPage({ params }: SingleBlogPageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const [categories, recentPosts, relatedPosts, allPosts] = await Promise.all([
    getCategories(),
    getLatestPosts(5),
    getRelatedPosts(post, 3),
    getAllPosts(),
  ]);

  const currentIndex = allPosts.findIndex((item) => item.id === post.id);
  const previousPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex >= 0 && currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const category = post.categories[0]?.name ?? "CareerKick";
  const articleUrl = `https://careerkick.in/blog/${post.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage?.url,
    datePublished: post.date,
    dateModified: post.modified,
    author: {
      "@type": "Person",
      name: post.author?.name ?? "CareerKick",
    },
    publisher: {
      "@type": "Organization",
      name: "CareerKick",
      logo: {
        "@type": "ImageObject",
        url: "https://careerkick.in/logo.png",
      },
    },
    mainEntityOfPage: articleUrl,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://careerkick.in",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://careerkick.in/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: articleUrl,
      },
    ],
  };

  return (
    <main className="bg-base">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article>
        <header className="relative overflow-hidden px-4 pb-12 pt-32 md:px-8 md:pb-16 md:pt-40">
          <div className="absolute -left-40 top-16 h-96 w-96 rounded-full bg-violet/10 blur-[120px]" />
          <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-violet/10 blur-[120px]" />
          <div className="grid-overlay absolute inset-0 opacity-45" />
          <div className="relative mx-auto max-w-7xl">
            <Breadcrumb current={post.title} />
            <div className="mt-8 max-w-5xl">
              <span className="rounded-full border border-violet/30 bg-violet/10 px-4 py-2 font-mono text-xs uppercase tracking-widest text-violet-glow">
                {category}
              </span>
              <h1 className="mt-6 font-display text-4xl font-bold leading-tight text-white md:text-6xl">
                {post.title}
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-text-muted md:text-lg">
                {post.excerpt}
              </p>
              <div className="mt-7 grid gap-3 rounded-lg border border-white/10 bg-white/[0.035] p-4 shadow-card backdrop-blur-xl sm:grid-cols-3">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-text-faint">Author</p>
                  <p className="mt-1 text-sm font-semibold text-white">{post.author?.name ?? "CareerKick"}</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-text-faint">Published</p>
                  <time dateTime={post.date} className="mt-1 block text-sm font-semibold text-white">
                    {formatPostDate(post.date)}
                  </time>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-text-faint">Reading Time</p>
                  <p className="mt-1 text-sm font-semibold text-white">{post.readingTime}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="px-4 md:px-8">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-xl border border-white/10 bg-surface-2 p-2 shadow-elevated">
            <div className="relative aspect-[16/9] min-h-[260px] overflow-hidden rounded-lg">
              {post.featuredImage ? (
                <Image
                  src={post.featuredImage.url}
                  alt={post.featuredImage.alt || post.title}
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover"
                />
              ) : (
                <div className="h-full w-full bg-gradient-hero" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-base via-base/20 to-transparent" />
            </div>
          </div>
        </section>

        <section className="px-4 py-12 md:px-8 md:py-16">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
            <div className="min-w-0">
              <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-white/10 bg-gradient-card p-4 shadow-card">
                <Link
                  href="/blog"
                  className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-text-muted transition-colors hover:border-violet/40 hover:text-white"
                >
                  Back to Blogs
                </Link>
                <ShareButtons title={post.title} url={articleUrl} />
              </div>

              <div className="rounded-xl border border-white/10 bg-gradient-card px-5 py-8 shadow-card backdrop-blur-xl sm:px-8 md:px-10">
                <div
                  className="career-blog-content prose prose-invert max-w-none prose-headings:scroll-mt-28 prose-p:leading-8 prose-img:shadow-card"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>

              {post.tags.length > 0 && (
                <div className="mt-10 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-text-muted"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-12 grid gap-4 md:grid-cols-2">
                {previousPost && (
                  <Link href={`/blog/${previousPost.slug}`} className="rounded-lg border border-white/10 bg-gradient-card p-5 shadow-card transition-colors hover:border-violet/40">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-text-faint">Previous</span>
                    <p className="mt-2 line-clamp-2 font-display text-xl font-semibold text-white">{previousPost.title}</p>
                  </Link>
                )}
                {nextPost && (
                  <Link href={`/blog/${nextPost.slug}`} className="rounded-lg border border-white/10 bg-gradient-card p-5 shadow-card transition-colors hover:border-violet/40 md:text-right">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-text-faint">Next</span>
                    <p className="mt-2 line-clamp-2 font-display text-xl font-semibold text-white">{nextPost.title}</p>
                  </Link>
                )}
              </div>

              <div className="mt-12">
                <NewsletterCard />
              </div>

              <RelatedBlogs posts={relatedPosts} />

              <div className="mt-12">
                <Link
                  href="/blog"
                  className="inline-flex rounded-full bg-gradient-brand px-6 py-3 font-semibold text-white shadow-card transition-shadow hover:shadow-glow-violet"
                >
                  Back to Blogs
                </Link>
              </div>
            </div>

            <BlogSidebar categories={categories} recentPosts={recentPosts} />
          </div>
        </section>
      </article>
    </main>
  );
}
