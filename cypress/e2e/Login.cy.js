/// <reference types="Cypress" />

import LoginPage from "../pages/loginPage";

const errorMessage = ".validation-summary-errors";
const emailError = "#Email-error";

describe("Login Page Tests", () => {
  beforeEach(() => {
    LoginPage.visitLoginPage();
    cy.get(".title").children().should("have.text", "Welcome, please sign in!");
    cy.assertElementVisibility(LoginPage.emailInput);
    cy.assertElementVisibility(LoginPage.passwordInput);
    cy.assertElementVisibility(LoginPage.loginButton);
  });

  it("Valid Login", () => {
    // Enter valid email and password
    LoginPage.login(Cypress.env("email"), Cypress.env("password"));

    // Assert that the dashboard is loaded
    cy.url().should("eq", Cypress.env("dashboard_url"));
  });

  it("Invalid Login - Incorrect Password", () => {
    LoginPage.login(Cypress.env("email"), "anupam");
    cy.assertElementVisibility(errorMessage);
    cy.assertElementText(errorMessage, LoginPage.incorrectPassMsg);
    cy.url().should("not.eq", Cypress.env("dashboard_url"));
  });

  it("Invalid Login - Non-existent User", () => {
    LoginPage.login("anupam@yourstore.com", Cypress.env("password"));
    cy.assertElementVisibility(errorMessage);
    cy.assertElementText(errorMessage, LoginPage.incorrectUserMsg);
    cy.url().should("not.eq", Cypress.env("dashboard_url"));
  });

  it("Empty Fields or Wrong Format", () => {
    cy.get(LoginPage.emailInput).clear();
    cy.get(LoginPage.passwordInput).clear();
    cy.clickElement(LoginPage.loginButton);
    cy.assertElementVisibility(emailError);
    cy.assertElementText(emailError, LoginPage.emptyEmailMsg);
    cy.url().should("not.eq", Cypress.env("dashboard_url"));
    cy.enterText(LoginPage.emailInput, "anupam");
    cy.assertElementVisibility(emailError);
    cy.assertElementText(emailError, "Wrong email");
  });
});
