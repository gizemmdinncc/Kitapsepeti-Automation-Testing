import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

import GuestCheckoutPage from "../pages/GuestCheckoutPage";
import LoginPage from "../pages/LoginPage";

const guestCheckoutPage = new GuestCheckoutPage();




Given("the user is logged in", () => {
  cy.log("User is logged in");
});


Given("the user is logged in and has a saved address", () => {

  cy.visit("/");

  // Cookie popup
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


  LoginPage.openLoginPopup();

  LoginPage.enterEmail(
    Cypress.env("TEST_EMAIL")
  );

  LoginPage.enterPassword(
    Cypress.env("TEST_PASSWORD")
  );

  LoginPage.clickLogin();

  cy.log("Kullanıcı başarıyla giriş yaptı.");

});




Given("the user is on the Cart page for guest checkout", () => {

  cy.visit("/sepet");

  cy.url({ timeout: 10000 })
    .should("include", "/sepet");

});




Given(
  "the user has a product in the shopping cart for guest checkout",
  () => {

    cy.get("body").then(($body) => {

      // Sepette ürün yoksa ürün ekle
      if ($body.find("#cart-buy-btn").length === 0) {

        cy.visit("/odysseia-92427");

        cy.get("body").then(($productPage) => {

          if ($productPage.find("#add-to-cart").length > 0) {

            cy.get("#add-to-cart", {
              timeout: 15000
            })
              .should("be.visible")
              .click({ force: true });

            cy.wait(2000);

          } else {

            cy.contains("Sepete Ekle", {
              timeout: 15000
            })
              .should("be.visible")
              .click({ force: true });

            cy.wait(2000);

          }

        });

      }

    });


    cy.contains("Ürün Başarıyla Sepete Eklendi", {
      timeout: 20000
    })
      .should("be.visible");

    cy.get("#cart-popup-go-cart", {
      timeout: 20000
    })
      .should("be.visible")
      .click({ force: true });

    cy.url({ timeout: 20000 })
      .should("include", "/sepet");

    cy.get("#cart-buy-btn", {
      timeout: 20000
    })
      .should("exist")
      .and("be.visible");
  }
);




When(
  'the user clicks the "Buy Now" button for checkout',
  () => {

    guestCheckoutPage.clickBuyNow();


    

    cy.get("#ug-email", {
      timeout: 30000
    })
      .should("be.visible")
      .clear()
      .type(Cypress.env("TEST_EMAIL"));


    cy.get("#ug-password", {
      timeout: 30000
    })
      .should("be.visible")
      .clear()
      .type(Cypress.env("TEST_PASSWORD"));


    cy.get("#ug-submit-btn", {
      timeout: 30000
    })
      .should("be.visible")
      .click({ force: true });

  }
);




Given(
  "the user is on the Address Information page",
  () => {

    guestCheckoutPage.verifyAddressInformationPage();

  }
);


Then(
  'the "Address Information" page should be displayed',
  () => {

    guestCheckoutPage.verifyAddressInformationPage();

  }
);




Given(
  "a valid delivery address is selected",
  () => {

    guestCheckoutPage.verifyValidDeliveryAddressSelected();

  }
);




When(
  'the user clicks the "Proceed to Payment" button',
  () => {

    guestCheckoutPage.clickProceedToPayment();

  }
);




Given(
  "the user is on the Payment Information page for guest checkout",
  () => {

    guestCheckoutPage.verifyPaymentInformationPage();

  }
);


Then(
  'the "Payment Information" page should be displayed',
  () => {

    guestCheckoutPage.verifyPaymentInformationPage();

  }
);




Then(
  "the available shipping options should be displayed",
  () => {

    guestCheckoutPage.verifyShippingOptions();

  }
);




Then(
  "the payment options should be displayed",
  () => {

    guestCheckoutPage.verifyPaymentOptions();

  }
);




Then(
  "the card payment form should be displayed",
  () => {

    guestCheckoutPage.verifyCardPaymentForm();

  }
);




Then(
  'the "Pay" button should become active',
  () => {

    guestCheckoutPage.verifyPaymentButtonBecomesActive();

  }
);




