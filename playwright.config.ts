import { PlaywrightTestConfig, defineConfig, devices } from '@playwright/test';
import path from 'path';
import "dotenv/config";

export const PLAYWRIGHT_CONFIG = {
  CI: !!process.env.CI,
  baseURL: "http://localhost:3000",
  storageState: path.join(__dirname, `tests/config/environment-setup/storage/context.json`),
  auth: {
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
    SPOTIFY_USERNAME: process.env.SPOTIFY_USERNAME,
    SPOTIFY_PASSWORD: process.env.SPOTIFY_PASSWORD,
  },
} as const;

/**
 * Playwright Test supports running multiple test projects at the same time
 */
function getProjectsConfig(): PlaywrightTestConfig['projects'] {
  return [
    {
      name: 'environment-setup',
      testMatch: '**/environment-setup/index.ts',
    },
    {
      name: 'chromium',
      testMatch: '**/integration/*.spec.ts',
      dependencies: ['environment-setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: PLAYWRIGHT_CONFIG.storageState,
      },
    },
    {
      name: 'firefox',
      testMatch: '**/integration/*.spec.ts',
      dependencies: ['environment-setup'],
      use: {
        ...devices['Desktop Firefox'],
        storageState: PLAYWRIGHT_CONFIG.storageState,
      },
    },
    {
      name: 'webkit',
      testMatch: '**/integration/*.spec.ts',
      dependencies: ['environment-setup'],
      use: {
        ...devices['Desktop Safari'],
        storageState: PLAYWRIGHT_CONFIG.storageState,
      },
    },
  ];
}

const CONFIG: PlaywrightTestConfig = {
  testDir: './tests',
  outputDir: './tests/results',
  fullyParallel: true, // Run tests in files in parallel
  forbidOnly: PLAYWRIGHT_CONFIG.CI, // Fail the build on CI if you accidentally left test.only in the source code.
  retries: PLAYWRIGHT_CONFIG.CI ? 2 : 0, // Retry on CI only
  workers: PLAYWRIGHT_CONFIG.CI ? 1 : undefined, // Opt out of parallel tests on CI
  reporter: [
    ['list', { printSteps: true }],
    [
      'junit',
      {
        outputFile: './reports/junit-playwright.xml',
      },
    ],
  ], // Reporter to use. See https://playwright.dev/docs/test-reporters

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: PLAYWRIGHT_CONFIG.baseURL, // Base URL to use in actions like `await page.goto('/')`.
    trace: 'on-first-retry', // Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer
    viewport: {
      width: 1280,
      height: 720,
    },
  },

  /* Configure projects for major browsers */
  projects: getProjectsConfig(),

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'yarn dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !PLAYWRIGHT_CONFIG.CI,
  },
}

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig(CONFIG);


