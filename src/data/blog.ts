// The blog's shape and every pure operation on it.
//
// Posts come from the Inkwell studio: publishing a "technical" entry writes a
// snapshot row to Supabase, and this site's build turns those rows into static
// JSON, prerendered HTML, and a feed. Nothing here touches the network, so the
// app, the build scripts, and the tests all share one definition.

import { SITE_URL } from "./siteRoutes";

export interface BlogTag {
  name: string;
  color: string;
  category: string | null;
}

/** One published post, as the site serves it. */
export interface BlogPost {
  slug: string;
  title: string;
  /** Meta description and listing excerpt, derived from the body text. */
  excerpt: string;
  bodyHtml: string;
  tags: BlogTag[];
  publishedAt: string;
  updatedAt: string;
}

/** The listing payload: every post minus its body, which is fetched per page. */
export type BlogSummary = Omit<BlogPost, "bodyHtml">;

/** Where the blog lives. One definition, so links and prerendering agree. */
export const BLOG_BASE = "/blog";

export function blogPath(slug: string): string {
  return `${BLOG_BASE}/${slug}`;
}

/** Trailing slash, matching canonicalUrl(): the form static hosting serves. */
export function blogUrl(slug: string): string {
  return `${SITE_URL}${blogPath(slug)}/`;
}

export function blogIndexUrl(): string {
  return `${SITE_URL}${BLOG_BASE}/`;
}

const EXCERPT_LENGTH = 155;

/**
 * A one-line summary of a post, used as its meta description and in the
 * listing. Cut at a word boundary so it doesn't end mid-word, and only
 * ellipsised when something was actually cut.
 */
export function excerptFrom(bodyText: string, limit = EXCERPT_LENGTH): string {
  const text = bodyText.replace(/\s+/g, " ").trim();
  if (text.length <= limit) return text;

  const cut = text.slice(0, limit);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).replace(/[.,;:!?—-]+$/, "")}…`;
}

/** Every distinct tag across the given posts, alphabetical. */
export function collectTags(posts: BlogSummary[]): BlogTag[] {
  const byName = new Map<string, BlogTag>();
  for (const post of posts) {
    for (const tag of post.tags) {
      if (!byName.has(tag.name)) byName.set(tag.name, tag);
    }
  }
  return [...byName.values()].sort((a, b) => a.name.localeCompare(b.name));
}

/** Posts carrying `tagName`, or all of them when no tag is selected. */
export function filterByTag<T extends BlogSummary>(
  posts: T[],
  tagName: string | null
): T[] {
  if (!tagName) return posts;
  return posts.filter((post) => post.tags.some((t) => t.name === tagName));
}

/** Newest first — the order a blog reads in. */
export function sortByNewest<T extends BlogSummary>(posts: T[]): T[] {
  return [...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

/** "March 18, 2026" — the date a post was first published. */
export function formatPostDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
