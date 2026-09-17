#!/usr/bin/env node
// Commits per day for a repo, as the rows a case study's chart reads.
//
//   node scripts/commitHistory.mjs ~/src/norabene
//
// Prints one { date, commits } per day that had any, oldest first. The chart
// fills in the days that had none, because a gap is information. Release
// markers are not derived here: which commits count as a release is an
// editorial call made against the log, and lives beside the data in src/data.
import { execFileSync } from "node:child_process";

const repo = process.argv[2];
if (!repo) {
  console.error("usage: node scripts/commitHistory.mjs <path to a git repo>");
  process.exit(1);
}

const log = execFileSync("git", ["log", "--format=%ad", "--date=short"], {
  cwd: repo,
  encoding: "utf8",
});
const perDay = new Map();
for (const line of log.split("\n")) {
  if (line) perDay.set(line, (perDay.get(line) ?? 0) + 1);
}
const rows = [...perDay.entries()]
  .sort(([a], [b]) => (a < b ? -1 : 1))
  .map(([date, commits]) => ({ date, commits }));
process.stdout.write(JSON.stringify(rows, null, 2) + "\n");
