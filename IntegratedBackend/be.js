"use strict";

const express = require('express');
const cors = require('cors');

const sdk = require('./sdk.js');
const db = require('./db.js');

const LOG_ID = "BE - ";

class BE {

    constructor() {
        this.port = process.env.PORT || 3000;
    }

    start() {
        return new Promise((resolve) => {
            let app = express();
            app.use(cors());

            app.use(express.json());

            app.post('/createguest', function (req, res) {
                console.log(LOG_ID + "/createguest called");
                sdk.createGuest(req.body, res);
            });

            app.post('/endcall', function (req, res) {
                console.log(LOG_ID + "/endcall called");
                sdk.endCall(req.body.jid_a, req.body.id_c, req.body.jid_c, res);
            });

            // TODO: Cancel call when tab is closed before agent is connected
            /*app.post('/cancelcall', function (req, res) {
                //logger.log("debug", LOG_ID + "/cancelcall called");
                sdk.cancelCall(req.body);
            });*/

            app.post('/cusagent', function (req, res) {
                console.log(LOG_ID + "/cusagent called");
                db.waiting(req.body, res);
            });

            app.post('/update/cSuccess', function (req, res) {
                console.log(LOG_ID + "/update/cSuccess called");
                db.updateAgent(req.body, res);
            });

            app.listen(this.port, () => {
                console.log(LOG_ID + "server started");
                resolve();
            });

        });
    }
}

module.exports = new BE();
