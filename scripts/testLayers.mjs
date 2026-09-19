#!/usr/bin/env node
// The layers of a test suite, counted, as the rows a case study's chart reads.
//
//   node scripts/testLayers.mjs ~/src/norabene
//
// Counts the lines that open a test, per layer, so the figures on a page are
// measured rather than typed and can be taken again when the suite grows.
//
// The walk is done here rather than shelled out to `find`, so that what is
// skipped is stated rather than inherited: node_modules and build output hold
// other people's tests, and counting them once produced 2,830 for a package
// that has 595.
//
// The layers are this project's shape: a pure domain core, the app in jsdom,
// and a browser against a production build. Another project with another shape
// needs its own entry rather than a reinterpretation of this one.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const SKIP = new Set(["node_modules", "dist", ".git", "coverage", ".vercel"]);

const LAYERS = {
  norabene: [
    {
      name: "The domain core",
      dirs: ["packages"],
      match: (file) => file.endsWith(".test.ts"),
      note: "Types, schemas, ordering, the outbox policy and the vault's crypto: no React, no Supabase, no browser API, and a lint rule that keeps it that way.",
    },
    {
      name: "The app, in jsdom",
      dirs: ["apps/web/src"],
      match: (file) => file.endsWith(".test.ts") || file.endsWith(".test.tsx"),
      note: "Components and the helpers around them. Node by default; the few that want a DOM ask for one, rather than everything paying for it.",
    },
    {
      name: "End to end, in a browser",
      dirs: ["apps/web/e2e"],
      // zz-* are benchmarks rather than assertions, and are not the suite.
      match: (file) => file.endsWith(".spec.ts") && !file.startsWith("zz-"),
      note: "Against a production build rather than the dev server, because the offline spec needs the service worker. Ranked by what breaks, so CI can skip the least severe.",
    },
  ],
};

function walk(root) {
  const found = [];
  const visit = (dir) => {
    let entries;
    try {
      entries = readdirSync(dir);
    } catch {
      return;
    }
    for (const entry of entries) {
      if (SKIP.has(entry)) continue;
      const path = join(dir, entry);
      if (statSync(path).isDirectory()) visit(path);
      else found.push({ path, name: entry });
    }
  };
  visit(root);
  return found;
}

const repo = process.argv[2];
const key = process.argv[3] ?? "norabene";
if (!repo || !LAYERS[key]) {
  console.error("usage: node scripts/testLayers.mjs <repo> [project]");
  process.exit(1);
}

const rows = LAYERS[key].map((layer) => {
  const files = layer.dirs
    .flatMap((dir) => walk(join(repo, dir)))
    .filter((file) => layer.match(file.name));
  const tests = files.reduce(
    (sum, file) =>
      sum +
      (readFileSync(file.path, "utf8").match(/^\s*(it|test)\(/gm) ?? []).length,
    0
  );
  return { name: layer.name, note: layer.note, files: files.length, tests };
});

process.stdout.write(JSON.stringify(rows, null, 2) + "\n");
