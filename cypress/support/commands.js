import LoginPage from "../pages/loginPage";
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", (email, pass) => {
  cy.session([email, pass], () => {
    //Login to app
    LoginPage.visitLoginPage();

    // Enter valid email and password
    LoginPage.login(email, pass);

    // Assert that the dashboard is loaded
    cy.url().should("eq", Cypress.env("dashboard_url"));
  });
});

Cypress.Commands.add("logout", () => {
  // Perform logout
  cy.get("a[href='/logout']").should("be.visible").click();
});

Cypress.Commands.add("enterText", (selector, text) => {
  cy.get(selector).clear().type(text);
});

Cypress.Commands.add("clickElement", (selector) => {
  cy.get(selector).click();
});

Cypress.Commands.add("assertElementVisibility", (selector) => {
  cy.get(selector).should("be.visible");
});

Cypress.Commands.add("assertElementText", (selector, text) => {
  cy.get(selector).should("contain", text);
});

Cypress.Commands.add("selectMenu", (menuText) => {
  cy.get("li.nav-item a.nav-link p").contains(menuText).click();
});
