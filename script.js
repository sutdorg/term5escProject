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
//Update Employee in Queue_1
app.post('/update',function(req,resp){
    let cus = req.body;
    var sql = "SET @CustomerID = ?;SET @Name = ?;SET @ContactInformation = ?; \
    CALL EDITQ1ENTRY(@CustomerID,@Name,@ContactInformation);";
    connection.query(sql,[cus.CustomerID,cus.Name,cus.ContactInformation],function(error,rows,fields){
    //callback function
    if(!!error){
        console.log(rows);
        resp.send("update fail")
    }
    else{
        console.log('update of id\n');
        resp.send('update success');

}
    });
});









function addcustomer(customerID,name){

}
function addAgent(agentID,bubbleID,name){

}

app.listen(1337);