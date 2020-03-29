"use strict";

const NodeSDK = require("rainbow-node-sdk");
const logger = require('./logger');

const axios = require('axios');

const LOG_ID = "STARTER/SDKN - ";

class SDK {
    
    constructor() {
        logger.log("debug", LOG_ID + "constructor()");
        this.nodeSDK = null;
    }

    start(bot, argv) {
        return new Promise((resolve) => {

            if(argv.length >= 4) {
                bot.credentials.login = argv[2];
                bot.credentials.password = argv[3];
                logger.log("info", LOG_ID + "using " + bot.credentials.login  + " (forced by CLI)");
            }

             // Start the SDK
            this.nodeSDK = new NodeSDK(bot);

            this.nodeSDK.events.on("rainbow_onready", () => {
                this.initAgents();
                //this.endCall('d6aabfd1a348467a990f0dfcb94b5218@sandbox-all-in-one-rbx-prod-1.rainbow.sbg');
            });

            this.nodeSDK.start().then(() => {
                logger.log("debug", LOG_ID + "SDK started");
                resolve();
            });

        });
    }

    createGuest(first_name, last_name, skill, resFE){
        this.nodeSDK.admin.createGuestUser(first_name, last_name, "en-US", 604800).then((guest) => {
            logger.log("guest created");
            logger.log(guest);
            axios.defaults.headers.post['Content-Type'] = 'application/json';
            axios.defaults.headers.post['sk'] = "Tablet";
            axios.defaults.headers.post['jid_c'] = guest.jid_im;
            axios.post('http://10.12.66.69:1337/cusreq', {
                "CustomerID": 0,
                "FirstName": guest.firstName,
                "LastName": guest.lastName,
                "StrID": guest.id,
                "JID_IM":  guest.jid_im,
                "Skill": "Tablet"
            })
                .then(res => {
                    logger.log(res);
                    logger.log(res.data);
                    logger.log(res.data.jid_c);
                    logger.log(guest.jid_im);
                    logger.log(res.data.jid_a);
                    logger.log(res.data.agentAvailable);
                    //let a = {"agentAvailable": res.data.agentAvailable, "jid_c": guest.jid_im, "jid_a": res.data.jid_a, "guest_login":guest.loginEmail, }
                    resFE.send({"agentAvailable": res.data.agentAvailable, "jid_c": guest.jid_im, "jid_a": res.data.jid_a});
                })
                .catch(error => {
                    resFE.send("error");
                    logger.log(error);
                });
        }).catch((err) => {
            resFE.send("error");
            logger.log("guest creation fail");
        });
    }

    initAgents(){
        let contacts = this.nodeSDK.contacts.getAll();
        logger.log(contacts);
        contacts.forEach(function(entry) {
            logger.log(entry);
            axios.post('http://10.12.66.69:1337/add/agent', {
                "AgentID": 0,
                "Skill1": "Tablet",
                "Skill2": "Phone",
                "Skill3": "Computer",
                "Name": entry.displayName,
                "AvailStatus": entry.presence,
                "NumOfCus" : 0,
                "jid_a" :entry.jid_im
            })
            .then(res => {
                logger.log(res);
            })
            .catch(error => {
                logger.log(error);
            });
        });
    }

    endCall(jid_a){
        axios.post('http://10.12.66.69:1337/cRes', {
            "jid_a" :jid_a
        })
            .then(res => {
                logger.log(res.data);
            })
            .catch(error => {
                logger.log(error);
            });
    }

    restart() {
        return new Promise((resolve, reject) => {
            this.nodeSDK.events.once('rainbow_onstopped', (data) => {
                logger.log("debug", LOG_ID + "SDK - rainbow_onstopped - rainbow event received. data", data);

                logger.log("debug",  LOG_ID + "SDK - rainbow_onstopped rainbow SDK will re start");
                this.nodeSDK.start().then(() => {
                    resolve();
                });
            });

            this.nodeSDK.stop();
            /*this.nodeSDK.stop().then(() => {
                logger.log("debug", LOG_ID + "SDK stopped");
                return this.nodeSDK.start();
            }).then(() => {
                logger.log("debug", LOG_ID + "SDK started");
                resolve();
            }).catch((err) => {
                reject(err);
            }); // */
        });
    }

    get state() {
        return this.nodeSDK.state;
    }

    get version() {
        return this.nodeSDK.version;
    }

    get sdk() {
        return this.nodeSDK;
    }
}

module.exports = new SDK();
