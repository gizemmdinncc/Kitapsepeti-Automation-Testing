# Kitapsepeti-Automation-Testing
Cypress automation testing project for Kitapsepeti

## 📌 Project Overview

This project focuses on **test automation of the Kitapseeti e-commerce platform** using **JavaScript, Cypress, Cucumber/Gherkin, and Page Object Model (POM)**.

A total of **93 test cases** were designed and automated across **6 major test areas**, covering both **positive and negative scenarios**.

The main objective was to create a maintainable and reusable automated test suite for validating critical e-commerce functionalities and user journeys.

---

## 🎯 Test Scope

The automation suite covers the following major areas:

| Test Case | Test Area            | Coverage                      |
| --------- | -------------------- | ----------------------------- |
| TC01      | Login                | Positive & Negative Scenarios |
| TC02      | Search & Listing     | Positive & Negative Scenarios |
| TC03      | Product Details      | Positive & Negative Scenarios |
| TC04      | Shopping Cart        | Positive & Negative Scenarios |
| TC05      | Guest Checkout       | Positive & Negative Scenarios |
| TC06      | Not Registered Order | Positive & Negative Scenarios |

### Testing Types

* **Functional Testing** – Verification of core e-commerce functionalities and user workflows
* **UI Testing** – Validation of web interface elements and user interactions
* **End-to-End (E2E) Testing** – Testing critical user journeys from start to finish
* **Positive Testing** – Validation of expected user behaviors
* **Negative Testing** – Validation of invalid and unexpected user behaviors

---

## 🛠️ Technologies & Tools

* **Programming Language:** JavaScript
* **Test Automation:** Cypress
* **BDD Framework:** Cucumber / Gherkin
* **Test Architecture:** Page Object Model (POM)
* **Version Control:** Git / GitHub
* **Test Evidence:** Screenshots and video recordings
* **IDE:** Visual Studio Code

---

## 📊 Test Case Summary

| Test Area            | Test Cases |
| -------------------- | ---------: |
| Login                |         15 |
| Search & Listing     |         18 |
| Product Details      |         12 |
| Shopping Cart        |         20 |
| Guest Checkout       |         16 |
| Not Registered Order |         12 |
| **Total**            |     **93** |

### Execution Results

| Metric           |   Result |
| ---------------- | -------: |
| Total Test Cases |   **93** |
| Passed           |   **93** |
| Failed           |    **0** |
| Pass Rate        | **100%** |
| Fail Rate        |   **0%** |

**93/93 automated test cases passed successfully during the final test execution.**

---

## 🏗️ Project Architecture

The project follows the **Page Object Model (POM)** architecture to separate page-specific elements and actions from test logic.

Cucumber/Gherkin feature files are used to define readable behavior-driven scenarios, while step definitions connect the scenarios with Cypress automation code.

```text
Kitapsepeti-Automation-Testing/
│
├── cypress/
│   ├── e2e/
│   │   ├── features/
│   │   │   ├── guestCheckout.feature
│   │   │   ├── login.feature
│   │   │   ├── notRegisteredOrder.feature
│   │   │   ├── productDetails.feature
│   │   │   ├── search_listing.feature
│   │   │   └── shoppingCart.feature
│   │   │
│   │   ├── pages/
│   │   │   ├── GuestCheckoutPage.js
│   │   │   ├── HomePage.js
│   │   │   ├── LoginPage.js
│   │   │   ├── NotRegisteredOrderPage.js
│   │   │   ├── ProductDetailsPage.js
│   │   │   └── ShoppingCartPage.js
│   │   │
│   │   └── step_definitions/
│   │       ├── guestCheckoutSteps.js
│   │       ├── loginSteps.js
│   │       ├── notRegisteredOrderSteps.js
│   │       ├── productDetailsSteps.js
│   │       ├── searchListingSteps.js
│   │       └── shopping-cartSteps.js
│   │
│   ├── fixtures/
│   └── support/
│
├── cypress.config.js
├── package.json
├── package-lock.json
└── .gitignore
```

---

## 🔄 Test Automation Approach

The automation process followed these main steps:

1. Analyze requirements and define test scenarios
2. Design positive and negative test cases
3. Implement scenarios using Cucumber/Gherkin
4. Create reusable Page Object classes
5. Implement Cypress step definitions
6. Execute automated tests
7. Investigate failures and unexpected application behavior
8. Capture screenshots and video recordings as evidence
9. Update test flows when application behavior differed from requirements
10. Perform final regression execution

---

## 🧩 Challenges & Problem-Solving

### Authentication & CAPTCHA

A security code/CAPTCHA appeared during some authentication flows. The test flow and validation strategy were adjusted to handle authentication-related interruptions without compromising the intended test objectives.

### Requirement vs. Application Differences

Differences were identified between documented requirements and the current application behavior.

For example, the requirements specified **two cargo companies**, while the application provided **three cargo options**. The actual application behavior was verified and the relevant test scenario was adapted accordingly.

### Dynamic UI Elements

Some UI elements and selectors were dynamic or changed during execution. More reliable Cypress selectors and assertions were used to improve test stability.

### Session & State Issues

Some scenarios were affected by application session and state conditions. Test flows were isolated and application state was managed to support more reliable and independent execution.

### Unexpected Application Behavior

Automation failures were investigated using Cypress logs, screenshots, and video recordings. The implementation was then adjusted based on the identified root cause.

---

## 📸 Test Evidence

Cypress screenshots and video recordings were used as test execution evidence and for debugging failed or unexpected scenarios.

Test evidence can be found in the relevant Cypress execution outputs.

---

## 📚 Key Learnings

Through this project, I gained practical experience in:

* Web test automation with **JavaScript and Cypress**
* Functional and End-to-End testing
* Positive and negative test scenario design
* **Cucumber/Gherkin** and BDD-style scenario development
* **Page Object Model (POM)**
* Test debugging and root-cause analysis
* Working with dynamic UI elements and selectors
* Automated screenshots and video recordings
* Git and GitHub for version control and project sharing

---

## 🚀 How to Run the Project

### 1. Clone the repository

```bash
git clone https://github.com/gizemmdinncc/Kitapsepeti-Automation-Testing.git
```

### 2. Navigate to the project

```bash
cd Kitapsepeti-Automation-Testing
```

### 3. Install dependencies

```bash
npm install
```

### 4. Open Cypress

```bash
npx cypress open
```

### 5. Run tests in headless mode

```bash
npx cypress run
```

---

## 🔐 Environment Variables

Authentication credentials and other sensitive information should be stored in environment variables and **must not be committed to the repository**.

The `.gitignore` file is configured to exclude sensitive `.env` files and generated Cypress artifacts.

---

## 📦 Project Deliverables

* 93 automated test cases
* Cypress automation scripts
* Cucumber/Gherkin feature files
* Step definitions
* Page Object Model structure
* Test screenshots and video recordings
* Cypress configuration
* Project dependencies and configuration files
* Git/GitHub version control

---

## 🔗 Project Repository

**GitHub:**
https://github.com/gizemmdinncc/Kitapsepeti-Automation-Testing

---

## 👩‍💻 Author

**Gizem Sultan Dinç**

QA / Test Automation

**Technologies:** JavaScript · Cypress · Cucumber · Gherkin · POM · Git · GitHub
