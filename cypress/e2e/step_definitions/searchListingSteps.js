import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import HomePage from "../pages/HomePage";

const homePage = new HomePage();

Given("the user is on the Home page", () => {
  cy.visit("/");
  homePage.acceptCookies();
  homePage.closeWelcomePopup();
});

Given("the search bar is visible and enabled", () => {
  homePage.verifySearchBarIsVisible();
});

When("the user clicks on the search bar", () => {
  homePage.clickSearchBar();
});

When("the user enters {string} into the search bar", (searchText) => {
  homePage.enterSearchText(searchText);
});

When("the user presses Enter or clicks the Search icon", () => {
  homePage.submitSearch();
});

When("the user searches for {string}", (searchText) => {
  homePage.clickSearchBar();
  homePage.enterSearchText(searchText);
  homePage.submitSearch();

  cy.get(".product-detail-card")
    .filter("\:has(.product-title)")
    .should("have.length.greaterThan", 0);
});

Then("the search request should be submitted successfully", () => {
  cy.url().should("include", "/arama?q");
  cy.url().should("include", "q=");
});

Then("products matching the entered character should be displayed", () => {
  homePage.verifySearchResults();
});



When("the user clicks the search button without entering any text", () => {
  homePage.submitSearch();
});

Then("the user should remain on the Home page", () => {
  cy.url().should("eq", "https://www.kitapsepeti.com/");
});



Then("the user should be redirected to the Search Results page", () => {
  cy.url().should("include", "/arama?q=");
});

Then("the search field should be cleared", () => {
  homePage.verifySearchFieldIsCleared();
});



Then("the search field should not retain the previously entered search term", () => {
  homePage.verifySearchFieldIsCleared();
});



Then("no matching products should be displayed", () => {
  homePage.verifyNoProductsFound();
});




Then(
  "each product card should display the product image, product name, publisher, and price",
  () => {
    homePage.verifyProductCardInformation();
  }
);



When(
  'the user hovers over the product price and clicks the Add to Cart button',
  () => {
    cy.get(".product-item")
      .filter('\:has(.product-title\:contains("Patina – Parkur Serisi 2"))')
      .first()
      .trigger("mouseover", { force: true });

    cy.wait(500);

    cy.get(".product-item")
      .filter('\:has(.product-title\:contains("Patina – Parkur Serisi 2"))')
      .first()
      .find(".add-to-cart-btn")
      .should("exist")
      .click({ force: true });
  }
);

Then("the user clicks the add to cart button", () => {
  homePage.hoverOverPriceAndAddToCart("Patina – Parkur Serisi 2");
});

Then("the selected product should be added to the shopping cart successfully", () => {
  homePage.verifyAddToCartPopup();
});



Then(
  "the Add to Cart button should not be visible before hovering over the product price",
  () => {
    homePage.verifyAddToCartHiddenBeforeHover();
  }
);



Then("the sorting options should be displayed", () => {
  cy.get("#sort", { timeout: 10000 })
    .should("exist")
    .find("option")
    .then(($options) => {
      const actualOptions = [...$options].map((option) =>
        option.textContent.trim()
      );

      const expectedOptions = [
        "Yeniden Eskiye",
        "Eskiden Yeniye",
        "Fiyat Artan",
        "Fiyat Azalan",
        "Varsayılan Sıralama",
      ];

      expect(actualOptions).to.deep.equal(expectedOptions);
    });
});



Then("the sorting menu should contain only the expected options", () => {
  cy.get("#sort", { timeout: 10000 })
    .should("exist")
    .find("option")
    .then(($options) => {
      const actualOptions = [...$options].map((option) =>
        option.textContent.trim()
      );

      const expectedOptions = [
        "Yeniden Eskiye",
        "Eskiden Yeniye",
        "Fiyat Artan",
        "Fiyat Azalan",
        "Varsayılan Sıralama",
      ];

      expect(actualOptions).to.deep.equal(expectedOptions);
    });
});



