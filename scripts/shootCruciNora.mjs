#!/usr/bin/env node
// Screenshot CruciNora's public site, for its case study.
//
//   node scripts/shootCruciNora.mjs /tmp/shots
//   cp /tmp/shots/crucinora-*.png src/assets/screens/ && pnpm images
//
// Nothing is stubbed and nobody is signed in: these are pages any visitor to
// crucinora.com sees, and the puzzle is one Nora published. Only GETs. The
// builder is behind an admin sign-in, so it is not here (CASEY-6).
import { mkdirSync } from "node:fs";

import { chromium } from "@playwright/test";

const OUT = process.argv[2];
const BASE = process.env.CRUCINORA_URL ?? "https://www.crucinora.com";
const PUZZLE = "/p/will-o-the-wisp";

if (!OUT) {
  console.error("usage: node scripts/shootCruciNora.mjs <out dir>");
  process.exit(1);
}
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();

// The hero: the date, the title and the grid with its clue bar, at 16:9 so
// the case study's media frame is filled rather than cropped.
const desktop = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});
await desktop.goto(`${BASE}${PUZZLE}`, { waitUntil: "networkidle" });
await desktop.waitForTimeout(800);
await desktop.screenshot({
  path: `${OUT}/crucinora-solve.png`,
  clip: { x: 200, y: 62, width: 1008, height: 567 },
});

// The home page, at the gallery's 1280 by 900: every puzzle published so far.
const home = await browser.newPage({
  viewport: { width: 1280, height: 900 },
  deviceScaleFactor: 2,
});
await home.goto(BASE, { waitUntil: "networkidle" });
await home.waitForTimeout(800);
await home.screenshot({ path: `${OUT}/crucinora-home.png` });

// The same puzzle on a phone, where the grid, the current clue and the
// keyboard the app draws itself share one screen.
const phone = await browser.newPage({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
});
await phone.goto(`${BASE}${PUZZLE}`, { waitUntil: "networkidle" });
await phone.waitForTimeout(800);
await phone.screenshot({ path: `${OUT}/crucinora-phone.png` });

await browser.close();
