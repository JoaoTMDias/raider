Cypress.Commands.add("login", (username: string = Cypress.env("SPOTIFY_USERNAME"), password: string = Cypress.env("SPOTIFY_PASSWORD")) => {
  cy.session([username, password], () => {
    const BASE_URL = Cypress.config("baseUrl") ?? "http%3A%2F%2Flocalhost%3A3000%2F";
    const AUTH_URL = `/api/auth/signin?callbackUrl=${encodeURI(BASE_URL)}`;

    cy.visit(AUTH_URL);

    cy.contains("Sign in with Spotify").should("be.visible").click();

    cy.origin('https://accounts.spotify.com', { args: { username, password } }, ({ username, password }) => {
      cy.get('input#login-username').click().type(username)
      cy.get('input#login-password').click().type(password)
      cy.get('#login-button').click()
    });
  }, {
    validate: () => {
      cy.getCookie('next-auth.csrf-token').should("exist");
      cy.getCookie('next-auth.session-token').should("exist");
    },
  })
});
