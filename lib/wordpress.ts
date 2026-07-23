import sanitizeHtml from "sanitize-html";
import type {
  BlogTerm,
  PostsQuery,
  WPCategory,
  WPPost,
  WPRawPost,
  WPTag,
} from "@/types/wordpress";

const API_BASE = "https://blogs.careerkick.in/wp-json/wp/v2";
const REVALIDATE_SECONDS = 3600;

const htmlEntityMap: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  "#039": "'",
  apos: "'",
  nbsp: " ",
};

function buildUrl(path: string, params: Record<string, string | number | undefined> = {}) {
  const url = new URL(`${API_BASE}${path}`);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  return url.toString();
}

async function wpFetch<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url, {
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export function decodeHtml(value: string) {
  return value
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCharCode(Number(code)))
    .replace(/&([a-zA-Z#0-9]+);/g, (match, entity: string) => htmlEntityMap[entity] ?? match)
    .trim();
}

export function stripHtml(value: string) {
  return decodeHtml(
    sanitizeHtml(value, {
      allowedTags: [],
      allowedAttributes: {},
    }).replace(/\s+/g, " "),
  );
}

export function truncateText(value: string, maxLength = 140) {
  const text = stripHtml(value);

  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength).replace(/\s+\S*$/, "")}...`;
}

export function sanitizePostHtml(value: string) {
  return sanitizeHtml(value, {
    allowedTags: [
      ...sanitizeHtml.defaults.allowedTags,
      "img",
      "figure",
      "figcaption",
      "iframe",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "pre",
      "code",
    ],
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      "*": ["class", "id", "style"],
      a: ["href", "name", "target", "rel"],
      img: ["src", "srcset", "sizes", "alt", "width", "height", "loading"],
      iframe: [
        "src",
        "width",
        "height",
        "title",
        "allow",
        "allowfullscreen",
        "loading",
        "referrerpolicy",
      ],
      table: ["class"],
      th: ["colspan", "rowspan"],
      td: ["colspan", "rowspan"],
    },
    allowedIframeHostnames: ["www.youtube.com", "youtube.com", "player.vimeo.com"],
    allowedSchemes: ["http", "https", "mailto", "tel"],
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }),
      iframe: sanitizeHtml.simpleTransform("iframe", { loading: "lazy" }),
    },
  });
}

export function calculateReadingTime(html: string) {
  const words = stripHtml(html).split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));

  return {
    text: `${minutes} min read`,
    wordCount: words,
  };
}

export function formatPostDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function termsByTaxonomy(post: WPRawPost, taxonomy: "category" | "post_tag"): BlogTerm[] {
  const terms = post._embedded?.["wp:term"]?.flat() ?? [];

  return terms
    .filter((term) => term.taxonomy === taxonomy)
    .map((term) => ({
      id: term.id,
      name: decodeHtml(term.name),
      slug: term.slug,
      count: term.count,
    }));
}

export function normalizePost(post: WPRawPost): WPPost {
  const featured = post._embedded?.["wp:featuredmedia"]?.[0] ?? null;
  const author = post._embedded?.author?.[0] ?? null;
  const reading = calculateReadingTime(post.content.rendered);

  return {
    id: post.id,
    slug: post.slug,
    link: post.link,
    title: decodeHtml(stripHtml(post.title.rendered)),
    excerpt: truncateText(post.excerpt.rendered, 170),
    content: sanitizePostHtml(post.content.rendered),
    rawContent: post.content.rendered,
    date: post.date,
    modified: post.modified,
    featuredImage: featured
      ? {
          id: featured.id,
          url: featured.source_url,
          alt: featured.alt_text || decodeHtml(stripHtml(post.title.rendered)),
          width: featured.media_details?.width,
          height: featured.media_details?.height,
        }
      : null,
    categories: termsByTaxonomy(post, "category"),
    tags: termsByTaxonomy(post, "post_tag"),
    author: author
      ? {
          id: author.id,
          name: decodeHtml(author.name),
          slug: author.slug,
          avatar: author.avatar_urls?.["96"],
        }
      : null,
    readingTime: reading.text,
    wordCount: reading.wordCount,
  };
}

export async function getPosts(query: PostsQuery = {}) {
  const data = await wpFetch<WPRawPost[]>(
    buildUrl("/posts", {
      _embed: 1,
      per_page: query.perPage ?? 12,
      page: query.page,
      search: query.search,
      categories: query.category,
      order: query.order ?? "desc",
      orderby: query.orderBy ?? "date",
    }),
  );

  return data?.map(normalizePost) ?? [];
}

export async function getAllPosts() {
  return getPosts({ perPage: 100 });
}

export async function getLatestPosts(count: number) {
  return getPosts({ perPage: count });
}

export async function getPost(slug: string) {
  const data = await wpFetch<WPRawPost[]>(
    buildUrl("/posts", {
      slug,
      _embed: 1,
    }),
  );

  return data?.[0] ? normalizePost(data[0]) : null;
}

export async function getPostBySlug(slug: string) {
  return getPost(slug);
}

export async function getCategories() {
  const data = await wpFetch<WPCategory[]>(
    buildUrl("/categories", {
      per_page: 100,
      orderby: "count",
      order: "desc",
    }),
  );

  return (
    data?.map((category) => ({
      id: category.id,
      name: decodeHtml(category.name),
      slug: category.slug,
      count: category.count,
    })) ?? []
  );
}

export async function getTags() {
  const data = await wpFetch<WPTag[]>(
    buildUrl("/tags", {
      per_page: 100,
      orderby: "count",
      order: "desc",
    }),
  );

  return (
    data?.map((tag) => ({
      id: tag.id,
      name: decodeHtml(tag.name),
      slug: tag.slug,
      count: tag.count,
    })) ?? []
  );
}

export async function searchPosts(search: string) {
  return getPosts({ search, perPage: 12 });
}

export async function getPostsByCategory(category: number | string, page = 1) {
  return getPosts({ category, page, perPage: 12 });
}

export async function getRelatedPosts(post: WPPost, count = 3) {
  const primaryCategory = post.categories[0]?.id;
  const posts = primaryCategory
    ? await getPosts({ category: primaryCategory, perPage: count + 1 })
    : await getLatestPosts(count + 1);

  const related = posts.filter((item) => item.id !== post.id).slice(0, count);

  if (related.length >= count) {
    return related;
  }

  const latest = await getLatestPosts(count + 1);
  const fallback = latest
    .filter((item) => item.id !== post.id && !related.some((relatedPost) => relatedPost.id === item.id))
    .slice(0, count - related.length);

  return [...related, ...fallback];
}
