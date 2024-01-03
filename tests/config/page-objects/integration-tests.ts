import {
    GraphQLIntercept,
    InterceptedEndpoint,
    RESTIntercept,
    RouteMethod,
    SetupEnvironmentEndpoints,
} from '../fixtures/types';
import { type Page, expect } from '@playwright/test';
import { hasOperationName } from '../helpers';

const BASE_LOCAL_URL = `https://localhost:3000`;

export type GraphQLQuery = {
    operationName: string;
    query: string;
    variables?: unknown;
};

/**
* Page Object Model for the CR HUB Integration Tests Controller
*
* @class IntegrationTests
*/
class IntegrationTestsController {
    readonly page: Page;
    readonly defaultPageURL: string;
    readonly baseURL: string;

    constructor (page: Page, baseUrl?: string) {
        this.page = page;
        this.baseURL = baseUrl ?? BASE_LOCAL_URL;
        this.defaultPageURL = this.baseURL;
    }

    /**
     * Stubs and intercepts HTTP requests and responses.
     *
     * @example
     *
     * ```ts
     * // Intercept a collection of routes
     * await integrationTests.interceptRoutes([
     *  {
     *      method: 'GET',
     *      url: '**\/languages/en-US/common.json',
     *      response: "./tests/config/mocks/languages/en-US/common.json"
     *  },
     *  // Add a static mock
     *  {
     *      method: 'POST',
     *      url: "**\/graphql",
     *      operationName: 'Menu',
     *      response: './tests/config/mocks/graphql/mutations/menu.json',
     *  },
     *  // Add a custom route interception
     *  {
     *      method: 'POST',
     *      url: "**\/graphql",
     *      operationName: 'GetCustomerSessions',
     *      response: async (route) => {
     *          const response = await route.fetch();
     *          const json = await response.json();
     *          json.message['big_red_dog'] = [];
     *          await route.fulfill({ response, json });
     *      }
     *  }
     * ]);
     * ```
     */
    async interceptRoutes(endpoints: SetupEnvironmentEndpoints) {
        for (const endpointConfig of endpoints) {
            // Determine the type of request
            const REQUEST_TYPE = endpointConfig.operationName ? 'graphql' : 'static';

            switch (REQUEST_TYPE) {
                /**
                 * The current config is static
                 * (meaning that is has a response defined in the top level object),
                 */
                default:
                case 'static':
                    await this.setupRESTEndpoints(endpointConfig as RESTIntercept);
                    break;

                /**
                 * The current config is a graphql request, which means that for each one,
                 * we'll add a response for the desired operation name.
                 */
                case 'graphql':
                    await this.setupGraphQLQueries(endpointConfig as GraphQLIntercept);

                    break;
            }
        }
    }

    /**
     * Intercepts a set of GraphQL queries and responds with a pre-defined set of data
     */
    private async setupGraphQLQueries(config: GraphQLIntercept) {
        await this.page.route(
            config.url,
            (route, request) => {
                const body: GraphQLQuery = route.request().postDataJSON();

                const HAS_RESPONSE = !!config?.response;

                // A response can either be a function or a string
                const HAS_VALID_RESPONSE = Boolean(
                    HAS_RESPONSE &&
                    (typeof config.response === 'function' ||
                        typeof config.response === 'string')
                );
                const OPERATION_NAME_MATCHES = hasOperationName(
                    body.operationName,
                    config.operationName
                );

                // If there is no response defined or the operation name
                // does not exist, proceed and continue without interception
                if (!HAS_VALID_RESPONSE || !OPERATION_NAME_MATCHES) {
                    route.fallback();
                    return;
                }

                if (HAS_VALID_RESPONSE) {
                    // If the response is a callback, executes the function.
                    if (typeof config.response === 'function') {
                        return config.response(route, request);
                    }

                    return route.fulfill({
                        status: 200,
                        contentType: 'application/json',
                        path: config.response as string,
                    });
                }
            },
            {
                times: config.times,
            }
        );
    }

    /**
     * Intercepts a set of REST endpoints and responds with a pre-defined set of data
     */
    private async setupRESTEndpoints(endpointConfig: InterceptedEndpoint) {
        await this.page.route(
            endpointConfig.url,
            (route, request) => {
                const ROUTE_METHOD = route.request().method() as RouteMethod;
                const HAS_RESPONSE = !!endpointConfig.response;
                const HAS_MATCHING_METHOD = ROUTE_METHOD === endpointConfig.method;

                // If there is no response defined or the request method is not
                // the one intended, proceed and continue without interception
                if (!HAS_RESPONSE || !HAS_MATCHING_METHOD) {
                    route.fallback();
                    return;
                }

                // If the response is a callback, executes that
                if (HAS_RESPONSE && typeof endpointConfig.response === 'function') {
                    return endpointConfig.response(route, request);
                }

                return route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    path: endpointConfig.response as string,
                });
            },
            {
                times: endpointConfig.times,
            }
        );
    }

    /**
     * Navigates to a certain URL
     *
     * @example
     *
     * ```ts
     * // Go to a certain URL
     * await integrationTests.goto("/a-page-url");
     * ```
     */
    async goto(
        url: string,
        options: {
            assertOnURL?: boolean;
        } = {
                assertOnURL: true,
            }
    ) {
        const TARGET_URL = url.startsWith(this.defaultPageURL) ? url : this.defaultPageURL + url;

        await this.page.goto(TARGET_URL);

        await this.page.waitForLoadState('domcontentloaded');

        // The page should include the target url, meaning that the user is effectively logged in
        // and on the destination url.
        if (options.assertOnURL) {
            await expect(async () => {
                expect(this.page.url()).toContain(url);
            }).toPass();
        }
    }
}

export default IntegrationTestsController;
