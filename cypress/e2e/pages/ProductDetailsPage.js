import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import ProductDetailsPage from "../pages/ProductDetailsPage";

const productDetailsPage = new ProductDetailsPage();

Given("the user is on a Product Listing page", () => {
  cy.visit("/arama?q=kitap");

  cy.get(".product-detail-card", { timeout: 10000 })
    .filter(":has(.product-title)")
    .should("have.length.greaterThan", 0);
});

When("the user clicks on a product image or product name", () => {
  cy.get(".product-title")
    .first()
    .invoke("text")
    .then((productName) => {
      const selectedProduct = productName.trim();

      cy.wrap(selectedProduct).as("selectedProduct");

      cy.contains(".product-title", selectedProduct)
        .should("be.visible")
        .click();
    });
});

Then("the corresponding Product Details page should be displayed", () => {
  cy.get("@selectedProduct").then((productName) => {
    productDetailsPage.verifyProductDetailsPage(productName);
  });
});