
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
//Queueing of the Requests and connecting if agent is free once i receieve a http post request from Frontend/NodeJS backend
app.post('/cusreq', function(req,res){
    let sklist= ['one','two','three','four','five'];    
    connection.query("SELECT * FROM Skills",function(error,result,fields){
        let cushead = req.header('sk');
        let cusid = req.header('jid_c');
        let cus = req.body;
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
                                        res.send({jid_a:result[0].jid_a,jid_c:cusid,agentAvailable:true});
                                    }
                                });
                                
                        }
                           });
                    }


                    if(check == 0){
                        console.log('went into the check loop');
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
});
//promisifying the request(solve the async issue)
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
//set up new database ref
database = new Database({
    host: 'localhost',
    user:'root',
    password: 'root',
    database: 'queues',
    port:'3306',
    multipleStatements:true
})
// //resolution of request will result in the agent being connected to another customer from the Queue that his skills are applicable to 
// app.post('/cRes',function(req,res){
//     let sklist= ['one','two','three','four','five'];
//     var cuslist =[];
//     var TopCusList = [];
//     var chosenCusList =[];
//     database.query('SELECT * FROM Skills')
//     .then(rows =>{
//         someRows = rows;
//         for(i in rows){
//             sklist[i] = rows[i].Skill;
//         }
//         return database.query("SELECT * FROM Agent_Table WHERE jid_a=?",[req.body.jid_a]);
//     })
//     .then(rows =>{
//         for (i in sklist){
//             if(rows[0].Skill1 == sklist[i] || rows[0].Skill2 == sklist[i] || rows[0].Skill3 == sklist[i]){
//                 var ans = parseInt(i);
//                 cuslist.push(ans);
//             }
//         }
//         return database.query("SELECT MIN(CustomerID) FROM Q1");
//     })
//     .then(rows =>{
//         return database.query("SELECT * FROM Q1 WHERE CustomerID =?",[rows[0]["MIN(CustomerID)"]]);
//     })
//     .then(rows=>{
//         TopCusList.push(rows);
//         return database.query("SELECT MIN(CustomerID) FROM Q2");
//     })
//     .then(rows=>{
//         return database.query("SELECT * FROM Q2 WHERE CustomerID =?",[rows[0]["MIN(CustomerID)"]]);
//     })
//     .then(rows=>{
//         TopCusList.push(rows);
//         return database.query("SELECT MIN(CustomerID) FROM Q3");
//     })
//     .then(rows=>{
//         return database.query("SELECT * FROM Q3 WHERE CustomerID =?",[rows[0]["MIN(CustomerID)"]]);
//     })
//     .then(rows=>{
//         TopCusList.push(rows);
//         return database.close();
//     })
//     .then(()=>{
//         for(j in cuslist){
//             chosenCusList.push(TopCusList[cuslist[j]]);
//         }
//         var ans = chooseCustomer(chosenCusList);
//         var anstosend = ans[0];
//         res.send({jid_a:req.body.jid_a, jid_c:anstosend.JID_IM, agentAvailable : true});
//     })
// })

//resolution of request will result in the agent being connected to another customer from the Queue that his skills are applicable to 
app.post('/cRes',function(req,res){
    let sklist= ['one','two','three','four','five'];
    var cuslist =[];
    var TopCusList = [];
    var chosenCusList =[];
    var cusagent = "SET @idUpcomingCall = ?;SET @jid_a = ?;SET @jid_c = ?; \
        CALL CUSAGENT(@idUpcomingCall,@jid_a,@jid_c);";
    database.query('SELECT * FROM Skills')
    .then(rows =>{
        someRows = rows;
        for(i in rows){
            sklist[i] = rows[i].Skill;
        }
        return database.query("SELECT * FROM Agent_Table WHERE jid_a=?",[req.body.jid_a]);
    })
    .then(rows =>{
        for (i in sklist){
            if(rows[0].Skill1 == sklist[i] || rows[0].Skill2 == sklist[i] || rows[0].Skill3 == sklist[i]){
                var ans = parseInt(i);
                cuslist.push(ans);
            }
        }
        return database.query("SELECT MIN(CustomerID) FROM Q1");
    })
    .then(rows =>{
        return database.query("SELECT * FROM Q1 WHERE CustomerID =?",[rows[0]["MIN(CustomerID)"]]);
    })
    .then(rows=>{
        TopCusList.push(rows);
        return database.query("SELECT MIN(CustomerID) FROM Q2");
    })
    .then(rows=>{
        return database.query("SELECT * FROM Q2 WHERE CustomerID =?",[rows[0]["MIN(CustomerID)"]]);
    })
    .then(rows=>{
        TopCusList.push(rows);
        return database.query("SELECT MIN(CustomerID) FROM Q3");
    })
    .then(rows=>{
        return database.query("SELECT * FROM Q3 WHERE CustomerID =?",[rows[0]["MIN(CustomerID)"]]);
    })
    .then(rows=>{
        TopCusList.push(rows);
        return 1;
    })
    .then(rows=>{
        for(j in cuslist){
            chosenCusList.push(TopCusList[cuslist[j]]);
        }
        var ans = chooseCustomer(chosenCusList);
        var anstosend = ans[0];
        return {jid_a:req.body.jid_a, jid_c:anstosend.JID_IM, agentAvailable : true};
    })
    .then(rows=>{
        console.log(rows.jid_a);
        console.log(rows.jid_c);
        var chosenjid = rows.jid_c;
        if(rows.jid_c != null){
            database.query(cusagent,[0,rows.jid_a,rows.jid_c]);
            return chosenjid
        }
    })
    .then(rows=>{
        console.log("sent and deleted from Q1");
        database.query("DELETE FROM Q1 WHERE JID_IM =?",[rows]);
        return rows;
    })
    .then(rows=>{
        console.log("sent and deleted from Q2");
        database.query("DELETE FROM Q2 WHERE JID_IM =?",[rows]);
        return rows;
    })
    .then(rows=>{
        console.log("sent and deleted from Q3");
        return database.query("DELETE FROM Q3 WHERE JID_IM =?",[rows]);
    })
    .then(()=>{
        return database.close();
    })
})
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

