import { RealHoverOptions } from 'cypress-real-events/commands/realHover';

Cypress.Commands.add(
  'hover',
  { prevSubject: 'element' },
  (subject: JQuery<HTMLElement>, options?: RealHoverOptions) => {
    return cy.wrap(subject).realHover(options);
  }
);
