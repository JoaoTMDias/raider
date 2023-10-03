import { Interception } from 'cypress/types/net-stubbing';
import { SetupEnvironmentEndpoints } from '../setup-environment/setup-environment.types';

/**
 * Wraps the alias with an @ symbol
 */
function createWaitingAlias(alias: string): string {
    return `@${alias}`;
}

/**
 * Waits for a number of aliases
 */
function waitForRequests(endpoints: SetupEnvironmentEndpoints): Cypress.Chainable<Interception[]> {
    const WAIT_REQUESTS = endpoints.flatMap((endpoint) => {
        if (!endpoint.graphql) {
            return createWaitingAlias(endpoint.alias);
        }

        let graphQLAliases: string[] = [];

        // returns each alias property inside the array of endpoint.graphql
        for (const entry of endpoint.graphql) {
            graphQLAliases.push(createWaitingAlias(entry.alias));
        }

        return graphQLAliases;
    });

    return cy.wait(WAIT_REQUESTS as string[]);
}

Cypress.Commands.add('waitForRequests', waitForRequests);
