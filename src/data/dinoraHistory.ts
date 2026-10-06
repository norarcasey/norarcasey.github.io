import type { CommitDay, Release } from "../components/CommitHistory";

/**
 * Dinora, commit by commit. Generated from its git log on 7 Oct 2026 by
 * scripts/commitHistory.mjs; regenerate rather than edit. Days with no commit
 * are absent here and drawn as gaps by the chart: 198 commits, 24 September to
 * 7 October 2026.
 *
 * One burst. 188 of the 198 are the first five days, which took it from a
 * scaffold to the app that replaced Monarch; what follows is the move into
 * Linora and the tooling every repository shares.
 */
export const DINORA_COMMITS: CommitDay[] = [
  { date: "2026-09-24", commits: 41 },
  { date: "2026-09-25", commits: 32 },
  { date: "2026-09-26", commits: 88 },
  { date: "2026-09-27", commits: 12 },
  { date: "2026-09-28", commits: 15 },
  { date: "2026-10-02", commits: 1 },
  { date: "2026-10-03", commits: 2 },
  { date: "2026-10-04", commits: 2 },
  { date: "2026-10-05", commits: 4 },
  { date: "2026-10-07", commits: 1 },
];

/**
 * Editorial, read off the commit subjects: which days are the ones a reader
 * would call a release. Checked against the log on 7 Oct 2026.
 */
export const DINORA_RELEASES: Release[] = [
  {
    date: "2026-09-24",
    label:
      "Day one: live, reading the banks every night, one net total across two currencies, and Monarch's history brought in",
  },
  {
    date: "2026-09-25",
    label:
      "The lenders through Plaid, market estimates for the home and the car, gold and silver at the day's price, and goals",
  },
  {
    date: "2026-09-26",
    label:
      "Budgets, search, recurring charges, a card payment counted once, Face ID, and a palette of its own",
  },
  {
    date: "2026-09-27",
    label:
      "Crypto priced from how much is held, and net worth running on into a projection",
  },
  {
    date: "2026-09-28",
    label:
      "A bank that stops updating is one mark in the header, and can be read again from the app",
  },
];
