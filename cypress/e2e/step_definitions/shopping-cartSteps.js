import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import ShoppingCartPage from "../pages/ShoppingCartPage";
import HomePage from "../pages/HomePage";


const shoppingCartPage = new ShoppingCartPage();
const homePage = new HomePage();

Given("the user has a product in the shopping cart", () => {
  cy.visit("/odysseia-92427");
  
  cy.get("body").then(($body) => {
    if (
      $body.find("button").filter(":contains('Tümünü Kabul Et')").length > 0
    ) {
      cy.contains("button", "Tümünü Kabul Et").click({ force: true });
    }
  });

  cy.get("body").then(($body) => {
    if ($body.find("#t-modal-close-1").length > 0) {
      cy.get("#t-modal-close-1").click({ force: true });
    }
  });

  cy.get("#addToCartBtn", { timeout: 10000 })
    .should("be.visible")
    .and("not.be.disabled")
    .click();
  cy.contains("a", "Sepete Git", { timeout: 10000 })
    .should("exist");
});

Given("the user is on the Cart page", () => {
  shoppingCartPage.goToCart();
});

Given("the user is on the Product Details page", () => {
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

  cy.get("#addToCartBtn", { timeout: 10000 })
    .should("be.visible")
    .and("not.be.disabled");
});



When("the user clicks the shopping cart icon", () => {
  shoppingCartPage.openCartPanel();
});

When('the user clicks the "Sepete Git" button', () => {
  cy.contains("a", "Sepete Git", { timeout: 10000 })
    .click({ force: true });
  cy.url().should("include", "/sepet");
});

When("the user reviews the Cart Summary section", () => {
  cy.url().should("include", "/sepet");
});

Then('the "Sepetim" side panel should be displayed', () => {
  cy.get('[id^="header-cart-panel-"]')
    .should("have.class", "active")
    .and("contain.text", "Sepetim");
});

Then(
  'the "Grand Total" should not differ from the displayed product prices',
  () => {
    shoppingCartPage.verifyGrandTotal();
  }
);

Then(
  "the Cart Summary should display correct subtotal shipping fee and grand total",
  () => {
    shoppingCartPage.verifyCartSummary();
  }
);

Then(
  "the Cart Summary should not display incorrect calculations",
  () => {
    shoppingCartPage.verifyCartSummary();
  }
);

Then(
  "the product quantity should increase by 1 and totals should be updated correctly",
  () => {
    shoppingCartPage.increaseProductQuantity();
  }
);

Then(
  "the product quantity should not remain unchanged and totals should update correctly",
  () => {
    shoppingCartPage.verifyQuantityIncreaseDoesNotFail();
  }
);

Then('the user should be able to access the Cart page', () => {
  shoppingCartPage.goToCart();
});

Then(
  "the Cart page should display the correct product information",
  () => {
    shoppingCartPage.verifyProductDetails();
  }
);

Then(
  "the Cart page should not display missing or incorrect product information",
  () => {
    shoppingCartPage.verifyNoMissingProductInformation();
  }
);


Then(
  "the selected product should be removed from the cart after confirming deletion",
  () => {
    shoppingCartPage.removeProductFromCart();
  }
);


When(/^the user clicks the Delete \(Trash\) icon$/, () => {
  shoppingCartPage.clickDeleteIcon();
});


Then("the deletion confirmation dialog should be displayed", () => {
  cy.get(".t-popconfirm", {
    timeout: 10000
  })
    .should("exist")
    .and("contain.text", "Silmek istediğinize emin misiniz?");
});


When("the user clicks the Delete button in the confirmation dialog", () => {
  shoppingCartPage.confirmDeleteProduct();
});


Then(
  "the deleted product should no longer be displayed and the Cart Summary should be updated",
  () => {
    shoppingCartPage.verifyDeletedProductAndUpdatedTotals();
  }
);


Then(
  'the "Grand Total" in the side panel should not differ from the displayed product prices',
  () => {
    shoppingCartPage.verifyGrandTotalSidePanel();
  }
);



Then('the user should not be redirected to the Cart page', () => {
  cy.url().should("not.include", "/sepet");
});


When('the user clicks the "Clear Cart" button', () => {
  shoppingCartPage.clearCart();
});

Then("the shopping cart should be empty", () => {
  shoppingCartPage.verifyCartIsEmpty();
});


Then("the empty cart page should be displayed", () => {
  shoppingCartPage.verifyEmptyCartPage();
});


When('the user clicks the "Buy Now" button', () => {
  shoppingCartPage.clickBuyNow();
});

Then("the user is redirected to the next step of the checkout process", () => {
  shoppingCartPage.verifyCheckoutPage();
});


When('the user clicks the "Go to Cart" button in the popup', () => {
  shoppingCartPage.clickGoToCartFromPopup();
});


Then("the user should be redirected to the Cart page", () => {
  shoppingCartPage.verifyCartPage();
});


When('the user clicks the "Sepete Ekle" button', () => {
  cy.get("#addToCartBtn", { timeout: 10000 })
    .should("be.visible")
    .and("not.be.disabled")
    .click();
});

Then("the confirmation popup should be displayed", () => {
  cy.get("#cart-popup-go-cart", { timeout: 10000 })
    .should("be.visible");
});



When("the user adds a product to the cart from the Home page", () => {
  cy.get(".product-item:visible")
    .first()
    .should("be.visible")
    .then(($product) => {
      cy.wrap($product)
        .find('span[title="Sepete Ekle"]')
        .should("exist")
        .click({ force: true });
    });
});








