var express = require('express');
var mysql = require('mysql');
var app = express();
const cors = require('cors');
const bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(cors());

//to set up the connection
var connection = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password: 'root',
    database: 'queues',
    port:'3306',
    multipleStatements:true
});

//to test the connection
connection.connect(function(error){
    if(!!error){
        console.log('Error');
    }
    else{
        console.log('connected');
    }
});

//function to simplify database query
const mysql2 = require( 'mysql' );
class Database {
    constructor( config ) {
        this.connection = mysql2.createConnection( config );
    }
    query( sql, args ) {
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err );
                resolve( rows );
            } );
        } );
    }
    close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err )
                    return reject( err );
                resolve();
            } );
        } );
    }
}
//set up new database ref(alt method)
//this is an alternative method that i use for some of the logic once we confirm everything works i will port the initial logic using the old method to this one
database = new Database({
    host: 'localhost',
    user:'root',
    password: 'root',
    database: 'queues',
    port:'3306',
    multipleStatements:true
})


//Queueing of the Requests and connecting if agent is free once i receieve a http post request from Frontend/NodeJS backend
//Function
function QueueingReq(req,res){
    let sklist= ['one','two','three','four','five'];    
    connection.query("SELECT * FROM Skills",function(error,result,fields){
        let cusid = req.header('jid_c');
        let cus = req.body;
        let cushead = cus.Skill;
        var check = 0;
        var cussql1 = "SET @CustomerID = ?;SET @FirstName = ?; SET @LastName = ?; SET @StrID = ?; SET @JID_IM =?; SET @Skill = ?; \
        CALL EDITQ11ENTRY(@CustomerID,@FirstName,@LastName,@StrID,@JID_IM,@Skill);"; 
        var cussql2 = "SET @CustomerID = ?;SET @FirstName = ?; SET @LastName = ?; SET @StrID = ?; SET @JID_IM =?; SET @Skill = ?; \
        CALL EDITQ22ENTRY(@CustomerID,@FirstName,@LastName,@StrID,@JID_IM,@Skill);"; 
        var cussql3 = "SET @CustomerID = ?;SET @FirstName = ?; SET @LastName = ?; SET @StrID = ?; SET @JID_IM =?; SET @Skill = ?; \
        CALL EDITQ33ENTRY(@CustomerID,@FirstName,@LastName,@StrID,@JID_IM,@Skill);"; 
        var agentsql = "SET @AgentID = ?;SET @AvailStatus = ?;SET @NumOfCus = ?; \
        CALL AGENTSTATUS(@AgentID,@AvailStatus,@NumOfCus);";
        if(!!error){
            console.log("cannot retrieve the skills");
            res.send("ERROR: Failed to Retrieve Skills");
        }
        else{
            for (i in result){
                sklist[i] = result[i].Skill;
            }
            connection.query("SELECT * FROM Agent_Table",function(error,rows,fields){
                if(!!error){
                    console.log("fail to retrieve from agent_table");
                }
                else{
                    var earliestTime = null;
                    var agentChosen = null;
                    for(i in rows){
                        if(rows[i].Skill1 == cushead || rows[i].Skill2 == cushead || rows[i].Skill3 == cushead){
                            console.log("status " + rows[i].AvailStatus);
                            if(rows[i].AvailStatus == 'Available'){
                            // if(rows[i].AvailStatus == 'Available' && rows[i].NumOfCus<=3){
                                console.log(rows[i].Name + " connect to Customer " + cus.FirstName);
                                //res.send(rows[i].Name + " connect to Customer " + cus.FirstName);
                                if(earliestTime == null){
                                    earliestTime = rows[i].TimeAvail;
                                    agentChosen = i;
                                }
                                else if(earliestTime>rows[i].TimeAvail){
                                    earliestTime = rows[i].TimeAvail;
                                    agentChosen = i;
                                }
                            }
                            else{
                                console.log(rows[i].AgentID + ' is not available right now');
                            }
                        }
                        else{
                            console.log(rows[i].AgentID + ' does not have the required skills');
                        }
                    }
                    console.log("TESTING" + earliestTime + " " + agentChosen );
                    if(agentChosen != null){
                        check = 1;
                        chosen_jid = rows[agentChosen].jid_a;
                        let ag = { AgentID: rows[agentChosen].AgentID, AvailStatus: 'Busy', NumOfCus: rows[agentChosen].NumOfCus+1 }
                        connection.query(agentsql,[ag.AgentID,ag.AvailStatus,ag.NumOfCus],function(error,rows,fields){
                           
                            if(!!error){
                                console.log("update agent status fail");
                                console.log(err);
                            }
                            else{
                                var realagentChosen = parseInt(agentChosen)+1;
                                console.log(realagentChosen);
                                console.log('update agent status success');
                                //there is an issue here if the number is not ordered properly better to query for the jid_a and use it as the identifier instead
                                connection.query("SELECT * FROM Agent_Table WHERE jid_a = ?",[chosen_jid] ,function(error,result,fields){
                                    if(!!error){
                                        console.log('Error in query AgentTable');
                                    }
                                    else{
                                        console.log(result[0].jid_a);
                                        res.send({jid_a:result[0].jid_a,jid_c:cus.JID_IM,agentAvailable:true});
                                    }
                                });
                                
                        }
                           });
                    }

                    if(check == 0){
                        console.log('went into the check loop');
                        console.log(sklist[0]);
                        if(cushead == sklist[0]){
                            console.log(cushead +" skill accepted");
                            connection.query(cussql1,[cus.CustomerID,cus.FirstName,cus.LastName,cus.StrID,cus.JID_IM,cus.Skill],function(error,result,fields){
                                if(!!error){
                                    res.send("update Q1 failed");
                                }
                                else{
                                    console.log("update Q1 success");
                                    res.send({agentAvailable:false});
                                    
                                    }
                                
                            });
                        }
                        else if(cushead == sklist[1]){
                            console.log(cushead + " skill accepted");
                            connection.query(cussql2,[cus.CustomerID,cus.FirstName,cus.LastName,cus.StrID,cus.JID_IM,cus.Skill],function(error,result,fields){
                                if(!!error){
                                    res.send("update Q2 failed");
                                    console.log(error);
                                }
                                else{
                                    console.log("update Q2 success");
                                    res.send({agentAvailable:false});
                                    
                                    }
                                
                            });
            
                        }
                        else if(cushead == sklist[2]){
                            console.log(cushead + " skill accepted");
                            connection.query(cussql3,[cus.CustomerID,cus.FirstName,cus.LastName,cus.StrID,cus.JID_IM,cus.Skill],function(error,result,fields){
                                if(!!error){
                                    res.send("update Q3 failed");
                                    console.log(error);
                                }
                                else{
                                    console.log("update Q3 success");
                                    res.send({agentAvailable:false});
                                    
                                    }
                                
                            });
                        }
                        else{
                            console.log("else1");
                            res.send(cushead +" not accpeted as a skill.");
                        }
                    }
                    
                }
            });
        }
    });
}
//HTTP Post
//note for Shi Hui no longer need the any headers a anymore
app.post('/cusreq', function(req,res){
    QueueingReq(req,res);
});

