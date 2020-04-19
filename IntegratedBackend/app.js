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

// Change accordingly to match the port on the frontend
let port = process.env.PORT || 3000;

database.start(configDB).then(() => {
    sdk.start(configSDK).then(() => {
        backend.start(port).then(() => {
            console.log(LOG_ID + "All services started");
        });
    });
});
