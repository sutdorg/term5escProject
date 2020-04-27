const mysql = require('mysql');
const LOG_ID = "DB - ";
const ERROR = "error";
const sql = require("./sql.js");

//Database class to query databse
class Database {
    constructor(config) {
        this.connection = mysql.createConnection(config);
    }

    /**
     * Queries the Database
     * @param sql connection
     * @param args
     * @param {string} sql commands to access data from database
     */
    query(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, rows) => {
                if (err) {
                    console.log(LOG_ID + err);
                    reject(err);
                }
                resolve(rows);
            });
        });
    }
}

class DB {
    constructor() {
        this.database = null;
    }

    /**
     * Method to configure the database query
     * @param {config} config for database connection
     */
    start(config) {
        return new Promise((resolve, reject) => {
            this.database = new Database(config);
            this.database.connection.connect(function (error) {
                if (!!error) {
                    console.log(LOG_ID + "database failed to start");
                    console.log(LOG_ID + error);
                    reject();
                } else {
                    console.log(LOG_ID + 'database started');
                    resolve();
                }
            });
        });
    }

    /**
     * Method to Handle a new Request that has been created from the frontend by a new Guest
     * if available agent exists to answer call, give the ID of the agent with agentAvailable = true
     * else Queue agent into the appropriate queue and return agentAvailable = false
     * @param           cus
     * @param {int}     cus.CustomerID     set to 0 by default
     * @param {string}  cus.FirstName      first name of the guest
     * @param {string}  cus.StrID          Guest's string ID
     * @param {string}  cus.LastName       last name of the guest
     * @param {string}  cus.jid_c          Guest JID
     * @param {string}  cus.Skill          Skill that the guest is requesting for
     * @returns response data that is to be sent to frontend
     */
    async queueingReq(cus) {
        console.log(LOG_ID + "Queueing Request");
        try {
            let skills = await this.database.query("SELECT * FROM Skills");
            let agentDetails = await this.database.query("SELECT * FROM Agent_Table");
            let agentChosen = this.isThereAgentAvail(cus.Skill, agentDetails);
            if (agentChosen !== -1) {
                return await this.getAgent(agentDetails, cus, agentChosen, "queueingReq");
            } else {
                for (let i = 0; i < skills.length; i++) {
                    if (cus.Skill === skills[i].Skill) {
                        await this.database.query(sql.sqlEditEntry, [i, cus.FirstName, cus.LastName, cus.StrID, cus.jid_c, cus.Skill]);
                        console.log(LOG_ID + "updated Q" + i + " successfully");
                        return {"agentAvailable": false};
                    }
                }
            }
        } catch {
            // if any database query fail, will enter catch here...
            return ERROR;
        }
        console.log(LOG_ID + cus.Skill + " is not accepted as a skill");
        return ERROR;
    }

    /**
     * Method to reroute guest to appropriate agent if they chose a wrong skill
     * if agent is available queue the request into UpcomingCalls
     * else add the guest to the respective Skill queue
     * @param {string} cus.jid_c    Guest JID
     * @param {string} cus.Skill    New Skill to reroute to
     * @returns response data that is to be sent to frontend
     */
    async rerouteCall(cus) {
        console.log(LOG_ID + "Rerouting guest");
        try {
            let redirectedcusraw = await this.database.query("SELECT * FROM OngoingCalls WHERE jid_c = ?", [cus.jid_c]);
            let redirectedcus = redirectedcusraw[0];
            await this.updateAgentminuscus(redirectedcus);
            await this.database.query("DELETE FROM OngoingCalls WHERE jid_c = ?", [cus.jid_c]);
            let skills = await this.database.query("SELECT * FROM Skills");
            let agentDetails = await this.database.query("SELECT * FROM Agent_Table");
            let agentChosen = this.isThereAgentAvail(cus.Skill, agentDetails);
            if (agentChosen !== -1) {
                return await this.getAgent(agentDetails, redirectedcus, agentChosen, "rerouteCall");
            } else {
                for (let i = 0; i < skills.length; i++) {
                    if (cus.Skill === skills[i].Skill) {
                        await this.database.query(sql.sqlReroute, [i + 1, redirectedcus.FirstName, redirectedcus.LastName, redirectedcus.StrID, redirectedcus.jid_c, redirectedcus.Skill, redirectedcus.TimeRegistered]);
                        console.log(LOG_ID + "updated Q" + i + " successfully");
                        return {"agentAvailable": false};
                    }
                }
            }
        } catch {
            // if any database query fail, will enter catch here...
            return ERROR;
        }
        console.log(LOG_ID + "Skill not accepted");
        return ERROR;
    }