/********************************************************************************************************************************************************/

//ADD Agent into Agent_Table
app.post('/add/agent',function(req,resp){
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
});
//method to assign a customer to a agent that is looking for a customer
async function AgentlookingforCustomer(sql,ag,res){
    let sklist= ['one','two','three','four','five'];
    var cuslist =[];
    var TopCusList = [];
    var chosenCusList =[];
    var cusagent = "SET @idUpcomingCall = ?;SET @jid_a = ?;SET @jid_c = ?; \
    CALL CUSAGENT(@idUpcomingCall,@jid_a,@jid_c);";
    try{
        await database.query(sql,[ag.jid_a,ag.jid_c]);
        const allskill = await database.query('SELECT * FROM Skills');
        console.log("forming sklist");
        for(i in allskill){
            sklist[i] = allskill[i].Skill;
        }
        console.log(sklist);
        // //update the database to available
        // await database.query(sql,[ag.jid_a,ag.AvailStatus]);
        const agentEntry = await database.query("SELECT * FROM Agent_Table WHERE jid_a=?",[ag.jid_a]);
        console.log(agentEntry);
        for (i in sklist){
            if(agentEntry[0].Skill1 == sklist[i] || agentEntry[0].Skill2 == sklist[i] || agentEntry[0].Skill3 == sklist[i]){
                var ans = parseInt(i);
                cuslist.push(ans);
            }
        }
        console.log(cuslist);
        // while(agentEntry[0].NumOfCus<3){
        for (z =0 ;z<3;z++){
            //console.log("while condition" + agentEntry[0].NumOfCus<3);
            const minfromq1 = await database.query("SELECT MIN(CustomerID) FROM Q1");
            // if(minfromq1['MIN(CustomerID)'] != null){
                const mincusfromq1 = await database.query("SELECT * FROM Q1 WHERE CustomerID =?",[minfromq1[0]["MIN(CustomerID)"]]);
                TopCusList.push(mincusfromq1);
            // }
            // const mincusfromq1 = await database.query("SELECT * FROM Q1 WHERE CustomerID =?",[minfromq1[0]["MIN(CustomerID)"]]);
            // if(mincusfromq1 != ""){
            //     TopCusList.push(mincusfromq1);
            // }
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
            console.log(chosenCusList);
            var ans = chooseCustomer(chosenCusList);
            if(ans == null){
                res.send("no entries to schedule to the agent");
                break;
            }
            console.log("break didnt work");
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
            // UpdateAgent(ag,res);
        }
    }catch(err){
        console.log(err);
    }
}





//SET AGENT TO AVAILABLE
app.post('/update/agent/avail',function(req,resp){
    let ag = req.body;
    var sql = "SET @jid_a = ?;SET @AvailStatus = ?; \
    CALL EDITAGENTAVAILENTRY(@jid_a,@AvailStatus);";

    // database.query("SELECT * FROM Agent_Table WHERE jid_a = ?",[ag.jid_a])
    //     .then(rows=>{
    //         count = rows[0].NumOfCus;
    //         console.log(count + "first");
    //         return count;
    
        // .then(rows=>{
        //     if (rows>=0){
        //         AgentlookingforCustomer(sql,ag);
        //         return rows-1;
        //     }
        // })
        // .then(rows=>{
        //     if (rows>=0){
        //         AgentlookingforCustomer(sql,ag);
        //         return rows-1;
        //     }
        // })
    AgentlookingforCustomer(sql,ag,resp);
});

//     let ag = req.body;
//     var sql = "SET @jid_a = ?;SET @AvailStatus = ?; \
//     CALL EDITAGENTAVAILENTRY(@jid_a,@AvailStatus);";
//     connection.query(sql,[ag.jid_a,ag.AvailStatus],function(error,rows,fields){
//     //callback function
//     if(!!error){
//         resp.send("update fail");
//         console.log(err);
//     }
//     else{
//         resp.send('update success');
//         console.log(ag);
//         //need to update to schedule into the upcoming calls new customer can use a for loop until the limit is reached, try to covert the prev part into a function first so that can reuse

// }
//     });






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

//Changes to AGENT when connection success
app.post('/update/cSuccess',function(req,res){
    // console.log("STARTCONNECTIONSUCCESS/n");
    let body = req.body;
    console.log(body);
    UpdateAgent(body,res);
})

//TO Query to see if there are available agents
app.get('/cusagent',function(req,res){
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
})
app.listen(1337);

