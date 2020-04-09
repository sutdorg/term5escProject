"use strict";

const NodeSDK = require("rainbow-node-sdk");

const db = require("./db.js");

const LOG_ID = "SDK - ";

class SDK {

    constructor() {
        this.nodeSDK = null;
    }

    start(config) {
        return new Promise((resolve) => {
            this.nodeSDK = new NodeSDK(config);

            this.nodeSDK.events.on("rainbow_oncontactpresencechanged", (contact) => {
                console.log(LOG_ID + "Presence Changed");
                console.log(LOG_ID + contact.displayName + " presence changed to " + contact.presence);
                let agentDetails = {
                    "jid_a": contact.jid_im,
                    "AvailStatus": contact.presence
                };
                if (contact.presence === "online") {
                    db.offlinetoOnline(agentDetails);
                } else {
                    db.onlineToOffline(agentDetails);
                }
            });

            this.nodeSDK.events.on("rainbow_onready", () => {
                console.log(LOG_ID + "rainbow started");
                this.initAgents().then(() => {
                    resolve();
                });
            });

            this.nodeSDK.start();
        });
    }

    createGuest(req, resFE) {
        console.log(LOG_ID + "Creating guest...");
        this.nodeSDK.admin.createGuestUser(req.first_name, req.last_name, "en-US", 86400).then((guest) => {
            console.log(LOG_ID + "Guest Created, updating database...");
            let guestDetails = {
                "CustomerID": 0,
                "FirstName": guest.firstName,
                "LastName": guest.lastName,
                "StrID": guest.id,
                "jid_c": guest.jid_im,
                "Skill": req.skill
            };
            db.queueingReq(guestDetails)
                .then(result => {
                    console.log(LOG_ID + "Database updated, responding to fronted...");
                    let a = {
                        "agentAvailable": result.agentAvailable,
                        "jid_c": guest.jid_im,
                        "jid_a": result.jid_a,
                        "guest_login": guest.loginEmail,
                        "guest_password": guest.password,
                        "id_c": guest.id
                    };
                    resFE.send(a);
                    console.log(LOG_ID + "Responded to frontend");
                })
                .catch(error => {
                    resFE.send("error");
                    console.log(LOG_ID + error);
                });
        }).catch((err) => {
            resFE.send("error");
            console.log(LOG_ID + "guest creation fail");
            console.log(LOG_ID + err);
        });
    }

    async initAgents() {
        let contacts = this.nodeSDK.contacts.getAll();                                              // get current list of contacts
        let arrayUsers = await this.nodeSDK.admin.getAllUsers("small");                             // get all users in company
        let count = 0;
        return new Promise((resolve) => {
            console.log(LOG_ID + "Initializing agents...");
            arrayUsers.forEach((user) => {                                                       // loop through all users in company
                this.nodeSDK.contacts.getContactById(user.id, true).then((contact) => {         // get contact object from user.id
                    if (!(contact.roles.includes("admin") || contact.roles.includes("guest"))) {    // ignore if contact is admin or guest
                        if (!contacts.includes(contact)) {
                            this.nodeSDK.contacts.addToContactsList(contact).then(() => {           // if contact is not in list of contacts, add to list
                                this.sendAgent(contact).then(() => {                                // send agent detail to database
                                    count++;
                                    if (count === arrayUsers.length) {
                                        resolve();                                                  // resolve only after last iteration
                                    }
                                });
                            });
                        } else {
                            this.sendAgent(contact).then(() => {                                    // if contact is in list of contacts, send agent
                                count++;
                                if (count === arrayUsers.length) {
                                    resolve();                                                      // resolve only after last iteration
                                }
                            });
                        }
                    } else {
                        count++;
                        if (count === arrayUsers.length) {
                            resolve();                                                              // resolve only after last iteration
                        }
                    }
                });
            });
        });
    }

    sendAgent(contact) {
        return new Promise((resolve) => {
            console.log(LOG_ID + "Adding " + contact.displayName + " to database...");
            let skill = [];
            if (contact.tags !== undefined) {
                skill = contact.tags;
            }
            let agentDetails = {
                "AgentID": 0,
                "Skill1": skill[0],
                "Skill2": skill[1],
                "Skill3": skill[2],
                "Name": contact.displayName,
                "AvailStatus": contact.presence,
                "NumOfCus": 0,
                "jid_a": contact.jid_im
            };
            db.addingAgent(agentDetails).then(() => {
                resolve();
            });
        });
    }

    endCall(jid_a, id_c, jid_c, resFE) {
        console.log(LOG_ID + "Ending call...");
        this.nodeSDK.admin.deleteUser(id_c).then(() => {
            let agentDetails = {"jid_a": jid_a, "jid_c": jid_c};
            db.resolveCall(agentDetails)
                .then(res => {
                    console.log(LOG_ID + "User deleted");
                    resFE.send("User deleted");
                    console.log(LOG_ID + res);
                })
                .catch(error => {
                    console.log(LOG_ID + error);
                });
        }).catch((err) => {
            resFE.send("Error");
            console.log(LOG_ID + err);
        });
    }

    // TODO: bot for administrative purposes
    // User: Reroute customers
    // Admin: Add agent to database?

    // TODO: cancelCall
    // DB need to handle cancel call
    // called when guest cancel by closing tab before agent is assigned?
    /*cancelCall(guestDetails, resFE) {
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
    }*/


    /*
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

    get state() {
        return this.nodeSDK.state;
    }

    get version() {
        return this.nodeSDK.version;
    }

    get sdk() {
        return this.nodeSDK;
    }
    */
}

module.exports = new SDK();