// Resolving the call queueing the next customer to the agent if there is one in the waiting list
//Function
async function ResolveCall(req,res){
    let sklist= ['one','two','three','four','five'];
    var cuslist =[];
    var TopCusList = [];
    var chosenCusList =[];
    var cusagent = "SET @idUpcomingCall = ?;SET @jid_a = ?;SET @jid_c = ?; \
    CALL CUSAGENT(@idUpcomingCall,@jid_a,@jid_c);";
    let ag = req.body;
    var sql = "SET @jid_a = ?;SET @AvailStatus = ?; \
    CALL EDITAGENTAVAILENTRY(@jid_a,@AvailStatus);";
    try{
        await database.query(sql,[ag.jid_a,ag.jid_c]);
        const allskill = await database.query('SELECT * FROM Skills');
        console.log("forming sklist");
        for(i in allskill){
            sklist[i] = allskill[i].Skill;
        }
        console.log(sklist);
        const agentEntry = await database.query("SELECT * FROM Agent_Table WHERE jid_a=?",[ag.jid_a]);
        console.log(agentEntry);
        for (i in sklist){
            if(agentEntry[0].Skill1 == sklist[i] || agentEntry[0].Skill2 == sklist[i] || agentEntry[0].Skill3 == sklist[i]){
                var ans = parseInt(i);
                cuslist.push(ans);
            }
        }
            const minfromq1 = await database.query("SELECT MIN(CustomerID) FROM Q1");
            const mincusfromq1 = await database.query("SELECT * FROM Q1 WHERE CustomerID =?",[minfromq1[0]["MIN(CustomerID)"]]);
            TopCusList.push(mincusfromq1);
            var minfromq2 = await database.query("SELECT MIN(CustomerID) FROM Q2");
            var mincusfromq2 = await database.query("SELECT * FROM Q2 WHERE CustomerID =?",[minfromq2[0]["MIN(CustomerID)"]]);
            if(mincusfromq2 != ""){
                TopCusList.push(mincusfromq2);
            }
            var minfromq3 = await database.query("SELECT MIN(CustomerID) FROM Q3");
            var mincusfromq3 = await database.query("SELECT * FROM Q3 WHERE CustomerID =?",[minfromq3[0]["MIN(CustomerID)"]]);
            if(mincusfromq3 != ""){
                TopCusList.push(mincusfromq3);
            }
            console.log("adding only the queues with the correct skills");
            for(j in cuslist){
                chosenCusList.push(TopCusList[cuslist[j]]);
            }
            var ans = chooseCustomer(chosenCusList);
            if(ans == null){
                console.log("no customers to be queued");
                res.send("no entries to schedule to the agent");
            }
            else{
                var anstosend = ans[0];
                var infotosend = {jid_a:ag.jid_a, jid_c:anstosend.JID_IM, agentAvailable : true};
                console.log("infotosend" + infotosend);
                var chosenjid = infotosend.jid_c;
                if(chosenjid != null){
                    await database.query(cusagent,[0,infotosend.jid_a,chosenjid]);
                }
                await database.query("DELETE FROM Q1 WHERE JID_IM =?",[chosenjid]);
                console.log("sent and del from Q1");
                await database.query("DELETE FROM Q2 WHERE JID_IM =?",[chosenjid]);
                console.log("sent and deleted from Q2");  
                await database.query("DELETE FROM Q3 WHERE JID_IM =?",[chosenjid]);
                console.log("sent and deleted from Q3");
                chosenCusList = [];            
                TopCusList = [];
                console.log("customers are queued");
                res.send("entry sent and Queued");   
            }
            
    }catch(err){
        console.log(err);
    }
}
//Function to choose which Customer to pick from the Top in each list
function chooseCustomer(cusChosenList){
    var mintime = null;
    var cusChosen = null;
    for (i in cusChosenList){
        if(cusChosenList[i]!= "" && cusChosenList[i]!=null){
            console.log("entered non null" + i);
            if(mintime == null){
                mintime = cusChosenList[i][0].TimeRegistered;
                cusChosen = cusChosenList[i];
            }
            else if(cusChosenList[i][0].TimeRegistered < mintime){
                mintime = cusChosenList[i][0].TimeRegistered;
                cusChosen = cusChosenList[i];
            }
        }
    }
return cusChosen;
}
//resolution of request will result in the agent being connected to another customer from the Queue that his skills are applicable to 
app.post('/cRes',function(req,res){
    ResolveCall(req,res);
})

