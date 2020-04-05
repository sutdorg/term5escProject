const sdk = require('sdk.js');
const backend = require('be.js');
const database = require('db.js');


// TODO: create sdk config & db config
// let port = process.env.PORT || 3000;

let configSDK = {};
let configDB = {};

sdk.start(configSDK).then(res => {
    database.start(configDB).then(res => {
        backend.start().then(res => {
            console.log("all started");
        });
    });
});