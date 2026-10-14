import { defineConfig, devices } from "@playwright/test";

// A port nothing else on this laptop claims (CASEY-7). It was 4321 until
// Pictora's server took it, and reusing the server already there ran every
// spec against Pictora. 4391, CASEY-6's stopgap, is Dinora's.
const PORT = 4373;

export default defineConfig({
  testDir: "./e2e",
  // Fails the run before any spec if the server is not this site.
  globalSetup: "./e2e/global-setup.ts",
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
    // Never reuse: a server already on the port is another app, or a stale
    // build of this one. Either way the run should fail, not scan it.
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
