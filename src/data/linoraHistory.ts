import type { CommitDay, Release } from "../components/CommitHistory";

/**
 * Linora, commit by commit. Generated from its git log on 17 Nov 2026 by
 * scripts/commitHistory.mjs; regenerate rather than edit. Days with no commit
 * are absent here and drawn as gaps by the chart: 118 commits, 2 October to
 * 17 November 2026.
 *
 * The first two days are most of it: the daemon and the claim, the MCP tools,
 * every runway imported, the board, the backup and the Mac app. What came
 * after was found by every project's agents using it at once.
 */
export const LINORA_COMMITS: CommitDay[] = [
  { date: "2026-10-02", commits: 26 },
  { date: "2026-10-03", commits: 19 },
  { date: "2026-10-04", commits: 8 },
  { date: "2026-10-05", commits: 2 },
  { date: "2026-10-06", commits: 1 },
  { date: "2026-10-07", commits: 7 },
  { date: "2026-10-08", commits: 1 },
  { date: "2026-10-10", commits: 3 },
  { date: "2026-10-11", commits: 1 },
  { date: "2026-10-12", commits: 9 },
  { date: "2026-10-13", commits: 5 },
  { date: "2026-10-18", commits: 1 },
  { date: "2026-10-19", commits: 4 },
  { date: "2026-10-22", commits: 8 },
  { date: "2026-10-23", commits: 5 },
  { date: "2026-10-25", commits: 1 },
  { date: "2026-11-15", commits: 5 },
  { date: "2026-11-16", commits: 3 },
  { date: "2026-11-17", commits: 9 },
];

/**
 * Editorial, read off the commit subjects: which days are the ones a reader
 * would call a release. Checked against the log on 17 Nov 2026.
 */
export const LINORA_RELEASES: Release[] = [
  {
    date: "2026-10-02",
    label: "A claim only one agent can win, and every runway imported",
  },
  {
    date: "2026-10-03",
    label: "The runway files are retired, and a ticket can start its own agent",
  },
  {
    date: "2026-10-07",
    label: "Every started agent opens as a pane of one shared window",
  },
  {
    date: "2026-10-22",
    label: "Plain words and labels, which agents apply but cannot invent",
  },
  {
    date: "2026-11-15",
    label: "An Admin page finds what sessions left behind on the laptop",
  },
  {
    date: "2026-11-17",
    label: "Sweep backlog starts an orchestrator on an app's tickets",
  },
];
