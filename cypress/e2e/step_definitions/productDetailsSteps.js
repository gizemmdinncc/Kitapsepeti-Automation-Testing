import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("the user is on a Product Listing page", () => {
  cy.visit("/arama?q=kitap");

  cy.get("body").then(($body) => {
    if ($body.find("button").filter(":contains('Tümünü Kabul Et')").length > 0) {
      cy.contains("button", "Tümünü Kabul Et").click({ force: true });
    }
  });

  cy.get("body").then(($body) => {
    if ($body.find("#t-modal-close-1").length > 0) {
      cy.get("#t-modal-close-1").click({ force: true });
    }
  });
});

When("the user clicks on a product image or product name", () => {
  cy.get(".product-title")
    .first()
    .should("be.visible")
    .invoke("text")
    .then((productName) => {
      cy.wrap(productName.trim()).as("selectedProductName");
    });

  cy.get(".product-title")
    .first()
    .should("have.attr", "href")
    .then((href) => {
      cy.get(".product-title")
        .first()
        .click();

      cy.url({ timeout: 10000 }).should("include", href);
    });
});

Then("the corresponding Product Details page should be displayed", () => {
  cy.url().should("not.include", "/arama");
});

Then("the user should not be redirected to an incorrect Product Details page", () => {
  cy.get("@selectedProductName").then((selectedProductName) => {
    cy.url().should("not.include", "/arama");

    cy.get("#product-title", { timeout: 10000 })
      .should("exist")
      .and("be.visible")
      .invoke("text")
      .then((productTitle) => {
        expect(productTitle.trim()).to.equal(selectedProductName);
      });
  });
});




Given("the user is on a Product Details page", () => {
  cy.visit("/odysseia-92427");

  cy.get("body").then(($body) => {
    if ($body.find("button").filter(":contains('Tümünü Kabul Et')").length > 0) {
      cy.contains("button", "Tümünü Kabul Et").click({ force: true });
    }
  });

  cy.get("body").then(($body) => {
    if ($body.find("#t-modal-close-1").length > 0) {
      cy.get("#t-modal-close-1").click({ force: true });
    }
  });
});

Then("the product name should be displayed clearly", () => {
  cy.get("#product-title", { timeout: 10000 })
    .should("be.visible")
    .and("not.be.empty");
});

Then("the author information should be displayed clearly", () => {
  cy.get("#model-title", { timeout: 10000 })
    .should("be.visible")
    .and("not.be.empty");
});

Then("the publisher information should be displayed clearly", () => {
  cy.get("#brand-title", { timeout: 10000 })
    .should("be.visible")
    .and("not.be.empty");
});

Then("the product price should be displayed clearly", () => {
  cy.get(".product-price", { timeout: 10000 })
    .should("be.visible")
    .and("not.be.empty");
});




Then("the product name should not be missing or incorrect", () => {
  cy.get("#product-title", { timeout: 10000 })
    .should("be.visible")
    .invoke("text")
    .then((productName) => {
      expect(productName.trim()).to.not.equal("");
      expect(productName.trim()).to.equal("Odysseia");
    });
});

Then("the author information should not be missing or incorrect", () => {
  cy.get("#model-title", { timeout: 10000 })
    .should("be.visible")
    .invoke("text")
    .then((author) => {
      expect(author.trim()).to.not.equal("");
    });
});

Then("the publisher information should not be missing or incorrect", () => {
  cy.get("#brand-title", { timeout: 10000 })
    .should("be.visible")
    .invoke("text")
    .then((publisher) => {
      expect(publisher.trim()).to.not.equal("");
      expect(publisher.trim()).to.equal("İş Bankası Kültür Yayınları");
    });
});

Then("the product price should not be missing or incorrect", () => {
  cy.get(".product-price", { timeout: 10000 })
    .should("be.visible")
    .invoke("text")
    .then((price) => {
      expect(price.trim()).to.not.equal("");
      expect(price.trim()).to.match(/[0-9]/);
    });
});



