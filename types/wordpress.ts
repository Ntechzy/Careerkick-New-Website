export type RenderedText = {
  rendered: string;
};

export type WPFeaturedMedia = {
  id: number;
  source_url: string;
  alt_text: string;
  media_details?: {
    width?: number;
    height?: number;
  };
};

export type WPAuthor = {
  id: number;
  name: string;
  slug: string;
  avatar_urls?: Record<string, string>;
};

export type WPTerm = {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: "category" | "post_tag" | string;
};

export type WPCategory = WPTerm & {
  taxonomy: "category";
};

export type WPTag = WPTerm & {
  taxonomy: "post_tag";
};

export type WPEmbeddedData = {
  author?: WPAuthor[];
  "wp:featuredmedia"?: WPFeaturedMedia[];
  "wp:term"?: WPTerm[][];
};

export type WPRawPost = {
  id: number;
  date: string;
  modified: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: RenderedText;
  content: RenderedText;
  excerpt: RenderedText;
  author: number;
  featured_media: number;
  categories: number[];
  tags: number[];
  _embedded?: WPEmbeddedData;
};

export type BlogAuthor = {
  id: number;
  name: string;
  slug: string;
  avatar?: string;
};

export type BlogMedia = {
  id: number;
  url: string;
  alt: string;
  width?: number;
  height?: number;
};

export type BlogTerm = {
  id: number;
  name: string;
  slug: string;
  count?: number;
};

export type WPPost = {
  id: number;
  slug: string;
  link: string;
  title: string;
  excerpt: string;
  content: string;
  rawContent: string;
  date: string;
  modified: string;
  featuredImage: BlogMedia | null;
  categories: BlogTerm[];
  tags: BlogTerm[];
  author: BlogAuthor | null;
  readingTime: string;
  wordCount: number;
};

export type PostsQuery = {
  page?: number;
  perPage?: number;
  search?: string;
  category?: number | string;
  order?: "asc" | "desc";
  orderBy?: "date" | "modified" | "title";
};
