import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import type { Plugin } from "vite";

import {
  SITE_ROUTES,
  SITE_ROUTE_PATHS,
  SITE_URL,
  canonicalUrl,
  pageTitle,
  type SiteRoutePath,
} from "../src/data/siteRoutes";
import { blogPath, blogUrl, type BlogSummary } from "../src/data/blog";
import {
  structuredDataFor,
  blogPostStructuredData,
} from "../src/data/structuredData";

// GitHub Pages has no server-side routing, so a single-page app there normally
// answers every deep link with a 404 and relies on 404.html to bounce the
// browser back into the app. People don't notice; crawlers do, and they don't
// index a URL that returns 404.
//
// So every route gets a real file at build time. The app is unchanged: each
// file is the same bundle-loading shell, with its own title, description,
// canonical URL, and social card baked in. That makes the served HTML correct
// before any JavaScript runs, which is also what link unfurlers (Slack,
// LinkedIn, iMessage) need, since none of them execute the app.

/** Escape a string for use in HTML text or a double-quoted attribute. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Replace the first match of `pattern`, failing loudly if there isn't one. A
 * missed tag would otherwise ship silently: every page would keep the home
 * page's metadata and nothing would look broken until months of bad indexing
 * later. Prettier reformats index.html's tags across lines freely, so these
 * patterns match a whole tag by an identifying attribute rather than assuming
 * any particular attribute order or whitespace.
 */
function replaceOne(
  html: string,
  pattern: RegExp,
  replacer: (match: string) => string,
  what: string
): string {
  if (!pattern.test(html)) {
    throw new Error(
      `prerender: found no ${what} in index.html, so it cannot be given per-page metadata`
    );
  }
  return html.replace(pattern, replacer);
}

/** Rewrite the `content` attribute of a meta tag identified by `pattern`. */
function setMetaContent(
  html: string,
  pattern: RegExp,
  value: string,
  what: string
): string {
  return replaceOne(
    html,
    pattern,
    (tag) =>
      tag.replace(/content="[^"]*"/, () => `content="${escapeHtml(value)}"`),
    what
  );
}

/** What a prerendered page says about itself, whatever kind of page it is. */
export interface PageMeta {
  title: string;
  description: string;
  url: string;
  /** JSON-LD graph for this page. */
  structuredData: unknown;
}

/** The built index.html, rewritten to describe one particular route. */
export function renderRouteHtml(template: string, path: SiteRoutePath): string {
  const { title, description } = SITE_ROUTES[path];
  return renderPageHtml(template, {
    title,
    description,
    url: canonicalUrl(path),
    structuredData: structuredDataFor(path),
  });
}

/**
 * The built index.html, rewritten to describe any page — a static route or a
 * blog post, which has no entry in SITE_ROUTES because its pages come from the
 * database rather than the route table.
 */
export function renderPageHtml(template: string, meta: PageMeta): string {
  const { title, description, url } = meta;

  let html = replaceOne(
    template,
    /<title>[^<]*<\/title>/,
    () => `<title>${escapeHtml(pageTitle(title))}</title>`,
    "<title>"
  );

  html = setMetaContent(
    html,
    /<meta\b[^>]*\bname="description"[^>]*>/,
    description,
    'meta name="description"'
  );

  html = replaceOne(
    html,
    /<link\b[^>]*\brel="canonical"[^>]*>/,
    (tag) => tag.replace(/href="[^"]*"/, () => `href="${escapeHtml(url)}"`),
    'link rel="canonical"'
  );

  // The card a link to this page unfurls into. og:title carries the bare page
  // name rather than the tab title: the card shows og:site_name beside it, so
  // the suffix would read "CruciNora · Nora Casey — Nora Casey".
  html = setMetaContent(
    html,
    /<meta\b[^>]*\bproperty="og:url"[^>]*>/,
    url,
    'meta property="og:url"'
  );
  html = setMetaContent(
    html,
    /<meta\b[^>]*\bproperty="og:title"[^>]*>/,
    title,
    'meta property="og:title"'
  );
  html = setMetaContent(
    html,
    /<meta\b[^>]*\bproperty="og:description"[^>]*>/,
    description,
    'meta property="og:description"'
  );
  html = setMetaContent(
    html,
    /<meta\b[^>]*\bname="twitter:title"[^>]*>/,
    title,
    'meta name="twitter:title"'
  );
  html = setMetaContent(
    html,
    /<meta\b[^>]*\bname="twitter:description"[^>]*>/,
    description,
    'meta name="twitter:description"'
  );

  return replaceOne(
    html,
    /<\/head>/,
    () => `  ${structuredDataTag(meta.structuredData)}\n  </head>`,
    "</head>"
  );
}

