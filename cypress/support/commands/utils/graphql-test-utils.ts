/**
 * The strategies below follow best known practices for waiting and asserting against GraphQL queries or mutations.
 *
 * Waiting and asserting on GraphQL API requests rely on matching a query or mutation name in the POST body.
 *
 * Using cy.intercept() we can override the response to a GraphQL query or mutation by declaring an intercept at the beginning of the test or closer to the expectation.
 */

import { CyHttpMessages } from 'cypress/types/net-stubbing';

/**
 * Utility to match GraphQL mutation based on the operation name
 */
export function hasOperationName(req: CyHttpMessages.IncomingHttpRequest, operationName: string) {
    const { body } = req;

    const HAS_OPERATION_KEY = Boolean(body?.operationName);
    const HAS_MATCHING_OPERATION = body.operationName === operationName;

    return Boolean(HAS_OPERATION_KEY && HAS_MATCHING_OPERATION);
}

interface AliasParams {
    /**
     * The incoming HTTP request
     */
    request: CyHttpMessages.IncomingHttpRequest;

    /**
     * GraphQL operation name
     */
    operationName: string;

    /**
     * Serve a fixture as the response body.
     */
    fixture: string;
}

/**
 * Sets up a graphql response with a fixture
 */
export function setGraphqlResponse({ request, operationName, fixture }: AliasParams) {
    if (hasOperationName(request, operationName)) {
        if (fixture) {
            request.reply({
                statusCode: 200,
                fixture,
            });
        }
    }
}
