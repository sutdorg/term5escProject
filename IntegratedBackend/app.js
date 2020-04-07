"use strict";

const json = require('comment-json');
const fs = require('fs');
const configfileSDK = fs.readFileSync("./configSDK.json");
const configfileDB = fs.readFileSync("./configDB.json");

const sdk = require('./sdk.js');
const backend = require('./be.js');
const database = require('./db.js');

const LOG_ID = "APP - ";

let txtSDK = configfileSDK.toString();
let configSDK = json.parse(txtSDK);

let txtDB = configfileDB.toString();
let configDB = json.parse(txtDB);

database.start(configDB).then(res => {
    sdk.start(configSDK).then(res => {
        backend.start().then(res => {
            console.log(LOG_ID + "All services started");
        });
    });
});
