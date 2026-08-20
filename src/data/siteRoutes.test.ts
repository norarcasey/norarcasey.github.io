import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { SITE_ROUTES, SITE_ROUTE_PATHS, canonicalUrl } from "./siteRoutes";

// The router is the source of truth for what exists; this file is the source
// of truth for what gets a prerendered HTML file and a sitemap entry. A route
// added to one and not the other is exactly the failure that left every deep
// link answering 404, so read the router's paths back out and compare.
function routerPaths(): string[] {
  // From the project root: Vitest serves modules over http, so import.meta.url
  // is not a file path here.
  const source = readFileSync(resolve(process.cwd(), "src/index.tsx"), "utf8");
  const paths = [...source.matchAll(/path:\s*"([^"]*)"/g)].map((m) => m[1]);
  return paths.map((path) => (path.startsWith("/") ? path : `/${path}`));
}

/** Router paths with a URL parameter, e.g. "/blog/:slug". */
function dynamicRouterPaths(): string[] {
  return routerPaths().filter((path) => path.includes(":"));
}

/** Router paths that name one fixed page. */
function staticRouterPaths(): string[] {
  return routerPaths().filter((path) => !path.includes(":"));
}

describe("SITE_ROUTES", () => {
  it("covers every fixed route the router serves", () => {
    expect([...SITE_ROUTE_PATHS].sort()).toEqual(staticRouterPaths().sort());
  });

  // Blog posts are pages too, but there is one per database row rather than
  // one per entry in this table, so they can't be listed here. They get their
  // HTML and sitemap entries from blogPages() in scripts/prerender.ts, driven
  // by the posts fetched at build time. This test pins the exception: any
  // *other* dynamic route added later has no prerendering and would fail here.
  it("leaves only the blog post route to be prerendered per-post", () => {
    expect(dynamicRouterPaths()).toEqual(["/blog/:slug"]);
  });

  it("gives each page a title and a description worth indexing", () => {
    for (const path of SITE_ROUTE_PATHS) {
      const { title, description } = SITE_ROUTES[path];
      expect(title.length).toBeGreaterThan(0);
      // Google truncates a description around 160 characters, but a short one
      // is a wasted snippet. These are the bounds the current copy sits in.
      expect(description.length).toBeGreaterThanOrEqual(50);
      expect(description.length).toBeLessThanOrEqual(300);
    }
  });
});

describe("canonicalUrl", () => {
  it("is absolute and ends in a slash, matching the prerendered file", () => {
    expect(canonicalUrl("/")).toBe("https://noracasey.com/");
    expect(canonicalUrl("/crucinora")).toBe("https://noracasey.com/crucinora/");
  });
});
