import Image from "next/image";
import Link from "next/link";
import type { WPPost } from "@/types/wordpress";
import { formatPostDate } from "@/lib/wordpress";
import { cn } from "@/lib/utils";

type BlogCardProps = {
  post: WPPost;
  featured?: boolean;
  compact?: boolean;
  priority?: boolean;
  className?: string;
};

export function BlogCard({ post, featured = false, compact = false, priority = false, className }: BlogCardProps) {
  const category = post.categories[0]?.name ?? "Careerkick";

  return (
    <article
      className={cn(
        "group relative h-full overflow-hidden rounded-lg border border-white/10 bg-gradient-card shadow-card backdrop-blur-xl transition-all duration-300 before:pointer-events-none before:absolute before:inset-0 before:z-10 before:bg-[radial-gradient(circle_at_18%_0%,rgba(109,204,18,0.18),transparent_34%)] before:opacity-0 before:transition-opacity before:duration-300 hover:-translate-y-1 hover:border-violet/40 hover:shadow-elevated hover:before:opacity-100",
        className,
      )}
    >
      <Link href={`/blog/${post.slug}`} className="block h-full" aria-label={`Read ${post.title}`}>
        <div
          className={cn(
            "relative overflow-hidden bg-surface-2",
            featured ? "aspect-[16/10]" : compact ? "aspect-[16/9]" : "aspect-[16/11]",
          )}
        >
          {post.featuredImage ? (
            <Image
              src={post.featuredImage.url}
              alt={post.featuredImage.alt || post.title}
              fill
              sizes={featured ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
              priority={priority}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-gradient-hero" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-base/92 via-base/22 to-transparent" />
          <div className="absolute inset-x-4 bottom-0 h-px bg-gradient-to-r from-transparent via-violet/50 to-transparent opacity-70" />
          <span className="absolute left-4 top-4 rounded-full border border-violet/30 bg-base/70 px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-widest text-violet-glow backdrop-blur-xl">
            {category}
          </span>
        </div>

        <div className={cn("relative z-20 flex flex-col", featured ? "p-6 md:p-7" : compact ? "p-4 md:p-5" : "p-5")}>
          <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-text-faint">
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            <span className="text-violet">/</span>
            <span>{post.readingTime}</span>
          </div>

          <h3
            className={cn(
              "mt-4 line-clamp-2 font-display font-semibold leading-tight text-white transition-colors group-hover:text-violet-glow",
              featured ? "text-2xl md:text-4xl" : compact ? "text-lg md:text-xl" : "text-xl md:text-2xl",
            )}
          >
            {post.title}
          </h3>
          <p className={cn("mt-3 text-sm leading-relaxed text-text-muted lg:text-white", compact ? "line-clamp-2" : "line-clamp-3", featured && "md:text-base")}>
            {post.excerpt}
          </p>
          <span className={cn("inline-flex w-fit items-center gap-2 font-semibold text-violet-glow", compact ? "mt-5 text-sm" : "mt-6")}>
            Read More
            <span className="transition-transform duration-300 group-hover:translate-x-1">-&gt;</span>
          </span>
        </div>
      </Link>
    </article>
  );
}
