const mysql = require('mysql');

const LOG_ID = "DB - ";

class Database {
    constructor(config) {
        this.connection = mysql.createConnection(config);
    }

    query(sql, args) {
        return new Promise((resolve) => {
            this.connection.query(sql, args, (err, rows) => {
                if (err)
                    resolve(null);
                resolve(rows);
            });
        });
    }
}

class DB {
    constructor() {
        this.database = null;
    }

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


    async queueingReq(guestDetails) {
        let sklist = ['one', 'two', 'three', 'four', 'five'];
        let cus = guestDetails;
        console.log(LOG_ID + cus);
        let cushead = cus.Skill;
        console.log(LOG_ID + "this is cushead" + cushead);
        let cussql1 = "SET @CustomerID = ?;SET @FirstName = ?; SET @LastName = ?; SET @StrID = ?; SET @JID_IM =?; SET @Skill = ?; \
                       CALL EDITQ11ENTRY(@CustomerID,@FirstName,@LastName,@StrID,@JID_IM,@Skill);";
        let cussql2 = "SET @CustomerID = ?;SET @FirstName = ?; SET @LastName = ?; SET @StrID = ?; SET @JID_IM =?; SET @Skill = ?; \
                       CALL EDITQ22ENTRY(@CustomerID,@FirstName,@LastName,@StrID,@JID_IM,@Skill);";
        let cussql3 = "SET @CustomerID = ?;SET @FirstName = ?; SET @LastName = ?; SET @StrID = ?; SET @JID_IM =?; SET @Skill = ?; \
                       CALL EDITQ33ENTRY(@CustomerID,@FirstName,@LastName,@StrID,@JID_IM,@Skill);";
        let agentsql = "SET @AgentID = ?;SET @AvailStatus = ?;SET @NumOfCus = ?; \
                        CALL AGENTSTATUS(@AgentID,@AvailStatus,@NumOfCus);";
        let ongoingcall = "SET @CALLID = ?;SET @jid_a = ?; SET @jid_c = ?;\
                        CALL ONGOING(@CALLID,@jid_a,@jid_c)";
        let skills = await this.database.query("SELECT * FROM Skills");
        for (let i = 0; i < skills.length; i++) {
            sklist[i] = skills[i].Skill;
        }
        let agentDetails = await this.database.query("SELECT * FROM Agent_Table");
        let earliestTime = null;
        let agentChosen = null;
        for (let i = 0; i < agentDetails.length; i++) {
            if (agentDetails[i].Skill1 === cushead || agentDetails[i].Skill2 === cushead || agentDetails[i].Skill3 === cushead) {
                console.log(LOG_ID + "status " + agentDetails[i].AvailStatus);
                if (agentDetails[i].AvailStatus === 'Available') {
                    //console.log(agentDetails[i].Name + " connect to Customer " + cus.FirstName);
                    if (earliestTime == null) {
                        earliestTime = agentDetails[i].TimeAvail;
                        agentChosen = i;
                    } else if (earliestTime > agentDetails[i].TimeAvail) {
                        earliestTime = agentDetails[i].TimeAvail;
                        agentChosen = i;
                    }
                } else {
                    console.log(LOG_ID + agentDetails[i].AgentID + ' is not available right now');
                }
            } else {
                console.log(LOG_ID + agentDetails[i].AgentID + ' does not have the required skills');
            }
        }

        if (agentChosen != null) {
            console.log(LOG_ID + agentChosen);
            console.log(LOG_ID + agentDetails);
            console.log(LOG_ID + "the agent chosen is" + agentDetails[agentChosen]);
            let chosen_jid = agentDetails[agentChosen].jid_a;
            let agentcorrectAvailStatus = null;
            if (agentDetails[agentChosen].NumOfCus === 2) {
                agentcorrectAvailStatus = "Busy";
            } else {
                agentcorrectAvailStatus = agentDetails[agentChosen].AvailStatus;
            }
            let ag = {
                "AgentID": agentDetails[agentChosen].AgentID,
                "AvailStatus": agentcorrectAvailStatus,
                "NumOfCus": agentDetails[agentChosen].NumOfCus + 1
            };
            await this.database.query(agentsql, [ag.AgentID, ag.AvailStatus, ag.NumOfCus]);
            let realagentChosen = parseInt(agentChosen) + 1;
            console.log(LOG_ID + realagentChosen);
            console.log(LOG_ID + 'update agent status success');
            //there is an issue here if the number is not ordered properly better to query for the jid_a and use it as the identifier instead
            console.log(LOG_ID + chosen_jid);
            await this.database.query(ongoingcall,[chosen_jid,cus.jid_c]);
            return Promise.resolve({"jid_a": chosen_jid, "jid_c": cus.jid_c, "agentAvailable": true});
        }

        console.log(LOG_ID + cushead);
        console.log(LOG_ID + sklist);
        console.log(LOG_ID + "cus.skill", cus.Skill);
        console.log(LOG_ID + 'went into the check loop');
        console.log(LOG_ID + sklist[0]);
        if (cushead === sklist[0]) {
            console.log(LOG_ID + cushead + " skill accepted");
            let db1 = await this.database.query(cussql1, [cus.CustomerID, cus.FirstName, cus.LastName, cus.StrID, cus.jid_c, cus.Skill]);
            console.log(LOG_ID + "update Q1 success");
            return Promise.resolve({"agentAvailable": false});
        } else if (cushead === sklist[1]) {
            console.log(LOG_ID + cushead + " skill accepted");
            let db2 = await this.database.query(cussql2, [cus.CustomerID, cus.FirstName, cus.LastName, cus.StrID, cus.jid_c, cus.Skill]);
            console.log(LOG_ID + "update Q2 success");
            return Promise.resolve({"agentAvailable": false});
        } else if (cushead === sklist[2]) {
            console.log(LOG_ID + cushead + " skill accepted");
            let db3 = await this.database.query(cussql3, [cus.CustomerID, cus.FirstName, cus.LastName, cus.StrID, cus.jid_c, cus.Skill]);
            console.log(LOG_ID + "update Q3 success");
            return Promise.resolve({"agentAvailable": false});
        } else {
            console.log(LOG_ID + "else1");
            return Promise.reject(cushead + " not accpeted as a skill.");
        }

    }

