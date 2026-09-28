class LoginPage {

  loginEmailTrigger = ".member-login-btn";
  loginAvatarTrigger = "#header-account";

  loginPanel = '[id^="header-member-panel-"]';

  emailInput = "#header-email";
  passwordInput = "#header-password";
  loginButton = '[id^="login-btn-"]';

  rememberMeCheckbox = "#header-remember";
  forgotPasswordLink = 'a[href="/uye-sifre-hatirlat"]';
  signUpButton = '[id^="register-btn-"]';

  openLoginPopup() {
    cy.get(this.loginEmailTrigger, { timeout: 10000 })
      .should("be.visible")
      .click({ force: true });
  }

  openLoginPopupByAvatar() {
    cy.get(this.loginAvatarTrigger, { timeout: 10000 })
      .should("be.visible")
      .click({ force: true });
  }

  verifyLoginPopupIsDisplayed() {
    cy.get(this.loginPanel, { timeout: 10000 })
      .should("have.class", "active");
  }

  verifyLoginPopupIsNotDisplayed() {
    cy.get(this.loginPanel)
      .should("not.have.class", "active");
  }

  verifyAllRequiredLoginElements() {
  cy.get(this.emailInput)
    .should("exist");

  cy.get(this.passwordInput)
    .should("exist");

  cy.get(this.rememberMeCheckbox)
    .should("exist");

  cy.get(this.forgotPasswordLink)
    .should("exist");

  cy.get(this.loginButton)
    .should("exist");

  cy.get(this.signUpButton)
    .should("exist");
}

login(email, password) {
  cy.get(this.emailInput)
    .should("exist")
    .clear()
    .type(email);

  cy.get(this.passwordInput)
    .should("exist")
    .clear()
    .type(password);

  cy.get(this.loginButton)
    .should("exist")
    .click({ force: true });
}

enterEmail(email) {
  cy.get(this.emailInput)
    .should("exist")
    .clear({ force: true })
    .type(email, { force: true });
}

enterPassword(password) {
  cy.get(this.passwordInput)
    .should("exist")
    .clear({ force: true })
    .type(password, { force: true });
}

clickLogin() {
  cy.get(this.loginButton, { timeout: 10000 })
    .should("exist")
    .click({ force: true });

  cy.get(this.loginAvatarTrigger, { timeout: 15000 })
    .should("be.visible");

  cy.log("Login işlemi tamamlandı.");
}





}

export default new LoginPage();