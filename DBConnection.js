const mysql = require('mysql'); 

//returns connection object for database
function newConnect()
{
    //create connection to the server
    let conn = mysql.createConnection({
        host: '35.223.49.32',
        user: 'root',
        password: 'SE3316',
        database: 'usersDB'
    });
    return conn;
}

//used to export function to other files 
module.exports = newConnect; 