"use strict";

const NodeSDK = require("rainbow-node-sdk");

const logger = require('./logger.js');
const db = require("./temp.js");

const LOG_ID = "SDK - ";

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
        return new Promise((resolve) => {
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
                if(contact.presence === "online"){
                    db.offlineToOnline();
                }else{
                    db.onlineToOffline();
                }
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
        });
    }

    createGuest(guestDetails, resFE) {
        //logger.log("debug", LOG_ID + "Creating guest...");
        this.nodeSDK.admin.createGuestUser(guestDetails["first_name"], guestDetails["last_name"], "en-US", 86400).then((guest) => {
            //logger.log("debug", LOG_ID + "Guest Created, updating database...");
            let guestDetails = {
                "CustomerID": 0,
                "FirstName": guest.firstName,
                "LastName": guest.lastName,
                "StrID": guest.id,
                "jid_c": guest.jid_im,
                "Skill": guestDetails["skill"]
            };
            db.queueingReq(guestDetails)
                .then(result => {
                    //logger.log("debug", LOG_ID + "Database updated, responding to fronted...");
                    let a = {
                        "agentAvailable": result.agentAvailable,
                        "jid_c": guest.jid_im,
                        "jid_a": result.jid_a,
                        "guest_login": guest.loginEmail,
                        "guest_password": guest.password,
                        "id_c": guest.id
                    };
                    resFE.send(a);
                    // logger.log("debug", LOG_ID + "Responded to frontend");
                })
                .catch(error => {
                    // TODO
                    // handle reject cases
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
                    let agentDetails = {
                        "AgentID": 0,
                        "Skill1": entry.tags[0],
                        "Skill2": entry.tags[1],
                        "Skill3": entry.tags[2],
                        "Name": entry.displayName,
                        "AvailStatus": entry.presence,
                        "NumOfCus": 0,
                        "jid_a": entry.jid_im
                    };
                    db.addingAgent(agentDetails)
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
            let agentDetails = {"jid_a" : jid_a};
            db.resolveCall(agentDetails)
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

    // TODO
    // DB need to handle cancel call
    // called when guest cancel by closing tab before agent is assigned?
    cancelCall(guestDetails, resFE) {
        // logger.log("debug", LOG_ID + "Cancelling call...");
        this.nodeSDK.admin.deleteUser(guestDetails.id_c).then((user) => {
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