/********************************************************************************************************************************************************/
//ADD Agent into Agent_Table
//Function
function addingAgent(req,resp){
    let ag = req.body;
    var sql = "SET @AgentID = ?;SET @Skill1 = ?;SET @Skill2 = ?;SET @Skill3 = ?;SET @Name = ?;SET @AvailStatus = ?;SET @NumOfCus = ?;SET @jid_a =?; \
    CALL CREATEAGENT(@AgentID,@Skill1,@Skill2,@Skill3,@Name,@AvailStatus,@NumOfCus,@jid_a);";
    connection.query(sql,[ag.AgentID,ag.Skill1,ag.Skill2,ag.Skill3,ag.Name,ag.AvailStatus,ag.NumOfCus,ag.jid_a],function(error,rows,fields){
    //callback function
    if(!!error){
        resp.send("update fail");
        console.log(error);
    }
    else{
        console.log('update of id\n');
        resp.send('add success');
}
    });
}
//HTTP POST REQ
app.post('/add/agent',function(req,resp){
    addingAgent(req,resp);
});


//method to assign a customer to a agent that is looking for a customer(when agent goes from offline to online)
//Function
async function offlinetoOnline(req,res){
    var num = await AgentlookingforCustomer(req);
    UpdateAgentV2(req.body,res,num);
    return num;
}

