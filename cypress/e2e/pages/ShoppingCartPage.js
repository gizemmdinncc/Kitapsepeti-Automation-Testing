
class ShoppingCartPage {
  cartIcon = ".custom-cart";
  cartPanel = '[id^="header-cart-panel-"]';


  openCartPanel() {
    cy.get(this.cartIcon)
      .should("exist")
      .click({ force: true });


    cy.get(this.cartPanel)
      .filter(".active")
      .first()
      .should("exist");
  }


  verifyGrandTotal() {
    cy.get(".cart-price-box")
      .should("exist")
      .should("be.visible");


    cy.get(".cart-price-box")
      .find(".row")
      .should("have.length.at.least", 3)
      .then(($rows) => {


        let subtotal;
        let shippingFee;
        let grandTotal;


        $rows.each((index, row) => {


          const label = Cypress.$(row)
            .find(".col-6")
            .first()
            .text()
            .trim();


          const priceText = Cypress.$(row)
            .find(".text-right")
            .text()
            .trim();


          if (label === "Sepet Toplamı") {
            subtotal =
              this.parseTurkishPrice(priceText);
          }


          if (label === "Kargo Ücreti") {
            shippingFee =
              this.parseTurkishPrice(priceText);
          }


          if (label === "Genel Toplam") {
            grandTotal =
              this.parseTurkishPrice(priceText);
          }
        });


        expect(subtotal).to.not.be.NaN;
        expect(shippingFee).to.not.be.NaN;
        expect(grandTotal).to.not.be.NaN;


        expect(grandTotal).to.equal(
          subtotal + shippingFee
        );
      });
  }


  verifyCartSummary() {
    let calculatedSubtotal = 0;


    cy.get(".cart-item")
      .should("have.length.at.least", 1);


    cy.get(".cart-item .col-4 .price-sell")
      .should("have.length.at.least", 1);


    cy.get(".cart-item .col-4 .price-sell")
      .then(($prices) => {


        $prices.each((index, element) => {


          const productTotalText =
            Cypress.$(element)
              .text()
              .trim();


          const productTotal =
            this.parseTurkishPrice(productTotalText);


          expect(productTotal).to.not.be.NaN;


          calculatedSubtotal += productTotal;
        });


        cy.wrap(calculatedSubtotal)
          .as("calculatedSubtotal");
      });


    cy.get(".cart-price-box")
      .should("be.visible");


    cy.get(".cart-price-box")
      .find(".row")
      .then(($rows) => {


        let displayedSubtotal;
        let shippingFee;
        let grandTotal;


        $rows.each((index, row) => {


          const rowText =
            Cypress.$(row)
              .find(".col-6")
              .first()
              .text()
              .trim();


          const priceText =
            Cypress.$(row)
              .find(".text-right")
              .text()
              .trim();


          if (rowText === "Sepet Toplamı") {
            displayedSubtotal =
              this.parseTurkishPrice(priceText);
          }


          if (rowText === "Kargo Ücreti") {
            shippingFee =
              this.parseTurkishPrice(priceText);
          }


          if (rowText === "Genel Toplam") {
            grandTotal =
              this.parseTurkishPrice(priceText);
          }
        });


        expect(displayedSubtotal).to.not.be.NaN;
        expect(shippingFee).to.not.be.NaN;
        expect(grandTotal).to.not.be.NaN;


        cy.get("@calculatedSubtotal")
          .then((calculatedSubtotal) => {


            expect(displayedSubtotal).to.equal(
              calculatedSubtotal
            );


            expect(grandTotal).to.equal(
              displayedSubtotal + shippingFee
            );
          });
      });
  }


