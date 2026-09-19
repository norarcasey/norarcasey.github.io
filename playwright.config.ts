import { defineConfig, devices } from "@playwright/test";

// Dedicated port so the e2e server doesn't collide with a manual `pnpm dev`.
const PORT = 4321;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "line" : "list",
  use: {
    baseURL: `http://localhost:${PORT}`,
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    // The dark palette has been live since UI-19. axe's contrast check is the
    // one thing jsdom cannot do, so it runs in both schemes; the layout and
    // SEO specs do not depend on colour and run once.
    {
      name: "chromium-dark",
      use: { ...devices["Desktop Chrome"], colorScheme: "dark" },
      testMatch: /a11y\.spec\.ts/,
    },
  ],
  // Build once and serve the real production output, so the scan sees exactly
  // what ships (including the bundled CSS) rather than the dev server.
  webServer: {
    command: `pnpm build && pnpm preview --port ${PORT} --strictPort`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
