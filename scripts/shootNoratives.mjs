#!/usr/bin/env node
// Drive the Noratives studio locally and screenshot it, writing nothing.
//
// Start the studio's dev server against a URL that does not resolve:
//
//   cd ~/src/noratives
//   VITE_SUPABASE_URL=https://stub.localhost VITE_SUPABASE_ANON_KEY=stub \
//     npx vite --port 5273 --strictPort
//
// then, from this repo:
//
//   node scripts/shootNoratives.mjs /tmp/shots
//
// The app is real: the dev server, the components, TipTap, the rendering. Only
// the rows are invented, and they are invented rather than copied, which is
// the part a writing studio makes harder than a board of lists. Every screen
// in it is full of writing, so a screenshot needs prose that is fine to show.
//
// **Nothing can leave this machine.** The studio's own .env points at the
// production project, so the handler below is a single catch-all: it answers
// what it knows and aborts everything else, rather than intercepting the paths
// somebody remembered to list. The one exception is Google Fonts, because the
// display face comes from there and a shot in a fallback serif is a picture of
// something the app never looks like.
//
// This is kept because the last one was not. The runway records that Nora
// Bene's driver "is kept beside the screenshots and re-runs any time", and it
// was left in a scratchpad instead, so re-taking those shots means writing it
// again. Re-taking these is one command.
import { createHash } from "node:crypto";
import { mkdirSync } from "node:fs";

import { chromium } from "@playwright/test";

const OUT = process.argv[2];
const BASE = "http://localhost:5273";
const USER = "11111111-1111-1111-1111-111111111111";
const DESKTOP = { width: 1280, height: 900 };
// 16:9, so the case study's media frame is filled rather than cropped.
const HERO = { width: 1440, height: 810 };
const PHONE = { width: 390, height: 844 };

mkdirSync(OUT, { recursive: true });

const sha256 = (s) => createHash("sha256").update(s, "utf8").digest("hex");
const daysAgo = (d) => new Date(Date.now() - d * 86_400_000).toISOString();

// ── Destinations: the two sites, as rows ─────────────────────────────────
const DEST = {
  novellanora: {
    id: "d0000000-0000-0000-0000-000000000001",
    key: "novellanora",
    label: "novellanora.com",
    origin: "https://novellanora.com",
    path_segment: "writings",
    rebuilds: false,
    owner_id: USER,
  },
  noracasey: {
    id: "d0000000-0000-0000-0000-000000000002",
    key: "noracasey",
    label: "noracasey.com",
    origin: "https://noracasey.com",
    path_segment: "blog",
    rebuilds: true,
    owner_id: USER,
  },
};

// ── Tags, under the taxonomy's categories ────────────────────────────────
const CATS = [
  ["c0000000-0000-0000-0000-000000000001", "form", "#8b6f9e"],
  ["c0000000-0000-0000-0000-000000000002", "topic", "#3b91d6"],
  ["c0000000-0000-0000-0000-000000000003", "mood", "#c4784a"],
].map(([id, name, color]) => ({
  id,
  name,
  parent_id: null,
  color,
  created_at: daysAgo(180),
  updated_at: daysAgo(180),
}));

const tag = (id, name, category, color) => ({
  id: `t0000000-0000-0000-0000-${String(id).padStart(12, "0")}`,
  name,
  category,
  color,
  created_at: daysAgo(180),
});

const T = {
  essay: tag(1, "essay", "form", "#8b6f9e"),
  story: tag(2, "short story", "form", "#8b6f9e"),
  note: tag(3, "note", "form", "#8b6f9e"),
  postgres: tag(4, "postgres", "topic", "#3b91d6"),
  tooling: tag(5, "tooling", "topic", "#3b91d6"),
  craft: tag(6, "craft", "topic", "#3b91d6"),
  coastal: tag(7, "coastal", "topic", "#3b91d6"),
  restless: tag(8, "restless", "mood", "#c4784a"),
  clear: tag(9, "clear", "mood", "#c4784a"),
};
const TAGS = Object.values(T);

