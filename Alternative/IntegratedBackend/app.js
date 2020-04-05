"use strict";

const json = require('comment-json');
const fs = require('fs');
const configfileSDK = fs.readFileSync("./configSDK.json");

const sdk = require('./sdk.js');
const backend = require('./be.js');
const database = require('./db.js');

const LOG_ID = "APP - ";

let txt = configfileSDK.toString();
let configSDK = json.parse(txt);

// TODO: create db config
let configDB = {};
let configDB2 = {};

database.start(configDB, configDB2).then(res => {
    sdk.start(configSDK).then(res => {
        backend.start().then(res => {
            console.log(LOG_ID + "All services started");
        });
    });
});
