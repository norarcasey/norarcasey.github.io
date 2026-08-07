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

describe("SITE_ROUTES", () => {
  it("covers every route the router serves", () => {
    expect([...SITE_ROUTE_PATHS].sort()).toEqual(routerPaths().sort());
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
