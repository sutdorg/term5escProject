//use ejs for the frontend
//create guest
//send message
var express = require('express');
var mysql = require('mysql');
var app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.json());

var connection = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password: 'root',
    database: 'queues',
    port:'3306',
    multipleStatements:true
});

connection.connect(function(error){
    if(!!error){
        console.log('Error');
    }
    else{
        console.log('connected');
    }
});
//check for the availability of agents
app.get('/getstatus',function(req,res){
    connection.query("SELECT * FROM Agent_Table",function(error,result,fields){
        if(!!error){
            console.log("fail to retrieve from agent_table");
        }
        else{
            console.log("agent retrieved");
            for(i in result){
                if(result[i].Skill1 =="Phone" || result[i].Skill2 == "Phone" || result[i].Skill3 == "Computer"){
                    console.log(result[i].AvailStatus);
                }
                
            }
        }
        res.send(result);
    });
});
//get skill from skill table
app.get('/getskills',function(req,res){
    let skilllist= ['one','two','three','four','five'];
    connection.query("SELECT * FROM Skills",function(error,result,fields){
        if(!!error){
            console.log("cannot retrieve the skills");
        }
        else{
            console.log("retrieve the skills");
            for (i in result){
                skilllist[i] = result[i].Skill;
                console.log(skilllist);
                console.log(skilllist[0]);
            }
            res.send(result);
        }
    
});
});
//get customer information from Q1
app.get('/Q1/:id',function(req,res){
    connection.query("SELECT * FROM Q1 WHERE CustomerID = ?",[req.params.id],function(error,rows,fields){
        if(!!error){
            console.log('failed to retrieve the customer from Q1');
        }
        else{
            console.log('succeeded in getting the customer from Q1');
            res.send(rows);
        }
    });
});