    /**
     *Method to update the status of the agent and also to add agent - guest pair to an ongoing call list when connected
     * @param agentDetails
     * @param guestDetails
     * @param agentChosen
     * @param from
     * @returns {Promise<string|{jid_a: *, agentAvailable: boolean, jid_c: string}>}
     */
    async getAgent(agentDetails, guestDetails, agentChosen, from) {
        let chosen_jid_a = agentDetails[agentChosen].jid_a;
        let agentCorrectAvailStatus;
        let doQuery;
        let rtime;
        if (from === "queueingReq") {
            doQuery = sql.sqlOngoingCall;
            rtime = null;
        } else {
            doQuery = sql.sqlCusAgent;
            rtime = guestDetails.TimeRegistered;
        }
        if (agentDetails[agentChosen].NumOfCus === 2) {
            agentCorrectAvailStatus = "Busy";
        } else {
            agentCorrectAvailStatus = agentDetails[agentChosen].AvailStatus;
        }

        let ag = {
            "AgentID": agentDetails[agentChosen].AgentID,
            "AvailStatus": agentCorrectAvailStatus,
            "NumOfCus": agentDetails[agentChosen].NumOfCus + 1
        };

        try {
            await this.database.query(sql.sqlAgent, [ag.AgentID, ag.AvailStatus, ag.NumOfCus]);
            await this.database.query(doQuery, [0, chosen_jid_a, guestDetails.jid_c, guestDetails.FirstName, guestDetails.LastName, guestDetails.StrID, rtime]);
        } catch (err) {
            // if any database query fail, will enter catch here...
            throw err;
        }
        return {"jid_a": chosen_jid_a, "jid_c": guestDetails.jid_c, "agentAvailable": true};
    }

    /**
     * Method to check if there is an available agent for the request with skill cushead
     * if available agent exists to answer call, return index of agent
     * else return null
     * @param {string} cusSkill Skill that the guest is requesting for
     * @param {JSON} agentDetails All details of the agents in the agent table
     * @returns {number} Index of Agent Chosen, returns -1 if no agent is available
     */
    isThereAgentAvail(cusSkill, agentDetails) {
        let earliestTime = null;
        let agentChosen = -1;
        let leastNumOfCus = null;
        for (let i = 0; i < agentDetails.length; i++) {
            if (agentDetails[i].Skill1 === cusSkill || agentDetails[i].Skill2 === cusSkill || agentDetails[i].Skill3 === cusSkill) {
                console.log(LOG_ID + "status " + agentDetails[i].AvailStatus);
                if (agentDetails[i].AvailStatus === 'Available') {
                    if (leastNumOfCus == null) {
                        leastNumOfCus = agentDetails[i].NumOfCus;
                        earliestTime = agentDetails[i].TimeAvail;
                        agentChosen = i;
                    } else if (leastNumOfCus > agentDetails[i].NumOfCus) {
                        leastNumOfCus = agentDetails[i].NumOfCus;
                        earliestTime = agentDetails[i].TimeAvail;
                        agentChosen = i;
                    } else if (leastNumOfCus === agentDetails[i].NumOfCus) {
                        if (earliestTime > agentDetails[i].TimeAvail) {
                            earliestTime = agentDetails[i].TimeAvail;
                            agentChosen = i;
                        }
                    }
                }
            }
        }
        return agentChosen;
    }

