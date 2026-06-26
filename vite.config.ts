import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// Custom domain (noracasey.com) is served from the repo root, so base is "/".
// Build output goes to /docs to match the GitHub Pages "deploy from /docs" setup.
export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    outDir: "docs",
    emptyOutDir: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    // Unit tests live in src; e2e/ is Playwright's and must not be run by Vitest.
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
  },
});
