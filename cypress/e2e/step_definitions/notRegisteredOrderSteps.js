import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

import NotRegisteredOrderPage from "../pages/NotRegisteredOrderPage";

const notRegisteredOrderPage = new NotRegisteredOrderPage();



Given(
  "the user is on the Home page for unregistered checkout",
  () => {
    cy.visit("/");

    cy.url({ timeout: 15000 })
      .should("eq", "https://www.kitapsepeti.com/");

    // Cookie popup
    cy.get("body").then(($body) => {
      if ($body.find('button:contains("Tümünü Kabul Et")').length > 0) {
        cy.contains("button", "Tümünü Kabul Et")
          .click({ force: true });
      }
    });

    // Welcome popup
    cy.get("body").then(($body) => {
      if ($body.find("#t-modal-close-1").length > 0) {
        cy.get("#t-modal-close-1")
          .click({ force: true });
      }
    });

    // Wait until the homepage is ready
    cy.get("body", { timeout: 20000 })
      .should("be.visible");
  }
);


Given(
  "at least one product is available for unregistered checkout",
  () => {
    cy.get("body").should("be.visible");
  }
);




When(
  'the user clicks "Sepete Ekle" for a product',
  () => {
    notRegisteredOrderPage.clickAddToCart();
  }
);




Then(
  "the add-to-cart confirmation popup should be displayed",
  () => {
    cy.contains(
      "Ürün Başarıyla Sepete Eklendi",
      { timeout: 20000 }
    ).should("be.visible");
  }
);




When(
  'the user clicks the "Satın al" button in the popup',
  () => {
    notRegisteredOrderPage.clickBuyNow();
  }
);




Then(
  'the user should be redirected to the {string} page',
  (pageUrl) => {
    cy.url({ timeout: 20000 })
      .should("include", pageUrl);
  }
);


Then(
  "the user should not remain on the Home page",
  () => {
    cy.url({ timeout: 20000 })
      .should("not.equal", "https://www.kitapsepeti.com/");
  }
);





Given(
  "the user is on the Order Login page",
  () => {
    cy.visit("/");

    cy.url({ timeout: 15000 })
      .should("eq", "https://www.kitapsepeti.com/");

    // Cookie popup
    cy.get("body").then(($body) => {
      if ($body.find('button:contains("Tümünü Kabul Et")').length > 0) {
        cy.contains("button", "Tümünü Kabul Et")
          .click({ force: true });
      }
    });

    // Welcome popup
    cy.get("body").then(($body) => {
      if ($body.find("#t-modal-close-1").length > 0) {
        cy.get("#t-modal-close-1")
          .click({ force: true });
      }
    });

    notRegisteredOrderPage.clickAddToCart();

    notRegisteredOrderPage.clickBuyNow();

    cy.url({ timeout: 20000 })
      .should("include", "/siparis-uye-giris");
  }
);

When(
  'the user locates the "ÜYE OLMADAN DEVAM ET" button',
  () => {
    notRegisteredOrderPage.verifyGuestCheckoutButton();
  }
);

Then(
  'the "ÜYE OLMADAN DEVAM ET" button should be visible and enabled',
  () => {
    notRegisteredOrderPage.verifyGuestCheckoutButton();
  }
);

When(
  'the user clicks the "ÜYE OLMADAN DEVAM ET" button',
  () => {
    notRegisteredOrderPage.clickGuestCheckoutButton();
  }
);

Then(
  "the user should be redirected to the Address Information page",
  () => {
    notRegisteredOrderPage.verifyAddressPage();
  }
);


Then(
  "the user should not remain on the Order Login page",
  () => {
    cy.url({ timeout: 20000 })
      .should("not.include", "/siparis-uye-giris");
  }
);


Then(
  'the user should not be redirected to the Home page',
  () => {
    cy.url({ timeout: 20000 })
      .should("not.equal", "https://www.kitapsepeti.com/");
  }
);




Then(
  "the Address Information page should be displayed",
  () => {
    notRegisteredOrderPage.verifyAddressPage();
  }
);

Then(
  "the Full Name field should be displayed",
  () => {
    notRegisteredOrderPage.verifyFullNameField();
  }
);

Then(
  "the Email field should be displayed",
  () => {
    notRegisteredOrderPage.verifyEmailField();
  }
);

Then(
  "the Mobile Phone field should be displayed",
  () => {
    notRegisteredOrderPage.verifyMobilePhoneField();
  }
);

Then(
  "the City field should be displayed",
  () => {
    notRegisteredOrderPage.verifyCityField();
  }
);

Then(
  "the District field should be displayed",
  () => {
    notRegisteredOrderPage.verifyDistrictField();
  }
);

Then(
  "the Neighborhood field should be displayed",
  () => {
    notRegisteredOrderPage.verifyNeighborhoodField();
  }
);