/**
 * The route's JSON-LD, as a script tag to drop into <head>.
 *
 * `<` is escaped: a `</script>` sequence inside the JSON would otherwise close
 * the tag early and spill the rest of the graph into the page as markup. The
 * escape is invisible to a JSON parser.
 */
function structuredDataTag(data: unknown): string {
  const json = JSON.stringify(data, null, 2).replace(/</g, "\\u003c");
  return `<script type="application/ld+json">\n${json}\n</script>`;
}

/**
 * Where a route's HTML file goes, relative to the build output. Directories
 * with an index.html rather than `crucinora.html`, because serving `/foo/`
 * from `/foo/index.html` is behaviour every static host agrees on.
 */
export function routeOutputPath(path: SiteRoutePath): string {
  return path === "/" ? "index.html" : `${path.slice(1)}/index.html`;
}

/** The sitemap, generated so it can't list a route that was never built. */
export function renderSitemap(posts: BlogSummary[] = []): string {
  const urls = [
    ...SITE_ROUTE_PATHS.map(canonicalUrl),
    ...posts.map((post) => blogUrl(post.slug)),
  ];
  return urls.join("\n") + "\n";
}

/** Escape a string for XML text content. */
function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * RSS 2.0 for the blog. Summaries only, not full bodies: the post HTML embeds
 * images and markup meant for this site's styles, and a feed reader rendering
 * it out of context looks broken.
 */
export function renderFeed(posts: BlogSummary[]): string {
  const items = posts
    .map((post) =>
      [
        "    <item>",
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${escapeXml(blogUrl(post.slug))}</link>`,
        `      <guid isPermaLink="true">${escapeXml(blogUrl(post.slug))}</guid>`,
        `      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>`,
        `      <description>${escapeXml(post.excerpt)}</description>`,
        ...post.tags.map(
          (tag) => `      <category>${escapeXml(tag.name)}</category>`
        ),
        "    </item>",
      ].join("\n")
    )
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    "    <title>Nora Casey — Blog</title>",
    `    <link>${SITE_URL}${blogPath("").replace(/\/$/, "")}/</link>`,
    "    <description>Technical writing by Nora Casey.</description>",
    "    <language>en</language>",
    `    <atom:link href="${SITE_URL}/blog/feed.xml" rel="self" type="application/rss+xml" />`,
    items,
    "  </channel>",
    "</rss>",
    "",
  ]
    .filter((line) => line !== "")
    .join("\n");
}

/** The blog listing plus every post, as pages the prerender must write. */
export function blogPages(posts: BlogSummary[]): {
  path: string;
  meta: PageMeta;
}[] {
  return posts.map((post) => ({
    path: blogPath(post.slug),
    meta: {
      title: post.title,
      description: post.excerpt,
      url: blogUrl(post.slug),
      structuredData: blogPostStructuredData(post),
    },
  }));
}

/**
 * The posts written by the blog-content plugin earlier in the build. Read from
 * disk rather than passed in memory so the two plugins stay independent.
 */
function readBlogSummaries(root: string): BlogSummary[] {
  const file = resolve(root, "public/blog/index.json");
  if (!existsSync(file)) return [];
  return JSON.parse(readFileSync(file, "utf8")) as BlogSummary[];
}

/**
 * Writes one HTML file per route, plus the sitemap, after the bundle is built.
 * Build-time only: the dev server routes in memory and needs none of this.
 */
export function prerenderRoutes(): Plugin {
  let outDir = "";
  let root = process.cwd();

  return {
    name: "prerender-routes",
    apply: "build",

    configResolved(config) {
      root = config.root;
      outDir = resolve(config.root, config.build.outDir);
    },

    closeBundle() {
      // Read once, up front: the "/" render overwrites this same file.
      const template = readFileSync(join(outDir, "index.html"), "utf8");

      for (const path of SITE_ROUTE_PATHS) {
        const file = join(outDir, routeOutputPath(path));
        mkdirSync(dirname(file), { recursive: true });
        writeFileSync(file, renderRouteHtml(template, path));
      }

      // Blog posts are pages too, but they come from the database rather than
      // the route table, so each one is rendered from its own metadata.
      const posts = readBlogSummaries(root);
      for (const { path, meta } of blogPages(posts)) {
        const file = join(outDir, `${path.slice(1)}/index.html`);
        mkdirSync(dirname(file), { recursive: true });
        writeFileSync(file, renderPageHtml(template, meta));
      }

      writeFileSync(join(outDir, "sitemap.txt"), renderSitemap(posts));
      mkdirSync(join(outDir, "blog"), { recursive: true });
      writeFileSync(join(outDir, "blog", "feed.xml"), renderFeed(posts));

      this.info(
        `prerendered ${SITE_ROUTE_PATHS.length} routes, ${posts.length} blog post(s), sitemap.txt and blog/feed.xml`
      );
    },
  };
}