    async addingAgent(agentDetails) {
        let ag = agentDetails;
        let sql = "SET @AgentID = ?;SET @Skill1 = ?;SET @Skill2 = ?;SET @Skill3 = ?;SET @Name = ?;SET @AvailStatus = ?;SET @NumOfCus = ?;SET @jid_a =?; \
                   CALL CREATEAGENT(@AgentID,@Skill1,@Skill2,@Skill3,@Name,@AvailStatus,@NumOfCus,@jid_a);";
        let rows = await this.database.query(sql, [ag.AgentID, ag.Skill1, ag.Skill2, ag.Skill3, ag.Name, ag.AvailStatus, ag.NumOfCus, ag.jid_a]);
        if (rows === null) {
            console.log(LOG_ID + "error");
            return Promise.reject();
        } else {
            console.log(LOG_ID + 'update of id\n');
            return Promise.resolve("agent added");
        }
    }

    chooseCustomer(cusChosenList) {
        let mintime = null;
        let cusChosen = null;

        for (let i = 0; i < cusChosenList.length; i++) {
            if (cusChosenList[i] != "" && cusChosenList[i] != null) {
                console.log(LOG_ID + "entered non null" + i);
                if (mintime == null || (cusChosenList[i][0].TimeRegistered < mintime)) {
                    console.log(LOG_ID + "enter if statement");
                    mintime = cusChosenList[i][0].TimeRegistered;
                    cusChosen = cusChosenList[i];
                    console.log(LOG_ID + cusChosen);
                }
            }
        }
        return cusChosen;
    }

