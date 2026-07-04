import type { WPPost } from "@/types/wordpress";
import { BlogCard } from "@/components/blog/BlogCard";

type FeaturedBlogProps = {
  post: WPPost;
};

export function FeaturedBlog({ post }: FeaturedBlogProps) {
  return <BlogCard post={post} featured priority className="min-h-full" />;
}