When("the user scrolls to the Product Information section", () => {
  cy.get(".book-info-wrapper", { timeout: 10000 })
    .should("exist")
    .scrollIntoView();
});

Then("the Genre information should be displayed", () => {
  cy.contains(".book-info-title", "Türü")
    .parent()
    .find(".book-info-desc")
    .should("be.visible")
    .and("not.be.empty");
});

Then("the ISBN information should be displayed", () => {
  cy.contains(".book-info-title", "ISBN")
    .parent()
    .find(".book-info-desc")
    .should("be.visible")
    .and("not.be.empty");
});

Then("the Number of Pages information should be displayed", () => {
  cy.contains(".book-info-title", "Sayfa Sayısı")
    .parent()
    .find(".book-info-desc")
    .should("be.visible")
    .and("not.be.empty");
});

Then("the Paper Type information should be displayed", () => {
  cy.contains(".book-info-title", "Kağıt Tipi")
    .parent()
    .find(".book-info-desc")
    .should("be.visible")
    .and("not.be.empty");
});

Then("the Publication Year information should be displayed", () => {
  cy.contains(".book-info-title", "Basım Yılı")
    .parent()
    .find(".book-info-desc")
    .should("be.visible")
    .and("not.be.empty");
});





Then(
  "the product information should not contain missing or incorrect details",
  () => {
    cy.get(".book-info-wrapper")
      .should("be.visible")
      .within(() => {
        cy.contains(".book-info-title", "Türü")
          .parent()
          .find(".book-info-desc")
          .should("not.be.empty");

        cy.contains(".book-info-title", "ISBN")
          .parent()
          .find(".book-info-desc")
          .should("not.be.empty");

        cy.contains(".book-info-title", "Sayfa Sayısı")
          .parent()
          .find(".book-info-desc")
          .should("not.be.empty");

        cy.contains(".book-info-title", "Kağıt Tipi")
          .parent()
          .find(".book-info-desc")
          .should("not.be.empty");

        cy.contains(".book-info-title", "Basım Yılı")
          .parent()
          .find(".book-info-desc")
          .should("not.be.empty");
      });
  }
);




When("the user locates the product price", () => {
  cy.get(".product-price")
    .should("be.visible");
});

When("the Add to Cart button is displayed below the price", () => {
  cy.get(".product-price")
    .should("be.visible");

  cy.get("#addToCartBtn")
    .should("be.visible")
    .and("not.be.disabled");
});

When("the user clicks the Add to Cart button", () => {
  cy.get("#addToCartBtn")
    .should("be.visible")
    .and("not.be.disabled")
    .click();
});

Then("the product should be added to the shopping cart successfully", () => {
  cy.get("#addToCartBtn")
    .should("be.visible");

  cy.get("body")
    .should("contain.text", "Sepete Git");
});


Then("the product should be added to the shopping cart successfully without any errors", () => {
  cy.get("#addToCartBtn")
    .should("be.visible")
    .and("not.be.disabled");

  cy.get("body")
    .should("contain.text", "Sepete Git");
});



Then("the cart confirmation card should be displayed", () => {
  cy.get("body")
    .should("contain.text", "Sepete Git")
    .and("contain.text", "Satın Al");
});


Then("the confirmation card should contain all required elements", () => {
  cy.get("body")
    .should("contain.text", "Sepete Git")
    .and("contain.text", "Satın Al");
});




When("the user notes the current shopping cart item count", () => {
  cy.get(".cart-soft-count")
    .first()
    .should("be.visible")
    .invoke("text")
    .then((count) => {
      const initialCount = parseInt(count.trim(), 10);

      expect(initialCount).to.be.a("number");

      cy.wrap(initialCount).as("initialCartCount");
    });
});

Then("the shopping cart item count should increase by one", () => {
  cy.get("@initialCartCount").then((initialCount) => {
    const expectedCount = initialCount + 1;

    cy.get(".cart-soft-count", { timeout: 15000 })
      .should("be.visible")
      .should(($count) => {
        const actualCount = parseInt($count.first().text().trim(), 10);

        expect(actualCount).to.equal(expectedCount);
      });
  });
});