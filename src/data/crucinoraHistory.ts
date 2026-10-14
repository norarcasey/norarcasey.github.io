import type { CommitDay, Release } from "../components/CommitHistory";

/**
 * CruciNora, commit by commit. Generated from its git log (origin/main at
 * 29f01de) on 13 Oct 2026 by scripts/commitHistory.mjs; regenerate rather than
 * edit. Days with no commit are absent here and drawn as gaps by the chart:
 * 178 commits, 19 June to 4 October 2026.
 *
 * One burst and four returns. 138 of the 178 are the first nine days, which
 * built the builder, the solver and the public site; each return after that
 * came from using it.
 */
export const CRUCINORA_COMMITS: CommitDay[] = [
  { date: "2026-06-19", commits: 15 },
  { date: "2026-06-20", commits: 42 },
  { date: "2026-06-21", commits: 5 },
  { date: "2026-06-22", commits: 28 },
  { date: "2026-06-23", commits: 20 },
  { date: "2026-06-24", commits: 19 },
  { date: "2026-06-25", commits: 1 },
  { date: "2026-06-26", commits: 6 },
  { date: "2026-06-27", commits: 2 },
  { date: "2026-08-08", commits: 1 },
  { date: "2026-08-31", commits: 11 },
  { date: "2026-09-01", commits: 3 },
  { date: "2026-09-19", commits: 7 },
  { date: "2026-09-23", commits: 13 },
  { date: "2026-10-02", commits: 1 },
  { date: "2026-10-03", commits: 3 },
  { date: "2026-10-04", commits: 1 },
];

/**
 * Editorial, read off the commit subjects: which days are the ones a reader
 * would call a release. Checked against the log on 13 Oct 2026.
 */
export const CRUCINORA_RELEASES: Release[] = [
  {
    date: "2026-06-19",
    label:
      "Day one: the builder behind a sign-in, the solver, and a curated word list",
  },
  {
    date: "2026-06-20",
    label:
      "A public site to solve on, with its own keyboard on a phone, Sunday grids, and clues written in batches",
  },
  {
    date: "2026-08-08",
    label:
      "NYT publish: the submission rules checked, and the sheet the paper asks for",
  },
  {
    date: "2026-08-31",
    label:
      "The theme assistant proposes, and code searches the word list and counts the letters",
  },
  {
    date: "2026-09-01",
    label: "Grids generated around the theme answers, each one proven to fill",
  },
  {
    date: "2026-09-23",
    label:
      "An audit of the solve page: a screen reader, bad signal, and a solve that stays solved",
  },
];
