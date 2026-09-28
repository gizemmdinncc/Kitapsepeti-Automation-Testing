Feature: User Login

Scenario: TC-POS-01 - Access login pop-up via "Login with Email" link
  Given the user opens the website
  When the user clicks the "Login with Email" link
  Then the login popup should be displayed

Scenario: TC-NEG-01 - Login popup should not be displayed when clicking outside the login trigger area
  Given the user opens the website
  When the user clicks outside the login trigger area
  Then the login popup should not be displayed

Scenario: TC-NEG-01.1 - Double-click "Login with Email" link rapidly
  Given the user opens the website
  When the user double-clicks the "Login with Email" link quickly
  Then only one login popup should be displayed



Scenario: TC-POS-02 - Verify all required login page elements are displayed
  Given the user opens the website
  When the user clicks the "Login with Email" link
  Then the login popup should be displayed
  And all required login page elements should be displayed

Scenario: TC-NEG-02 - Verify login page behavior when a required element is missing
  Given the user opens the website
  When the user clicks the "Login with Email" link
  Then all required login page elements should be present



Scenario: TC-POS-03 - Verify user can log in with a registered email and valid password
  Given the user opens the website
  When the user clicks the "Login with Email" link
  And the user enters a registered email address
  And the user enters a valid password
  And the user clicks the "Login" button
  Then the user should be successfully logged in



Scenario: TC-POS-04 - Verify user is redirected to address page after successful login
  Given the user opens the website
  When the user clicks the "Login with Email" link
  And the user enters a registered email address
  And the user enters a valid password
  And the user clicks the "Login" button
  Then the user should be successfully logged in




Scenario: TC-NEG-04 - Verify user is not redirected to Address page when login is unsuccessful
  Given the user opens the website
  When the user clicks the "Login with Email" link
  And the user enters a registered email address
  And the user enters an incorrect password
  And the user submits the login request
  Then the user should not be redirected to the Address page
  And an invalid credentials error message should be displayed


 
Scenario: TC-NEG-05 - Verify error message when user enters an incorrect password
  Given the user opens the website
  When the user clicks the "Login with Email" link
  And the user enters a registered email address
  And the user enters an incorrect password
  And the user submits the login request
  Then an invalid credentials error message should be displayed

   
Scenario: TC-NEG-06 - Verify error message when an invalid email format is entered
  Given the user opens the website
  When the user clicks the "Login with Email" link
  And the user enters an invalid email address
  Then an invalid email format error message should be displayed



Scenario: TC-NEG-07 - Verify error message when password field is left blank
  Given the user opens the website
  When the user clicks the "Login with Email" link
  And the user enters a registered email address
  And the user leaves the password field blank
  And the user clicks the "Login" button
  Then the password field should remain blank


Scenario: TC-POS-08 - Verify rate limiting after multiple invalid login attempts
  Given the user opens the website
  When the user clicks the "Login with Email" link
  And the user makes 10 consecutive invalid login attempts
  Then the rate limit error message should be displayed



Scenario: TC-POS-09 - Verify user can access Forgot Password page
  Given the user opens the website
  When the user clicks the "Login with Email" link
  And the user clicks the "Forgot Password" link
  Then the reset password page should be displayed


Scenario: TC-NEG-09 - Verify reset password does not proceed with empty email
  Given the user opens the website
  When the user clicks the "Login with Email" link
  And the user clicks the "Forgot Password" link
  And the user leaves the forgot password email field blank
  And the user clicks the "Forgot Password Submit" button