  increaseProductQuantity() {
    cy.get(".cart-item-qty input")
      .first()
      .should("exist")
      .invoke("val")
      .then((quantityText) => {


        const currentQuantity =
          Number(quantityText);


        expect(currentQuantity).to.be.at.least(1);


        cy.wrap(currentQuantity)
          .as("oldQuantity");
      });


    cy.get(".cart-item-price-wrapper .price-sell")
      .first()
      .should("exist")
      .invoke("text")
      .then((priceText) => {


        const unitPrice =
          this.parseTurkishPrice(priceText);


        expect(unitPrice).to.not.be.NaN;


        cy.wrap(unitPrice)
          .as("unitPrice");
      });


    cy.get(".cart-item-qty .ti-plus")
      .first()
      .should("exist")
      .click({ force: true });


    cy.get("@oldQuantity")
      .then((oldQuantity) => {


        const expectedQuantity =
          Number(oldQuantity) + 1;


        cy.get(".cart-item-qty input")
          .should("exist")
          .should(
            "have.value",
            String(expectedQuantity)
          );


        cy.get("@unitPrice")
          .then((unitPrice) => {


            const expectedProductTotal =
              unitPrice * expectedQuantity;


            cy.get(".cart-item .col-4 .price-sell")
              .should("exist")
              .should(($prices) => {


                const updatedProductTotal =
                  this.parseTurkishPrice(
                    $prices.first().text().trim()
                  );


                expect(updatedProductTotal)
                  .to.equal(expectedProductTotal);
              });


            cy.get(".cart-price-box")
              .should("be.visible");


            cy.get(".cart-price-box .row")
              .then(($rows) => {


                let displayedSubtotal;
                let shippingFee;
                let grandTotal;


                $rows.each((index, row) => {


                  const rowText =
                    Cypress.$(row)
                      .find(".col-6")
                      .first()
                      .text()
                      .trim();


                  const priceText =
                    Cypress.$(row)
                      .find(".text-right")
                      .text()
                      .trim();


                  if (rowText === "Sepet Toplamı") {
                    displayedSubtotal =
                      this.parseTurkishPrice(priceText);
                  }


                  if (rowText === "Kargo Ücreti") {
                    shippingFee =
                      this.parseTurkishPrice(priceText);
                  }


                  if (rowText === "Genel Toplam") {
                    grandTotal =
                      this.parseTurkishPrice(priceText);
                  }
                });


                expect(displayedSubtotal)
                  .to.equal(expectedProductTotal);


                expect(grandTotal)
                  .to.equal(
                    displayedSubtotal + shippingFee
                  );
              });
          });
      });
  }


  verifyQuantityIncreaseDoesNotFail() {
    cy.get(".cart-item-qty input")
      .first()
      .should("exist")
      .invoke("val")
      .then((quantityText) => {


        const oldQuantity =
          Number(quantityText);


        expect(oldQuantity).to.be.at.least(1);


        cy.wrap(oldQuantity)
          .as("oldQuantity");
      });


    cy.get(".cart-item-price-wrapper .price-sell")
      .first()
      .should("exist")
      .invoke("text")
      .then((priceText) => {


        const unitPrice =
          this.parseTurkishPrice(priceText);


        expect(unitPrice).to.not.be.NaN;


        cy.wrap(unitPrice)
          .as("unitPrice");
      });


    cy.get(".cart-item-qty .ti-plus")
      .first()
      .should("exist")
      .click({ force: true });


    cy.get("@oldQuantity")
      .then((oldQuantity) => {


        const expectedQuantity =
          Number(oldQuantity) + 1;


        cy.get(".cart-item-qty input")
          .should("exist")
          .should(
            "have.value",
            String(expectedQuantity)
          );


        cy.get("@unitPrice")
          .then((unitPrice) => {


            const expectedProductTotal =
              unitPrice * expectedQuantity;


            cy.get(".cart-item .col-4 .price-sell")
              .should("exist")
              .should(($prices) => {


                const updatedProductTotal =
                  this.parseTurkishPrice(
                    $prices.first().text().trim()
                  );


                expect(updatedProductTotal)
                  .to.equal(expectedProductTotal);
              });


            cy.get(".cart-price-box")
              .should("be.visible");


            cy.get(".cart-price-box .row")
              .then(($rows) => {


                let displayedSubtotal;
                let shippingFee;
                let grandTotal;


                $rows.each((index, row) => {


                  const rowText =
                    Cypress.$(row)
                      .find(".col-6")
                      .first()
                      .text()
                      .trim();


                  const priceText =
                    Cypress.$(row)
                      .find(".text-right")
                      .text()
                      .trim();


                  if (rowText === "Sepet Toplamı") {
                    displayedSubtotal =
                      this.parseTurkishPrice(priceText);
                  }


                  if (rowText === "Kargo Ücreti") {
                    shippingFee =
                      this.parseTurkishPrice(priceText);
                  }


                  if (rowText === "Genel Toplam") {
                    grandTotal =
                      this.parseTurkishPrice(priceText);
                  }
                });


                expect(displayedSubtotal)
                  .to.equal(expectedProductTotal);


                expect(grandTotal)
                  .to.equal(
                    displayedSubtotal + shippingFee
                  );
              });
          });
      });
  }


