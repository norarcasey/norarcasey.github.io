#!/usr/bin/env node
// Screenshot the Noradar dashboard as it stands, for its case study.
//
// Start the daemon (it serves the dashboard on 4317), then, from this repo:
//
//   node scripts/shootNoradar.mjs /tmp/shots
//   cp /tmp/shots/noradar*.png src/assets/screens/ && pnpm images
//
// Unlike the Nora Bene and Noratives drivers, nothing here is stubbed. The
// dashboard holds project names, deploy states and agent hours, none of it
// anybody's private writing, so the rows are the real ones and the shot is of
// the machine it was taken on. It only issues GETs: the one control that would
// change anything, "refresh now", is never pressed.
//
// The dashboard is dark only, so there is no light pass to take.
import { mkdirSync } from "node:fs";

import { chromium } from "@playwright/test";

const OUT = process.argv[2];
const BASE = process.env.NORADAR_URL ?? "http://127.0.0.1:4317";

if (!OUT) {
  console.error("usage: node scripts/shootNoradar.mjs <out dir>");
  process.exit(1);
}
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1440, height: 1400 },
  deviceScaleFactor: 2,
});
await page.goto(BASE, { waitUntil: "networkidle" });
// The cards fill in from a poll after the first paint.
await page.waitForTimeout(1500);

// The hero: the header, the tabs and the first two rows of cards, at 16:9 so
// the case study's media frame is filled rather than cropped.
await page.screenshot({
  path: `${OUT}/noradar-radar.png`,
  clip: { x: 71, y: 12, width: 1298, height: 730 },
});

// The home page's card: four cards at the proportion the other cards were
// taken at, which is a different picture from the hero on purpose.
await page.screenshot({
  path: `${OUT}/noradar.png`,
  clip: { x: 520, y: 480, width: 800, height: 563 },
});

await browser.close();
