import {
  blogPages,
  renderFeed,
  renderPageHtml,
  renderRouteHtml,
  renderSitemap,
  routeOutputPath,
} from "./prerender";
import {
  SITE_ROUTES,
  SITE_ROUTE_PATHS,
  canonicalUrl,
} from "../src/data/siteRoutes";

// Shaped like the real index.html after Prettier: attributes wrapped across
// lines and in no guaranteed order, which is what the tag patterns have to
// survive.
const TEMPLATE = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta
      name="description"
      content="Nora Casey — software engineer building tools that empower people."
    />
    <link rel="canonical" href="https://noracasey.com/" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Nora Casey" />
    <meta property="og:title" content="Nora Casey" />
    <meta
      property="og:description"
      content="Software engineer building tools that empower people."
    />
    <meta property="og:url" content="https://noracasey.com/" />
    <meta property="og:image" content="https://noracasey.com/og.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Nora Casey" />
    <meta
      name="twitter:description"
      content="Software engineer building tools that empower people."
    />
    <title>Nora Casey</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" crossorigin src="/assets/index-abc123.js"></script>
  </body>
</html>
`;

/** The `content` of the meta tag carrying `attribute`, e.g. `og:title`. */
function metaContent(html: string, attribute: string): string {
  const tag = new RegExp(`<meta\\b[^>]*"${attribute}"[^>]*>`).exec(html)?.[0];
  return /content="([^"]*)"/.exec(tag ?? "")?.[1] ?? "";
}

describe("renderRouteHtml", () => {
  const html = renderRouteHtml(TEMPLATE, "/crucinora");
  const { title, description } = SITE_ROUTES["/crucinora"];

  it("titles the page and suffixes the site name", () => {
    expect(html).toContain("<title>CruciNora · Nora Casey</title>");
  });

  it("gives the page its own description", () => {
    expect(metaContent(html, "description")).toBe(description);
  });

  it("canonicalises the page to itself, not the home page", () => {
    expect(html).toContain(
      '<link rel="canonical" href="https://noracasey.com/crucinora/" />'
    );
  });

  it("points the social card at this page", () => {
    expect(metaContent(html, "og:url")).toBe(
      "https://noracasey.com/crucinora/"
    );
    expect(metaContent(html, "og:title")).toBe(title);
    expect(metaContent(html, "og:description")).toBe(description);
    expect(metaContent(html, "twitter:title")).toBe(title);
    expect(metaContent(html, "twitter:description")).toBe(description);
  });

  it("leaves the og:title free of the tab-title suffix", () => {
    // The card renders og:site_name beside it already.
    expect(metaContent(html, "og:title")).not.toContain("·");
  });

  it("leaves the rest of the shell alone", () => {
    expect(html).toContain('<script type="module" crossorigin');
    expect(html).toContain('<html lang="en">');
    expect(metaContent(html, "og:image")).toBe("https://noracasey.com/og.png");
    expect(metaContent(html, "og:site_name")).toBe("Nora Casey");
  });

  it("does not double up the site name on the home page", () => {
    expect(renderRouteHtml(TEMPLATE, "/")).toContain(
      "<title>Nora Casey</title>"
    );
  });

  it("escapes values rather than letting them break out of an attribute", () => {
    const injected = renderRouteHtml(
      TEMPLATE.replace("<title>Nora Casey</title>", "<title>x</title>"),
      "/resume"
    );
    // Résumé's copy has an apostrophe; nothing may produce a stray quote.
    expect(metaContent(injected, "description")).not.toContain('"');
  });

  it("fails the build rather than shipping a page it could not rewrite", () => {
    const withoutCanonical = TEMPLATE.replace(
      /<link rel="canonical"[^>]*>/,
      ""
    );
    expect(() => renderRouteHtml(withoutCanonical, "/crucinora")).toThrow(
      /canonical/
    );
  });
});

describe("routeOutputPath", () => {
  it("writes the home page at the root", () => {
    expect(routeOutputPath("/")).toBe("index.html");
  });

  it("gives every other route a directory with an index.html", () => {
    expect(routeOutputPath("/crucinora")).toBe("crucinora/index.html");
    expect(routeOutputPath("/legends-of-noragon")).toBe(
      "legends-of-noragon/index.html"
    );
  });
});

describe("renderSitemap", () => {
  const sitemap = renderSitemap();

  it("lists every route, absolute and canonical", () => {
    const lines = sitemap.trim().split("\n");
    expect(lines).toHaveLength(Object.keys(SITE_ROUTES).length);
    expect(lines[0]).toBe("https://noracasey.com/");
    expect(lines).toContain("https://noracasey.com/crucinora/");
    for (const line of lines) {
      expect(line).toMatch(/^https:\/\/noracasey\.com\/([a-z-]+\/)?$/);
    }
  });

  it("ends with a newline", () => {
    expect(sitemap.endsWith("\n")).toBe(true);
  });
});

describe("structured data", () => {
  /** The JSON-LD graph the page carries, parsed back out of the script tag. */
  function graphOf(html: string): Record<string, unknown>[] {
    const json = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/
      .exec(html)?.[1]
      ?.replace(/\\u003c/g, "<");
    expect(json).toBeTruthy();
    const parsed = JSON.parse(json ?? "{}");
    expect(parsed["@context"]).toBe("https://schema.org");
    return parsed["@graph"];
  }

  it("describes the person and the site on every page", () => {
    for (const path of SITE_ROUTE_PATHS) {
      const types = graphOf(renderRouteHtml(TEMPLATE, path)).map(
        (node) => node["@type"]
      );
      expect(types).toContain("Person");
      expect(types).toContain("WebSite");
    }
  });

  it("describes a game page as software the person wrote", () => {
    const game = graphOf(renderRouteHtml(TEMPLATE, "/arkanora")).find(
      (node) => node["@type"] === "SoftwareApplication"
    );
    expect(game?.name).toBe("Arkanora");
    expect(game?.applicationCategory).toBe("GameApplication");
    expect(game?.author).toEqual({ "@id": "https://noracasey.com/#nora" });
  });

  it("points a hosted project at where it actually runs", () => {
    const app = graphOf(renderRouteHtml(TEMPLATE, "/crucinora")).find(
      (node) => node["@type"] === "SoftwareApplication"
    );
    expect(app?.url).toBe("https://crucinora.com");
  });

  it("does not repeat the person as a page on the home page", () => {
    const types = graphOf(renderRouteHtml(TEMPLATE, "/")).map(
      (node) => node["@type"]
    );
    expect(types).toEqual(["Person", "WebSite"]);
  });

  it("escapes markup so the JSON cannot close its own script tag", () => {
    const html = renderRouteHtml(TEMPLATE, "/crucinora");
    const body =
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/.exec(
        html
      )?.[1];
    // Not one raw `<` inside the block, so no value can end the tag early.
    expect(body).not.toContain("<");
    // And the escaping keeps it parseable.
    expect(() => JSON.parse(body ?? "")).not.toThrow();
  });
});

// ── Blog ────────────────────────────────────────────────────────────────────

const POST = {
  slug: "rls-performance",
  title: "Debugging RLS performance",
  excerpt: "Postgres re-evaluated auth.uid() per row.",
  tags: [{ name: "postgres", color: "#6B6454", category: "topic" }],
  publishedAt: "2026-03-18T12:00:00Z",
  updatedAt: "2026-03-19T12:00:00Z",
};

describe("blog pages", () => {
  it("gives a post its own title, description, and canonical URL", () => {
    const [page] = blogPages([POST]);
    expect(page.path).toBe("/blog/rls-performance");

    const html = renderPageHtml(TEMPLATE, page.meta);
    expect(html).toContain(
      "<title>Debugging RLS performance · Nora Casey</title>"
    );
    expect(html).toContain(
      '<link rel="canonical" href="https://noracasey.com/blog/rls-performance/" />'
    );
    expect(html).toContain("Postgres re-evaluated");
  });

  it("describes the post as a BlogPosting authored by the site's person", () => {
    const html = renderPageHtml(TEMPLATE, blogPages([POST])[0].meta);
    const json = /<script type="application\/ld\+json">\n([\s\S]*?)\n<\/script>/
      .exec(html)?.[1]
      .replace(/\\u003c/g, "<");
    const graph = JSON.parse(json ?? "{}")["@graph"] as Record<
      string,
      unknown
    >[];

    const posting = graph.find((node) => node["@type"] === "BlogPosting");
    expect(posting).toMatchObject({
      headline: "Debugging RLS performance",
      datePublished: "2026-03-18T12:00:00Z",
      dateModified: "2026-03-19T12:00:00Z",
      keywords: ["postgres"],
    });
    expect(posting?.author).toEqual({ "@id": "https://noracasey.com/#nora" });
  });
});

describe("renderSitemap with posts", () => {
  it("lists every static route and every post", () => {
    const sitemap = renderSitemap([POST]);
    expect(sitemap).toContain("https://noracasey.com/blog/rls-performance/");
    // The static routes are still all there.
    for (const path of SITE_ROUTE_PATHS) {
      expect(sitemap).toContain(canonicalUrl(path));
    }
  });

  it("lists only the static routes when there are no posts", () => {
    expect(renderSitemap()).not.toContain("/blog/rls-performance/");
  });
});

describe("renderFeed", () => {
  it("produces an RSS channel with one item per post", () => {
    const feed = renderFeed([POST]);
    expect(feed).toContain('<rss version="2.0"');
    expect(feed).toContain("<title>Debugging RLS performance</title>");
    expect(feed).toContain(
      "<link>https://noracasey.com/blog/rls-performance/</link>"
    );
    expect(feed).toContain("<category>postgres</category>");
    // RFC-822 date, which is what RSS readers parse.
    expect(feed).toContain("<pubDate>Wed, 18 Mar 2026 12:00:00 GMT</pubDate>");
  });

  it("summarises rather than shipping the body, which is styled for this site", () => {
    const feed = renderFeed([POST]);
    expect(feed).toContain("Postgres re-evaluated");
    expect(feed).not.toContain("<p>");
  });

  it("escapes markup in titles so one post cannot break the feed", () => {
    const feed = renderFeed([{ ...POST, title: "A & B <c>" }]);
    expect(feed).toContain("<title>A &amp; B &lt;c&gt;</title>");
  });

  it("is still valid with no posts", () => {
    const feed = renderFeed([]);
    expect(feed).toContain("<channel>");
    expect(feed).not.toContain("<item>");
  });
});
