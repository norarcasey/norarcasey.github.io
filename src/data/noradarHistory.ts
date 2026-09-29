import type { CommitDay, Release } from "../components/CommitHistory";

/**
 * Noradar, commit by commit. Generated from its git log on 29 Sep 2026 by
 * scripts/commitHistory.mjs; regenerate rather than edit. Days with no commit
 * are absent here and drawn as gaps by the chart: 72 commits, 13 to 29
 * September 2026.
 *
 * Two bursts. The first two days are the radar, the ledger and the Mac app
 * that lets it notify; the second week is the menu bar and the fixes that
 * using it every day turned up.
 */
export const NORADAR_COMMITS: CommitDay[] = [
  { date: "2026-09-13", commits: 15 },
  { date: "2026-09-14", commits: 22 },
  { date: "2026-09-19", commits: 2 },
  { date: "2026-09-21", commits: 7 },
  { date: "2026-09-22", commits: 9 },
  { date: "2026-09-23", commits: 5 },
  { date: "2026-09-24", commits: 2 },
  { date: "2026-09-26", commits: 6 },
  { date: "2026-09-27", commits: 3 },
  { date: "2026-09-29", commits: 1 },
];

/**
 * Editorial, read off the commit subjects: which days are the ones a reader
 * would call a release. Checked against the log on 29 Sep 2026.
 */
export const NORADAR_RELEASES: Release[] = [
  {
    date: "2026-09-13",
    label:
      "Day one: the radar, agent time per runway item, and a commit hook that makes the Runway: trailer a rule",
  },
  {
    date: "2026-09-14",
    label:
      "Notifications from a real Mac app, each one opening the GitHub run it is about",
  },
  {
    date: "2026-09-22",
    label: "The verdict moves to the menu bar",
  },
  {
    date: "2026-09-23",
    label:
      "It reads worktrees and runway files, ready for the first project cut from the new scaffold",
  },
  {
    date: "2026-09-26",
    label:
      "The radar asks GitHub which job deployed a commit, instead of guessing from job names",
  },
];
