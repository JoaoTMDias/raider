import {
  AccessibilityAuditController,
  IntegrationTestsController,
} from '../page-objects';
import { AxeFixture } from './types';
import { PLAYWRIGHT_CONFIG } from '../../../playwright.config';
import { test as base } from '@playwright/test';
import { setupCoverage } from '../helpers';

/**
* CRHUB extended base test that provides new fixtures.
*/
export const test = base.extend<AxeFixture>({
  context: async ({ context }, use) => {
      await setupCoverage(context, use);
  },
  a11y: async ({ page }, use) => {
      const a11y = new AccessibilityAuditController(page);

      await use(a11y);
  },

  integrationTests: async ({ page, baseURL }, use) => {
      const setup = new IntegrationTestsController(page, baseURL ?? PLAYWRIGHT_CONFIG.baseURL);

      await use(setup);
  },
});
