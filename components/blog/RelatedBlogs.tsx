import type { WPPost } from "@/types/wordpress";
import { BlogCard } from "@/components/blog/BlogCard";

type RelatedBlogsProps = {
  posts: WPPost[];
};

export function RelatedBlogs({ posts }: RelatedBlogsProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16">
      <div className="mb-8">
        <p className="font-mono text-xs uppercase tracking-widest text-violet-glow">
          Keep Reading
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold text-white md:text-4xl">
          Related articles
        </h2>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
