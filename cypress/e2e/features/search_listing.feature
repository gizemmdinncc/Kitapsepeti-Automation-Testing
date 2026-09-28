Feature: Search and Listing functionality

  Scenario: TC-POS-01 - The User should be able to search for products by entering at least one character

    Given the user is on the Home page
    And the search bar is visible and enabled
    When the user clicks on the search bar
    And the user enters "S" into the search bar
    And the user presses Enter or clicks the Search icon
    Then the search request should be submitted successfully
    And products matching the entered character should be displayed

  Scenario: TC-NEG-01- The user should not be able to search without entering any character
    Given the user is on the Home page
    When the user clicks the search button without entering any text
    Then the user should remain on the Home page 




  Scenario: TC-POS-02 - The user should be redirected to the Search Results page after performing a search
    Given the user is on the Home page
    And the search bar is visible and enabled
    When the user clicks on the search bar
    And the user enters "Patina – Parkur Serisi 2" into the search bar
    And the user presses Enter or clicks the Search icon
    Then the search request should be submitted successfully
    And the user should be redirected to the Search Results page
    And products matching the entered character should be displayed
    And the search field should be cleared


  Scenario: TC-NEG-02 - The user should not be shown unrelated products on the Search Results page after performing a search
    Given the user is on the Home page
    And the search bar is visible and enabled
    When the user clicks on the search bar
    And the user enters "Patina – Parkur Serisi 2" into the search bar
    And the user presses Enter or clicks the Search icon
    Then the search request should be submitted successfully
    And the search field should not retain the previously entered search term






  Scenario: TC-POS-03 - The user should not display any matching products after searching with a non-existent keyword
    Given the user is on the Home page
    And the search bar is visible and enabled
    When the user clicks on the search bar
    And the user enters "asdfqwert" into the search bar
    And the user presses Enter or clicks the Search icon
    Then the search request should be submitted successfully
    And no matching products should be displayed


  Scenario: TC-NEG-03 - The system should not display any matching products after the user searches with a non-existent keyword
    Given the user is on the Home page
    And the search bar is visible and enabled
    When the user clicks on the search bar
    And the user enters "asdfqwert" into the search bar
    And the user presses Enter or clicks the Search icon
    Then the search request should be submitted successfully
    And no matching products should be displayed





  Scenario: TC-POS-04 - Each product card on the Product Listing page should display the product image, product name, publisher, and price
    Given the user is on the Home page
    And the search bar is visible and enabled
    When the user clicks on the search bar
    And the user enters "Patina – Parkur Serisi 2" into the search bar
    And the user presses Enter or clicks the Search icon
    Then each product card should display the product image, product name, publisher, and price


  Scenario: TC-NEG-04 - A product card should not be displayed with missing product information such as the product image, product name, publisher, or price
    Given the user is on the Home page
    And the search bar is visible and enabled
    When the user clicks on the search bar
    And the user enters "Patina – Parkur Serisi 2" into the search bar
    And the user presses Enter or clicks the Search icon
    Then each product card should display the product image, product name, publisher, and price




Scenario: TC-POS-05 - The user should be able to add a product to the shopping cart by clicking the "Add to Cart" button after hovering over the product price
    Given the user is on the Home page
    And the search bar is visible and enabled
    When the user searches for "Patina – Parkur Serisi 2"
    And the user hovers over the product price and clicks the Add to Cart button
    Then the selected product should be added to the shopping cart successfully


Scenario: TC-NEG-05 - Add to Cart button should not be visible before hovering over the product price
    Given the user is on the Home page
    And the search bar is visible and enabled
    When the user searches for "Patina – Parkur Serisi 2"
    And the user hovers over the product price and clicks the Add to Cart button
    Then the Add to Cart button should not be visible before hovering over the product price




Scenario: TC-POS-06 - The sorting menu should display all sorting options
  Given the user is on the Home page
  And the search bar is visible and enabled
  When the user searches for "Patina – Parkur Serisi 2"
  Then the sorting options should be displayed


Scenario: TC-NEG-06 - The Sort menu should not display missing, incorrect, or unexpected sorting options
  Given the user is on the Home page
  And the search bar is visible and enabled
  When the user searches for "Patina – Parkur Serisi 2"
  Then the sorting menu should contain only the expected options




Scenario: TC-POS-07 - The user should be able to apply Categories, Brand, and Model filters
  Given the user is on the Home page
  And the search bar is visible and enabled
  When the user searches for "Patina – Parkur Serisi 2"
  And the user selects a category from the Categories filter
  And the user selects "Domingo Yayınevi" from the Brand filter
  And the user selects "Jason Reynolds" from the Model filter
  And the user clicks the "Seçimi Filtrele" button
  Then the filtered search results should be displayed


Scenario: TC-NEG-07 - Empty product cards should not be displayed
  Given the user is on the Home page
  When the user searches for "Patina"
  Then empty product cards should not be displayed





Scenario: TC-POS-08 User should be able to select a predefined category from the Home page

  Given the user is on the Home page
  When the user clicks on the BİLİM KURGU category
  Then the BİLİM KURGU category page should be displayed
  And products belonging to the selected category should be displayed


Scenario: TC-NEG-08 System should not display products from a different category or an incorrect category title
  Given the user is on the Home page
  When the user clicks on the BİLİM KURGU category
  Then the selected category title should match the clicked category
  And the category title should not be incorrect or missing
  And only products belonging to the selected category should be displayed





Scenario: TC-POS-09 User should be able to load the next page of products by scrolling down
  Given the user is on the Search Results page
  When the user scrolls down to the bottom of the Search Results page
  Then the next page of products should be loaded automatically
  And additional products should be displayed


Scenario: TC-NEG-09 The system should not display duplicate products when the next page is loaded
  Given the user is on the Search Results page
  When the user scrolls down to the bottom of the Search Results page
  Then the next page of products should be loaded automatically
  And duplicate products should not be displayed















































