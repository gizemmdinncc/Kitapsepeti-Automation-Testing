Feature: TC03 - Product Details Page View

  Scenario: TC-POS-01 User should be redirected to the corresponding Product Details page
    Given the user is on a Product Listing page
    When the user clicks on a product image or product name
    Then the corresponding Product Details page should be displayed


  Scenario: TC-NEG-01 User should not be redirected to an incorrect Product Details page
    Given the user is on a Product Listing page
    When the user clicks on a product image or product name
    Then the user should not be redirected to an incorrect Product Details page




  Scenario: TC-POS-02 Product Details page should clearly display product information
    Given the user is on a Product Details page
    Then the product name should be displayed clearly
    And the author information should be displayed clearly
    And the publisher information should be displayed clearly
    And the product price should be displayed clearly


  Scenario: TC-NEG-02 Product Details page should not display missing or incorrect product information
    Given the user is on a Product Details page
    Then the product name should not be missing or incorrect
    And the author information should not be missing or incorrect
    And the publisher information should not be missing or incorrect
    And the product price should not be missing or incorrect




  Scenario: TC-POS-03 Product Information section should display detailed product information
    Given the user is on a Product Details page
    When the user scrolls to the Product Information section
    Then the Genre information should be displayed
    And the ISBN information should be displayed
    And the Number of Pages information should be displayed
    And the Paper Type information should be displayed
    And the Publication Year information should be displayed


Scenario: TC-NEG-03 Product Information should not contain missing or incorrect details
  Given the user is on a Product Details page
  When the user scrolls to the Product Information section
  Then the product information should not contain missing or incorrect details




Scenario: TC-POS-04 The Product Details page should display a functional "Add to Cart" button below the product price
  Given the user is on a Product Details page
  When the user locates the product price
  And the Add to Cart button is displayed below the price
  And the user clicks the Add to Cart button
  Then the product should be added to the shopping cart successfully


Scenario: TC-NEG-04 The "Add to Cart" button on the Product Details page should not be missing, disabled, or non-functional
  Given the user is on a Product Details page
  When the user locates the product price
  And the Add to Cart button is displayed below the price
  And the user clicks the Add to Cart button
  Then the product should be added to the shopping cart successfully without any errors




Scenario: TC-POS-05 After the user clicks the "Add to Cart" button, a confirmation card should be displayed
  Given the user is on a Product Details page
  When the user clicks the Add to Cart button
  Then the cart confirmation card should be displayed


  Scenario: TC-NEG-05 The confirmation card should not be displayed without the required information
  Given the user is on a Product Details page
  When the user clicks the Add to Cart button
  Then the confirmation card should contain all required elements



Scenario: TC-POS-06 The shopping cart item count should increase by one after adding a product
  Given the user is on a Product Details page
  When the user notes the current shopping cart item count
  And the user clicks the Add to Cart button
  Then the shopping cart item count should increase by one


Scenario: TC-NEG-06 The shopping cart icon item count should not remain unchanged or display an incorrect value after a product is added to the cart
  Given the user is on a Product Details page
  When the user notes the current shopping cart item count
  And the user clicks the Add to Cart button
  Then the shopping cart item count should increase by one





















