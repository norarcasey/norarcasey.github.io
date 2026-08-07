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
// Every one of those packages currently scans clean, so the whole page is
// gated: an a11y regression in a future release of any game fails this build
// too, rather than going unnoticed until someone runs a scan by hand.
//
// If a game does regress and the fix has to happen in its own repo and
// release, give that entry a `skipGame` reason. It scopes the scan around the
// widget so this build can go green, while naming exactly what is outstanding
// and where it belongs.
const SHOWCASE_PAGES: {
  name: string;
  path: string;
  skipGame?: string;
}[] = [
  { name: "Mine Sweeper", path: "/mine-sweeper" },
  { name: "Tic Tac Nora", path: "/tic-tac-nora" },
  { name: "Pianora", path: "/pianora" },
  { name: "Star Siege", path: "/space-invaders" },
  { name: "Arkanora", path: "/arkanora" },
  { name: "Anoraconda", path: "/anoraconda" },
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

for (const { name, path, skipGame } of SHOWCASE_PAGES) {
  const scope = skipGame ? " outside the game" : "";
  test(`${name} has no detectable accessibility violations${scope}`, async ({
    page,
  }) => {
    await page.goto(path);
    await page.waitForLoadState("networkidle");

    let builder = new AxeBuilder({ page }).withTags([
      "wcag2a",
      "wcag2aa",
      "wcag21a",
      "wcag21aa",
    ]);
    if (skipGame) builder = builder.exclude(".showcase-game");
    const { violations } = await builder.analyze();

    expect(
      violations,
      `Accessibility violations on ${path}:\n${report(violations)}`
    ).toEqual([]);
  });
}
