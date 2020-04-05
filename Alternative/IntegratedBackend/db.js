const mysql = require('mysql');
const Database = require('./database.js');

const LOG_ID = "DB - ";

class DB {
    constructor() {
        this.connection = null;
        this.database = null;
    }

    start(configConn, configDatabase) {
        return new Promise((resolve, reject) => {
            this.connection = mysql.createConnection(configConn);
            this.database = new Database(configDatabase);
            this.connection.connect(function (error) {
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
            this.connection.query("SELECT * FROM Skills", (error, result) => {
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
                    console.log(LOG_ID + "cannot retrieve the skills");
                    reject("ERROR: Failed to Retrieve Skills");
                } else {
                    for (let i = 0; i < result.length; i++) {
                        sklist[i] = result[i].Skill;
                    }
                    this.connection.query("SELECT * FROM Agent_Table", (error, rows) => {
                        if (!!error) {
                            console.log(LOG_ID + "fail to retrieve from agent_table");
                            reject("fail to retrieve from agent_table");
                        } else {
                            let earliestTime = null;
                            let agentChosen = null;
                            for (let i = 0; i < rows.length; i++) {
                                if (rows[i].Skill1 === cushead || rows[i].Skill2 === cushead || rows[i].Skill3 === cushead) {
                                    console.log(LOG_ID + "status " + rows[i].AvailStatus);
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
                                        console.log(LOG_ID + rows[i].AgentID + ' is not available right now');
                                    }
                                } else {
                                    console.log(LOG_ID + rows[i].AgentID + ' does not have the required skills');
                                }
                            }
                            console.log(LOG_ID + "TESTING" + earliestTime + " " + agentChosen);
                            if (agentChosen != null) {
                                check = 1;
                                let chosen_jid = rows[agentChosen].jid_a;
                                let ag = {
                                    AgentID: rows[agentChosen].AgentID,
                                    AvailStatus: 'Busy',
                                    NumOfCus: rows[agentChosen].NumOfCus + 1
                                };
                                this.connection.query(agentsql, [ag.AgentID, ag.AvailStatus, ag.NumOfCus], (error, rows, fields) => {
                                    if (!!error) {
                                        console.log(LOG_ID + "update agent status fail");
                                        console.log(LOG_ID + error);
                                    } else {
                                        let realagentChosen = parseInt(agentChosen) + 1;
                                        console.log(LOG_ID + realagentChosen);
                                        console.log(LOG_ID + 'update agent status success');
                                        //there is an issue here if the number is not ordered properly better to query for the jid_a and use it as the identifier instead
                                        this.connection.query("SELECT * FROM Agent_Table WHERE jid_a = ?", [chosen_jid], (error, result, fields) => {
                                            if (!!error) {
                                                console.log(LOG_ID + 'Error in query AgentTable');
                                            } else {
                                                console.log(LOG_ID + result[0].jid_a);
                                                resolve({
                                                    "jid_a": result[0].jid_a,
                                                    "jid_c": cus.jid_c,
                                                    "agentAvailable": true
                                                });
                                            }
                                        });
                                    }
                                });
                            }

                            if (check === 0) {
                                console.log(LOG_ID + 'went into the check loop');
                                console.log(LOG_ID + sklist[0]);
                                if (cushead === sklist[0]) {
                                    console.log(LOG_ID + cushead + " skill accepted");
                                    this.connection.query(cussql1, [cus.CustomerID, cus.FirstName, cus.LastName, cus.StrID, cus.jid_c, cus.Skill], (error, result, fields) => {
                                        if (!!error) {
                                            reject("update Q1 failed");
                                        } else {
                                            console.log(LOG_ID + "update Q1 success");
                                            resolve({"agentAvailable": false});
                                        }
                                    });
                                } else if (cushead === sklist[1]) {
                                    console.log(LOG_ID + cushead + " skill accepted");
                                    this.connection.query(cussql2, [cus.CustomerID, cus.FirstName, cus.LastName, cus.StrID, cus.jid_c, cus.Skill], (error, result, fields) => {
                                        if (!!error) {
                                            console.log(LOG_ID + error);
                                            reject("update Q2 failed");
                                        } else {
                                            console.log(LOG_ID + "update Q2 success");
                                            resolve({"agentAvailable": false});
                                        }
                                    });
                                } else if (cushead === sklist[2]) {
                                    console.log(LOG_ID + cushead + " skill accepted");
                                    this.connection.query(cussql3, [cus.CustomerID, cus.FirstName, cus.LastName, cus.StrID, cus.jid_c, cus.Skill], (error, result, fields) => {
                                        if (!!error) {
                                            console.log(LOG_ID + error);
                                            reject("update Q3 failed");
                                        } else {
                                            console.log(LOG_ID + "update Q3 success");
                                            resolve({"agentAvailable": false});
                                        }
                                    });
                                } else {
                                    console.log(LOG_ID + "else1");
                                    reject(cushead + " not accpeted as a skill.");
                                }
                            }
                        }
                    });
                }
            });
        });
    }

