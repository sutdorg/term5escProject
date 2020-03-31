"use strict";
const express = require('express');
const router = express.Router();
let fs = require('fs');
const http = require('http');
const https = require('https');
const app = express();
const cors = require('cors');

const nodeSDK = require('./sdk');
const logger = require('./logger');

const LOG_ID = "modules/router.js - ";

class Router {

    constructor() {
        logger.log("debug", LOG_ID + "constructor()");
        this.protocol = "http";
        this.port = 3002;
        this.sdk = null;
    }

    start(argv, config, sdk) {

        return new Promise((resolve) => {
            this.protocol = config.protocol;
            this.port = config.port;
            this.sdk = sdk;

            if (argv.length === 6) {
                this.protocol = argv[4];
                this.port = argv[5];
                logger.log("info", LOG_ID + "serving " + this.protocol + " requests on port " + this.port + " (forced by CLI)");
            } else {
                logger.log("info", LOG_ID + "serving " + this.protocol + " requests on port " + this.port);
            }

            let key = fs.readFileSync(__dirname + "/../../" + config.certificates.key);
            let cert = fs.readFileSync(__dirname + "/../../" + config.certificates.cert);
            let https_options = {key: key, cert: cert};

            if (this.protocol === "https") {
                https.createServer(https_options, app).listen(this.port, () => {
                    logger.log("info", LOG_ID + 'server started');
                    resolve();
                });
            } else {
                http.createServer(app).listen(this.port, () => {
                    logger.log("info", LOG_ID + 'server started');
                    resolve();
                });
            }

            app.use(cors());

            this.defineRoute();

            app.use(express.json());

            app.post('/createguest', function (req, res) {
                logger.log("debug", LOG_ID + "/createguest called");
                nodeSDK.createGuest(req.body.first_name, req.body.last_name, req.body.selected_skill, res);
            });

            app.post('/endcall', function (req, res) {
                logger.log("debug", LOG_ID + "/endcall called");
                nodeSDK.endCall(req.body.jid_a, req.body.id_c, res);
            });

            app.post('/cancel', function (req, res) {
                logger.log("debug", LOG_ID + "/cancel called");
                nodeSDK.cancel(req.body.id_c);
            });

        });
    }

    defineRoute() {

        // Check bot health
        router.get('/ping', (req, res) => {
            logger.log("debug", LOG_ID + "rest /ping");
            res.status(200).send({"code": 0});
        });

        // Restart SDK if needed - for debugging purpose
        router.post('/sdk/restart', (req, res) => {
            logger.log("debug", LOG_ID + "rest /sdk/restart");
            this.sdk.restart().then(() => {
                res.status(200).send({"code": 0, "message": "sdk restarted"});
            }).catch((err) => {
                res.status(500).send({"code": -1, "message": "Error when restarting the SDK", "error": err});
            });
        });

        // Get SDK Node status
        router.get('/sdk/status', (req, res) => {
            logger.log("debug", LOG_ID + "rest /sdk/status");
            res.status(200).send({"code": 0, "data": {"status": this.sdk.state, "version": this.sdk.version}});
        });

        /**
         * TO DO
         * Add more route to your bot if needed
         */

    }

}

module.exports = new Router();