    /**
     * Method to handle Agent who has a call ended
     * if there is a guest with the appropriate skill, queue the agent-guest pair to the incoming calls table
     * else reduce the agent.NumOfCus and set agent.AvailStatus to "Available"
     * @param               agentDetails
     * @param {string}      agentDetails.jid_c            guest's JID
     * @param {string}      agentDetails.jid_a            agent's JID
     * @returns {String} Message stating that it has been handled
     */
    async resolveCall(agentDetails) {
        let ag = agentDetails;
        try {
            await this.database.query(sql.sqlAgentAvailSet, [ag.jid_a, "Online"]);
            await this.database.query("DELETE FROM OngoingCalls WHERE jid_c =?", [ag.jid_c]);
            const agentEntry = await this.database.query("SELECT * FROM Agent_Table WHERE jid_a=?", [ag.jid_a]);

            let cuslist = await this.getcuslist(agentEntry);
            let ans = await this.pushList(cuslist);
            if (ans == null) {
                await this.updateAgentminuscus(ag);
                console.log(LOG_ID, "no customers to be queued");
                return 1;
            } else {
                let anstosend = ans[0];
                let infotosend = {"jid_a": ag.jid_a, "jid_c": anstosend.JID_IM, "agentAvailable": true};
                let chosenjid = infotosend.jid_c;
                if (chosenjid != null) {
                    await this.database.query(sql.sqlCusAgent, [0, infotosend.jid_a, chosenjid, anstosend.FirstName, anstosend.LastName, anstosend.StrID, anstosend.TimeRegistered]);
                    let chosenagentdb = await this.database.query("SELECT * FROM Agent_Table WHERE jid_a =?", [infotosend.jid_a]);
                    if (chosenagentdb[0].NumOfCus === 3) {
                        await this.database.query(sql.sqlAgentAvailSet, [ag.jid_a, "Busy"])
                    }
                }
                console.log(LOG_ID + "Clearing the Customer from the Queue");
                await this.database.query("DELETE FROM Q1 WHERE JID_IM =?", [chosenjid]);
                await this.database.query("DELETE FROM Q2 WHERE JID_IM =?", [chosenjid]);
                await this.database.query("DELETE FROM Q3 WHERE JID_IM =?", [chosenjid]);
                console.log(LOG_ID + "entry sent and Queued");
                return 1;
            }
        } catch (err) {
            console.log(LOG_ID + err);
            return ERROR;
        }
    }

    /**
     * Method to update agent and reduce number of guests in event of call ending
     * @param {string}      body.jid_a          Agent's JID
     */
    async updateAgentminuscus(body) {
        try {
            let rows = await this.database.query("SELECT * FROM Agent_Table WHERE jid_a = ?", [body.jid_a]);
            let bodyag = {
                "jid_a": body.jid_a,
                "AvailStatus": 'Available',
                "NumOfCus": parseInt(rows[0].NumOfCus) - 1
            };
            return await this.database.query(sql.sqlAgentSet, [bodyag.jid_a, bodyag.NumOfCus, bodyag.AvailStatus]);
        } catch (err) {
            throw err;
        }
    }

    /**
     * Method to add agents into the agent table in the database
     * @param {int} ag.AgentID keep as 0 by default
     * @param {string} ag.Skill1 Skill1 that the Agent has, null if no skill
     * @param {string} ag.Skill2 Skill2 that the Agent has, null if no skill
     * @param {string} ag.Skill3 Skill3 that the Agent has, null if no skill
     * @param {string} ag.Name Name of Agent
     * @param {string} ag.AvailStatus Current Status of Agent
     * @param {int} ag.NumOfCus keep as 0 by default
     * @param {string} ag.jid_a Agent's JID
     * @returns {string} message that agent was successfully added
     */
    async addingAgent(ag) {
        console.log(LOG_ID + "Adding new Agent " + ag.Name);
        try {
            await this.database.query(sql.sqlAgentCreate, [ag.AgentID, ag.Skill1, ag.Skill2, ag.Skill3, ag.Name, ag.AvailStatus, ag.NumOfCus, ag.jid_a]);
            return 1;
        } catch (err) {
            throw err;
        }
    }