    addingAgent(agentDetails) {
        return new Promise((resolve, reject) => {
            let ag = agentDetails;
            let sql = "SET @AgentID = ?;SET @Skill1 = ?;SET @Skill2 = ?;SET @Skill3 = ?;SET @Name = ?;SET @AvailStatus = ?;SET @NumOfCus = ?;SET @jid_a =?; \
                       CALL CREATEAGENT(@AgentID,@Skill1,@Skill2,@Skill3,@Name,@AvailStatus,@NumOfCus,@jid_a);";
            this.connection.query(sql, [ag.AgentID, ag.Skill1, ag.Skill2, ag.Skill3, ag.Name, ag.AvailStatus, ag.NumOfCus, ag.jid_a], (error, rows, fields) => {
                //callback function
                if (!!error) {
                    reject(error);
                    console.log(LOG_ID + error);
                } else {
                    console.log(LOG_ID + 'update of id\n');
                    resolve("agent added");
                }
            });
        });
    }

    chooseCustomer(cusChosenList) {
        let mintime = null;
        let cusChosen = null;

        for (let i = 0; i < cusChosenList.length; i++) {
            if (cusChosenList[i] !== "" && cusChosenList[i] != null) {
                console.log(LOG_ID + "entered non null" + i);
                if (mintime == null || (cusChosenList[i][0].TimeRegistered < mintime)) {
                    mintime = cusChosenList[i][0].TimeRegistered;
                    cusChosen = cusChosenList[i];
                }
            }
        }
        return cusChosen;
    }

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