//Function to update the agent when he comes online
function UpdateAgentV2(body,res,num){
    var sql = "SET @jid_a = ?;SET @NumOfCus = ?; SET @AvailStatus = ?; \
    CALL CSUCCESS(@jid_a,@NumOfCus,@AvailStatus);";
    connection.query("SELECT * FROM Agent_Table WHERE jid_a = ?",[body.jid_a] ,function(error,rows,fields){
        if(!!error){
            console.log('Error in query AgentTable');
        }
        else{
            console.log(rows);
            let bodybusy = {jid_a:body.jid_a , AvailStatus: 'Busy', NumOfCus: parseInt(rows[0].NumOfCus)+num};
            let bodynotbusy = {jid_a:body.jid_a , AvailStatus: 'Available', NumOfCus: parseInt(rows[0].NumOfCus)+num};
            console.log(rows);
            console.log('successful query for the AgentTable\n');
            if(parseInt(rows[0].NumOfCus)+num>3){
                // console.log(bodybusy.NumOfCus);
                connection.query(sql,[bodybusy.jid_a,bodybusy.NumOfCus,bodybusy.AvailStatus],function(error,rows,fields){
                    if(!!error){
                        res.send("connection fail to resolve(busy)");
                        console.log(error);
                    }
                    else{
                        res.send("connection resolved, now busy");
                    }
                   
                })
            }
            else{
                console.log(bodynotbusy.NumOfCus);
                connection.query(sql,[bodynotbusy.jid_a,bodynotbusy.NumOfCus,bodynotbusy.AvailStatus],function(error,rows,fields){
                    if(!!error){
                        res.send("connection fail to resolve(avail)");
                        console.log(error);
                    }
                    else{
                        console.log(rows);
                        
                    }
                });
            }

        }
    });

}
//function with logic to look for new cust
async function AgentlookingforCustomer(req){
    let sklist= ['one','two','three','four','five'];
    var cuslist =[];
    var TopCusList = [];
    var chosenCusList =[];
    var cusagent = "SET @idUpcomingCall = ?;SET @jid_a = ?;SET @jid_c = ?; \
    CALL CUSAGENT(@idUpcomingCall,@jid_a,@jid_c);";
    let ag = req.body;
    var sql = "SET @jid_a = ?;SET @AvailStatus = ?; \
    CALL EDITAGENTAVAILENTRY(@jid_a,@AvailStatus);";
    try{
        await database.query(sql,[ag.jid_a,ag.jid_c]);
        const allskill = await database.query('SELECT * FROM Skills');
        for(i in allskill){
            sklist[i] = allskill[i].Skill;
        }
        const agentEntry = await database.query("SELECT * FROM Agent_Table WHERE jid_a=?",[ag.jid_a]);
        console.log(agentEntry);
        for (i in sklist){
            if(agentEntry[0].Skill1 == sklist[i] || agentEntry[0].Skill2 == sklist[i] || agentEntry[0].Skill3 == sklist[i]){
                var ans = parseInt(i);
                cuslist.push(ans);
            }
        }
        for (z =0 ;z<3;z++){
            const minfromq1 = await database.query("SELECT MIN(CustomerID) FROM Q1");
            const mincusfromq1 = await database.query("SELECT * FROM Q1 WHERE CustomerID =?",[minfromq1[0]["MIN(CustomerID)"]]);
            TopCusList.push(mincusfromq1);
            var minfromq2 = await database.query("SELECT MIN(CustomerID) FROM Q2");
            var mincusfromq2 = await database.query("SELECT * FROM Q2 WHERE CustomerID =?",[minfromq2[0]["MIN(CustomerID)"]]);
            if(mincusfromq2 != ""){
                TopCusList.push(mincusfromq2);
            }
            var minfromq3 = await database.query("SELECT MIN(CustomerID) FROM Q3");
            var mincusfromq3 = await database.query("SELECT * FROM Q3 WHERE CustomerID =?",[minfromq3[0]["MIN(CustomerID)"]]);
            if(mincusfromq3 != ""){
                console.log(mincusfromq3)
                TopCusList.push(mincusfromq3);
            }
            console.log("adding only the queues with the correct skills");
            for(j in cuslist){
                chosenCusList.push(TopCusList[cuslist[j]]);
            }
            var ans = chooseCustomer(chosenCusList);
            if(ans == null){
                console.log("no customers avail for the agent");

                break;
            }
            var anstosend = ans[0];
            var infotosend = {jid_a:ag.jid_a, jid_c:anstosend.JID_IM, agentAvailable : true};
            console.log(infotosend);
            var chosenjid = infotosend.jid_c;
            if(chosenjid != null){
                await database.query(cusagent,[0,infotosend.jid_a,chosenjid]);
            }
            await database.query("DELETE FROM Q1 WHERE JID_IM =?",[chosenjid]);
            console.log("sent and del from Q1");
            
            await database.query("DELETE FROM Q2 WHERE JID_IM =?",[chosenjid]);
            console.log("sent and deleted from Q2");
            
            await database.query("DELETE FROM Q3 WHERE JID_IM =?",[chosenjid]);
            console.log("sent and deleted from Q3");
            chosenCusList = [];            
            TopCusList = [];
            console.log(z + " Customers have been scheduled"); 
        }
        return z;
    }catch(err){
        console.log(err);
    }
}
//HTTP Post
app.post('/update/agent/avail',async function(req,resp){
    var numtosubmit = await offlinetoOnline(req,resp);

    if(numtosubmit == 0){
        resp.send("there are no entries avail");
    }
    else{
        resp.send( numtosubmit + " entries have been queued for the agent");
    }
});


