import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

// The résumé prints from the page that is already on screen: `@media print` in
// index.css, no second render and no print library. These assert the three
// things that makes load-bearing, because none of them is visible on screen
// and all of them silently regress.

/** Pages in a PDF, counted from its page objects. */
function pageCount(path: string): number {
  return (readFileSync(path, "latin1").match(/\/Type\s*\/Page[^s]/g) || [])
    .length;
}

const MARGIN = {
  top: "10mm",
  right: "10mm",
  bottom: "10mm",
  left: "10mm",
};

test("the shell, the print button and the colour stay off the paper", async ({
  page,
}) => {
  await page.goto("/resume");
  await page.waitForLoadState("networkidle");
  await page.emulateMedia({ media: "print" });

  for (const selector of [".page-header", ".page-footer", ".print-hide"]) {
    expect(
      await page.locator(selector).first().isVisible(),
      `${selector} should not print`
    ).toBe(false);
  }

  const printed = await page.evaluate(() => {
    const read = (sel: string, prop: string) =>
      getComputedStyle(
        document.querySelector(sel) as HTMLElement
      ).getPropertyValue(prop);
    return {
      heading: read(".resume .h2", "color"),
      body: read(".resume .copy", "color"),
      link: read(".resume a", "color"),
      // One column: the skills cards collapse to a line per layer on paper.
      skills: read(".skills-grid", "display"),
      cardBorder: read(".skills-card", "border-top-width"),
    };
  });

  expect(printed.heading).toBe("rgb(0, 0, 0)");
  expect(printed.body).toBe("rgb(0, 0, 0)");
  expect(printed.link).toBe("rgb(0, 0, 0)");
  expect(printed.skills).toBe("block");
  expect(printed.cardBorder).toBe("0px");
});

// Three pages at 12px body, and the runway's UI-18 records why it is not two:
// the content only reaches two pages at 9px on A4, which Letter will not take
// either. This pins the page count so a résumé that grows past it is caught
// here rather than at a printer.
for (const format of ["A4", "Letter"] as const) {
  test(`the résumé prints on no more than three pages at ${format}`, async ({
    page,
  }, testInfo) => {
    await page.goto("/resume");
    await page.waitForLoadState("networkidle");

    const file = join(
      mkdtempSync(join(tmpdir(), "resume-pdf-")),
      `${testInfo.title.replace(/\W+/g, "-")}.pdf`
    );
    await page.pdf({
      path: file,
      format,
      printBackground: true,
      margin: MARGIN,
    });

    expect(pageCount(file)).toBeLessThanOrEqual(3);
  });
}
