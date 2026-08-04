import { defineConfig, devices } from "@playwright/test";

const port = 3100;
const baseURL = `http://localhost:${port}`;

/**
 * If Playwright's own bundled Chromium isn't available (typical in
 * restricted sandboxes that pre-install a system Chromium), fall back
 * to it. In CI this is unset and Playwright uses its own download.
 */
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;

const launch = executablePath
  ? { executablePath, args: process.env.PLAYWRIGHT_NO_SANDBOX ? ["--no-sandbox"] : [] }
  : undefined;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [["list"], ["html", { open: "never", outputFolder: "playwright-report" }]],
  use: {
    baseURL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    launchOptions: launch,
  },
  projects: [
    {
      name: "mobile-375",
      use: { ...devices["iPhone 13"], viewport: { width: 375, height: 812 }, launchOptions: launch },
    },
    {
      name: "tablet-768",
      use: { ...devices["Desktop Chrome"], viewport: { width: 768, height: 1024 }, launchOptions: launch },
    },
    {
      name: "desktop-1440",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 }, launchOptions: launch },
    },
  ],
  webServer: {
    command: `PORT=${port} npm run start`,
    port,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    stdout: "ignore",
    stderr: "pipe",
    env: {
      ADMIN_PASSWORD: process.env.ADMIN_PASSWORD ?? "test-password",
      ADMIN_JWT_SECRET: process.env.ADMIN_JWT_SECRET ?? "test-secret",
    },
  },
});