Given(
  "the user has a product in the shopping cart for POS-07",
  () => {

    // Login stepinden sonra burada ürün sayfasına git
    cy.visit("/odysseia-92427");

    cy.url({ timeout: 15000 })
      .should("include", "/odysseia-92427");


    // Ürünü sepete ekle
    cy.get("body").then(($productPage) => {

      if ($productPage.find("#add-to-cart").length > 0) {

        cy.get("#add-to-cart", {
          timeout: 15000
        })
          .should("be.visible")
          .click({ force: true });

      } else {

        cy.contains("Sepete Ekle", {
          timeout: 15000
        })
          .should("be.visible")
          .click({ force: true });

      }

    });


    cy.wait(2000);


    // Sepete ekleme popup'ı geldiyse Sepete Git
    cy.get("body").then(($body) => {

      if ($body.find("#cart-popup-go-cart").length > 0) {

        cy.get("#cart-popup-go-cart", {
          timeout: 10000
        })
          .should("be.visible")
          .click({ force: true });

      } else {

        // Popup yoksa direkt sepete git
        cy.visit("/sepet");

      }

    });


    cy.url({ timeout: 20000 })
      .should("include", "/sepet");


    // Satın Al butonu kesinlikle görünmeli
    cy.get("#cart-buy-btn", {
      timeout: 20000
    })
      .should("exist")
      .and("be.visible");

  }
);




Then(
  "validation errors should be displayed for empty payment fields",
  () => {

    guestCheckoutPage.verifyEmptyPaymentFieldsValidation();

  }
);




Then(
  "the Order Summary should display the correct grand total",
  () => {

    guestCheckoutPage.verifyOrderSummaryAndGrandTotal();

  }
);









When(
  'the user clicks the "Buy Now" button for NEG-01',
  () => {

    guestCheckoutPage.clickBuyNow();

  }
);


Then(
  "an error message should be displayed for empty card fields in NEG-01",
  () => {

    cy.get("#iyz-tab-credit-card", {
      timeout: 20000
    })
      .should("be.visible")
      .click({ force: true });

    cy.get("#ccname", {
      timeout: 20000
    })
      .should("be.visible")
      .clear();

    cy.get("#ccnumber")
      .should("be.visible")
      .clear();

    cy.get("#ccexp")
      .should("be.visible")
      .clear();

    cy.get("#cccvc")
      .should("be.visible")
      .clear();

    cy.get("#iyz-payment-button", {
      timeout: 20000
    })
      .should("be.visible")
      .click({ force: true });

    cy.contains(
      ".css-1khyw0c-ErrorMessageWrapper",
      "Lütfen tüm alanları doldurunuz",
      {
        timeout: 10000
      }
    )
      .should("be.visible");

  }
);


When(
  'the user clicks the "Buy Now" button for NEG-02',
  () => {
    guestCheckoutPage.clickBuyNow();
  }
);

Then(
  "the payment should not be processed when the card number is empty",
  () => {
    cy.get("#iyz-tab-credit-card", { timeout: 20000 })
      .should("be.visible")
      .click({ force: true });

    cy.get("#ccname", { timeout: 20000 })
      .should("be.visible")
      .clear()
      .type("Test User");

    cy.get("#ccnumber", { timeout: 20000 })
      .should("be.visible")
      .clear();

    cy.get("#ccexp", { timeout: 20000 })
      .should("be.visible")
      .clear()
      .type("12/30");

    cy.get("#cccvc", { timeout: 20000 })
      .should("be.visible")
      .clear()
      .type("123");

    cy.get("#iyz-payment-button", { timeout: 20000 })
      .should("be.visible")
      .click({ force: true });

    cy.get("#ccnumber")
      .closest(".iyz-input-holder")
      .should("have.class", "iyz-input-error");
  }
);



When(
  'the user clicks the "Buy Now" button for NEG-03',
  () => {
    guestCheckoutPage.clickBuyNow();
  }
);

Then(
  "the payment should not be processed when the CVV is empty",
  () => {
    cy.get("#iyz-tab-credit-card", { timeout: 20000 })
      .should("be.visible")
      .click({ force: true });

    cy.get("#ccname", { timeout: 20000 })
      .should("be.visible")
      .clear()
      .type("Test User");

    cy.get("#ccnumber", { timeout: 20000 })
      .should("be.visible")
      .clear()
      .type("5528790000000008");

    cy.get("#ccexp", { timeout: 20000 })
      .should("be.visible")
      .clear()
      .type("12/30");

    cy.get("#cccvc", { timeout: 20000 })
      .should("be.visible")
      .clear();

    cy.get("#iyz-payment-button", { timeout: 20000 })
      .should("be.visible")
      .click({ force: true });

    cy.get("#cccvc")
      .closest(".iyz-input-holder")
      .should("have.class", "iyz-input-error");
  }
);


When(
  'the user clicks the "Buy Now" button for NEG-04',
  () => {
    guestCheckoutPage.clickBuyNow();
  }
);

Then(
  "the payment should not be processed when the expiry date is empty",
  () => {
    cy.get("#iyz-tab-credit-card", { timeout: 20000 })
      .should("be.visible")
      .click({ force: true });

    cy.get("#ccname", { timeout: 20000 })
      .should("be.visible")
      .clear()
      .type("Test User");

    cy.get("#ccnumber", { timeout: 20000 })
      .should("be.visible")
      .clear()
      .type("5528790000000008");

    cy.get("#ccexp", { timeout: 20000 })
      .should("be.visible")
      .clear();

    cy.get("#cccvc", { timeout: 20000 })
      .should("be.visible")
      .clear()
      .type("123");

    cy.get("#iyz-payment-button", { timeout: 20000 })
      .should("be.visible")
      .click({ force: true });

    cy.get("#ccexp")
      .closest(".iyz-input-holder")
      .should("have.class", "iyz-input-error");
  }
);



