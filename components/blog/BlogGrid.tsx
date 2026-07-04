import type { WPPost } from "@/types/wordpress";
import { BlogCard } from "@/components/blog/BlogCard";
import { EmptyState } from "@/components/blog/EmptyState";

type BlogGridProps = {
  posts: WPPost[];
};

export function BlogGrid({ posts }: BlogGridProps) {
  if (posts.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {posts.map((post, index) => (
        <BlogCard key={post.id} post={post} priority={index < 3} />
      ))}
    </div>
  );
}
