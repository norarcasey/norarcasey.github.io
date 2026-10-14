import type { FullConfig } from "@playwright/test";

// Every spec trusts that baseURL serves this site. If another app holds the
// port, the a11y and SEO specs fail for the wrong reason, or pass against the
// wrong page (CASEY-7). Check the home page title once, before any of them.
export default async function globalSetup(config: FullConfig) {
  const baseURL = config.projects[0]?.use.baseURL;
  if (!baseURL) throw new Error("e2e: no baseURL in playwright.config.ts");

  const html = await (await fetch(baseURL)).text();
  const title = /<title>([^<]*)<\/title>/.exec(html)?.[1] ?? "";
  if (!title.startsWith("Nora Casey")) {
    throw new Error(
      `e2e: ${baseURL} is not noracasey.com (home page title ${JSON.stringify(title)}). ` +
        "Another server holds the port; see playwright.config.ts."
    );
  }
}
