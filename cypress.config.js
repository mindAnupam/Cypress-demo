const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports/mochawesome",
    overwrite: true,
    html: true,
    json: true,
  },
  viewportHeight: 1400,
  viewportWidth: 1400,
  retries: 1,
  watchForFileChanges: false,
  pageLoadTimeout: 10000,
});
