class GuestCheckoutPage {


  buyNowButton = "#cart-buy-btn";


  

  clickBuyNow() {

    cy.get(this.buyNowButton, { timeout: 15000 })
      .should("exist")
      .should("be.visible")
      .and("not.be.disabled")
      .click({ force: true });

  }


  

  verifyAddressInformationPage() {

    cy.get("#order-nav", { timeout: 20000 })
      .should("be.visible")
      .and("contain.text", "Adres Bilgileri");

  }


 

  verifyValidDeliveryAddressSelected() {

    cy.get(".address-box.active", { timeout: 15000 })
      .should("exist");

    cy.get('input[name="delivery_address"]', { timeout: 15000 })
      .should("exist");

  }


  

  clickProceedToPayment() {

    cy.contains(
      "span",
      "Ödeme Adımına Geç",
      { timeout: 15000 }
    )
      .should("be.visible")
      .click({ force: true });

  }


  

  verifyPaymentInformationPage() {

    cy.get("#order-nav", { timeout: 20000 })
      .should("be.visible")
      .and("contain.text", "Ödeme Bilgileri");

    cy.get(".payment-cargo-list", { timeout: 20000 })
      .should("be.visible");

  }


  

  verifyShippingOptions() {

    cy.get(".payment-cargo-list", {
      timeout: 20000
    })
      .should("be.visible");


    cy.contains(".cargo-option-item", "BİRGÜNDE KARGO", {
      timeout: 20000
    })
      .should("be.visible")
      .should("have.class", "active");


    cy.contains(".cargo-option-item", "HEPSİJET", {
      timeout: 20000
    })
      .should("be.visible");


    cy.contains(".cargo-option-item", "PTT Kargo", {
      timeout: 20000
    })
      .should("be.visible");

  }




  verifyPaymentOptions() {

    cy.get(".payment-type-list", {
      timeout: 20000
    })
      .should("be.visible");


    cy.get("#iyz-tab-payWithIyzico", {
      timeout: 20000
    })
      .should("be.visible");


    cy.get("#iyz-tab-credit-card", {
      timeout: 20000
    })
      .should("be.visible")
      .and("contain.text", "Kartla Ödeme");

  }


  
  verifyCardPaymentForm() {

    cy.get("#iyz-tab-credit-card", {
      timeout: 20000
    })
      .should("be.visible")
      .click({ force: true });


    cy.get("#ccname", {
      timeout: 20000
    })
      .should("be.visible");


    cy.get("#ccnumber", {
      timeout: 20000
    })
      .should("be.visible");


    cy.get("#ccexp", {
      timeout: 20000
    })
      .should("be.visible");


    cy.get("#cccvc", {
      timeout: 20000
    })
      .should("be.visible");

  }


  

  verifyPaymentButtonBecomesActive() {

    cy.get("#iyz-tab-credit-card", {
      timeout: 20000
    })
      .should("be.visible")
      .click({ force: true });


    cy.get("#ccname", {
      timeout: 20000
    })
      .should("be.visible")
      .clear()
      .type("Test User");


    cy.get("#ccnumber", {
      timeout: 20000
    })
      .should("be.visible")
      .clear()
      .type("5528790000000008");


    cy.get("#ccexp", {
      timeout: 20000
    })
      .should("be.visible")
      .clear()
      .type("12/30");


    cy.get("#cccvc", {
      timeout: 20000
    })
      .should("be.visible")
      .clear()
      .type("123");


    cy.get("#iyz-payment-button", {
      timeout: 20000
    })
      .should("be.visible")
      .and("not.be.disabled");

  }


  

  verifyEmptyPaymentFieldsValidation() {

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


    cy.get("#ccnumber", {
      timeout: 20000
    })
      .should("be.visible")
      .clear();


    cy.get("#ccexp", {
      timeout: 20000
    })
      .should("be.visible")
      .clear();


    cy.get("#cccvc", {
      timeout: 20000
    })
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


    cy.get("#ccname")
      .closest(".iyz-input-holder")
      .should("have.class", "iyz-input-error");


    cy.get("#ccnumber")
      .closest(".iyz-input-holder")
      .should("have.class", "iyz-input-error");


    cy.get("#ccexp")
      .closest(".iyz-input-holder")
      .should("have.class", "iyz-input-error");


    cy.get("#cccvc")
      .closest(".iyz-input-holder")
      .should("have.class", "iyz-input-error");

  }



verifyOrderSummaryAndGrandTotal() {

  cy.get("#order-summary", {
    timeout: 20000
  })
    .should("be.visible");


  cy.get("#order-summary")
    .contains("div", "Genel Toplam")
    .closest(".d-flex")
    .within(() => {

      cy.get("> div")
        .eq(1)
        .invoke("text")
        .then((grandTotalText) => {

          const grandTotal = parseFloat(
            grandTotalText
              .replace("TL", "")
              .replace(/\./g, "")
              .replace(",", ".")
              .trim()
          );

          expect(grandTotal).to.be.greaterThan(0);

        });

    });


  cy.get("#order-summary")
    .contains("div", "Sepet Toplamı")
    .closest(".d-flex")
    .find("> div")
    .eq(1)
    .invoke("text")
    .then((cartTotalText) => {

      const cartTotal = parseFloat(
        cartTotalText
          .replace("TL", "")
          .replace(/\./g, "")
          .replace(",", ".")
          .trim()
      );


      cy.get("#order-summary")
        .contains("div", "Kargo Ücreti")
        .closest(".d-flex")
        .find("> div")
        .eq(1)
        .invoke("text")
        .then((shippingText) => {

          const shippingTotal = parseFloat(
            shippingText
              .replace("TL", "")
              .replace(/\./g, "")
              .replace(",", ".")
              .trim()
          );


          cy.get("#order-summary")
            .contains("div", "Genel Toplam")
            .closest(".d-flex")
            .find("> div")
            .eq(1)
            .invoke("text")
            .then((grandTotalText) => {

              const grandTotal = parseFloat(
                grandTotalText
                  .replace("TL", "")
                  .replace(/\./g, "")
                  .replace(",", ".")
                  .trim()
              );


              expect(grandTotal).to.equal(
                cartTotal + shippingTotal
              );

            });

        });

    });

}




}


export default GuestCheckoutPage;