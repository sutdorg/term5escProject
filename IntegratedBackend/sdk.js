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

            // event handler for contact presence change
            this.nodeSDK.events.on("rainbow_oncontactpresencechanged", (contact) => {
                console.log(LOG_ID + "Presence change detected");
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

            // event handler when server receives messages
            this.nodeSDK.events.on("rainbow_onmessagereceived", (message) => {
                console.log(LOG_ID + "message received");
                if (!message.fromJid.includes(this.nodeSDK.connectedUser.jid_im)) {
                    if (message.type === "chat" && message.content.startsWith("!")) {
                        this.processCommand(message);
                    }
                }
            });

            // event handler for rainbow ready
            this.nodeSDK.events.on("rainbow_onready", () => {
                console.log(LOG_ID + "rainbow started");
                this.initAgents().then(() => {
                    resolve();
                });
            });

            this.nodeSDK.start();
        });
    }

    /**
     * Initialize agents method: Called once on server startup to
     * 1) Add agents to database
     * 2) Add all users in company into contact list of admin
     * 3) Initiate first contact of bot with agent
     * @returns {Promise<void>}
     */
    async initAgents() {
        let arrayUsers = await this.nodeSDK.admin.getAllUsers("small");
        for (const user of arrayUsers) {
            let contact = await this.getContactByID(user.id, true);
            if (!(contact.roles.includes("admin") || contact.roles.includes("guest"))) {
                await this.sendAgent(contact);
                try {
                    await this.nodeSDK.contacts.addToContactsList(contact);
                    await this.nodeSDK.im.sendMessageToJid("Hello! Welcome to the company!", contact.jid_im);
                } catch (error) {
                    console.log(LOG_ID + error);
                }
            }
        }
    }

    /**
     * Send Agent method: Updates the database with agent details
     * @param contact   contact object obtained from rainbow with agent details
     * @param contact.displayName   Agent's display name
     * @param contact.tags          Agent's skills
     * @param contact.presence      Agent's current presence
     * @param contact.jid_im        Agent's IM id
     * @returns {Promise<void>}
     */
    async sendAgent(contact) {
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
        await db.addingAgent(agentDetails);
        console.log(LOG_ID + "Added " + contact.displayName + " to database")
    }

    /**
     * Guest creation method: Create guest using rainbow then forward to DB to queue guest
     * @param               body                  contains first_name, last_name, phone_number, skill
     * @param {string}      body.first_name       customer's first name
     * @param {string}      body.last_name        customer's last name
     * @param {string}      body.phone_number     customer's phone number
     * @param {string}      body.skill            customer's requested skill
     * @returns {Promise<{jid_a: string, agentAvailable: boolean, guest_login: string, guest_password: string, jid_c: string}>}
     */
    async createGuest(body) {
        console.log(LOG_ID + "Creating guest...");
        let guest = await this.nodeSDK.admin.createGuestUser(body.first_name, body.last_name, "en-US", 86400);
        console.log(LOG_ID + "Guest Created, updating database...");
        let guestDetails = {
            "CustomerID": 0,
            "FirstName": guest.firstName,
            "LastName": guest.lastName,
            "jid_c": guest.jid_im,
            "Skill": body.skill
        };
        let result = await db.queueingReq(guestDetails);
        console.log(LOG_ID + "Database updated, responding to fronted...");
        return {
            "agentAvailable": result.agentAvailable,
            "jid_c": guest.jid_im,
            "jid_a": result.jid_a,
            "guest_login": guest.loginEmail,
            "guest_password": guest.password
        };
    }

    /**
     * End call method: Delete guest from rainbow then forward to DB to resolve call
     * @param               body                  contains jid_c, jid_a
     * @param {string}      body.jid_c            customer's IM id
     * @param {string}      body.jid_a            agent's IM id
     * @returns {Promise<string>}
     */
    async endCall(body) {
        console.log(LOG_ID + "Ending call...");
        let user = await this.getContactByJID(body.jid_c);
        await this.nodeSDK.admin.deleteUser(user.id);
        let msg = await db.resolveCall(body);
        console.log(LOG_ID + msg);
        console.log(LOG_ID + "User deleted, call ended");
        return (msg);
    }

    /**
     * Cancel call method: Delete guest from rainbow then forward to DB to end waiting call
     * @param               body                  contains jid_c
     * @param {string}      body.jid_c            customer's IM id
     * @returns {Promise<string>}
     */
    async cancelCall(body) {
        console.log(LOG_ID + "Canceling call...");
        let user = await this.getContactByJID(body.jid_c);
        await this.nodeSDK.admin.deleteUser(user.id);
        let msg = await db.waitingEndCall(body);
        console.log(LOG_ID + msg);
        console.log(LOG_ID + "User deleted, call cancelled");
        return (msg);
    }

    /**
     * Process command method: To process all messages that the server receives that starts with '!'
     * @param message
     */
    processCommand(message) {
        let fullCommand = message.content.substr(1);
        let splitCommand = fullCommand.split(" ");
        let primaryCommand = splitCommand[0];
        let arg = splitCommand.slice(1);

        console.log(LOG_ID + "Command received: " + primaryCommand);
        console.log(LOG_ID + "Arguments: " + arguments);

        if (primaryCommand === "help") {
            this.helpCommand(arg, message);
        } else if (primaryCommand === "reroute") {
            this.rerouteCommand(arg, message);
        } else if (primaryCommand === "users") {
            this.usersCommand(arg, message);
        } else {
            this.nodeSDK.im.sendMessageToJid("Invalid command, try typing !help to see available commands", message.fromJid);
        }
    }

    /**
     * Help command method: To handle !help command, sends list of available commands
     * @param arg
     * @param message
     */
    helpCommand(arg, message) {
        let commandMsg = "Hello Agent!\n\n";
        commandMsg += "Type '!users' to see list of customers you are currently connected to\n";
        commandMsg += "Type '!reroute <Customerid> <skill>' to reroute user to another agent with the required skill";
        this.nodeSDK.im.sendMessageToJid(commandMsg, message.fromJid);
    }

    /**
     * Reroute command method: To handle !reroute command, routes indicated customer
     * @param {string[]}    arg         array of arguments
     * @param {string}      arg[0]      customer's String id
     * @param {string}      arg[1]      new skill to route customer to
     * @param               message
     */
    async rerouteCommand(arg, message) {
        if (arg.length !== 2) {
            this.nodeSDK.im.sendMessageToJid("Type '!reroute <Customerid> <skill>' to reroute user to another agent with the required skill", message.fromJid);
        } else {
            let contact = await this.getContactByID(arg[0]);
            let body = {"jid_c": contact.jid_im, "Skill": arg[1]};
            await db.rerouteCall(body);
            this.nodeSDK.im.sendMessageToJid("Customer has been rerouted!", message.fromJid);
        }
    }

    /**
     * Users command method: To handle !users command, sends list of customers currently handled by agent
     * @param arg
     * @param message
     */
    async usersCommand(arg, message) {
        let listOfCustomers = await db.pullCalllog(message.fromJid);
        let msgToSend = "You currently have " + listOfCustomers.length + " customers.\n";
        for (const customer of listOfCustomers) {
            let contact = await this.getContactByJID(customer.jid_c);
            msgToSend += "\n" + "Name: " + contact._displayName + "\nCustomer id: " + contact.id;
        }
        await this.nodeSDK.im.sendMessageToJid(msgToSend, message.fromJid);
    }

    /**
     * Get contact Method: Uses jid to get the contact object
     * @param {string} jid      user's jid to use for query
     * @returns {Promise<Contact|ErrorManager>}
     */
    async getContactByJID(jid) {
        return await this.nodeSDK.contacts.getContactByJid(jid);
    }

    /**
     * Get contact Method: Uses id to get the contact object
     * @param {string} id       user's id to use for query
     * @returns {Promise<Contact|ErrorManager>}
     */
    async getContactByID(id) {
        return await this.nodeSDK.contacts.getContactById(id);
    }

}

module.exports = new SDK();