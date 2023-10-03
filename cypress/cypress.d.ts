import { mount } from 'cypress/react';
import { RealHoverOptions } from 'cypress-real-events/commands/realHover';
import { RealPressOptions } from 'cypress-real-events/commands/realPress';
import { SetupEnvironmentEndpoints } from './support/commands/setup-environment/setup-environment.types';
import { Interception } from 'cypress/types/net-stubbing';

export interface TabOptions extends RealPressOptions {
  shift?: boolean;
}

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Prepares the CR environment to be tested against when loading a page.
       *
       * It requires:
       * 1. (optional) a starting url
       * 2. (optional) an array of endpoints to be intercepted.
       *
       * @default pageUrL "/"
       * @default endpoints undefined
       *
       * @example
       *
       * const endpoints: SetupEnvironmentEndpoints = [
       *    {
       *        method: 'GET',
       *        url: `${Cypress.config('baseUrl')}/static/locales/en-US/common.json`,
       *        response: 'fixtures:locales/en-US/common.json',
       *        alias: 'common-languages',
       *    },
       *    {
       *        method: 'POST',
       *        url: `${Cypress.config('baseUrl')}/graphql`,
       *        graphql: [
       *            {
       *                operationName: 'translation',
       *                fixture: 'graqhql/queries/translation.json',
       *                alias: 'queries-translation',
       *            },
       *            {
       *                operationName: 'globalization',
       *                fixture: 'graqhql/queries/globalization.json',
       *                alias: 'queries-globalization',
       *            },
       *            {
       *                operationName: 'Menu',
       *               fixture: 'graqhql/queries/menu.json',
       *                alias: 'queries-menu',
       *            },
       *        ],
       *    },
       * ];
       *
       * ...
       *
       * cy.setupEnvironment("/page-url", endpoints);
       */
      setupEnvironment(
          pageUrl?: string,
          endpoints?: SetupEnvironmentEndpoints
      ): Cypress.Chainable<Cypress.AUTWindow>;

      /**
       * Mounts a React component into the DOM.
       * @param jsx {React.ReactNode} The React component to mount.
       * @param options {MountOptions} [options={}] options to pass to the mount function.
       * @param rerenderKey {string} [rerenderKey] A key to use to force a rerender.
       * @see {@link https://on.cypress.io/mounting-react} for more details.
       * @example
       * import { mount } from '@cypress/react'
       * import { Stepper } from './Stepper'
       *
       * it('mounts', () => {
       *   mount(<StepperComponent />)
       *   cy.get('[data-cy=increment]').click()
       *   cy.get('[data-cy=counter]').should('have.text', '1')
       * }
       */
      mount: typeof mount;

      /**
       * Unmounts a React component from the DOM
       * @param options
       * @example
       * cy.mount(<Button>A Button</Button>).then(() => {
       *  cy.unmount();
       * });
       */
      unmount(options?: { log: boolean }): void;

      /**
       * Fires native hover event. Yes, it can test `:hover` preprocessor.
       * @see https://github.com/dmtrKovalenko/cypress-real-events#cyrealhover
       * @example
       * cy.get("button").hover()
       * @param options hover options
       */
      hover(options?: RealHoverOptions): Chainable<JQuery<HTMLElement>>;

      /**
       * Tabs between page elements. Support tabbing backwards
       *
       * @param options
       * @example
       * cy.get("button").tab();
       * cy.get("button").tab({ shift: true });
       */
      tab(options?: TabOptions): Chainable<JQuery<HTMLElement>>;

      /**
       * Presses the tab key until a predicate element is true.
       * It accepts a callback for finding the target element, and an optional shift element to tab backwards.
       * This commmand is specially useful to avoid chaining `.realPress("Tab")` multiple times before reaching an element.
       *
       * @requires `cypress-real-events` needs to be installed
       *
       * @example
       *
       * // Press tab until cypress finds the tab with the name "Transaction History"
       * cy.tabUntil(() => cy.getTab("Transaction History"));
       *
       * // Press tab until cypress finds the tab with the name "Transaction History",
       * // BUT travel backwards, using the `Shift+Tab` key combo
       * cy.tabUntil(() => cy.getTab("Transaction History", true));
       */
      tabUntil<GenericCallback extends Cypress.Chainable<JQuery<HTMLElement>>>(
        element: () => GenericCallback,
        shift?: boolean
      ): Cypress.Chainable<JQuery<HTMLElement>>;

      login(username?: string, password?: string): Cypress.Chainable<any>;

      /**
       * Waits for a number of aliases
       */
      waitForRequests(endpoints: SetupEnvironmentEndpoints): Cypress.Chainable<Interception[]>
    }
  }
}
