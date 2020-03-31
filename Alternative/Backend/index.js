"use strict";

// Load the SDK for Node.JS
const sdk = require('./app/modules/sdk');
const logger = require('./app/modules/logger');
const router = require('./app/modules/router');

// Load configuration
const defaultServer = require("./app/config/router.json");

const json = require('comment-json');
const fs = require('fs');
const configfile = fs.readFileSync("./app/config/config.json");
let txt = configfile.toString();
let config = json.parse(txt);

json.stringify(config, null, 2);

const LOG_ID = "index.js - ";

// Start the SDK
sdk.start(config, process.argv).then(() => {
    // Start the router
    return router.start(process.argv, defaultServer, sdk);
}).then(() => {
    logger.log("debug", LOG_ID + "starter-kit initialized");
});
