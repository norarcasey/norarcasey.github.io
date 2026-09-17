import { test, expect } from "@playwright/test";

// Layout facts that only a real browser can settle: the showcase grid resolves
// through media queries, and both regressions below came from block-flow
// behaviour that grid does not share. jsdom evaluates neither.

const DESKTOP = { width: 1440, height: 1200 };
const MOBILE = { width: 390, height: 900 };

const HEADER = ".showcase-header";
const SUMMARY = ".showcase-summary";
const DETAILS = ".showcase-details";

test.describe("project showcase layout", () => {
  test("the title lines up with the summary column", async ({ page }) => {
    // Auto side margins once threw the title into the middle of its row: a
    // grid item honours them by shrinking to its content and centring. The
    // slots carry none now, and this is what keeps it that way.
    await page.setViewportSize(DESKTOP);
    await page.goto("/arkanora");
    await page.waitForLoadState("networkidle");

    const header = await page.locator(HEADER).boundingBox();
    const summary = await page.locator(SUMMARY).boundingBox();
    expect(header).not.toBeNull();
    expect(summary).not.toBeNull();

    // Same left edge, and the header spans past the summary column rather than
    // shrinking to the width of the word "Arkanora".
    expect(Math.abs(header!.x - summary!.x)).toBeLessThanOrEqual(1);
    expect(header!.width).toBeGreaterThan(summary!.width);
  });

  test("the heading carries no trailing margin out of the header", async ({
    page,
  }) => {
    // A bottom margin on the heading used to escape the header box by margin
    // collapsing; grid items don't collapse margins, so it is zero at the
    // source and the row spacing is the grid's own.
    await page.setViewportSize(DESKTOP);
    await page.goto("/arkanora");
    await page.waitForLoadState("networkidle");

    const marginBottom = await page
      .locator(`${HEADER} h1`)
      .evaluate((el) => getComputedStyle(el).marginBottom);
    expect(marginBottom).toBe("0px");
  });

  test("the summary sits beside the game on desktop and stacks on mobile", async ({
    page,
  }) => {
    await page.setViewportSize(DESKTOP);
    await page.goto("/arkanora");
    await page.waitForLoadState("networkidle");

    let summary = (await page.locator(SUMMARY).boundingBox())!;
    let game = (await page.locator(".showcase-game").boundingBox())!;
    expect(game.x).toBeGreaterThan(summary.x + summary.width - 1);

    await page.setViewportSize(MOBILE);
    summary = (await page.locator(SUMMARY).boundingBox())!;
    game = (await page.locator(".showcase-game").boundingBox())!;
    expect(game.y).toBeGreaterThan(summary.y + summary.height - 1);
  });

  test("the details band spans the full width under both columns", async ({
    page,
  }) => {
    await page.setViewportSize(DESKTOP);
    await page.goto("/arkanora");
    await page.waitForLoadState("networkidle");

    const summary = (await page.locator(SUMMARY).boundingBox())!;
    const game = (await page.locator(".showcase-game").boundingBox())!;
    const details = (await page.locator(DETAILS).boundingBox())!;

    expect(details.y).toBeGreaterThan(summary.y + summary.height - 1);
    expect(details.width).toBeGreaterThan(game.x + game.width - summary.x - 2);
  });

  test("hideOnMobile hides Star Siege on small screens only", async ({
    page,
  }) => {
    await page.setViewportSize(MOBILE);
    await page.goto("/space-invaders");
    await page.waitForLoadState("networkidle");
    await expect(page.locator(".showcase-game")).toBeHidden();

    await page.setViewportSize(DESKTOP);
    await expect(page.locator(".showcase-game")).toBeVisible();
  });

  test("Mine Sweeper's game column is sized by its board", async ({ page }) => {
    // width="fit-content" rather than the default fixed 560px column, because
    // the board grows with difficulty.
    await page.setViewportSize(DESKTOP);
    await page.goto("/mine-sweeper");
    await page.waitForLoadState("networkidle");

    const slot = (await page.locator(".showcase-game").boundingBox())!;
    expect(slot.width).toBeLessThan(560);
  });
});