//Changes to AGENT to update an agent whenever the agent has been connected to a user(for normal new client connection)
//function
function UpdateAgent(body,res){
    var sql = "SET @jid_a = ?;SET @NumOfCus = ?; SET @AvailStatus = ?; \
    CALL CSUCCESS(@jid_a,@NumOfCus,@AvailStatus);";
    connection.query("SELECT * FROM Agent_Table WHERE jid_a = ?",[body.jid_a] ,function(error,rows,fields){
        if(!!error){
            console.log('Error in query AgentTable');
        }
        else{
            console.log(rows);
            let bodybusy = {jid_a:body.jid_a , AvailStatus: 'Busy', NumOfCus: parseInt(rows[0].NumOfCus)+1};
            let bodynotbusy = {jid_a:body.jid_a , AvailStatus: 'Available', NumOfCus: parseInt(rows[0].NumOfCus)+1};
            console.log(rows);
            console.log('successful query for the AgentTable\n');
            if(rows[0].NumOfCus>1){
                // console.log(bodybusy.NumOfCus);
                connection.query(sql,[bodybusy.jid_a,bodybusy.NumOfCus,bodybusy.AvailStatus],function(error,rows,fields){
                    if(!!error){
                        res.send("connection fail to resolve(busy)");
                        console.log(error);
                    }
                    else{
                        res.send("connection resolved, now busy");
                    }
                   
                })
            }
            else{
                console.log(bodynotbusy.NumOfCus);
                connection.query(sql,[bodynotbusy.jid_a,bodynotbusy.NumOfCus,bodynotbusy.AvailStatus],function(error,rows,fields){
                    if(!!error){
                        res.send("connection fail to resolve(avail)");
                        console.log(error);
                    }
                    else{
                        res.send("connection resolved, still Available");
                        console.log(rows);
                        
                    }
                });
            }

        }
    });

}
//HTTP Request
app.post('/update/cSuccess',function(req,res){
    // console.log("STARTCONNECTIONSUCCESS/n");
    let body = req.body;
    UpdateAgent(body,res);
})


//TO Query to see if there are available agents
//Function
function Waiting(req,res){
    let body = req.body;
    connection.query("SELECT * FROM UpcomingCall WHERE jid_c =?",[body.jid_c],function(error,rows,fields){
        if(!!error){
            res.send("fail to retrieve the entry");
        }
        else{
            if(rows!=""){
                console.log(rows);
                res.send({jid_a:rows[0].jid_a,jid_c:rows[0].jid_c});
                connection.query("DELETE FROM UpcomingCall WHERE idUpcomingCall= ?",[rows[0].idUpcomingCall],function(error,rows,fields){
                    if(!!error){
                        console.log(err);
                    }
                    else{
                        console.log('successful Deletion of id\n');
                    }
                });
            }
            else{
                res.send("no agent avail");
            }
            

        }
    })
}
//HTTP REQ
app.get('/cusagent',function(req,res){
    Waiting(req,res);
})

