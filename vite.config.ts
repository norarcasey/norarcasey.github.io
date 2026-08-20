import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

import { blogContent } from "./scripts/blogContent";
import { prerenderRoutes } from "./scripts/prerender";

// Custom domain (noracasey.com) is served from the repo root, so base is "/".
// Build output goes to /docs to match the GitHub Pages "deploy from /docs" setup.
export default defineConfig({
  // blogContent must precede prerenderRoutes: it writes public/blog/index.json
  // at buildStart, which the prerender reads at closeBundle to emit one HTML
  // file per post, the sitemap entries, and the feed.
  plugins: [react(), blogContent(), prerenderRoutes()],
  base: "/",
  build: {
    outDir: "docs",
    emptyOutDir: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    // Unit tests live in src and scripts; e2e/ is Playwright's and must not be
    // run by Vitest.
    include: ["src/**/*.{test,spec}.{ts,tsx}", "scripts/**/*.test.ts"],
  },
});