Then(
  "the Address field should be displayed",
  () => {
    notRegisteredOrderPage.verifyAddressField();
  }
);



When(
  'the user leaves the Full Name field empty',
  () => {
    notRegisteredOrderPage.verifyFullNameField();
  }
);

When(
  'the user clicks the "Adresi Kaydet" button',
  () => {
    cy.contains("button", "Adresi Kaydet", { timeout: 20000 })
      .should("be.visible")
      .click({ force: true });
  }
);

Then(
  "the user should remain on the Address Information page",
  () => {
    cy.url({ timeout: 20000 })
      .should("include", "/order/");
  }
);


When(
  "the user fills in all required address fields except the Full Name field",
  () => {
    cy.get('input[name="email"]')
      .filter(":visible")
      .first()
      .invoke("val", "leyla.test@gmail.com")
      .trigger("input")
      .trigger("change");

    cy.get("#mobile_phone")
      .filter(":visible")
      .first()
      .clear()
      .type("5555555555");

    cy.get("#city_code")
      .filter(":visible")
      .first()
      .select("İstanbul");

    cy.get("#town_code", { timeout: 10000 })
      .filter(":visible")
      .first()
      .should("not.be.disabled")
      .select(1);

    cy.get("#district_code", { timeout: 10000 })
      .filter(":visible")
      .first()
      .should("not.be.disabled")
      .select(1);

    cy.get("#address")
      .filter(":visible")
      .first()
      .clear()
      .type("Ataturk Mahallesi Istanbul Sokak No 15");
  }
);

Then(
  'the validation message "Lütfen bu alanı doldurunuz." should be displayed for the Full Name field',
  () => {
    cy.get("#fullname", { timeout: 20000 })
      .should("be.visible")
      .closest(".popover-wrapper")
      .invoke("text")
      .should("include", "Lütfen bu alanı doldurunuz");
  }
);


When(
  "the user fills in all required address fields except the Email field",
  () => {
    cy.get("#fullname")
      .filter(":visible")
      .first()
      .type("Leyla Test Kullanici");

    cy.get("#mobile_phone")
      .filter(":visible")
      .first()
      .type("5555555555");

    cy.get("#city_code")
      .filter(":visible")
      .first()
      .select("İstanbul");

    cy.get("#town_code", { timeout: 10000 })
      .filter(":visible")
      .first()
      .should("not.be.disabled")
      .select(1);

    cy.get("#district_code", { timeout: 10000 })
      .filter(":visible")
      .first()
      .should("not.be.disabled")
      .select(1);

    cy.get("#address")
      .filter(":visible")
      .first()
      .type("Ataturk Mahallesi Istanbul Sokak No 15");
  }
);



When(
  "the user fills in all required address fields with valid information",
  () => {
    cy.get("#fullname")
      .filter(":visible")
      .first()
      .clear()
      .type("Leyla Test Kullanici");

    cy.get('input[name="email"]')
      .filter(":visible")
      .first()
      .clear()
      .type("leyla.test@gmail.com");

    cy.get("#mobile_phone")
      .filter(":visible")
      .first()
      .clear()
      .type("5555555555");

    cy.get("#city_code")
      .filter(":visible")
      .first()
      .select("İstanbul");

    cy.get("#town_code", { timeout: 10000 })
      .filter(":visible")
      .first()
      .should("not.be.disabled")
      .select(1);

    cy.get("#district_code", { timeout: 10000 })
      .filter(":visible")
      .first()
      .should("not.be.disabled")
      .select(1);

    cy.get("#address")
      .filter(":visible")
      .first()
      .clear()
      .type("Ataturk Mahallesi Istanbul Sokak No 15");
  }
);

Then(
  "the user should be redirected to the Payment Options page",
  () => {
    cy.url({ timeout: 20000 })
      .should("include", "/order/");

    cy.contains("Ödeme Bilgileri", { timeout: 20000 })
      .should("be.visible");
  }
);



When(
  "the user fills in all required address fields except the Mobile Phone field",
  () => {
    cy.get("#fullname")
      .filter(":visible")
      .first()
      .type("Leyla Test Kullanici");

    cy.get('input[name="email"]')
      .filter(":visible")
      .first()
      .type("leyla.test@gmail.com");

    // Mobile Phone intentionally left empty

    cy.get("#city_code")
      .filter(":visible")
      .first()
      .select("İstanbul");

    cy.get("#town_code", { timeout: 10000 })
      .filter(":visible")
      .first()
      .should("not.be.disabled")
      .select(1);

    cy.get("#district_code", { timeout: 10000 })
      .filter(":visible")
      .first()
      .should("not.be.disabled")
      .select(1);

    cy.get("#address")
      .filter(":visible")
      .first()
      .type("Ataturk Mahallesi Istanbul Sokak No 15");
  }
);