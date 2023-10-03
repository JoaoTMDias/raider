import { SetupEnvironmentEndpoints } from './setup-environment.types';
import { setGraphqlResponse } from '../utils';

/**
 * Stubs and intercepts HTTP requests and responses.
 */
export function createEndpointInterceptions(endpoints: SetupEnvironmentEndpoints) {
    endpoints.forEach((endpointConfig) => {
        // Determine the type of request
        const REQUEST_TYPE = endpointConfig.alias && endpointConfig.response ? 'static' : 'graphql';

        switch (REQUEST_TYPE) {
            /**
             * The current config is static (meaning that is has a fixture and an alias pair),
             */
            default:
            case 'static':
                cy.intercept(endpointConfig.method, endpointConfig.url, {
                    fixture: endpointConfig.response,
                }).as(
                    endpointConfig.alias!
                );
                break;

            /**
             * The current config is a graphql request, which means that for each one,
             * we'll add an alias and a fixture for the desired operation name.
             */
            case 'graphql':
                for (const config of endpointConfig.graphql!) {
                    cy.intercept(endpointConfig.method, endpointConfig.url, (request) => {
                        setGraphqlResponse({
                            request,
                            operationName: config.operationName,
                            fixture: config.fixture,
                        });
                    }).as(config.alias);
                }

                break;
        }
    });
}