When(
  'the user clicks the "Buy Now" button for NEG-05',
  () => {
    guestCheckoutPage.clickBuyNow();
  }
);

Then(
  "the payment should not be processed when the cardholder name is empty",
  () => {
    cy.get("#iyz-tab-credit-card", { timeout: 20000 })
      .should("be.visible")
      .click({ force: true });

    cy.get("#ccname", { timeout: 20000 })
      .should("be.visible")
      .clear();

    cy.get("#ccnumber", { timeout: 20000 })
      .should("be.visible")
      .clear()
      .type("5528790000000008");

    cy.get("#ccexp", { timeout: 20000 })
      .should("be.visible")
      .clear()
      .type("12/30");

    cy.get("#cccvc", { timeout: 20000 })
      .should("be.visible")
      .clear()
      .type("123");

    cy.get("#iyz-payment-button", { timeout: 20000 })
      .should("be.visible")
      .click({ force: true });

    cy.get("#ccname")
      .closest(".iyz-input-holder")
      .should("have.class", "iyz-input-error");
  }
);




When(
  'the user clicks the "Buy Now" button for NEG-06',
  () => {
    guestCheckoutPage.clickBuyNow();
  }
);

Then(
  "the payment should not be processed with an invalid CVV",
  () => {
    cy.get("#iyz-tab-credit-card", { timeout: 20000 })
      .should("be.visible")
      .click({ force: true });

    cy.get("#ccname", { timeout: 20000 })
      .should("be.visible")
      .clear()
      .type("Test User");

    cy.get("#ccnumber", { timeout: 20000 })
      .should("be.visible")
      .clear()
      .type("5528790000000008");

    cy.get("#ccexp", { timeout: 20000 })
      .should("be.visible")
      .clear()
      .type("12/30");

    cy.get("#cccvc", { timeout: 20000 })
      .should("be.visible")
      .clear()
      .type("12");

    cy.get("#iyz-payment-button", { timeout: 20000 })
      .should("be.visible")
      .click({ force: true });

    cy.get("#cccvc")
      .closest(".iyz-input-holder")
      .should("have.class", "iyz-input-error");
  }
);



When(
  'the user clicks the "Buy Now" button for NEG-07',
  () => {
    guestCheckoutPage.clickBuyNow();
  }
);

Then(
  "the payment should not be processed with an invalid expiry date",
  () => {
    cy.get("#iyz-tab-credit-card", { timeout: 30000 })
      .should("exist")
      .and("be.visible")
      .click({ force: true });

    cy.get("#ccname", { timeout: 20000 })
      .should("be.visible")
      .clear()
      .type("Test User");

    cy.get("#ccnumber", { timeout: 20000 })
      .should("be.visible")
      .clear()
      .type("5528790000000008");

    cy.get("#ccexp", { timeout: 20000 })
      .should("be.visible")
      .clear()
      .type("13/25");

    cy.get("#cccvc", { timeout: 20000 })
      .should("be.visible")
      .clear()
      .type("123");

    cy.get("#iyz-payment-button", { timeout: 20000 })
      .should("be.visible")
      .click({ force: true });

    cy.get("#ccexp", { timeout: 10000 })
      .closest(".iyz-input-holder")
      .should("have.class", "iyz-input-error");
  }
);



When(
  'the user clicks the "Buy Now" button for NEG-08',
  () => {
    guestCheckoutPage.clickBuyNow();
  }
);

Then(
  "the payment should not be processed with an invalid card number",
  () => {
    cy.get("#iyz-tab-credit-card", { timeout: 30000 })
      .should("exist")
      .and("be.visible")
      .click({ force: true });

    cy.get("#ccname", { timeout: 20000 })
      .should("be.visible")
      .clear()
      .type("Test User");

    cy.get("#ccnumber", { timeout: 20000 })
      .should("be.visible")
      .clear()
      .type("1234");

    cy.get("#ccexp", { timeout: 20000 })
      .should("be.visible")
      .clear()
      .type("12/30");

    cy.get("#cccvc", { timeout: 20000 })
      .should("be.visible")
      .clear()
      .type("123");

    cy.get("#iyz-payment-button", { timeout: 20000 })
      .should("be.visible")
      .click({ force: true });

    cy.get("#ccnumber", { timeout: 10000 })
      .closest(".iyz-input-holder")
      .should("have.class", "iyz-input-error");
  }
);