//Queueing of the Requests and connecting if agent is free once i receieve a http post request from Frontend/NodeJS backend
app.post('/cusreq', function(req,res){
    let sklist= ['one','two','three','four','five'];    
    connection.query("SELECT * FROM Skills",function(error,result,fields){
        let cushead = req.header('sk');
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
                    console.log("agent retrieved");
                    for(i in rows){
                        if(rows[i].Skill1 == cushead || rows[i].Skill2 == cushead || rows[i].Skill3 == cushead){
                            console.log("status " + rows[i].AvailStatus);
                            if(rows[i].AvailStatus == 'Available'){
                                console.log(rows[i].Name + " connect to Customer " + cus.FirstName);
                                res.send(rows[i].Name + " connect to Customer " + cus.FirstName);
                                check = 1;
                                console.log('check value changed to '+ check);
                                let ag = { AgentID: rows[i].AgentID, AvailStatus: 'Busy', NumOfCus: rows[i].NumOfCus+1 }
                                connection.query(agentsql,[ag.AgentID,ag.AvailStatus,ag.NumOfCus],function(error,rows,fields){
                                    //callback function
                                    if(!!error){
                                        console.log("update agent status fail");
                                        console.log(err);
                                    }
                                    else{
                                        console.log('update agent status success');
                                
                                }
                                    });
                                break;
                            }
                            else{
                                console.log(rows[i].AgentID + ' is not available right now');
                            }
                        }
                        else{
                            console.log(rows[i].AgentID + ' does not have the required skills');
                        }
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
                                    res.send("Q1 updated");
                                    
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
                                    res.send("Q2 updated");
                                    
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
                                    res.send("Q3 updated");
                                    
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

//get customer from queue 1
app.get('/skill_1/:id',function(req,resp){
    connection.query("SELECT * FROM Queue_1 WHERE CustomerID = ?",[req.params.id] ,function(error,rows,fields){
        //callback function
        if(!!error){
            console.log('Error in query Queue1');
        }
        else{
            console.log('successful query for the Queue1\n');
            console.log(rows);
            resp.send(rows);
            //can use update from CRUD to send data
        }
    });
    // connection.query("SELECT * FROM Queue_1",function(error,rows,fields){
    //     //callback function
    //     if(!!error){
    //         console.log('Error in query Queue1');
    //     }
    //     else{
    //         console.log('successful query for the Queue1\n');
    //         console.log(rows);
    //         //can use update from CRUD to send data
    //     }
    // });
    });

// get Customer from Queue 2
app.get('/skill_2/:id',function(req,resp){
    connection.query("SELECT * FROM Queue_2 WHERE CustomerID = ?",[req.params.id] ,function(error,rows,fields){
        //callback function
        if(!!error){
            console.log('Error in query Queue2');
        }
        else{
            console.log('successful query for the Queue2\n');
            console.log(rows);
            resp.send(rows);
            //can use update from CRUD to send data
        }
    });
    // connection.query("SELECT * FROM Queue_1",function(error,rows,fields){
    //     //callback function
    //     if(!!error){
    //         console.log('Error in query Queue1');
    //     }
    //     else{
    //         console.log('successful query for the Queue1\n');
    //         console.log(rows);
    //         //can use update from CRUD to send data
    //     }
    // });
    

});
// Get Customer from Queue 3
app.get('/skill_3/:id',function(req,resp){
    connection.query("SELECT * FROM Queue_3 WHERE CustomerID = ?",[req.params.id] ,function(error,rows,fields){
        //callback function
        if(!!error){
            console.log('Error in query Queue3');
        }
        else{
            console.log('successful query for the Queue3\n');
            console.log(rows);
            resp.send(rows);
            //can use update from CRUD to send data
        }
    });
});
    // Get Skill from Skills
app.get('/skill_3/:id',function(req,resp){
    connection.query("SELECT * FROM Queue_3 WHERE CustomerID = ?",[req.params.id] ,function(error,rows,fields){
        //callback function
        if(!!error){
            console.log('Error in query Queue3');
        }
        else{
            console.log('successful query for the Queue3\n');
            console.log(rows);
            resp.send(rows);
            //can use update from CRUD to send data
        }
    });
    // connection.query("SELECT * FROM Queue_1",function(error,rows,fields){
    //     //callback function
    //     if(!!error){
    //         console.log('Error in query Queue1');
    //     }
    //     else{
    //         console.log('successful query for the Queue1\n');
    //         console.log(rows);
    //         //can use update from CRUD to send data
    //     }
    // });
    

});
// Get Agent from AgentTable
app.get('/agent/:id',function(req,resp){
    connection.query("SELECT * FROM Agent_Table WHERE AgentID = ?",[req.params.id] ,function(error,rows,fields){
        //callback function
        if(!!error){
            console.log('Error in query AgentTable');
        }
        else{
            console.log('successful query for the AgentTable\n');
            console.log(rows);
            resp.send(rows);
            //can use update from CRUD to send data
        }
    });
    // connection.query("SELECT * FROM Queue_1",function(error,rows,fields){
    //     //callback function
    //     if(!!error){
    //         console.log('Error in query Queue1');
    //     }
    //     else{
    //         console.log('successful query for the Queue1\n');
    //         console.log(rows);
    //         //can use update from CRUD to send data
    //     }
    // });
    

});

// Delete Customers from queue 1
app.delete('/delete/skill_1/cID/:id',function(req,resp){
    connection.query("DELETE FROM Queue_1 WHERE CustomerID= ?",[req.params.id],function(error,rows,fields){
    //callback function
    if(!!error){
        console.log(err);
    }
    else{
        console.log('successful Deletion of id\n');
        resp.send('deleted entry');

}
    });
});
//Delete Customers from queue 2
app.delete('/delete/skill_2/cID/:id',function(req,resp){
    connection.query("DELETE FROM Queue_2 WHERE CustomerID= ?",[req.params.id],function(error,rows,fields){
    //callback function
    if(!!error){
        console.log(err);
    }
    else{
        console.log('successful Deletion of id\n');
        resp.send('deleted entry');

}
    });
});
//Delete Customers from queue 3
app.delete('/delete/skill_3/cID/:id',function(req,resp){
    connection.query("DELETE FROM Queue_3 WHERE CustomerID= ?",[req.params.id],function(error,rows,fields){
    //callback function
    if(!!error){
        console.log(err);

    }
    else{
        console.log('successful Deletion of id\n');
        resp.send('deleted entry');

}
    });
});
//Delete Agent from AgentTable
app.delete('/delete/agent/cID/:id',function(req,resp){
    connection.query("DELETE FROM Agent_Table WHERE AgentID= ?",[req.params.id],function(error,rows,fields){
    //callback function
    if(!!error){
        console.log(err);

    }
    else{
        console.log('successful Deletion of id from agent\n');
        resp.send('deleted entry');

}
    });
});

//Add Customer to Queue Depending on skill







//ADD Customer in Queue_1
app.post('/add/s1',function(req,resp){
    let cus = req.body;
    var sql = "SET @CustomerID = ?;SET @Name = ?;SET @ContactInformation = ?; \
    CALL EDITQ1ENTRY(@CustomerID,@Name,@ContactInformation);";
    connection.query(sql,[cus.CustomerID,cus.Name,cus.ContactInformation],function(error,rows,fields){
    //callback function
    if(!!error){
        resp.send("update fail");
        console.log(err);
    }
    else{
        console.log('update of id\n');
        rows.forEach(element => {
            if(element.constructor == Array)
            resp.send('Inserted Customer id : ' +element[0].CustomerID);
        });

        resp.send('add success');

}
    });
});
//ADD Customer in Queue_2
app.post('/add/s2',function(req,resp){
    let cus = req.body;
    var sql = "SET @CustomerID = ?;SET @Name = ?;SET @ContactInformation = ?; \
    CALL EDITQ2ENTRY(@CustomerID,@Name,@ContactInformation);";
    connection.query(sql,[cus.CustomerID,cus.Name,cus.ContactInformation],function(error,rows,fields){
    //callback function
    if(!!error){
        resp.send("update fail");
        console.log(err);
    }
    else{
        console.log('update of id\n');
        rows.forEach(element => {
            if(element.constructor == Array)
            resp.send('Inserted Customer id : ' +element[0].CustomerID);
        });

        resp.send('add success');

}
    });
});
//ADD Customer in Queue_3
app.post('/add/s3',function(req,resp){
    let cus = req.body;
    var sql = "SET @CustomerID = ?;SET @Name = ?;SET @ContactInformation = ?; \
    CALL EDITQ3ENTRY(@CustomerID,@Name,@ContactInformation);";
    connection.query(sql,[cus.CustomerID,cus.Name,cus.ContactInformation],function(error,rows,fields){
    //callback function
    if(!!error){
        resp.send("update fail");
        console.log(err);
    }
    else{
        console.log('update of id\n');
        rows.forEach(element => {
            if(element.constructor == Array)
            resp.send('Inserted Customer id : ' +element[0].CustomerID);
        });

        resp.send('add success');

}
    });
});

//ADD Agent in Agent_Table
app.post('/add/agent',function(req,resp){
    let ag = req.body;
    var sql = "SET @AgentID = ?;SET @Skill1 = ?;SET @Skill2 = ?;SET @Skill3 = ?;SET @BubbleID = ?;SET @Name = ?;SET @AvailStatus = ?;SET @NumOfCus = ?; \
    CALL EDITAGENTENTRY(@AgentID,@Skill1,@Skill2,@Skill3,@BubbleID,@Name,@AvailStatus,@NumOfCus);";
    connection.query(sql,[ag.AgentID,ag.Skill1,ag.Skill2,ag.Skill3,ag.BubbleID,ag.Name,ag.AvailStatus,ag.NumOfCus],function(error,rows,fields){
    //callback function
    if(!!error){
        resp.send("update fail");
        console.log(err);
    }
    else{
        console.log('update of id\n');
        rows.forEach(element => {
            if(element.constructor == Array)
            resp.send('Inserted Agent id : ' +element[0].AgentID);
        });

        resp.send('add success');

}
    });
});



// //ADD new agent in Agentlist
// app.post('/add/s3',function(req,resp){
//     let cus = req.body;
//     var sql = "SET @CustomerID = ?;SET @Name = ?;SET @ContactInformation = ?; \
//     CALL EDITQ3ENTRY(@CustomerID,@Name,@ContactInformation);";
//     connection.query(sql,[cus.CustomerID,cus.Name,cus.ContactInformation],function(error,rows,fields){
//     //callback function
//     if(!!error){
//         resp.send("update fail");
//         console.log(err);
//     }
//     else{
//         console.log('update of id\n');
//         rows.forEach(element => {
//             if(element.constructor == Array)
//             resp.send('Inserted Customer id : ' +element[0].CustomerID);
//         });

//         resp.send('add success');

// }
//     });
// });

// req.cmd, req.create, req.update. req.del
// app.post('/crud', function(req, res){
//     var cmd = req.cmd;
//     var sql;
//     switch(cmd){
//         case 1:
//             sql = "UPDATE .....";
//         case 2:

//     }
// });


//Update Employee in Queue_1
app.put('/update/s1',function(req,resp){
    let cus = req.body;
    var sql = "SET @CustomerID = ?;SET @Name = ?;SET @ContactInformation = ?; \
    CALL EDITQ1ENTRY(@CustomerID,@Name,@ContactInformation);";
    connection.query(sql,[cus.CustomerID,cus.Name,cus.ContactInformation],function(error,rows,fields){
    //callback function
    if(!!error){
        resp.send("update fail");
        console.log(err);
    }
    else{
        console.log('update of id\n');
        resp.send('update success');

}
    });
});
//Update Employee in Queue_2
app.put('/update/s2',function(req,resp){
    let cus = req.body;
    var sql = "SET @CustomerID = ?;SET @Name = ?;SET @ContactInformation = ?; \
    CALL EDITQ2ENTRY(@CustomerID,@Name,@ContactInformation);";
    connection.query(sql,[cus.CustomerID,cus.Name,cus.ContactInformation],function(error,rows,fields){
    //callback function
    if(!!error){
        resp.send("update fail");
        console.log(err);
    }
    else{
        console.log('update of id\n');
        resp.send('update success');

}
    });
});
//Update Employee in Queue_2
app.put('/update/s3',function(req,resp){
    let cus = req.body;
    var sql = "SET @CustomerID = ?;SET @Name = ?;SET @ContactInformation = ?; \
    CALL EDITQ3ENTRY(@CustomerID,@Name,@ContactInformation);";
    connection.query(sql,[cus.CustomerID,cus.Name,cus.ContactInformation],function(error,rows,fields){
    //callback function
    if(!!error){
        resp.send("update fail");
        console.log(err);
    }
    else{
        console.log('update of id\n');
        resp.send('update success');

}
    });
});

//UPDATE Agent in Agent_Table
app.put('/update/agent',function(req,resp){
    let ag = req.body;
    var sql = "SET @AgentID = ?;SET @Skill1 = ?;SET @Skill2 = ?;SET @Skill3 = ?;SET @BubbleID = ?;SET @Name = ?;SET @AvailStatus = ?;SET @NumOfCus = ?; \
    CALL EDITAGENTENTRY(@AgentID,@Skill1,@Skill2,@Skill3,@BubbleID,@Name,@AvailStatus,@NumOfCus);";
    connection.query(sql,[ag.AgentID,ag.Skill1,ag.Skill2,ag.Skill3,ag.BubbleID,ag.Name,ag.AvailStatus,ag.NumOfCus],function(error,rows,fields){
    //callback function
    if(!!error){
        resp.send("update fail");
        console.log(err);
    }
    else{
        resp.send('update success');

}
    });
});
//Update the Availability status of a agent
app.patch('/update/agent/avail',function(req,resp){
    let ag = req.body;
    var sql = "SET @AgentID = ?;SET @AvailStatus = ?;SET @NumOfCus = ?; \
    CALL EDITAGENTAVAILENTRY(@AgentID,@AvailStatus,@NumOfCus);";
    connection.query(sql,[ag.AgentID,ag.AvailStatus,ag.NumOfCus],function(error,rows,fields){
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