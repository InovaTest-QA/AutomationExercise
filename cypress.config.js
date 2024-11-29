const path = require('path');

module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        verifyFileExistence(filePath) {
          const fs = require('fs');
          const fileExists = fs.existsSync(filePath);
          return fileExists;
        }
      });

      config.downloadsFolder = path.join(__dirname, 'cypress', 'downloads');
      return config;
    },
  },
};
