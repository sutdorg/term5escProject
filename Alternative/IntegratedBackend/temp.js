const express = require('express');
const mysql = require('mysql');
const app = express();
const cors = require('cors');
const bodyparser = require('body-parser');

class DB {
    constructor() {
        this.connection = null;
        this.database = null;
    }

    start(config) {
        this.connection = mysql.createConnection(config);

        this.connection.connect(function (error) {
            if (!!error) {
                console.log('Error');
            } else {
                console.log('connected');
            }
        });
    }

    query(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }

    queueingReq(guestDetails) {
        return new Promise((resolve, reject) => {
            let sklist = ['one', 'two', 'three', 'four', 'five'];
            this.connection.query("SELECT * FROM Skills", function (error, result) {
                let cus = guestDetails;
                let cushead = cus.Skill;
                let check = 0;
                let cussql1 = "SET @CustomerID = ?;SET @FirstName = ?; SET @LastName = ?; SET @StrID = ?; SET @JID_IM =?; SET @Skill = ?; \
        CALL EDITQ11ENTRY(@CustomerID,@FirstName,@LastName,@StrID,@JID_IM,@Skill);";
                let cussql2 = "SET @CustomerID = ?;SET @FirstName = ?; SET @LastName = ?; SET @StrID = ?; SET @JID_IM =?; SET @Skill = ?; \
        CALL EDITQ22ENTRY(@CustomerID,@FirstName,@LastName,@StrID,@JID_IM,@Skill);";
                let cussql3 = "SET @CustomerID = ?;SET @FirstName = ?; SET @LastName = ?; SET @StrID = ?; SET @JID_IM =?; SET @Skill = ?; \
        CALL EDITQ33ENTRY(@CustomerID,@FirstName,@LastName,@StrID,@JID_IM,@Skill);";
                let agentsql = "SET @AgentID = ?;SET @AvailStatus = ?;SET @NumOfCus = ?; \
        CALL AGENTSTATUS(@AgentID,@AvailStatus,@NumOfCus);";
                if (!!error) {
                    console.log("cannot retrieve the skills");
                    reject("ERROR: Failed to Retrieve Skills");
                } else {
                    for (let i = 0; i < result.length; i++) {
                        sklist[i] = result[i].Skill;
                    }
                    this.connection.query("SELECT * FROM Agent_Table", function (error, rows) {
                        /** @namespace rows.TimeAvail **/
                        if (!!error) {
                            console.log("fail to retrieve from agent_table");
                            reject("fail to retrieve from agent_table");
                        } else {
                            let earliestTime = null;
                            let agentChosen = null;
                            for (let i = 0; i < rows.length; i++) {
                                if (rows[i].Skill1 === cushead || rows[i].Skill2 === cushead || rows[i].Skill3 === cushead) {
                                    console.log("status " + rows[i].AvailStatus);
                                    if (rows[i].AvailStatus === 'Available') {
                                        console.log(rows[i].Name + " connect to Customer " + cus.FirstName);
                                        if (earliestTime == null) {
                                            earliestTime = rows[i].TimeAvail;
                                            agentChosen = i;
                                        } else if (earliestTime > rows[i].TimeAvail) {
                                            earliestTime = rows[i].TimeAvail;
                                            agentChosen = i;
                                        }
                                    } else {
                                        console.log(rows[i].AgentID + ' is not available right now');
                                    }
                                } else {
                                    console.log(rows[i].AgentID + ' does not have the required skills');
                                }
                            }
                            console.log("TESTING" + earliestTime + " " + agentChosen);
                            if (agentChosen != null) {
                                check = 1;
                                let chosen_jid = rows[agentChosen].jid_a;
                                let ag = {
                                    AgentID: rows[agentChosen].AgentID,
                                    AvailStatus: 'Busy',
                                    NumOfCus: rows[agentChosen].NumOfCus + 1
                                };
                                this.connection.query(agentsql, [ag.AgentID, ag.AvailStatus, ag.NumOfCus], function (error, rows, fields) {
                                    if (!!error) {
                                        console.log("update agent status fail");
                                        console.log(error);
                                    } else {
                                        let realagentChosen = parseInt(agentChosen) + 1;
                                        console.log(realagentChosen);
                                        console.log('update agent status success');
                                        //there is an issue here if the number is not ordered properly better to query for the jid_a and use it as the identifier instead
                                        this.connection.query("SELECT * FROM Agent_Table WHERE jid_a = ?", [chosen_jid], function (error, result, fields) {
                                            if (!!error) {
                                                console.log('Error in query AgentTable');
                                            } else {
                                                console.log(result[0].jid_a);
                                                resolve({
                                                    "jid_a": result[0].jid_a,
                                                    "jid_c": cus.jid_c,
                                                    "agentAvailable": true
                                                });
                                            }
                                        });

                                    }
                                }, this);
                            }

                            if (check === 0) {
                                console.log('went into the check loop');
                                console.log(sklist[0]);
                                if (cushead === sklist[0]) {
                                    console.log(cushead + " skill accepted");
                                    this.connection.query(cussql1, [cus.CustomerID, cus.FirstName, cus.LastName, cus.StrID, cus.jid_c, cus.Skill], function (error, result, fields) {
                                        if (!!error) {
                                            reject("update Q1 failed");
                                        } else {
                                            console.log("update Q1 success");
                                            reject({"agentAvailable": false});

                                        }

                                    });
                                } else if (cushead === sklist[1]) {
                                    console.log(cushead + " skill accepted");
                                    this.connection.query(cussql2, [cus.CustomerID, cus.FirstName, cus.LastName, cus.StrID, cus.jid_c, cus.Skill], function (error, result, fields) {
                                        if (!!error) {
                                            reject("update Q2 failed");
                                            console.log(error);
                                        } else {
                                            console.log("update Q2 success");
                                            reject({"agentAvailable": false});

                                        }

                                    });

                                } else if (cushead === sklist[2]) {
                                    console.log(cushead + " skill accepted");
                                    this.connection.query(cussql3, [cus.CustomerID, cus.FirstName, cus.LastName, cus.StrID, cus.jid_c, cus.Skill], function (error, result, fields) {
                                        if (!!error) {
                                            reject("update Q3 failed");
                                            console.log(error);
                                        } else {
                                            reject({"agentAvailable": false});
                                            console.log("update Q3 success");
                                        }

                                    });
                                } else {
                                    console.log("else1");
                                    reject(cushead + " not accpeted as a skill.");
                                }
                            }
                        }
                    }, this);
                }
            }, this);
        });
    }

