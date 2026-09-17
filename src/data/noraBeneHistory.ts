import type { CommitDay, Release } from "../components/CommitHistory";

/**
 * Nora Bene, commit by commit. Generated from its git log on 18 Sep 2026 by
 * scripts/commitHistory.mjs; regenerate rather than edit. Days with no commit
 * are absent here and drawn as gaps by the chart: 138 commits, 23 August to
 * 13 September 2026.
 */
export const NORA_BENE_COMMITS: CommitDay[] = [
  { date: "2026-08-23", commits: 26 },
  { date: "2026-08-24", commits: 13 },
  { date: "2026-08-25", commits: 15 },
  { date: "2026-08-26", commits: 18 },
  { date: "2026-08-28", commits: 9 },
  { date: "2026-08-29", commits: 11 },
  { date: "2026-08-30", commits: 7 },
  { date: "2026-08-31", commits: 25 },
  { date: "2026-09-04", commits: 5 },
  { date: "2026-09-05", commits: 1 },
  { date: "2026-09-06", commits: 1 },
  { date: "2026-09-07", commits: 2 },
  { date: "2026-09-08", commits: 2 },
  { date: "2026-09-11", commits: 1 },
  { date: "2026-09-12", commits: 1 },
  { date: "2026-09-13", commits: 1 },
];

/**
 * The release points, read off the commit subjects and the Nora Bene runway
 * by hand. Each is the day a thing became usable rather than the day it was
 * begun, and the wording is the log's own. Editorial, so kept beside the data
 * rather than derived by the script.
 */
export const NORA_BENE_RELEASES: Release[] = [
  {
    date: "2026-08-23",
    label:
      "M1, deployed on day one: capture, lists, the offline outbox, the PWA, and the Shortcut endpoint",
  },
  {
    date: "2026-08-25",
    label: "M2 begins: Marginora, quotes with attribution",
  },
  {
    date: "2026-08-26",
    label: "Detections, Add to calendar, and the vault's crypto",
  },
  {
    date: "2026-08-28",
    label: "The vault syncs, and hard rule 1 is rewritten",
  },
  {
    date: "2026-08-29",
    label: "Inventora: catalogues and CSV import; signing up closes",
  },
  {
    date: "2026-08-31",
    label:
      "Reckoning: search and the log; gratitude lists; a way back from a removal",
  },
  {
    date: "2026-09-11",
    label: "Delete comes back to the row, and stops asking",
  },
];
