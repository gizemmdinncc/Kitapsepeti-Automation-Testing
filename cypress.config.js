const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const {
  createEsbuildPlugin,
} = require("@badeball/cypress-cucumber-preprocessor/esbuild");

async function setupNodeEvents(on, config) {
  await addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin(config)],
    })
  );

  return config;
}

module.exports = defineConfig({
  env: {
    TEST_EMAIL: "leyladnc7@gmail.com",
    TEST_PASSWORD: "leylaPT.1",
  },

  e2e: {
    baseUrl: "https://www.kitapsepeti.com",
    specPattern: "cypress/e2e/features/**/*.feature",
    supportFile: "cypress/support/e2e.js",
    setupNodeEvents,

    testIsolation: true,
  },
});