    addingAgent(agentDetails) {
        return new Promise((resolve, reject) => {
            let ag = agentDetails;
            let sql = "SET @AgentID = ?;SET @Skill1 = ?;SET @Skill2 = ?;SET @Skill3 = ?;SET @Name = ?;SET @AvailStatus = ?;SET @NumOfCus = ?;SET @jid_a =?; \
    CALL CREATEAGENT(@AgentID,@Skill1,@Skill2,@Skill3,@Name,@AvailStatus,@NumOfCus,@jid_a);";
            this.connection.query(sql, [ag.AgentID, ag.Skill1, ag.Skill2, ag.Skill3, ag.Name, ag.AvailStatus, ag.NumOfCus, ag.jid_a], function (error, rows, fields) {
                //callback function
                if (!!error) {
                    reject(error);
                    console.log(error);
                } else {
                    console.log('update of id\n');
                    resolve();
                }
            });
        });
    }

    // need async? Yes, because he is using await..?
    // is using promise okay?
    // somewhat similar...
    async resolveCall(agentDetails, res) {
        let sklist = ['one', 'two', 'three', 'four', 'five'];
        let cuslist = [];
        let TopCusList = [];
        let chosenCusList = [];
        let cusagent = "SET @idUpcomingCall = ?;SET @jid_a = ?;SET @jid_c = ?; \
    CALL CUSAGENT(@idUpcomingCall,@jid_a,@jid_c);";
        let ag = agentDetails.jid_a;
        let sql = "SET @jid_a = ?;SET @AvailStatus = ?; \
    CALL EDITAGENTAVAILENTRY(@jid_a,@AvailStatus);";

        // TODO
        // fix duplicate
        function chooseCustomer(cusChosenList) {
            /** @namespace cusChosenList.TimeRegistered **/
            let mintime = null;
            let cusChosen = null;

            for (let i = 0; i < cusChosenList.length; i++) {
                if (cusChosenList[i] !== "" && cusChosenList[i] != null) {
                    console.log("entered non null" + i);
                    if (mintime == null) {
                        mintime = cusChosenList[i][0].TimeRegistered;
                        cusChosen = cusChosenList[i];
                    } else if (cusChosenList[i][0].TimeRegistered < mintime) {
                        mintime = cusChosenList[i][0].TimeRegistered;
                        cusChosen = cusChosenList[i];
                    }
                }
            }
            return cusChosen;
        }

        try {
            await this.database.query(sql, [ag.jid_a, ag.jid_c]);
            const allskill = await this.database.query('SELECT * FROM Skills');
            console.log("forming sklist");
            for (let i = 0; i < allskill.length; i++) {
                sklist[i] = allskill[i].Skill;
            }
            console.log(sklist);
            const agentEntry = await this.database.query("SELECT * FROM Agent_Table WHERE jid_a=?", [ag.jid_a]);
            console.log(agentEntry);
            for (let i = 0; i < sklist.length; i++) {
                if (agentEntry[0].Skill1 === sklist[i] || agentEntry[0].Skill2 === sklist[i] || agentEntry[0].Skill3 === sklist[i]) {
                    let ans = parseInt(i);
                    cuslist.push(ans);
                }
            }
            const minfromq1 = await this.database.query("SELECT MIN(CustomerID) FROM Q1");
            const mincusfromq1 = await this.database.query("SELECT * FROM Q1 WHERE CustomerID =?", [minfromq1[0]["MIN(CustomerID)"]]);
            TopCusList.push(mincusfromq1);
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
            console.log("adding only the queues with the correct skills");
            for (let j = 0; i < cuslist.length; i++) {
                chosenCusList.push(TopCusList[cuslist[j]]);
            }
            let ans = chooseCustomer(chosenCusList);
            if (ans == null) {
                console.log("no customers to be queued");
                return Promise.resolve({"status": "no customers to be queued"});
            } else {
                let anstosend = ans[0];
                let infotosend = {"jid_a": ag.jid_a, "jid_c": anstosend.jid_c, "agentAvailable": true};
                console.log("infotosend" + infotosend);
                let chosenjid = infotosend.jid_c;
                if (chosenjid != null) {
                    await this.database.query(cusagent, [0, infotosend.jid_a, chosenjid]);
                }
                await this.database.query("DELETE FROM Q1 WHERE JID_IM =?", [chosenjid]);
                console.log("sent and del from Q1");
                await this.database.query("DELETE FROM Q2 WHERE JID_IM =?", [chosenjid]);
                console.log("sent and deleted from Q2");
                await this.database.query("DELETE FROM Q3 WHERE JID_IM =?", [chosenjid]);
                console.log("sent and deleted from Q3");
                chosenCusList = [];
                TopCusList = [];
                console.log("customers are queued");
                return Promise.resolve({"status": "entry sent and Queued"});
            }
        } catch (err) {
            console.log(err);
            return Promise.reject(err);
        }
    }

    waiting(customerDetails, resFE) {
        this.connection.query("SELECT * FROM UpcomingCall WHERE jid_c =?", [customerDetails.jid_c], function (error, rows, fields) {
            /** @namespace rows.idUpcomingCall **/
            if (!!error) {
                resFE.send({"agentAvailable": false});
            } else {
                if (rows !== "") {
                    console.log(rows);
                    resFE.send({"jid_a": rows[0].jid_a, "jid_c": rows[0].jid_c, "agentAvailable": true});
                    this.connection.query("DELETE FROM UpcomingCall WHERE idUpcomingCall= ?", [rows[0].idUpcomingCall], function (error, rows, fields) {
                        if (!!error) {
                            console.log(error);
                        } else {
                            console.log('successful Deletion of id\n');
                        }
                    });
                } else {
                    resFE.send({"agentAvailable": false});
                }
            }
        })
    }

    onlineToOffline() {

    }

    offlineToOnline() {

    }

    close() {
        return new Promise((resolve, reject) => {
            this.connection.end(err => {
                if (err)
                    return reject(err);
                resolve();
            });
        });
    }

}

module.exports = new DB();