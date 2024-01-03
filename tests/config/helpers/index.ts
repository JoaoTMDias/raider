import * as fs from 'fs';
import * as path from 'path';
import { BrowserContext, Cookie, expect, Locator } from '@playwright/test';
import { DEFAULT_ENDPOINTS, SESSION_COOKIES } from '../constants';
import { SetupEnvironmentEndpoints } from '../fixtures/types';

/**
 * Merges the default intercepted routes and the custom ones
 */
function mergeRoutes(custom: SetupEnvironmentEndpoints) {
    return [...DEFAULT_ENDPOINTS, ...custom];
}

/**
 * Returns an array of routes to be intercepted
 */
export function getRoutesToIntercept(
    endpoints?: SetupEnvironmentEndpoints
): SetupEnvironmentEndpoints {
    return endpoints && Array.isArray(endpoints) ? mergeRoutes(endpoints) : DEFAULT_ENDPOINTS;
}

/**
 * Utility to match GraphQL mutation based on the operation name
 */
export function hasOperationName(operationName: string, configOperationName: string) {
    const HAS_MATCHING_QUERY = operationName === configOperationName;
    const HAS_MATCHING_OPERATION = operationName === configOperationName;
    const HAS_OPERATION_NAME = HAS_MATCHING_QUERY || HAS_MATCHING_OPERATION;

    return HAS_OPERATION_NAME;
}

/**
 * After login, ensures that the session cookies have been set on the user's browser
 */
export async function validateCookies(allCookies: Cookie[]) {
    const FILTERED_COOKIES = allCookies.filter((cookie) => SESSION_COOKIES.includes(cookie.name));

    for (const [index, cookie] of FILTERED_COOKIES.entries()) {
        await expect(cookie.name).toEqual(SESSION_COOKIES[index]);
        await expect(cookie.name).toBeDefined();
    }
}

const ISTANBUL_CLI_OUTPUT = path.join(process.cwd(), 'coverage-reports/playwright');

/**
 * Collects code coverage from running end-to-end tests.
 *
 * Assumes that code has been instrumented with `babel-plugin-istanbul` during the build process.
 */
export async function setupCoverage(
    context: BrowserContext,
    use: (r: BrowserContext) => Promise<void>
) {
    await context.addInitScript(() =>
        window.addEventListener('beforeunload', () =>
            (window as any).collectIstanbulCoverage(JSON.stringify((window as any).__coverage__))
        )
    );
    await fs.promises.mkdir(ISTANBUL_CLI_OUTPUT, { recursive: true });
    await context.exposeFunction('collectIstanbulCoverage', (coverageJSON: string) => {
        if (coverageJSON)
            fs.writeFileSync(
                path.join(ISTANBUL_CLI_OUTPUT, `playwright_coverage.json`),
                coverageJSON
            );
    });
    await use(context);
    for (const page of context.pages()) {
        await page.evaluate(() =>
            (window as any).collectIstanbulCoverage(JSON.stringify((window as any).__coverage__))
        );
    }
}
type WaitForRes = [locatorIndex: number, locator: Locator];

export async function waitForOneOf(
    locators: Locator[],
): Promise<WaitForRes> {
    const res = await Promise.race([
        ...locators.map(async (locator, index): Promise<WaitForRes> => {
            let timedOut = false;
            await locator.waitFor({ state: 'visible' }).catch(() => timedOut = true);
            return [timedOut ? -1 : index, locator];
        }),
    ]);
    if (res[0] === -1) {
        throw new Error('no locator visible before timeout');
    }
    return res;
}