// ── Notebooks, which is what the writer calls a kind ─────────────────────
const KINDS = [
  {
    id: "k0000000-0000-0000-0000-000000000001",
    name: "Journal",
    position: 1000,
    color: "#7a8b99",
    word_target: 750,
    destinations: null,
    entry_kind_default_tags: [{ tag_id: T.note.id }],
  },
  {
    id: "k0000000-0000-0000-0000-000000000002",
    name: "Fiction",
    position: 2000,
    color: "#a2678f",
    word_target: null,
    destinations: DEST.novellanora,
    entry_kind_default_tags: [{ tag_id: T.story.id }],
  },
  {
    id: "k0000000-0000-0000-0000-000000000003",
    name: "Field notes",
    position: 3000,
    color: "#3b91d6",
    word_target: null,
    destinations: DEST.noracasey,
    entry_kind_default_tags: [{ tag_id: T.essay.id }],
  },
];
const K = { journal: KINDS[0], fiction: KINDS[1], technical: KINDS[2] };

// ── The writing ──────────────────────────────────────────────────────────
// Invented, and deliberately about craft rather than about anybody. Long
// enough that a preview, a word count and a paragraph of body all have
// something real to render.
const p = (...paras) => paras.map((t) => `<p>${t}</p>`).join("");
const text = (html) =>
  html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const ENTRIES_RAW = [
  {
    id: "e0000000-0000-0000-0000-000000000001",
    kind: K.technical,
    title: "What a lockfile is actually for",
    slug: "what-a-lockfile-is-for",
    tags: [T.essay, T.tooling],
    updated: 1,
    created: 9,
    published: "live",
    html: p(
      "A lockfile is not a list of the versions you installed. It is a promise that the next install produces the same tree as this one, on a machine that has never seen your project, months after the registry has moved on.",
      "That framing settles most arguments about them. Commit it, because the promise is worthless if only your laptop holds it. Do not hand-edit it, because a promise you edited is a guess. And regenerate it deliberately rather than as a side effect of some other command, because the moment the tree changes is the moment worth having a commit for.",
      "The interesting case is the one where the promise costs more than it buys. A function that pulls a single package can end up resolving an entire registry closure, because locking asks the resolver for everything reachable rather than everything reached. The bundle triples, the cold start doubles, and the thing you were protecting was never at risk."
    ),
  },
  {
    id: "e0000000-0000-0000-0000-000000000002",
    kind: K.technical,
    title: "The migration that recorded nothing",
    slug: "the-migration-that-recorded-nothing",
    tags: [T.essay, T.postgres],
    updated: 2,
    created: 14,
    published: "edited",
    // What went out a fortnight ago, before the last paragraph was added.
    publishedHtml: p(
      "There is a difference between applying a migration and recording that you applied it, and a SQL editor will happily do the first without the second.",
      "You find out later, when the tooling offers to replay the whole folder against a database that already has all of it."
    ),
    html: p(
      "There is a difference between applying a migration and recording that you applied it, and a SQL editor will happily do the first without the second.",
      "You find out later, when the tooling offers to replay the whole folder against a database that already has all of it. The history table is empty, so as far as anything automated can tell, nothing has ever run.",
      "The repair is one command. The part worth keeping is the headers: every file that went in the old way still says so. A file that misdescribes its own history is worse than one naming a route nobody uses any more."
    ),
  },
  {
    id: "e0000000-0000-0000-0000-000000000003",
    kind: K.fiction,
    title: "The lighthouse keeper's inventory",
    slug: "the-lighthouse-keepers-inventory",
    tags: [T.story, T.coastal],
    updated: 4,
    created: 40,
    published: "live",
    html: p(
      "Every March the keeper wrote down what the winter had taken. Two panes, one door, the good rope. The list was not for anyone. It was the only way he had found of agreeing with himself about what had happened.",
      "His predecessor had kept the same ledger and had written, in the margin of 1954, that the sea does not take things so much as relocate them. The keeper had thought this was a joke until the spring he found the door.",
      "He added a column that year, headed Returned, and it stayed mostly empty, which he decided was the honest result rather than a failure of the method."
    ),
  },
  {
    id: "e0000000-0000-0000-0000-000000000004",
    kind: K.journal,
    title: "What worked this week",
    slug: null,
    tags: [T.note, T.clear],
    updated: 5,
    created: 5,
    published: null,
    html: p(
      "Writing the argument down before writing the code. Twice this week the argument fell apart on the page, which cost an hour instead of a day.",
      "Leaving the hard paragraph unfinished overnight rather than pushing through it. It was a different paragraph in the morning and a better one.",
      "Reading the commit messages back before starting. Half of what I thought was undecided turned out to have been decided in August."
    ),
  },
  {
    id: "e0000000-0000-0000-0000-000000000005",
    kind: K.technical,
    title: "Two kinds of deleting",
    slug: "two-kinds-of-deleting",
    tags: [T.essay, T.craft],
    updated: 6,
    created: 6,
    published: null,
    html: p(
      "Confirm what cannot be undone. Undo what can. Never both.",
      "A confirmation in front of something harmless is not caution, it is training: it teaches people to click through the dialog that matters. If taking an item off a list is reversible, it should ask nothing at all and offer the way back afterwards."
    ),
  },
  {
    id: "e0000000-0000-0000-0000-000000000006",
    kind: K.journal,
    title: "Notes from the balcony",
    slug: null,
    tags: [T.note, T.restless],
    updated: 8,
    created: 8,
    published: null,
    html: p(
      "Cold enough this morning to need the blanket, which is the first time since April. The pigeons have worked out the new railing.",
      "Spent most of the morning on a paragraph that turned out to belong in a different piece entirely. Moved it rather than deleting it, which is the whole reason for keeping everything in one place."
    ),
  },
  {
    id: "e0000000-0000-0000-0000-000000000007",
    kind: K.fiction,
    title: "Salt",
    slug: null,
    tags: [T.story],
    updated: 11,
    created: 11,
    published: null,
    html: p(
      "She had been told the road ended at the water and it did, but not in the way anyone means it. It went in and kept going, pale under two feet of it, and on a still day you could follow the line of it out as far as the light held.",
      "Nobody in the village called it a road any more. They called it the way out, which meant something different depending on who was saying it."
    ),
  },
  {
    id: "e0000000-0000-0000-0000-000000000008",
    kind: K.journal,
    title: "Things I keep re-learning",
    slug: null,
    tags: [T.note],
    updated: 16,
    created: 16,
    published: null,
    html: p(
      "That the measurement is worth more than the estimate, and takes less time than arguing about the estimate.",
      "That a thing written down in the wrong place is lost, and that this is why there is one place.",
      "That most of what I think is a technical decision turns out, written out, to be a decision about who the thing is for."
    ),
  },
];

