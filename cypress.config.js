const fs = require('fs');
const path = require('path');
const config = require('./properties.json');

module.exports = {
    e2e: {
        screenshotsFolder: `./${config.Results}/cypress/${config.Port}`,
        setupNodeEvents(on, config) {
            on('task', {
                clearScreenshots(folder) {
                    //const folder = `./${config.Results}/cypress/${config.Port}`;
                    if (fs.existsSync(folder)) {
                        const files = fs.readdirSync(folder);
                        files.forEach((file) => {
                            const filePath = path.join(folder, file);
                            fs.unlinkSync(filePath);
                        });
                        return `Deleted ${files.length} files.`;
                    }
                    return `Screenshots folder "${folder} "does not exist.`;
                },
            });
        },
    },
    env: {
        config,
    },
};
