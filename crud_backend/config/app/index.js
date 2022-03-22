require('dotenv').config();
const fs = require("fs-extra");
const path = require('path');

if (!fs.existsSync(path.resolve(__dirname, 'AppConfig_Overwrite.js'))) {
    fs.copySync(
        path.resolve(__dirname, 'AppConfig.js'),
        path.resolve(__dirname, 'AppConfig_Overwrite.js')
    )
}

const localConfig = require('./AppConfig');
const prodConfig = require('./AppConfig_Overwrite');

if (process.env.MODE === 'local') {
    module.exports = localConfig;
} else {
    module.exports = prodConfig;
}