//To change Agent Status from online to offline
//function
function onlineToOffline(req,res){
    body = req.body;
    var sql = "SET @jid_a = ?;SET @NumOfCus = ?; SET @AvailStatus = ?; \
    CALL CSUCCESS(@jid_a,@NumOfCus,@AvailStatus);";
    connection.query("SELECT * FROM Agent_Table WHERE jid_a = ?",[body.jid_a] ,function(error,rows,fields){
        if(!!error){
            console.log('Error in query AgentTable');
        }
        else{
            console.log(rows);
            let bodyoffline = {jid_a:body.jid_a , AvailStatus: 'Offline', NumOfCus: 0};
            console.log(rows);
            console.log('successful query for the AgentTable\n');
            if(rows[0].NumOfCus == 0){
                connection.query(sql,[bodyoffline.jid_a,bodyoffline.NumOfCus,bodyoffline.AvailStatus],function(error,rows,fields){
                    if(!!error){
                        res.send("connection fail to resolve(busy)");
                        console.log(error);
                    }
                    else{
                        res.send("Agent has been set to Offline, Available to leave now");
                    }
                   
                })
            }
            else{
                res.send("cannot go offline you still have customers")
            }

        }
    });
}
//HTTP REQ
app.post('/gooffline',function(req,res){
    onlineToOffline(req,res);
});




/********************************************************************************************************************************/
/* THIS IS THE GROUP TO GET CUSTOMERS/AGENT */

//get customer from queue 1
app.get('/skill_1/:id',function(req,resp){
    connection.query("SELECT * FROM Q1 WHERE CustomerID = ?",[req.params.id] ,function(error,rows,fields){
        if(!!error){
            console.log('Error in query Queue1');
        }
        else{
            console.log('successful query for the Queue1\n');
            console.log(rows);
            resp.send(rows);
        }
    });
    });
// get Customer from Queue 2
app.get('/skill_2/:id',function(req,resp){
    connection.query("SELECT * FROM Q2 WHERE CustomerID = ?",[req.params.id] ,function(error,rows,fields){
        if(!!error){
            console.log('Error in query Queue2');
        }
        else{
            console.log('successful query for the Queue2\n');
            console.log(rows);
            resp.send(rows);
        }
    });
});
// Get Customer from Queue 3
app.get('/skill_3/:id',function(req,resp){
    connection.query("SELECT * FROM Q3 WHERE CustomerID = ?",[req.params.id] ,function(error,rows,fields){
        if(!!error){
            console.log('Error in query Queue3');
        }
        else{
            console.log('successful query for the Queue3\n');
            console.log(rows);
            resp.send(rows);
        }
    });
});

// Get Agent from AgentTable
app.get('/agent/:id',function(req,resp){
    connection.query("SELECT * FROM Agent_Table WHERE AgentID = ?",[req.params.id] ,function(error,rows,fields){
        if(!!error){
            console.log('Error in query AgentTable');
        }
        else{
            console.log('successful query for the AgentTable\n');
            console.log(rows);
            resp.send(rows);
        }
    });
});
/********************************************************************************************************************************/

/*DELETE REQUESTS CUSTOMERS IN QUEUES AS WELL AS AGENTS*/ 

// Delete Customers from queue 1
app.delete('/delete/skill_1/cID/:id',function(req,res){
    connection.query("DELETE FROM Q1 WHERE CustomerID= ?",[req.params.id],function(error,rows,fields){
        if(!!error){
            console.log(err);
        }
        else{
            console.log('successful Deletion of id\n');
            res.send('deleted entry'); 
        }
    });
});
//Delete Customers from queue 2
app.delete('/delete/skill_2/cID/:id',function(req,res){
    connection.query("DELETE FROM Q2 WHERE CustomerID= ?",[req.params.id],function(error,rows,fields){
        if(!!error){
            console.log("error");
            res.send("ERROR,no Entry");
        }
        else{
            console.log('successful Deletion of id\n');
            res.send('deleted entry');
        }
    });
});
//Delete Customers from queue 3
app.delete('/delete/skill_3/cID/:id',function(req,res){
    connection.query("DELETE FROM Q3 WHERE CustomerID= ?",[req.params.id],function(error,rows,fields){
        if(!!error){
            console.log(err);
        }
        else{
            console.log('successful Deletion of id\n');
            res.send('deleted entry');
        }
    });
});
//Delete Agent from AgentTable
app.delete('/delete/agent/cID/:id',function(req,res){
    connection.query("DELETE FROM Agent_Table WHERE AgentID= ?",[req.params.id],function(error,rows,fields){
        if(!!error){
            console.log(error);
        }
        else{
            console.log('successful Deletion of id from agent\n');
            res.send('deleted entry');
        }
    });
});


app.listen(80);

