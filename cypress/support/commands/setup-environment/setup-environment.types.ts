import { Method, RouteHandler, RouteMatcher } from 'cypress/types/net-stubbing';

export interface GraphQLIntercept {
    /**
     * The operation name is a meaningful and explicit name for your operation.
     * It is only required in multi-operation documents, but its use is encouraged
     * because it is very helpful for debugging and server-side logging
     */
    operationName: string;

    /**
     * Load a fixed set of data located in a file.
     */
    fixture: string;

    /**
     * An aliased route as defined using the .as() command and referenced with the @ character and the name of the alias.
     */
    alias: string;
}

export interface BaseEndpoint {
    /**
     * Match the route to a specific HTTP method (GET, POST, PUT, etc).
     */
    method: Method;

    /**
     * Specify the URL to match.
     */
    url: RouteMatcher;
}

/**
 * Use `cy.intercept()` to stub and intercept HTTP requests and responses.
 *
 * @see https://on.cypress.io/intercept
 * @example
 *    cy.intercept('GET', 'http://foo.com/fruits', ['apple', 'banana', 'cherry'])
 */
export type InterceptedEndpoint =
    | (BaseEndpoint & {
          response: RouteHandler;

          /**
           * An aliased route as defined using the .as() command and referenced with the @ character and the name of the alias.
           */
          alias: string;
          graphql?: never;
      })
    | (BaseEndpoint & {
          /**
           * The GraphQL key accepts an array of pre-defined `operationName` as well as a `fixture` and `alias` set.
           */
          graphql: GraphQLIntercept[];
          response?: never;
          alias?: never;
      });

export type SetupEnvironmentEndpoints = InterceptedEndpoint[];
