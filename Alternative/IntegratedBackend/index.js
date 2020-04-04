const sdk = require('sdk.js');
const backend = require('be.js');
const database = require('temp.js');


// TODO: create sdk config & db config
let configSDK = {};
let configDB = {};

sdk.start(configSDK).then(res => {
    database.start(configDB).then(res => {
       backend.start().then(res => {
           console.log("all started");
       });
    });
});