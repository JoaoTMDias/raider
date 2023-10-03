import { DEFAULT_ENDPOINTS, DEFAULT_PAGE_URL } from './constants';
import { SetupEnvironmentEndpoints } from './setup-environment.types';
import { createEndpointInterceptions } from './helpers';

/**
 * Prepares the CR environment to be tested against when loading a page.
 */
export function setupEnvironment(
    pageUrl = DEFAULT_PAGE_URL,
    endpoints?: SetupEnvironmentEndpoints
) {
    cy.login().then(() => {
        const ENVIRONMENT_ENDPOINTS = endpoints ? [...DEFAULT_ENDPOINTS, ...endpoints] : DEFAULT_ENDPOINTS;

        // Intercept the provided endpoints with defined fixtures
        createEndpointInterceptions(ENVIRONMENT_ENDPOINTS);

        cy.visit(pageUrl);

        // And then wait for an x number of request to happen,
        // and replace them with our fixtures.
        cy.waitForRequests(ENVIRONMENT_ENDPOINTS);
    });
}

Cypress.Commands.add('setupEnvironment', setupEnvironment);