    async resolveCall(agentDetails) {
        let sklist = ['one', 'two', 'three', 'four', 'five'];
        let cuslist = [];
        let TopCusList = [];
        let chosenCusList = [];
        let cusagent = "SET @idUpcomingCall = ?;SET @jid_a = ?;SET @jid_c = ?; \
                        CALL CUSAGENT(@idUpcomingCall,@jid_a,@jid_c);";
        let ag = agentDetails;
        let sql = "SET @jid_a = ?;SET @AvailStatus = ?; \
                   CALL EDITAGENTAVAILENTRY(@jid_a,@AvailStatus);";

        try {
            await this.database.query(sql, [ag.jid_a, "Online"]);
            const allskill = await this.database.query('SELECT * FROM Skills');
            console.log(LOG_ID + "forming sklist");
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
            for (let j = 0; j < cuslist.length; j++) {
                chosenCusList.push(TopCusList[cuslist[j]]);
            }
            let ans = this.chooseCustomer(chosenCusList);
            console.log(LOG_ID + "ans is ", ans);
            if (ans == null) {
                console.log(LOG_ID + "no customers to be queued");
                await this.updateAgentminuscus(ag);
                return Promise.resolve("no customers to be queued");
            } else {
                let anstosend = ans[0];
                console.log(LOG_ID + "anstosend is ", anstosend);
                let infotosend = {"jid_a": ag.jid_a, "jid_c": anstosend.JID_IM, "agentAvailable": true};
                console.log(LOG_ID + "infotosend" + infotosend);
                let chosenjid = infotosend.jid_c;
                console.log(LOG_ID + chosenjid);
                if (chosenjid != null) {
                    console.log(LOG_ID + "add to table");
                    await this.database.query(cusagent, [0, infotosend.jid_a, chosenjid]);
                }
                await this.database.query("DELETE FROM Q1 WHERE JID_IM =?", [chosenjid]);
                console.log(LOG_ID + "sent and del from Q1");
                await this.database.query("DELETE FROM Q2 WHERE JID_IM =?", [chosenjid]);
                console.log(LOG_ID + "sent and deleted from Q2");
                await this.database.query("DELETE FROM Q3 WHERE JID_IM =?", [chosenjid]);
                console.log(LOG_ID + "sent and deleted from Q3");
                console.log(LOG_ID + "customers are queued");
                return Promise.resolve("entry sent and Queued");
            }
        } catch (err) {
            console.log(LOG_ID + err);
            return Promise.reject(err);
        }
    }

    async waiting(guestDetails, resFE) {
        let ongoingcall = "SET @CALLID = ?;SET @jid_a = ?; SET @jid_c = ?;\
        CALL ONGOING(@CALLID,@jid_a,@jid_c)";
        let rows = await this.database.query("SELECT * FROM UpcomingCall WHERE jid_c =?", [guestDetails.jid_c]);
        if (rows !== null || typeof (rows[0]) !== 'undefined') {
            console.log(LOG_ID + rows);
            resFE.send({"jid_a": rows[0].jid_a, "jid_c": rows[0].jid_c, "agentAvailable": true});
            await this.database.query("DELETE FROM UpcomingCall WHERE idUpcomingCall= ?", [rows[0].idUpcomingCall]);
            console.log(LOG_ID + 'successful Deletion of id\n');
            await this.database.query(ongoingcall,[0,rows[0].jid_a,rows[0].jid_c]);
            console.log("added entry to Ongoing");
        } else {
            resFE.send({"agentAvailable": false});
        }
    }

    async onlineToOffline(agentDetails) {
        let body = agentDetails;
        let sql = "SET @jid_a = ?;SET @NumOfCus = ?; SET @AvailStatus = ?; \
                   CALL CSUCCESS(@jid_a,@NumOfCus,@AvailStatus);";
        let rows = await this.database.query("SELECT * FROM Agent_Table WHERE jid_a = ?", [body.jid_a]);
        console.log(LOG_ID + rows);
        let bodyoffline = {
            "jid_a": body.jid_a,
            "AvailStatus": 'Offline',
            "NumOfCus": 0
        };
        console.log(LOG_ID + rows);
        console.log(LOG_ID + 'successful query for the AgentTable\n');
        if (rows !== null && rows[0].NumOfCus === 0) {
            await this.database.query(sql, [bodyoffline.jid_a, bodyoffline.NumOfCus, bodyoffline.AvailStatus]);
            console.log(LOG_ID + "Agent has been set to Offline, Available to leave now");
        } else {
            // TODO: Disconnect customer and redirect to another agent?
            console.log(LOG_ID + "cannot go offline you still have customers");
        }
    }

    offlinetoOnline(agentDetails) {
        this.agentLookingForCustomer(agentDetails).then(num => {
            this.updateAgentOfftoOn(agentDetails, num);
        });
    }

