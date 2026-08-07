import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import type { Plugin } from "vite";

import {
  SITE_ROUTES,
  SITE_ROUTE_PATHS,
  canonicalUrl,
  pageTitle,
  type SiteRoutePath,
} from "../src/data/siteRoutes";

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

/** The built index.html, rewritten to describe one particular route. */
export function renderRouteHtml(template: string, path: SiteRoutePath): string {
  const { title, description } = SITE_ROUTES[path];
  const url = canonicalUrl(path);

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

  return html;
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
export function renderSitemap(): string {
  return SITE_ROUTE_PATHS.map(canonicalUrl).join("\n") + "\n";
}

/**
 * Writes one HTML file per route, plus the sitemap, after the bundle is built.
 * Build-time only: the dev server routes in memory and needs none of this.
 */
export function prerenderRoutes(): Plugin {
  let outDir = "";

  return {
    name: "prerender-routes",
    apply: "build",

    configResolved(config) {
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

      writeFileSync(join(outDir, "sitemap.txt"), renderSitemap());

      this.info(
        `prerendered ${SITE_ROUTE_PATHS.length} routes and sitemap.txt`
      );
    },
  };
}