        try {
            await this.database.query(sql, [ag.jid_a, ag.jid_c]);
            const allskill = await this.database.query('SELECT * FROM Skills');
            console.log("LOG_ID + forming sklist");
            for (let i = 0; i < allskill.length; i++) {
                sklist[i] = allskill[i].Skill;
            }
            console.log(LOG_ID + sklist);
            const agentEntry = await this.database.query("SELECT * FROM Agent_Table WHERE jid_a=?", [ag.jid_a]);
            console.log(LOG_ID + agentEntry);
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
            console.log(LOG_ID + "adding only the queues with the correct skills");
            for (let j = 0; i < cuslist.length; i++) {
                chosenCusList.push(TopCusList[cuslist[j]]);
            }
            let ans = this.chooseCustomer(chosenCusList);
            if (ans == null) {
                console.log(LOG_ID + "no customers to be queued");
                return Promise.resolve("no customers to be queued");
            } else {
                let anstosend = ans[0];
                let infotosend = {"jid_a": ag.jid_a, "jid_c": anstosend.jid_c, "agentAvailable": true};
                console.log(LOG_ID + "infotosend" + infotosend);
                let chosenjid = infotosend.jid_c;
                if (chosenjid != null) {
                    await this.database.query(cusagent, [0, infotosend.jid_a, chosenjid]);
                }
                await this.database.query("DELETE FROM Q1 WHERE JID_IM =?", [chosenjid]);
                console.log(LOG_ID + "sent and del from Q1");
                await this.database.query("DELETE FROM Q2 WHERE JID_IM =?", [chosenjid]);
                console.log(LOG_ID + "sent and deleted from Q2");
                await this.database.query("DELETE FROM Q3 WHERE JID_IM =?", [chosenjid]);
                console.log(LOG_ID + "sent and deleted from Q3");
                chosenCusList = [];
                TopCusList = [];
                console.log(LOG_ID + "customers are queued");
                return Promise.resolve("entry sent and Queued");
            }
        } catch (err) {
            console.log(LOG_ID + err);
            return Promise.reject(err);
        }
    }

    waiting(guestDetails, resFE) {
        this.connection.query("SELECT * FROM UpcomingCall WHERE jid_c =?", [guestDetails.jid_c], (error, rows, fields) => {
            if (!!error) {
                resFE.send({"agentAvailable": false});
            } else {
                if (rows !== "") {
                    console.log(LOG_ID + rows);
                    resFE.send({"jid_a": rows[0].jid_a, "jid_c": rows[0].jid_c, "agentAvailable": true});
                    this.connection.query("DELETE FROM UpcomingCall WHERE idUpcomingCall= ?", [rows[0].idUpcomingCall], (error, rows, fields) => {
                        if (!!error) {
                            console.log(LOG_ID + error);
                        } else {
                            console.log(LOG_ID + 'successful Deletion of id\n');
                        }
                    });
                } else {
                    resFE.send({"agentAvailable": false});
                }
            }
        });
    }

    onlineToOffline(agentDetails) {
        let body = agentDetails;
        let sql = "SET @jid_a = ?;SET @NumOfCus = ?; SET @AvailStatus = ?; \
                   CALL CSUCCESS(@jid_a,@NumOfCus,@AvailStatus);";
        this.connection.query("SELECT * FROM Agent_Table WHERE jid_a = ?", [body.jid_a], (error, rows, fields) => {
            if (!!error) {
                console.log(LOG_ID + 'Error in query AgentTable');
            } else {
                console.log(LOG_ID + rows);
                let bodyoffline = {jid_a: body.jid_a, AvailStatus: 'Offline', NumOfCus: 0};
                console.log(LOG_ID + rows);
                console.log(LOG_ID + 'successful query for the AgentTable\n');
                if (rows[0].NumOfCus === 0) {
                    this.connection.query(sql, [bodyoffline.jid_a, bodyoffline.NumOfCus, bodyoffline.AvailStatus], (error, rows, fields) => {
                        if (!!error) {
                            console.log(LOG_ID + "connection fail to resolve(busy)");
                            console.log(LOG_ID + error);
                        } else {
                            console.log(LOG_ID + "Agent has been set to Offline, Available to leave now");
                            console.log(LOG_ID + error);
                        }
                    });
                } else {
                    // TODO: Disconnect customer and redirect to another agent?
                    console.log(LOG_ID + error);
                    console.log(LOG_ID + "cannot go offline you still have customers");
                }
            }
        });
    }

    offlinetoOnline(agentDetails) {
        this.agentLookingForCustomer(agentDetails).then(num => {
            this.updateAgent2(agentDetails, num);
        });
    }

    updateAgent2(body, num) {
        let sql = "SET @jid_a = ?;SET @NumOfCus = ?; SET @AvailStatus = ?; \
                   CALL CSUCCESS(@jid_a,@NumOfCus,@AvailStatus);";
        this.connection.query("SELECT * FROM Agent_Table WHERE jid_a = ?", [body.jid_a], (error, rows, fields) => {
            if (!!error) {
                console.log(LOG_ID + 'Error in query AgentTable');
            } else {
                console.log(LOG_ID + rows);
                let bodybusy = {jid_a: body.jid_a, AvailStatus: 'Busy', NumOfCus: parseInt(rows[0].NumOfCus) + num};
                let bodynotbusy = {
                    jid_a: body.jid_a,
                    AvailStatus: 'Available',
                    NumOfCus: parseInt(rows[0].NumOfCus) + num
                };
                console.log(LOG_ID + rows);
                console.log(LOG_ID + 'successful query for the AgentTable\n');
                if (parseInt(rows[0].NumOfCus) + num > 3) {
                    console.log(LOG_ID + bodybusy.NumOfCus);
                    this.connection.query(sql, [bodybusy.jid_a, bodybusy.NumOfCus, bodybusy.AvailStatus], (error, rows, fields) => {
                        if (!!error) {
                            console.log(LOG_ID + "connection fail to resolve(busy)");
                            console.log(LOG_ID + error);
                        } else {
                            console.log(LOG_ID + "connection resolved, now busy");
                        }
                    });
                } else {
                    console.log(LOG_ID + bodynotbusy.NumOfCus);
                    this.connection.query(sql, [bodynotbusy.jid_a, bodynotbusy.NumOfCus, bodynotbusy.AvailStatus], (error, rows, fields) => {
                        if (!!error) {
                            console.log(LOG_ID + "connection fail to resolve(busy)");
                            console.log(LOG_ID + error);
                        } else {
                            console.log(LOG_ID + rows);
                        }
                    });
                }
            }
        });
    }

    async agentLookingForCustomer(req) {
        let sklist = ['one', 'two', 'three', 'four', 'five'];
        let cuslist = [];
        let TopCusList = [];
        let chosenCusList = [];
        let cusagent = "SET @idUpcomingCall = ?;SET @jid_a = ?;SET @jid_c = ?; \
                        CALL CUSAGENT(@idUpcomingCall,@jid_a,@jid_c);";
        let ag = req.body;
        let sql = "SET @jid_a = ?;SET @AvailStatus = ?; \
                   CALL EDITAGENTAVAILENTRY(@jid_a,@AvailStatus);";
        try {
            await this.database.query(sql, [ag.jid_a, ag.jid_c]);
            const allskill = await this.database.query('SELECT * FROM Skills');
            for (let i = 0; i < allskill.length; i++) {
                sklist[i] = allskill[i].Skill;
            }
            const agentEntry = await this.database.query("SELECT * FROM Agent_Table WHERE jid_a=?", [ag.jid_a]);
            console.log(LOG_ID + agentEntry);
            for (let i = 0; i < sklist.length; i++) {
                if (agentEntry[0].Skill1 === sklist[i] || agentEntry[0].Skill2 === sklist[i] || agentEntry[0].Skill3 === sklist[i]) {
                    let ans = parseInt(i);
                    cuslist.push(ans);
                }
            }
            let z;
            for (z = 0; z < 3; z++) {
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
                    console.log(LOG_ID + mincusfromq3);
                    TopCusList.push(mincusfromq3);
                }
                console.log(LOG_ID + "adding only the queues with the correct skills");
                for (let j = 0; j < cuslist.length; j++) {
                    chosenCusList.push(TopCusList[cuslist[j]]);
                }
                let ans = this.chooseCustomer(chosenCusList);
                if (ans == null) {
                    console.log(LOG_ID + "no customers avail for the agent");
                    break;
                }
                let anstosend = ans[0];
                let infotosend = {jid_a: ag.jid_a, jid_c: anstosend.JID_IM, agentAvailable: true};
                console.log(LOG_ID + infotosend);
                let chosenjid = infotosend.jid_c;
                if (chosenjid != null) {
                    await this.database.query(cusagent, [0, infotosend.jid_a, chosenjid]);
                }
                await this.database.query("DELETE FROM Q1 WHERE JID_IM =?", [chosenjid]);
                console.log(LOG_ID + "sent and del from Q1");

                await this.database.query("DELETE FROM Q2 WHERE JID_IM =?", [chosenjid]);
                console.log(LOG_ID + "sent and deleted from Q2");

                await this.database.query("DELETE FROM Q3 WHERE JID_IM =?", [chosenjid]);
                console.log(LOG_ID + "sent and deleted from Q3");
                chosenCusList = [];
                TopCusList = [];
                console.log(z + " Customers have been scheduled");
            }
            return Promise.resolve(z);
        } catch (err) {
            console.log(LOG_ID + err);
        }
    }

    updateAgent(body, res) {
        let sql = "SET @jid_a = ?;SET @NumOfCus = ?; SET @AvailStatus = ?; \
                    CALL CSUCCESS(@jid_a,@NumOfCus,@AvailStatus);";
        this.connection.query("SELECT * FROM Agent_Table WHERE jid_a = ?", [body.jid_a], (error, rows, fields) => {
            if (!!error) {
                console.log(LOG_ID + 'Error in query AgentTable');
            } else {
                console.log(LOG_ID + rows);
                let bodybusy = {jid_a: body.jid_a, AvailStatus: 'Busy', NumOfCus: parseInt(rows[0].NumOfCus) + 1};
                let bodynotbusy = {
                    jid_a: body.jid_a,
                    AvailStatus: 'Available',
                    NumOfCus: parseInt(rows[0].NumOfCus) + 1
                };
                console.log(LOG_ID + rows);
                console.log(LOG_ID + 'successful query for the AgentTable\n');
                if (rows[0].NumOfCus > 1) {
                    // console.log(bodybusy.NumOfCus);
                    this.connection.query(sql, [bodybusy.jid_a, bodybusy.NumOfCus, bodybusy.AvailStatus], (error, rows, fields) => {
                        if (!!error) {
                            res.send("connection fail to resolve(busy)");
                            console.log(LOG_ID + error);
                        } else {
                            res.send("connection resolved, now busy");
                        }
                    });
                } else {
                    console.log(LOG_ID + bodynotbusy.NumOfCus);
                    this.connection.query(sql, [bodynotbusy.jid_a, bodynotbusy.NumOfCus, bodynotbusy.AvailStatus], (error, rows, fields) => {
                        if (!!error) {
                            res.send("connection fail to resolve(avail)");
                            console.log(LOG_ID + error);
                        } else {
                            res.send("connection resolved, still Available");
                            console.log(LOG_ID + rows);

                        }
                    });
                }
            }
        });
    }

    /*close() {
        return new Promise((resolve, reject) => {
            this.connection.end(err => {
                if (err)
                    return reject(err);
                resolve();
            });
        });
    }*/

}

module.exports = new DB();
