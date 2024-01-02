import {
  AccessibilityAuditController,
  IntegrationTestsController,
} from '../page-objects';
import { Request, Route } from '@playwright/test';

export type RouteMethod =
  | 'ACL'
  | 'BIND'
  | 'CHECKOUT'
  | 'CONNECT'
  | 'COPY'
  | 'DELETE'
  | 'GET'
  | 'HEAD'
  | 'LINK'
  | 'LOCK'
  | 'M-SEARCH'
  | 'MERGE'
  | 'MKACTIVITY'
  | 'MKCALENDAR'
  | 'MKCOL'
  | 'MOVE'
  | 'NOTIFY'
  | 'OPTIONS'
  | 'PATCH'
  | 'POST'
  | 'PROPFIND'
  | 'PROPPATCH'
  | 'PURGE'
  | 'PUT'
  | 'REBIND'
  | 'REPORT'
  | 'SEARCH'
  | 'SOURCE'
  | 'SUBSCRIBE'
  | 'TRACE'
  | 'UNBIND'
  | 'UNLINK'
  | 'UNLOCK'
  | 'UNSUBSCRIBE';

export type RouteHandler = string | ((route: Route, request: Request) => Promise<unknown>);

export interface BaseEndpoint {
  /**
   * Match the route to a specific HTTP method (GET, POST, PUT, etc).
   */
  method: RouteMethod;

  /**
   * A glob pattern, regex pattern or predicate receiving [URL] to match while routing. When a `baseURL` via the context
   * options was provided and the passed URL is a path, it gets merged via the
   * [`new URL()`](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL) constructor.
   */
  url: string | RegExp | ((url: URL) => boolean);

  /**
   * Mocked response. It can be:
   * 1. A fixed set of data located in a file.
   * 2. A callback function
   */
  response: RouteHandler;

  /**
   * How often a route should be used. By default it will be used every time.
   */
  times?: number;
}

export interface GraphQLIntercept extends BaseEndpoint {
  /**
   * The operation name is a meaningful and explicit name for your operation.
   * It is only required in multi-operation documents, but its use is encouraged
   * because it is very helpful for debugging and server-side logging
   */
  operationName: string;
}

export interface RESTIntercept extends BaseEndpoint {
  operationName?: never;
}

export type InterceptedEndpoint = RESTIntercept | GraphQLIntercept;

export type SetupEnvironmentEndpoints = InterceptedEndpoint[];

export interface AxeFixture {
  /**
   * Creates an instance of the `IntegrationTestsController` page object model.
   */
  integrationTests: IntegrationTestsController;

  /**
   * Creates an AxeBuilder instance.
   *
   * @example
   * ```ts
   * test('should load the initial page', async ({ integrationTests, accessibility }) => {
   *  await integrationTests.setup(SELECTORS_PAGES_HOME_URL);
   *  await a11y.check();
   * ```
   */
  a11y: AccessibilityAuditController;
}