// Entry rows, in the shape the app reads them.
const ENTRIES = ENTRIES_RAW.map((e) => {
  const body_text = text(e.html);
  const words = body_text.split(/\s+/).filter(Boolean).length;
  return {
    id: e.id,
    user_id: USER,
    type:
      e.kind.destinations?.key === "novellanora"
        ? "writing"
        : e.kind.destinations?.key === "noracasey"
          ? "technical"
          : "journal",
    kind_id: e.kind.id,
    prompt: null,
    format: "rich",
    markdown: null,
    title: e.title,
    slug: e.slug,
    body_html: e.html,
    body_text,
    word_count: words,
    body_preview: body_text.slice(0, 120) + (body_text.length > 120 ? "…" : ""),
    summary: null,
    timezone: "Europe/Madrid",
    location: null,
    outline_enabled: false,
    created_at: daysAgo(e.created),
    updated_at: daysAgo(e.updated),
    deleted_at: null,
    entry_tags: e.tags.map((t) => ({ tags: t })),
  };
});

// Snapshots: a copy of what went out, which is a different thing from the
// entry as it stands now.
//
// The Edited state is made by giving the snapshot an OLDER body rather than
// by corrupting its hash. Two screens ask the drift question two ways, the
// dashboard against the hash columns and the editor against the text it
// already holds, and a wrong hash over an identical body makes them disagree:
// the list says Edited and the editor says Published. An older body is what a
// piece that has been revised since publishing actually looks like, so both
// answers come out the same, which is the point of the badge.
const PUBLISHED = ENTRIES_RAW.filter((e) => e.published).map((e) => {
  const entry = ENTRIES.find((x) => x.id === e.id);
  const live = e.published === "live";
  const html = live ? entry.body_html : e.publishedHtml;
  const body = text(html);
  return {
    entry_id: e.id,
    user_id: USER,
    destination_id: e.kind.destinations.id,
    site: e.kind.destinations.key,
    slug: e.slug,
    title: e.title,
    location: null,
    body_html: html,
    body_text: body,
    body_html_hash: sha256(html),
    body_text_hash: sha256(body),
    tags: e.tags.map((t) => t.name),
    published_at: daysAgo(e.updated + 1),
    updated_at: daysAgo(e.updated + 1),
  };
});

