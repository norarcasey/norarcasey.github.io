import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

import { prerenderRoutes } from "./scripts/prerender";

// Custom domain (noracasey.com) is served from the repo root, so base is "/".
// Build output goes to /docs to match the GitHub Pages "deploy from /docs" setup.
export default defineConfig({
  plugins: [react(), prerenderRoutes()],
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
