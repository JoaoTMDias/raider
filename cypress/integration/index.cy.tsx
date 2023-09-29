const SELECTORS = {
  header: {
    nav: "header-authentication",
    login: "header-user-login",
    user: {
      container: "header-user",
      image: "header-user-image",
      name: "header-user-name",
      logout: "header-user-logout",
    },
  },
};

beforeEach(() => {
  cy.login();
});

it("should login", () => {
  cy.findByTestId(SELECTORS.header.nav).should("exist");
  cy.findByTestId(SELECTORS.header.login).should("not.exist");
  cy.findByTestId(SELECTORS.header.user.container).should("exist");
  cy.findByTestId(SELECTORS.header.user.image).should("be.visible");
  cy.findByTestId(SELECTORS.header.user.name).should("be.visible");
  cy.findByTestId(SELECTORS.header.user.logout).should("be.visible");
});
