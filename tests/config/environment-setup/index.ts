import { PLAYWRIGHT_CONFIG } from '../../../playwright.config';
import { validateCookies } from '../helpers';
import { test as setup, expect } from '../index';

const BASE_URL = PLAYWRIGHT_CONFIG.baseURL;

setup('Environment Setup', async ({ integrationTests, page }) => {
  await setup.step('Application Warmup', async () => {
    await page.goto(BASE_URL);
    await expect(page).toHaveURL(/localhost:3000/);
  });

  await setup.step('Validating Cookies', async () => {
    const LOCAL_COOKIES = await integrationTests.page.context().cookies();
    await validateCookies(LOCAL_COOKIES);
  });

  await setup.step('Saving Browser Context to Storage State', async () => {
    await page.context().storageState({ path: PLAYWRIGHT_CONFIG.storageState });
  });
});