When("the user selects a category from the Categories filter", () => {
  cy.get("#accordion-categories-361", { timeout: 10000 })
    .should("be.visible");

  cy.get("#filter-categories-505", { timeout: 10000 })
    .should("be.visible")
    .click();
});

When('the user selects "Domingo Yayınevi" from the Brand filter', () => {
  cy.get('[data-filter-search="filter-search-brand"]', { timeout: 10000 })
    .should("exist")
    .find('li[data-title="Domingo Yayınevi"]')
    .find("label")
    .should("be.visible")
    .click();
});

When('the user selects "Jason Reynolds" from the Model filter', () => {
  cy.get('[data-filter-search="filter-search-model"]', { timeout: 10000 })
    .should("exist")
    .find('li[data-title="Jason Reynolds"]')
    .find("label")
    .should("be.visible")
    .click();
});

When('the user clicks the "Seçimi Filtrele" button', () => {
  cy.contains("button", "Seçimi Filtrele")
    .should("be.visible")
    .click();
});

Then("the filtered search results should be displayed", () => {
  cy.get(".product-detail-card", { timeout: 10000 })
    .filter(":has(.product-title)")
    .should("have.length.greaterThan", 0);
});



Then("empty product cards should not be displayed", () => {
  cy.get(".product-detail-card", { timeout: 10000 })
    .filter(":has(.product-title)")
    .each(($card) => {
      cy.wrap($card)
        .find(".product-title")
        .should("not.be.empty");
    });
});


When("the user clicks on the BİLİM KURGU category", () => {
  cy.get("#menu-12322", { timeout: 10000 })
    .should("be.visible")
    .click();
});

Then("the BİLİM KURGU category page should be displayed", () => {
  cy.url().should("include", "/bilimkurgu");
});

Then("products belonging to the selected category should be displayed", () => {
  cy.get(".product-detail-card", { timeout: 10000 })
    .filter(":has(.product-title)")
    .should("have.length.greaterThan", 0);
});




Then("the selected category title should match the clicked category", () => {
  cy.url().should("include", "/bilimkurgu");

  cy.get(".category-name", { timeout: 10000 })
    .should("be.visible")
    .and("not.be.empty")
    .and("contain.text", "Bilimkurgu");
});

Then("the category title should not be incorrect or missing", () => {
  cy.get(".category-name", { timeout: 10000 })
    .should("be.visible")
    .and("not.be.empty")
    .and("contain.text", "Bilimkurgu");
});

Then("only products belonging to the selected category should be displayed", () => {
  cy.get(".product-detail-card", { timeout: 10000 })
    .filter(":has(.product-title)")
    .should("have.length.greaterThan", 0);

  cy.get(".product-detail-card")
    .filter(":has(.product-title)")
    .each(($card) => {
      cy.wrap($card)
        .find(".product-title")
        .should("be.visible")
        .and("not.be.empty");
    });
});





Given("the user is on the Search Results page", () => {
  cy.visit("/arama?q=kitap");

  cy.get(".product-detail-card", { timeout: 10000 })
    .filter(":has(.product-title)")
    .should("have.length.greaterThan", 0);
});

When("the user scrolls down to the bottom of the Search Results page", () => {
  cy.intercept(
    "GET",
    "**/srv/service/content-v5/product-loader/**"
  ).as("productLoader");

  cy.scrollTo("bottom", { duration: 1000 });
});

Then("the next page of products should be loaded automatically", () => {
  cy.wait("@productLoader", { timeout: 15000 })
    .its("response.statusCode")
    .should("eq", 200);
});

Then("additional products should be displayed", () => {
  cy.get(".product-detail-card", { timeout: 15000 })
    .filter(":has(.product-title)")
    .should("have.length.greaterThan", 0);
});




Then("duplicate products should not be displayed", () => {
  cy.get(".product-title", { timeout: 15000 })
    .should("have.length.greaterThan", 0)
    .then(($products) => {
      const productNames = [...$products].map((product) =>
        product.textContent.trim()
      );

      const uniqueProductNames = [...new Set(productNames)];

      expect(productNames.length).to.equal(uniqueProductNames.length);
    });
});