Feature: Order Without Registering

  Scenario: TC06-POS-01 - The user should be redirected to the "/siparis-uye-giris" page after clicking "Satın al"

    Given the user is on the Home page for unregistered checkout
    And at least one product is available for unregistered checkout
    When the user clicks "Sepete Ekle" for a product
    Then the add-to-cart confirmation popup should be displayed
    When the user clicks the "Satın al" button in the popup
    Then the user should be redirected to the "/siparis-uye-giris" page


  Scenario: TC06-NEG-01 - The user should not remain on the Home page after clicking "Satın Al"

    Given the user is on the Home page for unregistered checkout
    And at least one product is available for unregistered checkout
    When the user clicks "Sepete Ekle" for a product
    Then the add-to-cart confirmation popup should be displayed
    When the user clicks the "Satın al" button in the popup
    Then the user should not remain on the Home page


  Scenario: TC06-POS-02 - The Order Login page should clearly display a "Continue Without Membership" button

    Given the user is on the Order Login page
    When the user locates the "ÜYE OLMADAN DEVAM ET" button
    Then the "ÜYE OLMADAN DEVAM ET" button should be visible and enabled
    When the user clicks the "ÜYE OLMADAN DEVAM ET" button
    Then the user should be redirected to the Address Information page



  Scenario: TC06-NEG-02 - The user should not remain on the Order Login page after clicking "Üye Olmadan Devam Et"

    Given the user is on the Order Login page
    When the user clicks the "ÜYE OLMADAN DEVAM ET" button
    Then the user should not remain on the Order Login page  


  Scenario: TC06-POS-03 - The user should be redirected to the Address Information page after clicking "ÜYE OLMADAN DEVAM ET"

    Given the user is on the Order Login page
    When the user clicks the "ÜYE OLMADAN DEVAM ET" button
    Then the user should be redirected to the Address Information page


  Scenario: TC06-NEG-03 - The user should not be redirected to the Home page after clicking "ÜYE OLMADAN DEVAM ET"

    Given the user is on the Order Login page
    When the user clicks the "ÜYE OLMADAN DEVAM ET" button
    Then the user should not be redirected to the Home page




  Scenario: TC06-POS-04 - The Address Information form should include all required input fields

    Given the user is on the Order Login page
    When the user clicks the "ÜYE OLMADAN DEVAM ET" button
    Then the Address Information page should be displayed
    And the Full Name field should be displayed
    And the Email field should be displayed
    And the Mobile Phone field should be displayed
    And the City field should be displayed
    And the District field should be displayed
    And the Neighborhood field should be displayed
    And the Address field should be displayed



  Scenario: TC06-NEG-04 - The address form should not be submitted when the Full Name field is empty

    Given the user is on the Order Login page
    When the user clicks the "ÜYE OLMADAN DEVAM ET" button
    And the user leaves the Full Name field empty
    And the user clicks the "Adresi Kaydet" button
    Then the user should remain on the Address Information page



  Scenario: TC06-POS-05 - A validation message should be displayed when the Full Name field is left empty

    Given the user is on the Order Login page
    When the user clicks the "ÜYE OLMADAN DEVAM ET" button
    And the user fills in all required address fields except the Full Name field
    And the user clicks the "Adresi Kaydet" button
    Then the validation message "Lütfen bu alanı doldurunuz." should be displayed for the Full Name field


  Scenario: TC06-NEG-05 - The address form should not be submitted when the Email field is empty

    Given the user is on the Order Login page
    When the user clicks the "ÜYE OLMADAN DEVAM ET" button
    And the user fills in all required address fields except the Email field
    And the user clicks the "Adresi Kaydet" button
    Then the user should remain on the Address Information page


  Scenario: TC06-POS-06 - The user should be navigated to the Payment Options step after saving a valid address

    Given the user is on the Order Login page
    When the user clicks the "ÜYE OLMADAN DEVAM ET" button
    And the user fills in all required address fields with valid information
    And the user clicks the "Adresi Kaydet" button
    Then the user should be redirected to the Payment Options page



  Scenario: TC06-NEG-06 - The address form should not be submitted when the Mobile Phone field is empty

    Given the user is on the Order Login page
    When the user clicks the "ÜYE OLMADAN DEVAM ET" button
    And the user fills in all required address fields except the Mobile Phone field
    And the user clicks the "Adresi Kaydet" button
    Then the user should remain on the Address Information page
