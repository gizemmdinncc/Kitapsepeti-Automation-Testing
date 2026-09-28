Feature: TC04 - Shopping Cart Management & Control

  Scenario: TC-POS-01 User should be able to open the "Sepetim" side panel
    Given the user has a product in the shopping cart
    When the user clicks the shopping cart icon
    Then the "Sepetim" side panel should be displayed

Scenario: TC-NEG-01 - User should not be redirected to the Cart page when opening the side panel
  Given the user has a product in the shopping cart
  When the user clicks the shopping cart icon
  Then the "Sepetim" side panel should be displayed
  And the user should not be redirected to the Cart page



Scenario: TC-POS-02 - Cart page should display correct product information
  Given the user has a product in the shopping cart
  When the user clicks the shopping cart icon
  And the user clicks the "Sepete Git" button
  Then the Cart page should display the correct product information

Scenario: TC-NEG-02 - Cart page should not display incorrect or missing product information
  Given the user has a product in the shopping cart
  When the user clicks the shopping cart icon
  And the user clicks the "Sepete Git" button
  Then the Cart page should not display missing or incorrect product information



Scenario: TC-POS-03 - Verify Cart Summary calculations
  Given the user has a product in the shopping cart
  And the user is on the Cart page
  When the user reviews the Cart Summary section
  Then the Cart Summary should display correct subtotal shipping fee and grand total


Scenario: TC04-NEG-03 - Cart Summary should not display incorrect calculations
  Given the user has a product in the shopping cart
  And the user is on the Cart page
  When the user reviews the Cart Summary section
  Then the Cart Summary should not display incorrect calculations



Scenario: TC-POS-04 - Increase product quantity from Cart page
  Given the user has a product in the shopping cart
  And the user is on the Cart page
  Then the product quantity should increase by 1 and totals should be updated correctly


Scenario: TC-NEG-04 - Clicking the "+" button should not fail to update quantity and totals
  Given the user has a product in the shopping cart
  And the user is on the Cart page
  Then the product quantity should not remain unchanged and totals should update correctly




Scenario: TC-POS-05 - Remove a product from the shopping cart
  Given the user has a product in the shopping cart
  And the user is on the Cart page
  Then the selected product should be removed from the cart after confirming deletion


Scenario: TC-NEG-05 - The selected product should not remain in the shopping cart after the user confirms the deletion
  Given the user has a product in the shopping cart
  And the user is on the Cart page
  When the user clicks the Delete (Trash) icon
  Then the deletion confirmation dialog should be displayed
  When the user clicks the Delete button in the confirmation dialog
  Then the deleted product should no longer be displayed and the Cart Summary should be updated




Scenario: TC-POS-06 - User should be able to remove all products from the shopping cart by clicking the "Clear Cart" button
  Given the user has a product in the shopping cart
  And the user is on the Cart page
  When the user clicks the "Clear Cart" button
  Then the shopping cart should be empty


Scenario: TC-NEG-06 - Clicking the "Clear Cart" button should not leave any products in the shopping cart or display incorrect cart totals
  Given the user has a product in the shopping cart
  And the user is on the Cart page
  When the user clicks the "Clear Cart" button
  Then the shopping cart should be empty




Scenario: TC-POS-07 - When all products are removed from the shopping cart, the page should be updated to display the empty cart message along with a "Continue Shopping" button
  Given the user has a product in the shopping cart
  And the user is on the Cart page
  When the user clicks the "Clear Cart" button
  Then the empty cart page should be displayed


Scenario: TC-NEG-07 - After all products are removed from the shopping cart, the page should not continue displaying deleted products or fail to show the empty cart message and the "Continue Shopping" button
  Given the user has a product in the shopping cart
  And the user is on the Cart page
  When the user clicks the "Clear Cart" button
  Then the empty cart page should be displayed




Scenario: TC-POS-08 - When the shopping cart contains at least one product, a clickable "Buy Now" button should be displayed and should navigate the user to the next step of the checkout process
  Given the user has a product in the shopping cart
  And the user is on the Cart page
  When the user clicks the "Buy Now" button
  Then the user is redirected to the next step of the checkout process


Scenario: TC-NEG-08 - The "Satın Al" button should not be missing, disabled, or fail to navigate the user to the next checkout step when the shopping cart contains at least one product
  Given the user has a product in the shopping cart
  And the user is on the Cart page
  When the user clicks the "Buy Now" button
  Then the user is redirected to the next step of the checkout process




Scenario: TC-POS-09 - The user should be able to navigate to the Cart page by clicking the "Sepete Git" button in the confirmation popup after adding a product to the cart from the Product Details page
  Given the user is on the Product Details page
  When the user clicks the "Sepete Ekle" button
  Then the confirmation popup should be displayed
  When the user clicks the "Go to Cart" button in the popup
  Then the user should be redirected to the Cart page


Scenario: TC-NEG-09 - The user should not be prevented from navigating to the Cart page after clicking the "Go to Cart" button in the confirmation popup
  Given the user is on the Product Details page
  When the user clicks the "Sepete Ekle" button
  Then the confirmation popup should be displayed
  When the user clicks the "Go to Cart" button in the popup
  Then the user should be redirected to the Cart page




Scenario: TC-POS-10 - The user should be able to navigate to the Cart page by clicking the "Sepete Git" button in the confirmation popup after adding a product to the cart from the Home page
  Given the user is on the Home page
  When the user adds a product to the cart from the Home page
  Then the confirmation popup should be displayed
  When the user clicks the "Go to Cart" button in the popup
  Then the user should be redirected to the Cart page


Scenario: TC-NEG-10 - The user should not be prevented from navigating to the Cart page after clicking the "Sepete Git" button in the confirmation popup displayed on the Home page
  Given the user is on the Home page
  When the user adds a product to the cart from the Home page
  Then the confirmation popup should be displayed
  When the user clicks the "Go to Cart" button in the popup
  Then the user should be redirected to the Cart page

















