class LoginPage {
  // Selectors
  emailInput = 'input[id="Email"]';
  passwordInput = 'input[id="Password"]';
  loginButton = ".login-button";
  incorrectPassMsg = "The credentials provided are incorrect";
  incorrectUserMsg = "No customer account found";
  emptyEmailMsg = "Please enter your email";

  // Methods
  visitLoginPage() {
    cy.visit(Cypress.env("login_url"));
  }

  login(email, pass) {
    // Enter valid username but wrong password
    cy.enterText(this.emailInput, email);
    cy.enterText(this.passwordInput, pass);

    //Click on login button
    cy.clickElement(this.loginButton);
  }
}

export default new LoginPage();
