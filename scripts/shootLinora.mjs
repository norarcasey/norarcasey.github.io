#!/usr/bin/env node
// Screenshot Linora for its case study, with invented tickets.
//
// Nothing to start first. From this repo:
//
//   node scripts/shootLinora.mjs /tmp/shots
//   cp /tmp/shots/linora*.png src/assets/screens/ && pnpm images
//
// It reads the page Linora's daemon serves, `apps/web/dist` in its checkout
// (LINORA_DIR, default ~/src/linora), so build that first if it is stale. The
// page is real: the built bundle, the views, the grouping and the keyboard. Only
// the rows are invented.
//
// **Why invented.** The real board holds every project's ticket titles and run
// summaries, and some name private work (decided with Nora, 17 Nov 2026,
// CASEY-23). So the page is loaded from an origin that does not exist, and one
// catch-all handler answers every request: the bundle's own files from disk,
// the three reads the page makes from invented rows, and an abort for anything
// else. The real daemon on 4319 is never asked, so nothing can be read from it
// or written to it, whatever the page tries.
import { readFileSync } from "node:fs";
import { mkdirSync } from "node:fs";
import { homedir } from "node:os";
import { extname, join } from "node:path";
import { pathToFileURL } from "node:url";

import { chromium } from "@playwright/test";

const OUT = process.argv[2];
const LINORA = process.env.LINORA_DIR ?? join(homedir(), "src/linora");
const DIST = join(LINORA, "apps/web/dist");
const ORIGIN = "http://linora.stub";

if (!OUT) {
  console.error("usage: node scripts/shootLinora.mjs <out dir>");
  process.exit(1);
}
mkdirSync(OUT, { recursive: true });

const NOW = Date.now();
const MIN = 60_000;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;
const ago = (ms) => NOW - ms;

// ── Apps, projects and labels ────────────────────────────────────────────
const APPS = [
  { id: 1, key: "LIN", name: "Linora", archivedAt: null },
  { id: 2, key: "KIN", name: "Kinora", archivedAt: null },
  { id: 3, key: "CASEY", name: "noracasey.com", archivedAt: null },
  { id: 4, key: "DIN", name: "Dinora", archivedAt: null },
  { id: 5, key: "RADAR", name: "Noradar", archivedAt: null },
];

// No projects. The real record has none (0 on 17 Nov 2026), and the first
// shots invented two, which put a sub-nav under the app and a tag on its rows
// that Nora's Linora has never shown (CASEY-28). Invented rows stand in for
// private ones; they do not add parts of the page that are not there.
const PROJECTS = [];

const LABELS = [
  ["Feature", "#5e6ad2", "Something new it does."],
  ["Bug", "#e5484d", "Something it does wrong."],
  ["Flaky test", "#f5a524", "A check that fails without a change."],
  ["hand-off", "#30a46c", "Specified closely enough to take cold."],
  ["Docs", "#8e8c99", "Words, not code."],
].map(([name, color, description], i) => ({
  id: i + 1,
  name,
  color,
  description,
  archivedAt: null,
  lastAppliedAt: ago(i * DAY + HOUR),
}));
const labelId = (name) => LABELS.find((l) => l.name === name).id;

