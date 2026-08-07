import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// Running in a real browser adds the color-contrast checks that the jsdom
// (jest-axe) suite can't perform, and scans the actual production CSS bundle.
//
// Pages built entirely from our own markup, so a clean pass is fully under our
// control and the whole page is in scope.
const PAGES = [
  { name: "Home", path: "/" },
  { name: "Résumé", path: "/resume" },
  { name: "Contact", path: "/contact-me" },
  { name: "CruciNora", path: "/crucinora" },
  { name: "Legends of Noragon", path: "/legends-of-noragon" },
];

// The project showcase pages embed a game from its own published npm package.
// Those widgets are fixed in their own repos and released on their own
// schedule, so gating this site's CI on them would mean a red build we can't
// turn green from here. The scan still covers everything around the game: the
// header, the summary copy and its links, the npm badge, and the details band.
const SHOWCASE_PAGES = [
  { name: "Mine Sweeper", path: "/mine-sweeper" },
  { name: "Tic Tac Nora", path: "/tic-tac-nora" },
  { name: "Anoraconda", path: "/anoraconda" },
  { name: "Arkanora", path: "/arkanora" },
  { name: "Pianora", path: "/pianora" },
  { name: "Star Siege", path: "/space-invaders" },
];

function report(
  violations: {
    impact?: unknown;
    id: string;
    help: string;
    nodes: { target: unknown[] }[];
  }[]
) {
  return violations
    .map(
      (v) =>
        `- [${v.impact}] ${v.id}: ${v.help}\n    ${v.nodes
          .map((n) => n.target.join(" "))
          .join("\n    ")}`
    )
    .join("\n");
}

for (const { name, path } of PAGES) {
  test(`${name} has no detectable accessibility violations`, async ({
    page,
  }) => {
    await page.goto(path);
    await page.waitForLoadState("networkidle");

    const { violations } = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    expect(
      violations,
      `Accessibility violations on ${path}:\n${report(violations)}`
    ).toEqual([]);
  });
}

for (const { name, path } of SHOWCASE_PAGES) {
  test(`${name} has no detectable accessibility violations outside the game`, async ({
    page,
  }) => {
    await page.goto(path);
    await page.waitForLoadState("networkidle");

    const { violations } = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .exclude(".showcase-game")
      .analyze();

    expect(
      violations,
      `Accessibility violations on ${path}:\n${report(violations)}`
    ).toEqual([]);
  });
}
