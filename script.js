var express = require('express');
var mysql = require('mysql');
var app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.json());
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
                        let ag = { AgentID: rows[agentChosen].AgentID, AvailStatus: 'Busy', NumOfCus: rows[agentChosen].NumOfCus+1 }
                        connection.query(agentsql,[ag.AgentID,ag.AvailStatus,ag.NumOfCus],function(error,rows,fields){
                            //callback function
                            if(!!error){
                                console.log("update agent status fail");
                                console.log(err);
                            }
                            else{
                                var realagentChosen = parseInt(agentChosen)+1;
                                console.log(realagentChosen);
                                console.log('update agent status success');
                                connection.query("SELECT * FROM Agent_Table WHERE AgentID = ?",[realagentChosen] ,function(error,result,fields){
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
//resolution of request will result in the agent being connected to another customer from the Queue that his skills are applicable to 
app.post('/cRes',function(req,res){
    let sklist= ['one','two','three','four','five'];
    var cuslist =[];
    var TopCusList = [];
    var chosenCusList =[];
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
        return database.close();
    })
    .then(()=>{
        for(j in cuslist){
            chosenCusList.push(TopCusList[cuslist[j]]);
        }
        var ans = chooseCustomer(chosenCusList);
        var anstosend = ans[0];
        res.send({jid_a:req.body.jid_a, jid_c:anstosend.JID_IM, agentAvailable : true});
    })
})

//Function to choose which Customer to pick from the Top in each list
function chooseCustomer(cusChosenList){
    var mintime = null;
    var cusChosen = null;
    for (i in cusChosenList){
        if(mintime == null){
            mintime = cusChosenList[i][0].TimeRegistered;
            cusChosen = cusChosenList[i];
        }
        else if(cusChosenList[i][0].TimeRegistered < mintime){
            mintime = cusChosenList[i][0].TimeRegistered;
            cusChosen = cusChosenList[i];
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
//SET AGENT TO AVAILABLE
app.patch('/update/agent/avail',function(req,resp){
    let ag = req.body;
    var sql = "SET @jid_a = ?;SET @AvailStatus = ?; \
    CALL EDITAGENTAVAILENTRY(@jid_a,@AvailStatus);";
    connection.query(sql,[ag.jid_a,ag.AvailStatus],function(error,rows,fields){
    //callback function
    if(!!error){
        resp.send("update fail");
        console.log(err);
    }
    else{
        resp.send('update success');
        console.log(ag);

}
    });
});

app.listen(1337);