class HomePage {

  searchInput = "#live-search";
  productTitle = ".product-title";

  productImage = ".image-wrapper img";
  publisher = ".brand-title";

  productCard = ".product-detail-card";
  productPrice = ".product-price";

  acceptCookies() {
    cy.contains("button", "Tümünü Kabul Et").click();
  }

  closeWelcomePopup() {
    cy.get("body").then(($body) => {
      if ($body.find("#t-modal-close-1").length > 0) {
        cy.get("#t-modal-close-1").click({ force: true });
        cy.wait(500);
      }
    });
  }

  verifySearchBarIsVisible() {
    cy.get(this.searchInput)
      .should("be.visible")
      .and("be.enabled");
  }

  clickSearchBar() {
    cy.get(this.searchInput).click();
  }

  enterSearchText(searchText) {
    cy.get(this.searchInput).type(searchText);
  }

  submitSearch() {
    cy.get(this.searchInput).type("{enter}");
  }

  verifySearchResults() {
    cy.get(this.productTitle)
      .should("be.visible")
      .and("have.length.greaterThan", 0);
  }

  verifySearchFieldIsCleared() {
    cy.get(this.searchInput)
      .should("have.value", "");
  }

  verifyNoProductsFound() {
    cy.get(this.productTitle)
      .should("not.exist");
  }

  verifyProductName(productName) {
    cy.get(this.productCard)
      .filter(":has(.product-title)")
      .first()
      .find(".product-title")
      .should("contain.text", productName);
  }

  verifyProductCardInformation() {
    cy.get(this.productImage)
      .should("be.visible")
      .and("have.attr", "src");

    cy.get(this.productTitle)
      .should("be.visible")
      .and("not.be.empty");

    cy.get(this.publisher)
      .should("be.visible")
      .and("not.be.empty");

    cy.get(this.productPrice)
      .should("be.visible")
      .and("not.be.empty");
  }

  verifyAddToCartHiddenBeforeHover() {
    cy.get(this.productCard)
      .filter(":has(.product-title)")
      .first()
      .within(() => {
        cy.get('span[title="Sepete Ekle"]')
          .should("not.be.visible");
      });
  }

 hoverOverProductPrice() {
  cy.get(this.productCard)
    .filter(":has(.product-title)")
    .first()
    .find('[class*="price"]')
    .first()
    .trigger("mouseover", { force: true });
}

  verifyAddToCartVisibleAndClickable() {
    cy.get(this.productCard)
      .filter(":has(.product-title)")
      .first()
      .within(() => {
        cy.get('span[title="Sepete Ekle"]')
          .should("be.visible")
          .and("not.be.disabled");
      });
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

  verifyAddToCartPopup() {
  cy.get("#modal-popup-cart", { timeout: 10000 })
    .should("exist")
    .and("have.class", "fade-in");

  cy.get("#cart-popup-go-cart", { timeout: 10000 })
    .should("exist")
    .and("be.visible");
}


clickScienceFictionCategory() {
  cy.get("#mobile-menu-12322", { timeout: 10000 })
    .should("be.visible")
    .click();
}

verifyScienceFictionCategoryPage() {
  cy.url().should("include", "/bilimkurgu");

  cy.get("h1", { timeout: 10000 })
    .should("be.visible")
    .and("contain.text", "Bilimkurgu");
}

}

export default HomePage;