    /**
     * Method to set the agent status to change from online to offline
     * @param {string}      agentDetails.jid_a          Agent's JID
     * @returns {string} Message stating that the agent has been set to offline
     */
    async onlineToOffline(agentDetails) {
        console.log(LOG_ID + "Setting online to offline");
        try {
            let body = agentDetails;
            let rows = await this.database.query("SELECT * FROM Agent_Table WHERE jid_a = ?", [body.jid_a]);
            let bodyoffline = {
                "jid_a": body.jid_a,
                "AvailStatus": 'Offline',
                "NumOfCus": rows[0].NumOfCus
            };
            await this.database.query(sql.sqlAgentSet, [bodyoffline.jid_a, bodyoffline.NumOfCus, bodyoffline.AvailStatus]);
            return 1;
        } catch (err) {
            console.log(LOG_ID + err);
            return ERROR;
        }
    }

    /**
     * Method to set the agent status to change from offline to online
     * if there are guests that are waiting for a agent with his skill, set agent AvailStatus to Available and queue the pair into upcoming calls
     * else set agent to Available
     * @param {string}      agentDetails.jid_a          Agent's JID
     * @returns {string} Message stating that the agent has been set to online
     */
    async offlinetoOnline(agentDetails) {
        console.log(LOG_ID + "Setting offline to online");
        try {
            console.log(LOG_ID + "DB is looking for customers for Agent");
            let num = await this.agentLookingForCustomer(agentDetails);
            console.log(LOG_ID + "updating agent");
            await this.updateAgentOfftoOn(agentDetails, num);
            return 1;
        } catch (err) {
            console.log(LOG_ID + err);
            return ERROR;
        }
    }

