import type { TestLayer } from "../components/TestLayers";

/**
 * Noratives' suite, by layer. Generated from the repo by
 * scripts/testLayers.mjs; regenerate rather than edit. 772 tests in 70 files,
 * counted as the lines that open one, on 19 Sep 2026.
 *
 * Ten more sit in `scripts/` and are outside all three layers: they test the
 * bundle-size check rather than the app, so counting them here would make the
 * shape of the app's suite slightly wrong in exchange for a rounder total.
 *
 * The bottom layer is named after its directory rather than called a core.
 * Nora Bene's is a package a lint rule refuses to let import React; this one
 * is framework-free because it has been kept that way, which is a weaker
 * claim and the true one.
 */
export const NORATIVES_TEST_LAYERS: TestLayer[] = [
  { name: "src/lib", files: 28, tests: 482 },
  { name: "jsdom", files: 7, tests: 78 },
  { name: "e2e", files: 35, tests: 212 },
];
