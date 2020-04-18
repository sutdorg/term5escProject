"use strict";

const express = require('express');
const cors = require('cors');

const sdk = require('./sdk.js');
const db = require('./db.js');

const LOG_ID = "BE - ";

class BE {

    constructor() {
        this.port = null;
    }

    /**
     *
     * @param port
     * @returns {Promise<>}
     */
    start(port) {
        return new Promise((resolve) => {
            this.port = port;
            let app = express();
            app.use(cors());

            app.use(express.json());

            /**
             * Receives guest creation request, forwards to SDK to handle
             * @param {string} req.body.first_name       Customer's first name
             * @param {string} req.body.last_name        Customer's last name
             * @param {string} req.body.phone_number     Customer's phone number
             * @param {string} req.body.skill            Customer's requested skill
             */
            app.post('/createguest', function (req, res) {
                console.log(LOG_ID + "/createguest called");
                sdk.createGuest(req.body).then((msg) => {
                    res.send(msg);
                });
            });

            /**
             * Receives end chat request, forwards to SDK to handle
             * @param {string} req.body.jid_c            Customer's IM id
             * @param {string} req.body.jid_a            Agent's IM id
             */
            app.post('/endcall', function (req, res) {
                console.log(LOG_ID + "/endcall called");
                sdk.endCall(req.body).then((msg) => {
                    res.send(msg);
                });
            });

            /**
             * Receives cancel chat request, forwards to SDK to handle
             * @param {string} req.body.jid_c            Customer's IM id
             */
            app.post('/cancelcall', function (req, res) {
                console.log("debug", LOG_ID + "/cancelcall called");
                sdk.cancelCall(req.body).then((msg) => {
                    res.send(msg);
                });
            });

            /**
             * Receives queue update request, forwards to DB to handle
             * @param {string} req.body.jid_c            Customer's IM id
             */
            app.post('/cusagent', function (req, res) {
                console.log(LOG_ID + "/cusagent called");
                db.waiting(req.body, res);
            });

            app.listen(this.port, () => {
                console.log(LOG_ID + "server started");
                resolve();
            });

        });
    }
}

module.exports = new BE();