// ── Tickets ──────────────────────────────────────────────────────────────
// [app, n, title, status, priority, labels, project, opts]
const AGENT = (s) => `claude-code/${s}`;
let runSeq = 100;
const ROWS = [
  [
    "LIN",
    41,
    "Review queue orders by how long each ticket has waited",
    "in_review",
    2,
    ["Feature"],
    null,
    { age: 3 * HOUR },
  ],
  [
    "LIN",
    44,
    "A run that did not ship says so on the board",
    "in_review",
    2,
    ["Feature"],
    null,
    { age: 5 * HOUR, awaitingShipit: true },
  ],
  [
    "LIN",
    47,
    "Claim refuses a second agent and names the holder",
    "in_progress",
    1,
    ["Bug"],
    null,
    { age: 22 * MIN, holder: "a41f" },
  ],
  [
    "LIN",
    48,
    "Peek shows the latest run summary under the spec",
    "in_progress",
    3,
    ["Feature"],
    null,
    { age: 40 * MIN, holder: "9c02" },
  ],
  [
    "LIN",
    49,
    "Cycle time per app, from claim to review",
    "todo",
    2,
    ["Feature", "hand-off"],
    null,
    {},
  ],
  [
    "LIN",
    50,
    "Stream reconnect resumes from the last cursor",
    "todo",
    2,
    ["Bug"],
    null,
    {},
  ],
  [
    "LIN",
    51,
    "Labels page counts open tickets per label",
    "todo",
    3,
    ["Feature"],
    null,
    {},
  ],
  [
    "LIN",
    52,
    "Backup check runs on a fresh clone in CI",
    "todo",
    3,
    ["Flaky test"],
    null,
    {},
  ],
  [
    "LIN",
    53,
    "Throughput chart reads a week at a glance",
    "backlog",
    4,
    ["Feature"],
    null,
    {},
  ],
  [
    "LIN",
    54,
    "Ship guide names the lock file in its first paragraph",
    "backlog",
    4,
    ["Docs"],
    null,
    {},
  ],
  [
    "LIN",
    55,
    "Search matches a key by its prefix",
    "backlog",
    3,
    ["Feature"],
    null,
    {},
  ],
  [
    "LIN",
    38,
    "Every change lands in the event log first",
    "done",
    2,
    ["Feature"],
    null,
    { age: 2 * DAY },
  ],
  [
    "LIN",
    39,
    "A run cannot complete without a summary",
    "done",
    1,
    ["Feature"],
    null,
    { age: 3 * DAY },
  ],
  [
    "LIN",
    40,
    "Hook warns and allows when the daemon is down",
    "done",
    2,
    ["Bug"],
    null,
    { age: 4 * DAY },
  ],
  [
    "KIN",
    12,
    "Watchlist sorts by date added",
    "in_review",
    3,
    ["Feature"],
    null,
    { age: 26 * HOUR },
  ],
  [
    "KIN",
    13,
    "Poster grid keeps its columns on a phone",
    "todo",
    3,
    ["Bug"],
    null,
    {},
  ],
  [
    "CASEY",
    23,
    "Case study: Linora",
    "in_progress",
    3,
    ["Feature"],
    null,
    { age: 2 * HOUR, holder: "67e3" },
  ],
  [
    "DIN",
    8,
    "Budget month rolls over on the first",
    "todo",
    2,
    ["Bug"],
    null,
    {},
  ],
  [
    "RADAR",
    5,
    "Card says when a deploy step was skipped",
    "in_review",
    2,
    ["Feature"],
    null,
    { age: 8 * HOUR },
  ],
];

const SPEC = {
  "LIN-44": [
    "A completed run says whether it shipped. When it did not, because Nora said Hold, the ticket sits in review without being live, and today the board cannot tell the two apart.",
    "",
    "**Build:** a mark on the row and the ticket for a review whose last run said `shipped: false`, and a way to clear it once the work is deployed.",
    "",
    "**Done when** the review queue shows which tickets are live and which wait on a Shipit, and the unit tests cover both.",
  ].join("\n"),
};

const SUMMARY = {
  "LIN-44": [
    "Built the mark: a ticket in review whose last completed run said it did not ship shows **Waiting on Shipit** on its row and at the top of the ticket. Validate Ship clears it, with the deploy that proved it.",
    "",
    "**Found on the way:** the board read `in_review` as live, and so did the hook. Two tickets had sat there for a week as if deployed.",
    "",
    "**What the plan got wrong:** it put the flag on the ticket. It belongs on the run, since a later run can ship what an earlier one held.",
  ].join("\n"),
};

const TICKETS = [];
const DETAIL = {};
for (const [app, n, title, status, priority, labels, project, o] of ROWS) {
  const key = `${app}-${n}`;
  const id = TICKETS.length + 1;
  const created = ago((60 - n) * 6 * HOUR + 3 * DAY);
  const started =
    status === "in_progress" || status === "in_review" || status === "done"
      ? ago((o.age ?? DAY) + 2 * HOUR)
      : null;
  const completed =
    status === "in_review" || status === "done" ? ago(o.age ?? DAY) : null;
  const runId = runSeq++;
  const holder = o.holder
    ? { runId, agent: AGENT(o.holder), since: ago(o.age) }
    : null;
  const proj = PROJECTS.find(
    (p) => p.slug === project && APPS[p.appId - 1].key === app
  );
  const row = {
    id,
    app,
    key,
    projectId: proj ? proj.id : null,
    project: proj ? proj.slug : null,
    title,
    spec:
      SPEC[key] ??
      `${title}.\n\n**Done when** it does, and \`pnpm gate\` passes.`,
    plain:
      key === "LIN-44"
        ? "When Nora holds a change back, the board should not show it as live. Today a held ticket and a shipped one look the same."
        : `${title}.`,
    status,
    priority,
    assignee: holder ? holder.agent : null,
    createdBy: "nora",
    createdAt: created,
    startedAt: started,
    completedAt: status === "done" ? completed : null,
    canceledAt: null,
    known: {
      createdAt: "measured",
      startedAt: started ? "measured" : null,
      completedAt: status === "done" ? "measured" : null,
      canceledAt: null,
    },
    statusSince: o.age ? ago(o.age) : created,
    holder,
    awaitingShipit: o.awaitingShipit ?? false,
    lastRunAt: started,
    labels,
    labelIds: labels.map(labelId),
  };
  TICKETS.push(row);
  const runs = started
    ? [
        {
          id: runId,
          ticketId: id,
          agent: holder ? holder.agent : AGENT("5b7d"),
          model: "claude-opus-5-5",
          startedAt: started,
          endedAt: completed,
          outcome: completed ? "completed" : null,
          summary: completed ? (SUMMARY[key] ?? `Built it. ${title}.`) : null,
          shipped: completed ? !row.awaitingShipit : null,
        },
      ]
    : [];
  const progress = started
    ? [
        {
          ts: started + 25 * MIN,
          actor: runs[0].agent,
          runId,
          note:
            key === "LIN-44"
              ? "in_review was being read as live in two places, the board and the hook. Moving the flag to the run."
              : "Gate passes on main before starting.",
        },
      ]
    : [];
  DETAIL[key] = {
    ticket: row,
    runs,
    progress,
    attachments: [],
    comments:
      key === "LIN-44"
        ? [
            {
              ts: created + 2 * HOUR,
              actor: "nora",
              body: "Show it on the row too, not only in the ticket.",
            },
          ]
        : [],
    shipValidations: [],
  };
}

