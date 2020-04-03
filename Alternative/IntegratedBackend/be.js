const express = require('express');
const app = express();
const cors = require('cors');

const logger = require('./logger');
const nodeSDK = require('sdk.js');

class BE{

    constructor() {
        this.protocol = "http";
        this.port = 80;
        this.sdk = null;
    }
    start(sdk){

        app.use(cors());

        app.use(express.json());

        app.post('/createguest', function (req, res) {
            logger.log("debug", LOG_ID + "/createguest called");
            nodeSDK.createGuest(req.body.first_name, req.body.last_name, req.body.selected_skill, res);
        });

        app.post('/endcall', function (req, res) {
            logger.log("debug", LOG_ID + "/endcall called");
            nodeSDK.endCall(req.body.jid_a, req.body.id_c, res);
        });

        app.post('/cancelcall', function (req, res) {
            logger.log("debug", LOG_ID + "/cancelcall called");
            nodeSDK.cancelCall(req.body.id_c);
        });
    }
}

module.exports = new BE();
