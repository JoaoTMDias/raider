import { PLAYWRIGHT_CONFIG } from '../../../playwright.config';
import { getRoutesToIntercept, validateCookies } from '../helpers';
import { test as setup, expect } from '../index';

const BASE_URL = PLAYWRIGHT_CONFIG.baseURL ?? "http%3A%2F%2Flocalhost%3A3000%2F";
const AUTH_URL = `/api/auth/signin?callbackUrl=${encodeURI(BASE_URL)}`;

setup('Environment Setup', async ({ integrationTests, page }) => {
  await setup.step('Mocking Routes', async () => {
    await integrationTests.interceptRoutes(getRoutesToIntercept());
  });

  await setup.step('Service Authentication', async () => {
    await page.goto(AUTH_URL);

    const SIGN_IN_BUTTON = page.getByText("Sign in with Spotify");
    await expect(SIGN_IN_BUTTON).toBeVisible();

    await SIGN_IN_BUTTON.click();

    await page.waitForURL("https://accounts.spotify.com/**");

    const ELEMENTS = {
      USERNAME_INPUT: page.locator('input#login-username'),
      PASSWORD_INPUT: page.locator('input#login-password'),
      LOGIN_BUTTON: page.locator('#login-button'),
    };

    // Fill the username and password
    await ELEMENTS.USERNAME_INPUT.click();
    await ELEMENTS.USERNAME_INPUT.fill(PLAYWRIGHT_CONFIG.auth.SPOTIFY_USERNAME!);
    await ELEMENTS.PASSWORD_INPUT.click();
    await ELEMENTS.PASSWORD_INPUT.fill(PLAYWRIGHT_CONFIG.auth.SPOTIFY_PASSWORD!);

    // Click on the login button
    await ELEMENTS.LOGIN_BUTTON.click();
  });

  await setup.step('Validating Cookies', async () => {
    const LOCAL_COOKIES = await integrationTests.page.context().cookies();
    await validateCookies(LOCAL_COOKIES);
  });

  await setup.step('Saving Browser Context to Storage State', async () => {
    await page.context().storageState({ path: PLAYWRIGHT_CONFIG.storageState });
  });
});
