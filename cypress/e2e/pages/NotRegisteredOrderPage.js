class NotRegisteredOrderPage {

  addToCartButton = "#addToCartBtn";
  buyNowButton = "#cart-popup-continue-shopping";

  clickAddToCart() {
    cy.get("body", { timeout: 20000 }).then(($body) => {

      if ($body.find("#addToCartBtn").length > 0) {

        cy.get("#addToCartBtn", { timeout: 15000 })
          .first()
          .click({ force: true });

      } else {

        cy.contains("Sepete Ekle", { timeout: 15000 })
          .first()
          .click({ force: true });

      }

    });
  }

  clickBuyNow() {
    cy.get(this.buyNowButton, { timeout: 20000 })
      .click({ force: true });
  }

  verifyGuestCheckoutButton() {
    cy.contains("button", "Üye Olmadan Devam Et", { timeout: 20000 })
      .should("exist")
      .and("be.visible")
      .and("not.be.disabled");
  }

  clickGuestCheckoutButton() {
    cy.contains("button", "Üye Olmadan Devam Et", { timeout: 20000 })
      .should("be.visible")
      .click({ force: true });
  }

  verifyAddressPage() {
    cy.url({ timeout: 20000 })
      .should("include", "/order/");

    cy.contains("Adres Bilgileri", { timeout: 20000 })
      .should("be.visible");
  }

  

  verifyFullNameField() {
    cy.get("#fullname", { timeout: 20000 })
      .should("exist")
      .and("be.visible");
  }

  verifyEmailField() {
    cy.get('input[name="email"]', { timeout: 20000 })
      .should("exist")
      .and("be.visible");
  }

  verifyMobilePhoneField() {
    cy.get("#mobile_phone", { timeout: 20000 })
      .should("exist")
      .and("be.visible");
  }

  verifyCityField() {
    cy.get("#city_code", { timeout: 20000 })
      .should("exist")
      .and("be.visible");
  }

  verifyDistrictField() {
    cy.get("#town", { timeout: 20000 })
      .should("exist")
      .and("be.visible");
  }

  verifyNeighborhoodField() {
    cy.get("#district", { timeout: 20000 })
      .should("exist")
      .and("be.visible");
  }

  verifyAddressField() {
    cy.get("#address", { timeout: 20000 })
      .should("exist")
      .and("be.visible");
  }

}

export default NotRegisteredOrderPage;