const TABLES = {
  entries: ENTRIES,
  published_entries: PUBLISHED,
  entry_kinds: KINDS,
  destinations: Object.values(DEST),
  tags: TAGS,
  tag_categories: CATS,
  entry_tags: [],
  entry_sections: [],
  entry_kind_default_tags: [],
  destination_sections: [],
  destination_section_tags: [],
  destination_secrets: [],
  operations: [],
  events: [],
  feedback: [],
  // Publishing is a privilege rather than an assumption, so the editor shows
  // "Not published" without this even for a notebook that has a site.
  feature_grants: [
    { feature: "publish", enabled: true, monthly_limit: null },
    { feature: "ai_prompt", enabled: true, monthly_limit: 100 },
    { feature: "ai_factcheck", enabled: true, monthly_limit: 50 },
  ],
  profiles: [
    {
      id: USER,
      display_name: "Nora",
      email: "nora@example.test",
      created_at: daysAgo(180),
      updated_at: daysAgo(180),
    },
  ],
};

// A session the app renders from without asking anyone. Well-formed and
// inert: nothing verifies it, because nothing is called.
const b64 = (o) => Buffer.from(JSON.stringify(o)).toString("base64url");
const FAR = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 365;
const SESSION = {
  access_token: `${b64({ alg: "HS256", typ: "JWT" })}.${b64({ sub: USER, role: "authenticated", exp: FAR })}.local`,
  token_type: "bearer",
  expires_in: 31_536_000,
  expires_at: FAR,
  refresh_token: "local-demo-refresh",
  user: {
    id: USER,
    aud: "authenticated",
    role: "authenticated",
    email: "nora@example.test",
    app_metadata: { provider: "email", providers: ["email"] },
    user_metadata: {},
    created_at: daysAgo(180),
  },
};

/** The handful of PostgREST filters this app actually sends. */
function applyFilters(rows, params) {
  let out = rows;
  for (const [key, value] of params) {
    if (["select", "order", "limit", "offset", "on_conflict"].includes(key))
      continue;
    if (value.startsWith("eq.")) {
      const want = value.slice(3);
      out = out.filter((r) => String(r[key]) === want);
    } else if (value.startsWith("in.")) {
      const want = new Set(
        value
          .slice(3)
          .replace(/^\(|\)$/g, "")
          .split(",")
          .map((s) => s.replace(/^"|"$/g, ""))
      );
      out = out.filter((r) => want.has(String(r[key])));
    }
  }
  return out;
}