  removeProductFromCart() {
    cy.get(".cart-item")
      .first()
      .should("exist")
      .then(($item) => {


        const deleteButtonId =
          $item
            .find(".cart-item-delete")
            .attr("id");


        expect(deleteButtonId).to.exist;


        cy.get(`#${deleteButtonId}`)
          .should("be.visible")
          .click({ force: true });
      });


    cy.get(".t-popconfirm")
      .should("exist");


    cy.get(".t-popconfirm-cancel-btn")
      .should("exist")
      .and("not.be.disabled")
      .click({ force: true });


    cy.get(".t-popconfirm")
      .should("not.exist");


    cy.get(".cart-item-delete")
      .should("not.exist");
  }


  clickDeleteIcon() {
    cy.get(".cart-item")
      .first()
      .should("exist")
      .then(($item) => {


        const deleteButtonId =
          $item
            .find(".cart-item-delete")
            .attr("id");


        expect(deleteButtonId).to.exist;


        cy.get(`#${deleteButtonId}`)
          .should("exist")
          .click({ force: true });
      });
  }


  confirmDeleteProduct() {
    cy.get(".t-popconfirm-cancel-btn", {
      timeout: 10000
    })
      .should("exist")
      .click({ force: true });


    cy.get(".t-popconfirm")
      .should("not.exist");
  }


  verifyDeletedProductAndUpdatedTotals() {
    cy.get(".cart-item-delete")
      .should("not.exist");


    cy.get(".cart-item")
      .should("not.exist");


    cy.get(".cart-price-box")
      .should("not.exist");
  }


  goToCart() {
    cy.contains("a", "Sepete Git", {
      timeout: 10000
    })
      .should("exist")
      .click({ force: true });


    cy.url().should("include", "/sepet");
  }


  verifyProductDetails() {
    cy.get(".cart-item")
      .should("exist")
      .first()
      .within(() => {


        cy.get(".cart-item-title")
          .should("be.visible")
          .and("not.be.empty");


        cy.get(".cart-item-qty input")
          .should("be.visible")
          .and("have.value", "1");


        cy.get(".cart-item-price-wrapper .price-sell")
          .should("be.visible")
          .and("not.be.empty");


        cy.get(".col-4 .price-sell")
          .should("be.visible")
          .and("not.be.empty");
      });
  }


  verifyNoMissingProductInformation() {
    cy.get(".cart-item")
      .should("exist")
      .first()
      .within(() => {


        cy.get(".cart-item-title")
          .should("exist")
          .and("not.be.empty");


        cy.get(".cart-item-qty input")
          .should("exist")
          .and("have.value", "1");


        cy.get(".cart-item-price-wrapper .price-sell")
          .should("exist")
          .and("not.be.empty");


        cy.get(".col-4 .price-sell")
          .should("exist")
          .and("not.be.empty");
      });
  }

clearCart() {
  cy.get('a[id^="clear-cart-btn-"]', { timeout: 10000 })
    .should("exist")
    .should("be.visible")
    .click({ force: true });
}

verifyCartIsEmpty() {
  cy.contains("p", "Sepetinizde Ürün Bulunmamaktadır")
    .should("be.visible");
}

  verifyEmptyCartPage() {
    cy.contains("p", "Sepetinizde Ürün Bulunmamaktadır", {
      timeout: 10000
    })
      .should("be.visible");

    cy.get("#cart-back-btn", {
      timeout: 10000
    })
      .should("be.visible")
      .and("contain.text", "Alışverişe Devam Et")
      .and("not.be.disabled");
  }


  clickBuyNow() {
  cy.url().should("include", "/sepet");

  cy.get("#cart-buy-btn", {
    timeout: 15000
  })
    .should("exist")
    .should("be.visible")
    .click({ force: true });
}

  verifyCheckoutPage() {
  cy.url().should("include", "/siparis-uye-giris");
}


  clickGoToCartFromPopup() {
    cy.get("#cart-popup-go-cart", {
      timeout: 10000
    })
      .should("be.visible")
      .and("not.be.disabled")
      .click({ force: true });
  }

  verifyCartPage() {
    cy.url().should("include", "/sepet");
  }


hoverOverPriceAndAddToCart(productName) {
  cy.intercept("POST", "**/cart/add-to-cart")
    .as("addToCartRequest");

  cy.contains(".product-item", productName)
    .first()
    .should("be.visible")
    .within(() => {
      cy.get('span[title="Sepete Ekle"]')
        .should("exist")
        .click({ force: true });
    });

  cy.wait("@addToCartRequest")
    .its("response.statusCode")
    .should("eq", 200);
}



  parseTurkishPrice(text) {
    return parseFloat(
      text
        .replace("TL", "")
        .trim()
        .replace(/\./g, "")
        .replace(",", ".")
    );
  }
}



export default ShoppingCartPage;























