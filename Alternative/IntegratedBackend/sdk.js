"use strict";

const NodeSDK = require("rainbow-node-sdk");
const axios = require('axios');

const logger = require('./logger.js');
const db = require("./db.js");

const LOG_ID = "sdk - ";

class SDK {

    constructor() {
        this.nodeSDK = null;
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

    start(config) {
        this.nodeSDK = new NodeSDK(config);

        this.nodeSDK.events.on("rainbow_onready", () => {
            //logger.log("debug", LOG_ID + "Initialize agents");
            this.initAgents();
        });

        this.nodeSDK.start().then(() => {
            //logger.log("debug", LOG_ID + "SDK started");
            resolve();
        });

        this.nodeSDK.events.on("rainbow_oncontactpresencechanged", (contact) => {
            //logger.log("debug", LOG_ID + "Presence Changed");
            //logger.log("debug", LOG_ID + contact.displayName + " presence changed to " + contact.presence);
            axios.patch('http://10.12.66.69:1337/update/agent/avail', {
                "jid_a": contact.jid_im,
                "AvailStatus": contact.presence
            })
                .then(res => {
                    //logger.log("debug", LOG_ID + res);
                })
                .catch(error => {
                    //logger.log("error", LOG_ID + error);
                });
        });
    }

    createGuest(first_name, last_name, skill, resFE) {
        //logger.log("debug", LOG_ID + "Creating guest...");
        this.nodeSDK.admin.createGuestUser(first_name, last_name, "en-US", 86400).then((guest) => {
            //logger.log("debug", LOG_ID + "Guest Created, updating database...");
            axios.defaults.headers.post['Content-Type'] = 'application/json';
            axios.defaults.headers.post['sk'] = "Tablet";
            axios.defaults.headers.post['jid_c'] = guest.jid_im;
            axios.post('http://10.12.66.69:1337/cusreq', {
                "CustomerID": 0,
                "FirstName": guest.firstName,
                "LastName": guest.lastName,
                "StrID": guest.id,
                "JID_IM": guest.jid_im,
                "Skill": skill
            })
                .then(res => {
                    //logger.log("debug", LOG_ID + "Database updated, responding to fronted...");
                    let a = {
                        "agentAvailable": res.data.agentAvailable,
                        "jid_c": guest.jid_im,
                        "jid_a": res.data.jid_a,
                        "guest_login": guest.loginEmail,
                        "guest_password": guest.password,
                        "id_c": guest.id
                    };
                    resFE.send(a);
                    // logger.log("debug", LOG_ID + "Responded to frontend");
                })
                .catch(error => {
                    resFE.send("error");
                    // logger.log("error", LOG_ID + error);
                });
        }).catch((err) => {
            resFE.send("error");
            //logger.log("error", LOG_ID + "guest creation fail");
            //logger.log("error", LOG_ID + err);
        });
    }

    initAgents() {
        //logger.log("debug", LOG_ID + "Initializing agents...");
        this.nodeSDK.admin.getAllUsers("full").then((contacts) => {
            contacts.forEach(function (entry) {
                if (!(entry.roles.includes("admin") || entry.roles.includes("guest"))) {
                    //logger.log("debug", LOG_ID + "Adding " + entry.displayName + " to database...");
                    axios.post('http://42.60.131.56:80/add/agent', {
                        "AgentID": 0,
                        "Skill1": entry.tags[0],
                        "Skill2": entry.tags[1],
                        "Skill3": entry.tags[2],
                        "Name": entry.displayName,
                        "AvailStatus": entry.presence,
                        "NumOfCus": 0,
                        "jid_a": entry.jid_im
                    })
                        .then(res => {
                            //logger.log("debug", LOG_ID + res);
                        })
                        .catch(error => {
                            //logger.log("error", LOG_ID + error);
                        });
                }
            });
        }).catch((err) => {
            //logger.log("error", LOG_ID + err);
        });
    }

    endCall(jid_a, id_c, resFE) {
        //logger.log("debug", LOG_ID + "Ending call...");
        this.nodeSDK.admin.deleteUser(id_c).then((user) => {
            axios.post('http://10.12.66.69:1337/cRes', {
                "jid_a": jid_a
            })
                .then(res => {
                    //logger.log("debug", LOG_ID + res);
                    //logger.log("debug", LOG_ID + "User deleted")
                    resFE.send("User deleted");
                })
                .catch(error => {
                    //logger.log("error", LOG_ID + error);
                });
        }).catch((err) => {
            resFE.send("Error");
            //logger.log("error", LOG_ID + err);
        });
    }

    cancelCall(id_c, resFE) {
        // logger.log("debug", LOG_ID + "Cancelling call...");
        this.nodeSDK.admin.deleteUser(id_c).then((user) => {
            axios.post('http://10.12.66.69:1337/cancel', {
                "id_c": id_c
            })
                .then(res => {
                    // logger.log("debug", LOG_ID + res);
                    // logger.log("debug", LOG_ID + "User deleted")
                    resFE.send("User deleted");
                })
                .catch(error => {
                    // logger.log("error", LOG_ID + error);
                });
        }).catch((err) => {
            resFE.send("Error");
            //logger.log("error", LOG_ID + err);
        });
    }

    restart() {
        return new Promise((resolve, reject) => {
            this.nodeSDK.events.once('rainbow_onstopped', (data) => {
                //logger.log("debug", LOG_ID + "SDK - rainbow_onstopped - rainbow event received. data", data);
                //logger.log("debug", LOG_ID + "SDK - rainbow_onstopped rainbow SDK will re start");
                this.nodeSDK.start().then(() => {
                    resolve();
                });
            });
            this.nodeSDK.stop();
        });
    }

}

module.exports = new SDK();