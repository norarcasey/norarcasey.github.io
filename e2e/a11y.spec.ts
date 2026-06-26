import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// Pages built entirely from our own markup (no embedded third-party game
// widgets), so a clean axe pass is fully under our control. Running in a real
// browser adds the color-contrast checks that the jsdom (jest-axe) suite can't
// perform, and scans the actual production CSS bundle.
const PAGES = [
  { name: "Home", path: "/" },
  { name: "Résumé", path: "/resume" },
  { name: "Contact", path: "/contact-me" },
  { name: "CruciNora", path: "/crucinora" },
  { name: "Legends of Noragon", path: "/legends-of-noragon" },
];

for (const { name, path } of PAGES) {
  test(`${name} has no detectable accessibility violations`, async ({
    page,
  }) => {
    await page.goto(path);
    await page.waitForLoadState("networkidle");

    const { violations } = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    const detail = violations
      .map(
        (v) =>
          `- [${v.impact}] ${v.id}: ${v.help}\n    ${v.nodes
            .map((n) => n.target.join(" "))
            .join("\n    ")}`
      )
      .join("\n");

    expect(
      violations,
      `Accessibility violations on ${path}:\n${detail}`
    ).toEqual([]);
  });
}