async function openApp(browser, viewport, { mobile = false, path = "/" } = {}) {
  const ctx = await browser.newContext({
    viewport,
    deviceScaleFactor: mobile ? 3 : 2,
    isMobile: mobile,
    hasTouch: mobile,
  });

  // The storage key supabase-js derives from the URL's first hostname label.
  // Both plausible ones are planted, so the shot does not depend on which
  // .env the dev server happened to read.
  await ctx.addInitScript((session) => {
    for (const key of [
      "sb-stub-auth-token",
      "sb-mfquvxfmpafnctgrrkdw-auth-token",
      "sb-127-auth-token",
      "sb-localhost-auth-token",
    ]) {
      window.localStorage.setItem(key, JSON.stringify(session));
    }
  }, SESSION);

  // One handler for every request the page makes. Anything not answered here
  // and not served by the dev server is aborted rather than allowed out.
  let escaped = 0;
  await ctx.route("**/*", async (route) => {
    const req = route.request();
    const url = new URL(req.url());
    // Google Fonts is the one host let through, because the app's display
    // face comes from it and a screenshot in a fallback serif is a picture of
    // something the app never looks like. It is a GET for a stylesheet and a
    // font file; nothing of this session goes with it.
    const FONTS = ["fonts.googleapis.com", "fonts.gstatic.com"];
    const local =
      url.origin === BASE ||
      url.protocol === "data:" ||
      FONTS.includes(url.hostname);

    if (url.pathname.startsWith("/rest/v1/")) {
      const table = url.pathname.replace("/rest/v1/", "").split("?")[0];
      if (table.startsWith("rpc/")) {
        const RPC = { is_owner: true, admin_list_people: [] };
        return route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(RPC[table.slice(4)] ?? null),
        });
      }
      if (req.method() !== "GET") {
        return route.fulfill({
          status: 201,
          contentType: "application/json",
          body: "[]",
        });
      }
      const rows = applyFilters(TABLES[table] ?? [], url.searchParams);
      // `.single()` and `.maybeSingle()` ask for an object, not an array.
      const wantsObject = (req.headers()["accept"] ?? "").includes(
        "vnd.pgrst.object"
      );
      return route.fulfill({
        status: wantsObject && rows.length === 0 ? 406 : 200,
        contentType: "application/json",
        headers: {
          "content-range": `0-${Math.max(rows.length - 1, 0)}/${rows.length}`,
        },
        body: JSON.stringify(wantsObject ? (rows[0] ?? null) : rows),
      });
    }
    if (url.pathname.startsWith("/auth/v1/")) {
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(
          url.pathname.endsWith("/user") ? { user: SESSION.user } : SESSION
        ),
      });
    }
    if (url.pathname.startsWith("/functions/v1/")) {
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: "{}",
      });
    }
    if (local) return route.continue();

    escaped += 1;
    console.log("  blocked:", req.method(), req.url().slice(0, 90));
    return route.abort();
  });

  const page = await ctx.newPage();
  page.on(
    "console",
    (m) =>
      m.type() === "error" &&
      console.log("    console:", m.text().slice(0, 160))
  );
  await page.goto(BASE + path, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2500);
  page.escaped = () => escaped;
  return { ctx, page };
}

const shot = async (page, name, opts = {}) => {
  await page.screenshot({ path: `${OUT}/${name}.png`, ...opts });
  console.log("  shot", name);
};

const browser = await chromium.launch();

// ── The list, which is the studio's front door ───────────────────────────
{
  const { ctx, page } = await openApp(browser, DESKTOP);
  console.log("dashboard");
  console.log("  rows:", await page.locator("tbody tr").count());
  await shot(page, "dashboard");
  await ctx.close();
}

// ── The editor, which is what makes it a writing studio ──────────────────
{
  const { ctx, page } = await openApp(browser, DESKTOP, {
    path: "/entry/e0000000-0000-0000-0000-000000000002",
  });
  console.log("editor");
  await shot(page, "editor");
  await ctx.close();
}

// ── Hero candidates, at the media frame's own ratio ──────────────────────
for (const [name, path] of [
  ["hero-dashboard", "/"],
  ["hero-editor", "/entry/e0000000-0000-0000-0000-000000000002"],
]) {
  const { ctx, page } = await openApp(browser, HERO, { path });
  console.log(name);
  await shot(page, name);
  await ctx.close();
}

// ── The screens that say the notebooks are the writer's ──────────────────
for (const [name, path] of [
  ["notebooks", "/kinds"],
  ["stats", "/stats"],
]) {
  const { ctx, page } = await openApp(browser, DESKTOP, { path });
  console.log(name);
  await shot(page, name);
  await ctx.close();
}

// ── Phone ────────────────────────────────────────────────────────────────
{
  const { ctx, page } = await openApp(browser, PHONE, { mobile: true });
  console.log("phone");
  await shot(page, "phone-dashboard");
  await ctx.close();
}

await browser.close();
console.log("done");
