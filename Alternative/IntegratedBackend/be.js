"use strict"

const express = require('express');
const cors = require('cors');
const http = require('http');

const logger = require('./logger');
const sdk = require('./sdk.js');
const db = require('./temp.js');

const LOG_ID = "BE - ";

class BE{

    constructor() {
        this.protocol = "http";
        this.port = 80;
    }
    start(){
        return new Promise((resolve) => {
            let app = express();
            app.use(cors());

            app.use(express.json());

            app.post('/createguest', function (req, res) {
                //logger.log("debug", LOG_ID + "/createguest called");
                sdk.createGuest(req.body.first_name, req.body.last_name, req.body.selected_skill, res);
            });

            app.post('/endcall', function (req, res) {
                //logger.log("debug", LOG_ID + "/endcall called");
                sdk.endCall(req.body.jid_a, req.body.id_c, res);
            });

            app.post('/cancelcall', function (req, res) {
                //logger.log("debug", LOG_ID + "/cancelcall called");
                sdk.cancelCall(req.body.id_c);
            });
            
            app.post('/cusagent', function (req, res) {
                db.waiting();
            });

            http.createServer(app).listen(this.port, () => {
                //logger.log("info", LOG_ID + 'server started');
                resolve();
            });

        });
    }
}

module.exports = new BE();