const WORKSPACE = {
  cursor: 9000,
  apps: APPS,
  projects: PROJECTS,
  tickets: TICKETS,
  views: [],
  labels: LABELS,
};

// ── Insights: the forecast ───────────────────────────────────────────────
// The weeks are invented; the forecast is not. It is Linora's own `forecast`
// and `pace` from its core, run on these weeks, so the percentiles and the
// spread are what Linora would draw for a record like this (CASEY-30). The
// core imports only types, which Node strips, so it loads as it is.
const analytics = await import(
  pathToFileURL(join(LINORA, "packages/core/src/analytics.ts")).href
);
// Uneven weeks and a backlog of a couple of months, so the trials spread over
// several weeks and the three percentiles land apart, which is the point of
// running trials rather than dividing by an average.
const OPEN = 120;
const FINISHED_WEEKS = [3, 14, 6, 18, 9, 2, 16, 11, 5, 13, 20, 8];
const thisWeek = ago(2 * DAY);
const weekStarts = FINISHED_WEEKS.map(
  (_, i) => thisWeek - (FINISHED_WEEKS.length - i) * 7 * DAY
);
const empty = { count: 0, p50: null, p90: null };
const STATUSES = [
  "triage",
  "backlog",
  "todo",
  "in_progress",
  "in_review",
  "done",
  "canceled",
];
const ANALYTICS = {
  scope: {
    app: null,
    project: null,
    model: null,
    weeks: FINISHED_WEEKS.length,
    from: weekStarts[0],
    to: NOW,
    offsetMinutes: 0,
  },
  tickets: TICKETS.length,
  leadTime: { measured: empty, reconstructed: empty },
  cycleTime: {
    measured: empty,
    reconstructed: empty,
    unstarted: 0,
    points: [],
  },
  reviewWait: {
    measured: empty,
    reconstructed: empty,
    waiting: [],
    shipit: empty,
  },
  throughput: [
    ...weekStarts.map((start, i) => ({
      start,
      measured: FINISHED_WEEKS[i],
      reconstructed: 0,
      partial: false,
    })),
    { start: thisWeek, measured: 4, reconstructed: 0, partial: true },
  ],
  arrivals: [],
  flow: {
    daily: [],
    timeIn: Object.fromEntries(STATUSES.map((s) => [s, 0])),
  },
  forecast: analytics.forecast(OPEN, FINISHED_WEEKS, NOW),
  basis: {
    from: weekStarts[0],
    weeks: FINISHED_WEEKS.length,
    measured: FINISHED_WEEKS.reduce((a, b) => a + b, 0),
    reconstructed: 0,
  },
  pace: analytics.pace(FINISHED_WEEKS, NOW),
  held: [],
  agents: { models: [], imported: 0 },
};

// ── The one handler ──────────────────────────────────────────────────────
const TYPES = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
};
const json = (route, body) =>
  route.fulfill({
    status: 200,
    contentType: "application/json",
    body: JSON.stringify(body),
  });

const aborted = new Set();
async function handle(route) {
  const url = new URL(route.request().url());
  const method = route.request().method();
  if (url.origin !== ORIGIN) {
    aborted.add(`${method} ${url.href}`);
    return route.abort();
  }
  const path = url.pathname;
  if (!path.startsWith("/api/")) {
    const file = path === "/" ? "/index.html" : path;
    try {
      const body = readFileSync(join(DIST, file));
      return route.fulfill({
        status: 200,
        contentType: TYPES[extname(file)] ?? "application/octet-stream",
        body,
      });
    } catch {
      aborted.add(`${method} ${url.href}`);
      return route.abort();
    }
  }
  if (method !== "GET") {
    aborted.add(`${method} ${url.href}`);
    return route.abort();
  }
  if (path === "/api/v1/workspace") return json(route, WORKSPACE);
  if (path === "/api/v1/analytics") return json(route, ANALYTICS);
  const t = path.match(
    /^\/api\/v1\/apps\/([^/]+)\/tickets\/([^/]+)\/(detail|commits)$/
  );
  const detail = t && DETAIL[decodeURIComponent(t[2])];
  if (detail && t[3] === "detail") return json(route, detail);
  if (detail) return json(route, { github: null, commits: {} });
  aborted.add(`${method} ${url.href}`);
  return route.abort();
}

