const fs = require('fs');
const path = require('path');
const config = require('./properties.json');

module.exports = {
  e2e: {
    screenshotsFolder: `./${config.Results}/cypress/${config.Port}`,
    setupNodeEvents(on, config) {
      
    },
  },
  env: {
    config,
  },
};

