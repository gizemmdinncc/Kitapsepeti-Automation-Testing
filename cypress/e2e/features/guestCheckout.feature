Feature: Guest Checkout


Scenario: TC-POS-01 - The user should be redirected to the "Address Information" page after clicking the "Buy Now" button on the Cart page

  Given the user is logged in and has a saved address
  And the user has a product in the shopping cart for guest checkout
  And the user is on the Cart page for guest checkout
  When the user clicks the "Buy Now" button for checkout
  Then the "Address Information" page should be displayed

Scenario: TC-POS-02 - The user should be redirected to the "Payment Information" page by clicking the "Proceed to Payment" button

  Given the user is logged in and has a saved address
  And the user has a product in the shopping cart for guest checkout
  And the user is on the Cart page for guest checkout
  When the user clicks the "Buy Now" button for checkout
  Then the "Address Information" page should be displayed
  And a valid delivery address is selected
  When the user clicks the "Proceed to Payment" button
  Then the "Payment Information" page should be displayed


Scenario: TC-POS-03 - The user should see PTT Cargo and Hepsijet as available shipping options, with PTT Cargo selected by default

  Given the user is logged in and has a saved address
  And the user has a product in the shopping cart for guest checkout
  And the user is on the Cart page for guest checkout
  When the user clicks the "Buy Now" button for checkout
  Then the "Address Information" page should be displayed
  Given a valid delivery address is selected
  When the user clicks the "Proceed to Payment" button
  Then the available shipping options should be displayed



Scenario: TC-POS-04 - The Payment page should clearly display the "Pay with iyzico" and "Pay by Card" payment options

  Given the user is logged in and has a saved address
  And the user has a product in the shopping cart for guest checkout
  And the user is on the Cart page for guest checkout
  When the user clicks the "Buy Now" button for checkout
  Then the "Address Information" page should be displayed
  And a valid delivery address is selected
  When the user clicks the "Proceed to Payment" button
  Then the "Payment Information" page should be displayed
  And the payment options should be displayed



Scenario: TC-POS-05 - The payment form should display the required card fields when the user selects the "Pay by Card" option

  Given the user is logged in and has a saved address
  And the user has a product in the shopping cart for guest checkout
  And the user is on the Cart page for guest checkout
  When the user clicks the "Buy Now" button for checkout
  Then the "Address Information" page should be displayed
  And a valid delivery address is selected
  When the user clicks the "Proceed to Payment" button
  Then the "Payment Information" page should be displayed
  And the card payment form should be displayed



Scenario: TC-POS-06 - The "Pay xxx TL" button should become active after all required payment fields are completed

  Given the user is logged in and has a saved address
  And the user has a product in the shopping cart for guest checkout
  And the user is on the Cart page for guest checkout
  When the user clicks the "Buy Now" button for checkout
  Then the "Address Information" page should be displayed
  And a valid delivery address is selected
  When the user clicks the "Proceed to Payment" button
  Then the "Payment Information" page should be displayed
  And the card payment form should be displayed
  And the "Pay" button should become active


Scenario: POS-07 - Validate empty required payment fields

  Given the user is logged in and has a saved address
  And the user has a product in the shopping cart for POS-07
  When the user clicks the "Buy Now" button for checkout
  Given the user is on the Address Information page
  When the user clicks the "Proceed to Payment" button
  Given the user is on the Payment Information page for guest checkout
  Then validation errors should be displayed for empty payment fields



Scenario: POS-08 - Verify Order Summary and Grand Total

  Given the user is logged in and has a saved address
  And the user has a product in the shopping cart for POS-07
  When the user clicks the "Buy Now" button for checkout
  Given the user is on the Address Information page
  When the user clicks the "Proceed to Payment" button
  Given the user is on the Payment Information page for guest checkout
  Then the Order Summary should display the correct grand total



Scenario: TC-NEG-01 - The payment button should not be active with empty card fields

Given the user is logged in and has a saved address
And the user has a product in the shopping cart for guest checkout
When the user clicks the "Buy Now" button for NEG-01
Given the user is on the Address Information page
When the user clicks the "Proceed to Payment" button
Given the user is on the Payment Information page for guest checkout
Then an error message should be displayed for empty card fields in NEG-01


Scenario: TC-NEG-02 - Payment should not be initiated when the card number field is empty

  Given the user is logged in and has a saved address
  And the user has a product in the shopping cart for guest checkout
  When the user clicks the "Buy Now" button for NEG-02
  Given the user is on the Address Information page
  When the user clicks the "Proceed to Payment" button
  Given the user is on the Payment Information page for guest checkout
  Then the payment should not be processed when the card number is empty


Scenario: TC-NEG-03 - Payment should not be processed when the CVV field is empty

  Given the user is logged in and has a saved address
  And the user has a product in the shopping cart for guest checkout
  When the user clicks the "Buy Now" button for NEG-03
  Given the user is on the Address Information page
  When the user clicks the "Proceed to Payment" button
  Given the user is on the Payment Information page for guest checkout
  Then the payment should not be processed when the CVV is empty


Scenario: TC-NEG-04 - Payment should not be processed when the expiry date field is empty

  Given the user is logged in and has a saved address
  And the user has a product in the shopping cart for guest checkout
  When the user clicks the "Buy Now" button for NEG-04
  Given the user is on the Address Information page
  When the user clicks the "Proceed to Payment" button
  Given the user is on the Payment Information page for guest checkout
  Then the payment should not be processed when the expiry date is empty



Scenario: TC-NEG-05 - Payment should not be processed when the cardholder name is empty

  Given the user is logged in and has a saved address
  And the user has a product in the shopping cart for guest checkout
  When the user clicks the "Buy Now" button for NEG-05
  Given the user is on the Address Information page
  When the user clicks the "Proceed to Payment" button
  Given the user is on the Payment Information page for guest checkout
  Then the payment should not be processed when the cardholder name is empty



Scenario: TC-NEG-06 - Payment should not be processed with an invalid CVV

  Given the user is logged in and has a saved address
  And the user has a product in the shopping cart for guest checkout
  When the user clicks the "Buy Now" button for NEG-06
  Given the user is on the Address Information page
  When the user clicks the "Proceed to Payment" button
  Given the user is on the Payment Information page for guest checkout
  Then the payment should not be processed with an invalid CVV



Scenario: TC-NEG-07 - Payment should not be processed with an invalid expiry date

  Given the user is logged in and has a saved address
  And the user has a product in the shopping cart for guest checkout
  When the user clicks the "Buy Now" button for NEG-07
  Given the user is on the Address Information page
  When the user clicks the "Proceed to Payment" button
  Given the user is on the Payment Information page for guest checkout
  Then the payment should not be processed with an invalid expiry date



Scenario: TC-NEG-08 - Payment should not be processed with an invalid card number

  Given the user is logged in and has a saved address
  And the user has a product in the shopping cart for guest checkout
  When the user clicks the "Buy Now" button for NEG-08
  Given the user is on the Address Information page
  When the user clicks the "Proceed to Payment" button
  Given the user is on the Payment Information page for guest checkout
  Then the payment should not be processed with an invalid card number



