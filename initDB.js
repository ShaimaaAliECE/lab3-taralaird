const mysql = require('mysql'); 

//create connection to the server
let conn = mysql.createConnection({
    host: '35.223.49.32',
    user: 'root',
    password: 'SE3316',
    database: 'usersDB'
});

conn.connect();

conn.query('Drop Table Users',
    (err, rows, fields)=>{
        if (err) 
            console.log(err)
        else
            console.log("Table Dropped")
    })

conn.query('Drop Table Time',
    (err, rows, fields)=>{
        if (err) 
            console.log(err)
        else
            console.log("Table Dropped")
    })


conn.end(); 