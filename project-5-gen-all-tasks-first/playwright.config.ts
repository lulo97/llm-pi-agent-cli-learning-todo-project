import { defineConfig, devices } from '@playwright/test';

// Use shared browser instance
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  timeout: 30 * 1000,
  retries: 2,

  /* Use custom base URL for testing */
  baseURL: 'http://localhost:3000',

  /* Run tests in workers */
  workers: process.env.PLAYWRIGHT_WORKERS ? parseInt(process.env.PLAYWRIGHT_WORKERS) : undefined,

  /* Reporter to use on failed tests */
  reporter: 'html',

  /* Shared settings for all the projects below. See https://playwright.dev/docs/test-configuration. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. */
    trace: 'on-first-retry',

    /* Collect trace when retrying the failed test. */
    screenshot: 'only-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    // {
    //   name: 'chromium',
    //   use: { ...devices['Desktop Chrome'] },
    // },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against branded browsers. */
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});