    /**
     * Method to connect guests to agent that has just been set online
     * if there are guests that are waiting for a agent with his queues,queue agent-guest pair into upcoming calls
     * @param {string}      req.jid_a          Agent's JID
     * @returns {int}  returns number of guests that will be added to agent
     */
    async agentLookingForCustomer(req) {
        let ag = req;
        let z;
        let MaxNoCus = 3;
        try {
            const agentEntry = await this.database.query("SELECT * FROM Agent_Table WHERE jid_a=?", [ag.jid_a]);
            let cuslist = await this.getcuslist(agentEntry);
            for (z = 0; z < MaxNoCus - agentEntry[0].NumOfCus; z++) {
                let ans = await this.pushList(cuslist);
                if (ans == null) {
                    break;
                }
                let anstosend = ans[0];
                let infotosend = {
                    "jid_a": ag.jid_a,
                    "jid_c": anstosend.JID_IM,
                    "agentAvailable": true
                };
                let chosenjid = infotosend.jid_c;
                if (chosenjid != null) {
                    await this.database.query(sql.sqlCusAgent, [0, infotosend.jid_a, chosenjid, anstosend.FirstName, anstosend.LastName, anstosend.StrID, anstosend.TimeRegistered]);
                }
                await this.database.query("DELETE FROM Q1 WHERE JID_IM =?", [chosenjid]);
                await this.database.query("DELETE FROM Q2 WHERE JID_IM =?", [chosenjid]);
                await this.database.query("DELETE FROM Q3 WHERE JID_IM =?", [chosenjid]);

            }
            return z;
        } catch (err) {
            throw err;
        }
    }
    /**
     * Method to get a list contatining the index of the skills that the agent has
     * @param {int} agentEntry.AgentID keep as 0 by default
     * @param {string} agentEntry.Skill1 Skill1 that the Agent has, null if no skill
     * @param {string} agentEntry.Skill2 Skill2 that the Agent has, null if no skill
     * @param {string} agentEntry.Skill3 Skill3 that the Agent has, null if no skill
     * @param {string} agentEntry.Name Name of Agent
     * @param {string} agentEntry.AvailStatus Current Status of Agent
     * @param {int} agentEntry.NumOfCus keep as 0 by default
     * @param {string} agentEntry.jid_a Agent's JID     
     * @returns {Array} array of index for the skills that the agent has
     */
    async getcuslist(agentEntry) {
        let sklist = ['one', 'two', 'three', 'four', 'five'];
        let cuslist = [];
        try {
            const allskill = await this.database.query('SELECT * FROM Skills');
            for (let i = 0; i < allskill.length; i++) {
                sklist[i] = allskill[i].Skill;
            }
            for (let i = 0; i < sklist.length; i++) {
                if (agentEntry[0].Skill1 === sklist[i] || agentEntry[0].Skill2 === sklist[i] || agentEntry[0].Skill3 === sklist[i]) {
                    cuslist.push(i);
                }
            }
            return cuslist;
        } catch (err) {
            throw err;
        }

    }
    /**
     * Method to choose the guest that the agent is supposed to connect with 
     * @param cuslist array of index for the skills that the agent has
     * @returns {Array} array of index for the skills that the agent has
     */
    async pushList(cuslist) {
        let TopCusList = [];
        let chosenCusList = [];
        try {
            let minfromq1 = await this.database.query("SELECT MIN(CustomerID) FROM Q1");
            let mincusfromq1 = await this.database.query("SELECT * FROM Q1 WHERE CustomerID =?", [minfromq1[0]["MIN(CustomerID)"]]);
            if (mincusfromq1 !== "") {
                TopCusList.push(mincusfromq1);
            }
            let minfromq2 = await this.database.query("SELECT MIN(CustomerID) FROM Q2");
            let mincusfromq2 = await this.database.query("SELECT * FROM Q2 WHERE CustomerID =?", [minfromq2[0]["MIN(CustomerID)"]]);
            if (mincusfromq2 !== "") {
                TopCusList.push(mincusfromq2);
            }
            let minfromq3 = await this.database.query("SELECT MIN(CustomerID) FROM Q3");
            let mincusfromq3 = await this.database.query("SELECT * FROM Q3 WHERE CustomerID =?", [minfromq3[0]["MIN(CustomerID)"]]);
            if (mincusfromq3 !== "") {
                TopCusList.push(mincusfromq3);
            }
            for (let j = 0; j < cuslist.length; j++) {
                chosenCusList.push(TopCusList[cuslist[j]]);
            }
            return this.chooseCustomer(chosenCusList);
        } catch (err) {
            throw err;
        }
    }

    /**
     * Method to Choose guest to connect to available agent based on the earliest time given the earliest entries in each relevant queue
     * @param {Array} cusChosenList List of guest's database entries who are on the top of the different skill queues
     * @returns {Array} Array only containing guest to be connected in index 0
     */
    chooseCustomer(cusChosenList) {
        let mintime = null;
        let cusChosen = null;

        for (let i = 0; i < cusChosenList.length; i++) {
            if (cusChosenList[i] != "" && cusChosenList[i] != null) {
                if (mintime == null || (cusChosenList[i][0].TimeRegistered < mintime)) {
                    mintime = cusChosenList[i][0].TimeRegistered;
                    cusChosen = cusChosenList[i];
                }
            }
        }
        console.log(LOG_ID + "Customer chosen" + cusChosen);
        return cusChosen;
    }

