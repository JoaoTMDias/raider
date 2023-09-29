import { getContainerEl } from 'cypress/react';
import ReactDom from 'react-dom';

Cypress.Commands.add('unmount', (options?: { log: boolean }) => {
  cy.then(() => ReactDom.unmountComponentAtNode(getContainerEl()));

  if (options?.log) {
    cy.log('component unmounted');
  }
});
