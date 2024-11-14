const config = require('./properties.json');

module.exports = {
  e2e: {
    screenshotsFolder: 'results/cypress',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    config,
  },
};
