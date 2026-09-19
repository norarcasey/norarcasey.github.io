import type { TestLayer } from "../components/TestLayers";

/**
 * Nora Bene's suite, by layer. Generated from the repo on 19 Sep 2026 by
 * scripts/testLayers.mjs; regenerate rather than edit. 1061 tests in
 * 109 files, counted as the lines that open one.
 *
 * Widest first, which is also the order they are worth reading in.
 */
export const NORA_BENE_TEST_LAYERS: TestLayer[] = [
  {
    name: "The domain core",
    note: "Types, schemas, ordering, the outbox policy and the vault's crypto: no React, no Supabase, no browser API, and a lint rule that keeps it that way.",
    files: 43,
    tests: 689,
  },
  {
    name: "The app, in jsdom",
    note: "Components and the helpers around them. Node by default; the few that want a DOM ask for one, rather than everything paying for it.",
    files: 25,
    tests: 238,
  },
  {
    name: "End to end, in a browser",
    note: "Against a production build rather than the dev server, because the offline spec needs the service worker. Ranked by what breaks, so CI can skip the least severe.",
    files: 41,
    tests: 134,
  },
];