    /**
     * Updates status of a agent that has gone from offline to online
     * if there are agent that are waiting for a agent with his skill,set agent AvailStatus to Available and increase the NumOfCus of Agent by num
     * else set agent AvailStatus to Available
     * @param {string}      body.jid_a          Agent's JID
     * @param {int}         num                 number of new guests to this agent
     *
     */
    async updateAgentOfftoOn(body, num) {
        try {
            let rows = await this.database.query("SELECT * FROM Agent_Table WHERE jid_a = ?", [body.jid_a]);
            let bodybusy = {
                "jid_a": body.jid_a,
                "AvailStatus": 'Busy',
                "NumOfCus": parseInt(rows[0].NumOfCus) + num
            };
            let bodynotbusy = {
                "jid_a": body.jid_a,
                "AvailStatus": 'Available',
                "NumOfCus": parseInt(rows[0].NumOfCus) + num
            };
            if (parseInt(rows[0].NumOfCus) + num > 2) {
                await this.database.query(sql.sqlAgentSet, [bodybusy.jid_a, bodybusy.NumOfCus, bodybusy.AvailStatus]);
                console.log(LOG_ID + "connection resolved,now Busy");
            } else {
                await this.database.query(sql.sqlAgentSet, [bodynotbusy.jid_a, bodynotbusy.NumOfCus, bodynotbusy.AvailStatus]);
                console.log(LOG_ID + "connection resolved,still Available");
            }
            return 1;
        } catch (err) {
            // if any database query fail, will enter catch here...
            throw err;
        }

    }

    /**
     * Method to send agent information to waiting guest, if exists in upcoming call tables
     * if there is an agent to connect to the guest, send agent jid and agent Available to be true
     * else agentAvailable to be false
     * @param {string}      guestDetails.jid_c           customer's JID
     * @param guestDetails
     * @returns {{"jid_a": string, "jid_c": string, "agentAvailable": boolean}}
     */
    async waiting(guestDetails) {
        console.log(LOG_ID, "Checking waiting");
        try {
            let rows = await this.database.query("SELECT * FROM UpcomingCall WHERE jid_c =?", [guestDetails.jid_c]);
            if (rows[0] !== null && typeof (rows[0]) !== 'undefined') {
                await this.database.query("DELETE FROM UpcomingCall WHERE idUpcomingCall= ?", [rows[0].idUpcomingCall]);
                await this.database.query(sql.sqlOngoingCall, [0, rows[0].jid_a, rows[0].jid_c, rows[0].FirstName, rows[0].LastName, rows[0].StrID, rows[0].TimeRegistered]);
                return ({"jid_a": rows[0].jid_a, "jid_c": rows[0].jid_c, "agentAvailable": true});
            } else {

                return {"agentAvailable": false};
            }
        } catch (err) {
            console.log(LOG_ID + err);
            return {"agentAvailable": false};
        }

    }


    /**
     * Method to query OngoingCalls table
     * @param {string}      body          Agent's JID
     * @return {Object} All entries of OngoingCalls involving Agent
     */
    async pullCalllog(body) {
        console.log(LOG_ID, "pulling list of ongoing calls");
        try {
            return await this.database.query("SELECT * FROM OngoingCalls WHERE jid_a = ?", [body]);
        } catch (err) {
            console.log(LOG_ID + err);
            return ERROR;
        }
    }

    /**
     * Method to handle close of tab when Guest is still in waiting room
     * @param {string}      body.jid_c          guest's JID
     * @return {String} Message indicating guest has been removed from Skill Queues
     */
    async waitingEndCall(body) {
        console.log(LOG_ID, "customer cancelled call, deleting customer from queue");
        try {
            await this.database.query("DELETE FROM Q1 WHERE JID_IM = ?", [body.jid_c]);
            await this.database.query("DELETE FROM Q2 WHERE JID_IM = ?", [body.jid_c]);
            await this.database.query("DELETE FROM Q3 WHERE JID_IM = ?", [body.jid_c]);
            console.log(LOG_ID + "Customer with jid_c" + body.jid_c + " has been removed from the queues");
            return 1;
        } catch (err) {
            console.log(LOG_ID + err);
            return ERROR;
        }
    }

}


module.exports = new DB();