    async updateAgentOfftoOn(body, num) {
        let sql = "SET @jid_a = ?;SET @NumOfCus = ?; SET @AvailStatus = ?; \
                   CALL CSUCCESS(@jid_a,@NumOfCus,@AvailStatus);";
        let rows = await this.database.query("SELECT * FROM Agent_Table WHERE jid_a = ?", [body.jid_a]);
        console.log(LOG_ID + rows);
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
        console.log(LOG_ID + rows);
        console.log(LOG_ID + 'successful query for the AgentTable\n');
        if (parseInt(rows[0].NumOfCus) + num > 3) {
            console.log(LOG_ID + bodybusy.NumOfCus);
            await this.database.query(sql, [bodybusy.jid_a, bodybusy.NumOfCus, bodybusy.AvailStatus]);
            console.log(LOG_ID + "connection resolved, now busy");
        } else {
            console.log(LOG_ID + bodynotbusy.NumOfCus);
            await this.database.query(sql, [bodynotbusy.jid_a, bodynotbusy.NumOfCus, bodynotbusy.AvailStatus]);
            console.log(LOG_ID + "connection resolved,still Avail");
        }
    }

    async agentLookingForCustomer(req) {
        let sklist = ['one', 'two', 'three', 'four', 'five'];
        let cuslist = [];
        let TopCusList = [];
        let chosenCusList = [];
        let cusagent = "SET @idUpcomingCall = ?;SET @jid_a = ?;SET @jid_c = ?; \
                        CALL CUSAGENT(@idUpcomingCall,@jid_a,@jid_c);";
        let ag = req;
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
                console.log(LOG_ID + "chosenCusList", chosenCusList);
                let ans = this.chooseCustomer(chosenCusList);
                if (ans == null) {
                    console.log(LOG_ID + "no customers avail for the agent");
                    break;
                }
                let anstosend = ans[0];
                let infotosend = {
                    "jid_a": ag.jid_a,
                    "jid_c": anstosend.JID_IM,
                    "agentAvailable": true
                };
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

    async updateAgent(body, res) {
        let sql = "SET @jid_a = ?;SET @NumOfCus = ?; SET @AvailStatus = ?; \
                    CALL CSUCCESS(@jid_a,@NumOfCus,@AvailStatus);";
        let rows = await this.database.query("SELECT * FROM Agent_Table WHERE jid_a = ?", [body.jid_a]);
        if (rows === null) {
            console.log(LOG_ID + 'Error in query AgentTable');
        } else {
            console.log(LOG_ID + rows);
            let bodybusy = {
                "jid_a": body.jid_a,
                "AvailStatus": 'Busy',
                "NumOfCus": parseInt(rows[0].NumOfCus) + 1
            };
            let bodynotbusy = {
                "jid_a": body.jid_a,
                "AvailStatus": 'Available',
                "NumOfCus": parseInt(rows[0].NumOfCus) + 1
            };
            console.log(LOG_ID + rows);
            console.log(LOG_ID + 'successful query for the AgentTable\n');
            if (rows[0].NumOfCus > 1) {
                let rows = await this.database.query(sql, [bodybusy.jid_a, bodybusy.NumOfCus, bodybusy.AvailStatus]);
                if (rows === null) {
                    res.send("connection fail to resolve(busy)");
                } else {
                    res.send("connection resolved, now busy");
                }
            } else {
                console.log(LOG_ID + bodynotbusy.NumOfCus);
                let rows = await this.database.query(sql, [bodynotbusy.jid_a, bodynotbusy.NumOfCus, bodynotbusy.AvailStatus]);
                if (rows === null) {
                    res.send("connection fail to resolve(avail)");
                } else {
                    res.send("connection resolved, still Available");
                }
            }
        }
    }

    async updateAgentminuscus(body) {
        let sql = "SET @jid_a = ?;SET @NumOfCus = ?; SET @AvailStatus = ?; \
                    CALL CSUCCESS(@jid_a,@NumOfCus,@AvailStatus);";
        let rows = await this.database.query("SELECT * FROM Agent_Table WHERE jid_a = ?", [body.jid_a]);
        let bodyag = {
            "jid_a": body.jid_a,
            "AvailStatus": 'Available',
            "NumOfCus": parseInt(rows[0].NumOfCus) - 1
        };
        console.log(LOG_ID + rows);
        console.log(LOG_ID + 'successful query for the AgentTable\n');
        console.log(LOG_ID + bodyag.NumOfCus);
        await this.database.query(sql, [bodyag.jid_a, bodyag.NumOfCus, bodyag.AvailStatus]);
    }
    async pullCalllog(body){
    let agentcus = await this.database.query("SELECT * FROM OngoingCalls WHERE jid_a = ?",[body.jid_a]);
    return Promise.resolve(agentcus);
    }
}

module.exports = new DB();