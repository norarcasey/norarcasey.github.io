import type { CommitDay, Release } from "../components/CommitHistory";

/**
 * Noratives, commit by commit. Generated from its git log on 19 Sep 2026 by
 * scripts/commitHistory.mjs; regenerate rather than edit. Days with no commit
 * are absent here and drawn as gaps by the chart: 219 commits, 17 March to
 * 14 September 2026.
 *
 * The gaps are most of this one. Where Nora Bene's chart is a three-week
 * sprint, this is six months with two months of nothing in the middle of it,
 * which is what a tool that is used rather than built looks like.
 */
export const NORATIVES_COMMITS: CommitDay[] = [
  { date: "2026-03-17", commits: 14 },
  { date: "2026-03-18", commits: 4 },
  { date: "2026-03-19", commits: 2 },
  { date: "2026-03-20", commits: 1 },
  { date: "2026-03-21", commits: 1 },
  { date: "2026-03-30", commits: 2 },
  { date: "2026-03-31", commits: 3 },
  { date: "2026-04-04", commits: 1 },
  { date: "2026-04-07", commits: 3 },
  { date: "2026-04-13", commits: 1 },
  { date: "2026-05-12", commits: 1 },
  { date: "2026-05-14", commits: 4 },
  { date: "2026-05-16", commits: 1 },
  { date: "2026-05-25", commits: 1 },
  { date: "2026-05-28", commits: 6 },
  { date: "2026-05-29", commits: 3 },
  { date: "2026-05-30", commits: 5 },
  { date: "2026-05-31", commits: 10 },
  { date: "2026-07-07", commits: 4 },
  { date: "2026-08-19", commits: 3 },
  { date: "2026-08-20", commits: 10 },
  { date: "2026-08-21", commits: 11 },
  { date: "2026-08-22", commits: 20 },
  { date: "2026-08-23", commits: 23 },
  { date: "2026-08-24", commits: 12 },
  { date: "2026-08-25", commits: 13 },
  { date: "2026-08-26", commits: 21 },
  { date: "2026-08-27", commits: 3 },
  { date: "2026-08-28", commits: 4 },
  { date: "2026-09-11", commits: 9 },
  { date: "2026-09-12", commits: 17 },
  { date: "2026-09-13", commits: 3 },
  { date: "2026-09-14", commits: 3 },
];

/**
 * The release points, read off the commit subjects by hand. Each is the day a
 * thing became usable rather than the day it was begun, and the wording is
 * the log's own. Editorial, so kept beside the data rather than derived.
 *
 * Six, and no more, because the axis is six months wide: a marker is 22 units
 * across on a day that is five, so two of them inside a week sit on top of
 * each other. The busiest days here are 22 to 26 August, which are four
 * markers' worth of work and get one; what the other three were is in the
 * page's own prose, where there is room to say it.
 */
export const NORATIVES_RELEASES: Release[] = [
  {
    date: "2026-03-17",
    label:
      "Day one, deployed: entries, tags, an editor, and a dashboard to find them in",
  },
  {
    date: "2026-05-14",
    label:
      "Publishing: a finished piece can leave the studio and appear on a public site",
  },
  {
    date: "2026-05-28",
    label:
      "The checks: unit tests, lint and formatting, and a deploy that refuses a red build",
  },
  {
    date: "2026-08-19",
    label:
      "Outline mode, and the first technical post published to noracasey.com",
  },
  {
    date: "2026-08-26",
    label:
      "Destinations become rows, an operations log records what the app tried, and search moves into Postgres",
  },
  {
    date: "2026-09-11",
    label:
      "Sections: the writer decides their own navigation, rather than inheriting ours",
  },
];
