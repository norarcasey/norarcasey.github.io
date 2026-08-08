import { test, expect, type APIRequestContext } from "@playwright/test";

// These assert on what the *server* hands back, before any JavaScript runs.
// That is the whole point of prerendering: crawlers and link unfurlers see
// only this. `yarn preview` serves the real build output, so a passing run
// here means the files GitHub Pages will publish are the ones checked.

const ROUTES = ["/", "/crucinora/", "/legends-of-noragon/", "/resume/"];

/** The served HTML, fetched without executing it. */
async function fetchHtml(
  request: APIRequestContext,
  path: string
): Promise<{ status: number; html: string }> {
  const response = await request.get(path);
  return { status: response.status(), html: await response.text() };
}

function tagContent(html: string, attribute: string): string | undefined {
  const tag = new RegExp(`<meta\\b[^>]*"${attribute}"[^>]*>`).exec(html)?.[0];
  return /content="([^"]*)"/.exec(tag ?? "")?.[1];
}

test.describe("prerendered routes", () => {
  for (const path of ROUTES) {
    test(`${path} is served as a real page, not a 404`, async ({ request }) => {
      // The regression this guards: GitHub Pages answered every deep link with
      // 404.html, so crawlers dropped the URL before they ever saw the app.
      const { status, html } = await fetchHtml(request, path);
      expect(status).toBe(200);
      expect(html).toContain('<div id="root">');
      // 404.html is the redirect shim, and it is the only page titled this.
      // (index.html quotes the same phrase in a comment, so match the tag.)
      expect(html).not.toMatch(/<title>Single Page Apps/);
    });
  }

  test("each page carries its own title, description, and canonical", async ({
    request,
  }) => {
    const { html } = await fetchHtml(request, "/crucinora/");

    expect(html).toContain("<title>CruciNora · Nora Casey</title>");
    expect(tagContent(html, "description")).toContain("crossword");
    expect(html).toContain(
      '<link rel="canonical" href="https://noracasey.com/crucinora/" />'
    );
  });

  test("the social card describes the page, not the site", async ({
    request,
  }) => {
    const { html } = await fetchHtml(request, "/legends-of-noragon/");

    expect(tagContent(html, "og:url")).toBe(
      "https://noracasey.com/legends-of-noragon/"
    );
    expect(tagContent(html, "og:title")).toBe("Legends of Noragon");
    expect(tagContent(html, "og:description")).toContain("dungeon crawler");
    expect(tagContent(html, "twitter:title")).toBe("Legends of Noragon");
    // Site-level tags stay put.
    expect(tagContent(html, "og:image")).toBe("https://noracasey.com/og.png");
  });

  test("the home page keeps its own metadata", async ({ request }) => {
    const { html } = await fetchHtml(request, "/");

    expect(html).toContain("<title>Nora Casey</title>");
    expect(html).toContain(
      '<link rel="canonical" href="https://noracasey.com/" />'
    );
  });

  test("the sitemap lists the URLs that are actually served", async ({
    request,
  }) => {
    const response = await request.get("/sitemap.txt");
    expect(response.status()).toBe(200);
    const urls = (await response.text()).trim().split("\n");

    expect(urls).toContain("https://noracasey.com/crucinora/");
    expect(urls).toHaveLength(11);

    // Every listed URL must resolve on the served build, which is the check
    // that would have caught the 404s.
    for (const url of urls) {
      const path = new URL(url).pathname;
      expect((await request.get(path)).status(), `${path} is served`).toBe(200);
    }
  });

  test("robots.txt allows crawling and points at the sitemap", async ({
    request,
  }) => {
    const robots = await (await request.get("/robots.txt")).text();
    expect(robots).toContain("User-agent: *");
    expect(robots).toContain("Sitemap: https://noracasey.com/sitemap.txt");
  });

  test("the app still routes on the client after loading a deep link", async ({
    page,
  }) => {
    // The static file only starts the page; React must take over and render
    // the right route rather than the home page.
    await page.goto("/crucinora/");
    await page.waitForLoadState("networkidle");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "CruciNora"
    );
    await expect(page).toHaveTitle("CruciNora · Nora Casey");
  });
});