// ── Shots ────────────────────────────────────────────────────────────────
const browser = await chromium.launch();

async function shoot(scheme, hash, name, viewport, clip, scrollTo) {
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: 2,
    colorScheme: scheme,
  });
  await context.route("**/*", handle);
  // The change stream stays open for as long as the board does, which a
  // fulfilled route cannot do: it ends, and the sidebar says the board is not
  // live. So the page's own fetch answers it, before any request leaves the
  // page, with a stream that never ends and carries no changes.
  await context.addInitScript(() => {
    const real = window.fetch;
    window.fetch = (input, init) =>
      String(input).includes("/api/v1/stream")
        ? Promise.resolve(
            new Response(new ReadableStream({ start() {} }), {
              headers: { "content-type": "text/event-stream" },
            })
          )
        : real(input, init);
  });
  const page = await context.newPage();
  await page.goto(`${ORIGIN}/${hash}`, { waitUntil: "load" });
  await page.waitForTimeout(1200);
  if (scrollTo) {
    // The ticket pane scrolls inside the page, not the page itself, so the
    // heading is brought to the top of its own scroller.
    await page.evaluate((text) => {
      const heading = [...document.querySelectorAll("h1,h2,h3,h4")].find(
        (h) => h.textContent.trim().toLowerCase() === text
      );
      heading?.scrollIntoView({ block: "start" });
    }, scrollTo);
    await page.waitForTimeout(300);
  }
  await page.screenshot({
    path: `${OUT}/${name}.png`,
    clip: typeof clip === "function" ? await clip(page) : clip,
  });
  await context.close();
}

// Each shot is taken at about the width the case study shows it at, at 2x, so
// a 2x screen draws it close to pixel for pixel. The first shots were taken
// from a 1440 px window and came out blurry (CASEY-27): the hero frame stops
// at 1018 CSS px and the details column at 669, so Linora's 13 px text was
// drawn at 9 px in one and 6 px in the other, resampled by an awkward ratio.
// A window the width of the frame shows the same board at its own size.

// The hero frame: 1018 CSS px wide from a 1280 px window up, at 16:9.
await shoot("dark", "#/app/LIN", "linora-board", { width: 1024, height: 576 });

// The ticket sits in the details column, 669 CSS px at most. Its own content
// column is about that wide, so the shot is that column, at 16:9, ending
// under the run summary, and the sidebar is left out.
await shoot(
  "dark",
  "#/app/LIN/ticket/LIN-44",
  "linora-ticket",
  { width: 1200, height: 900 },
  async (page) => {
    const run = await page.evaluate(() => {
      const heading = [...document.querySelectorAll("h1,h2,h3,h4")].find(
        (h) => h.textContent.trim().toLowerCase() === "runs"
      );
      const box = heading.nextElementSibling.getBoundingClientRect();
      return { x: box.x, width: box.width, bottom: box.bottom };
    });
    const width = Math.round(run.width + 32);
    const height = Math.round((width * 9) / 16);
    return {
      x: Math.round(run.x - 16),
      y: Math.round(run.bottom + 16 - height),
      width,
      height,
    };
  },
  "comments"
);

// Insights' Forecast section, which sits in the details column like the
// ticket, so the window is sized for the section to come out about 700 CSS px
// wide, and the shot is the section alone.
await shoot(
  "dark",
  "#/insights",
  "linora-forecast",
  { width: 960, height: 1600 },
  async (page) => {
    const box = await page.evaluate(() => {
      const section = document
        .getElementById("forecast-title")
        .closest("section");
      section.scrollIntoView({ block: "start" });
      const r = section.getBoundingClientRect();
      return { x: r.x, y: r.y, width: r.width, height: r.height };
    });
    console.log("forecast section", box);
    return {
      x: Math.round(box.x - 16),
      y: Math.round(box.y - 16),
      width: Math.round(box.width + 32),
      height: Math.round(box.height + 32),
    };
  }
);

// The home page's card, at the size and proportion Noradar's was taken at.
await shoot(
  "dark",
  "#/app/LIN",
  "linora",
  { width: 800, height: 563 },
  { x: 0, y: 0, width: 800, height: 563 }
);

await browser.close();
if (aborted.size > 0) {
  console.log("Aborted, not answered:");
  for (const a of aborted) console.log(`  ${a}`);
}
