import { RealPressOptions } from 'cypress-real-events/commands/realPress';
import { recurse } from 'cypress-recurse';

export interface TabOptions extends RealPressOptions {
  shift?: boolean;
}

Cypress.Commands.add(
  'tab',
  { prevSubject: ['element'] },
  (subject: JQuery<HTMLElement>, tabOptions: TabOptions | undefined) => {
    if (tabOptions && tabOptions.shift) {
      cy.wrap(subject).realPress(['Shift', 'Tab'], {
        log: tabOptions.log,
        pressDelay: tabOptions.pressDelay,
      });
    }

    cy.wrap(subject).realPress('Tab', tabOptions);
  }
);

const CUSTOM_RECURSE_TIMEOUT = 12000; // 12 seg

Cypress.Commands.add(
  'tabUntil',
  /**
   * @param getElement
   * @param shift
   * @returns
   */
  <GenericCallback extends Cypress.Chainable<JQuery<HTMLElement>>>(
    getElement: () => GenericCallback,
    shift = false
  ) => {
    return recurse(
      () => getElement(),
      /**
       * Element assertion.
       *
       * @param {JQuery<HTMLElement>} $el
       * @returns {boolean}
       */
      ($el: JQuery<HTMLElement>): boolean => $el.is(':focus'),
      {
        log: 'Found the element!',
        post() {
          cy.focused().realPress(shift ? ['Shift', 'Tab'] : 'Tab');
        },
        timeout: CUSTOM_RECURSE_TIMEOUT,
      }
    ).should('have.focus');
  }
);
