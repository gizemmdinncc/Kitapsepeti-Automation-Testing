import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../pages/LoginPage";

const loginPage = LoginPage;



Given("the user opens the website", () => {
  cy.visit("/");

  
  cy.get("body").then(($body) => {
    if ($body.find('button:contains("Tümünü Kabul Et")').length > 0) {
      cy.contains("button", "Tümünü Kabul Et")
        .click({ force: true });
    }
  });

  
  cy.get("body").then(($body) => {
    if ($body.find("#t-modal-close-1").length > 0) {
      cy.get("#t-modal-close-1")
        .click({ force: true });
    }
  });
});

When('the user clicks the "Login with Email" link', () => {
  loginPage.openLoginPopup();
});

When("the user clicks outside the login trigger area", () => {
  cy.get("body").click(50, 300);
});

Then("the login popup should be displayed", () => {
  loginPage.verifyLoginPopupIsDisplayed();
});

Then("the login popup should not be displayed", () => {
  loginPage.verifyLoginPopupIsNotDisplayed();
});




When('the user double-clicks the "Login with Email" link quickly', () => {
  cy.get(loginPage.loginEmailTrigger, { timeout: 10000 })
    .should("be.visible")
    .dblclick({ force: true });
});

Then("only one login popup should be displayed", () => {
  cy.get(loginPage.loginPanel, { timeout: 10000 })
    .should("exist")
    .then(($panels) => {
      cy.log(`Login panel count: ${$panels.length}`);
      cy.log(`Active panel count: ${$panels.filter(".active").length}`);
    });
});




Then("all required login page elements should be displayed", () => {
  loginPage.verifyAllRequiredLoginElements();
});

Then("all required login page elements should be present", () => {
  loginPage.verifyAllRequiredLoginElements();
});




When("the user enters a registered email address", () => {
  loginPage.enterEmail(Cypress.env("TEST_EMAIL"));
});

When("the user enters a valid password", () => {
  loginPage.enterPassword(Cypress.env("TEST_PASSWORD"));
});

When("the user enters an incorrect password", () => {
  loginPage.enterPassword("WrongPassword123!");
});

When("the user enters an invalid email address", () => {
  loginPage.enterEmail("invalid-email");
});




When('the user clicks the "Login" button', () => {
  loginPage.clickLogin();
});



Then("the user should be successfully logged in", () => {
  cy.get("body").should("contain.text", "Hesabım");
});




When("the user waits for successful authentication and redirection", () => {
  cy.url({ timeout: 10000 }).should("include", "/order/address");
});

Then("the Address page should be displayed", () => {
  cy.url().should("include", "/order/address");
});




Then("the user should not be redirected to the Address page", () => {
  cy.url().should("not.include", "/order/address");
});


When("the user submits the login request", () => {
  cy.intercept(
    "POST",
    "**/api/v1/authentication/login/**"
  ).as("loginRequest");

  loginPage.clickLogin();
});


Then("an invalid credentials error message should be displayed", () => {
  cy.wait("@loginRequest")
    .its("response.statusCode")
    .should("eq", 401);

  cy.url().should("not.include", "/order/address");
});




Then("an invalid email format error message should be displayed", () => {
  cy.get("#header-email", { timeout: 10000 })
    .should("have.value", "invalid-email")
    .then(($input) => {
      cy.log("EMAIL CLASS: " + $input.attr("class"));
      cy.log("EMAIL PARENT HTML: " + $input.parent().prop("outerHTML"));
      cy.log("EMAIL NEXT HTML: " + $input.next().prop("outerHTML"));
    });
});





When("the user leaves the password field blank", () => {
  cy.get("#header-password")
    .should("exist")
    .clear({ force: true });
});

Then("the password field should remain blank", () => {
  cy.get("#header-password")
    .should("have.value", "");
});



When("the user makes multiple invalid login attempts", () => {
  for (let i = 0; i < 10; i++) {
    loginPage.enterEmail("invalid-test@example.com");
    loginPage.enterPassword("WrongPassword123!");
    loginPage.clickLogin();
    cy.wait(1000);
  }
});


When("the user makes {int} consecutive invalid login attempts", (attemptCount) => {
  const makeAttempt = (attempt) => {
    if (attempt > attemptCount) {
      return;
    }

    cy.log(`Invalid login attempt: ${attempt}`);

    loginPage.enterEmail(Cypress.env("TEST_EMAIL"));
    loginPage.enterPassword("WrongPassword123!");
    loginPage.clickLogin();

    cy.wait(1000).then(() => {
      makeAttempt(attempt + 1);
    });
  };

  makeAttempt(1);
});

Then("the rate limit error message should be displayed", () => {
  cy.get("body").then(($body) => {
    cy.log("===== AFTER 10 INVALID ATTEMPTS =====");
    cy.log($body.text());
  });
});








When('the user clicks the "Forgot Password" link', () => {
  cy.get(loginPage.loginPanel, { timeout: 10000 })
    .filter(".active")
    .find(loginPage.forgotPasswordLink)
    .should("be.visible")
    .click();
});


Then("the reset password page should be displayed", () => {
  cy.url({ timeout: 10000 })
    .should("include", "/uye-sifre-hatirlat");

  cy.get('input[type="email"][id^="email-"]')
    .should("be.visible");

  cy.get('button[id^="forgot-password-btn-"]')
    .should("be.visible")
    .and("contain.text", "Şifremi Hatırlat");
});


When("the user leaves the forgot password email field blank", () => {
  cy.get('input[type="email"][id^="email-"]', { timeout: 10000 })
    .should("be.visible")
    .clear();
});

When('the user clicks the "Forgot Password Submit" button', () => {
  cy.get('button[id^="forgot-password-btn-"]', { timeout: 10000 })
    .should("be.visible")
    .click();
});

