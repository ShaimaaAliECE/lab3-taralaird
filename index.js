const express = require('express');
const path = require('path');

//used to create database connection objects 
const newConnect = require('./DBConnection'); 

const app = express(); 

app.use(express.urlencoded({
    extended: true
}))

//start at root goes to index.html
app.get('/', (req, res) => {
    res.sendFile('/static/index.html', { root: __dirname })
})

//guest view, goes to guest.html 
app.get('/guest', (req, res) => {
    res.sendFile('/static/guest.html', { root: __dirname })
})

//admin view , goes to admin.html 
app.get('/admin', (req, res) => {
    res.sendFile('/static/admin.html', { root: __dirname })
})

//login information for admin login  
app.get('/login', (req, res) => {
    //get username and password 
    let userName = req.body.usr; 
    let password = req.body.pwd;
    //automatic message for incorrect login 
    let message = "Sorry, you are not an Admin. Access denied";
  
    //if admin logins they are welcomed and send to the admin view 
    if (userName == 'admin' && password == 'password') {
      message = "Welcome Admin";
      res.sendFile('/static/admin.html', { root: __dirname })
    }
    res.send(message) //message is sent to user to let them know if they are welcomed or not  
})

//allows admins to add users 
app.get('/add-user', (req,res) => {
    //create connection object 
    let conn = newConnect();
    conn.connect();

    console.log(req.query.T1);
    conn.query(`insert into Users values ('${req.query.name}','${req.query.T1}','${req.query.T2}','${req.query.T3}','${req.query.T4}','${req.query.T5}','${req.query.T6}','${req.query.T7}','${req.query.T8}','${req.query.T9}','${req.query.T10}')`
            ,(err,rows,fields) => {
                res.redirect('/');   //redirect to root      
            } );
  
    conn.end();
})

//allows admins to add and update times 
app.get('/add-times', (req,res) => {
    //create connection object 
    let conn = newConnect();
    conn.connect();
    //
    console.log(req.query.T1);
    //
    conn.query( `UPDATE Time SET  T1 = '${req.query.T1}', T2 = '${req.query.T2}', T3 = '${req.query.T3}', T4 = '${req.query.T4}', T5 = '${req.query.T5}', T6 = '${req.query.T6}', T7 = '${req.query.T7}', T8 = '${req.query.T8}', T9 = '${req.query.T9}', T10 = '${req.query.T10}'`
            , (err,rows,fields) => {
                if (err)
                    console.log(err);
                else
                    console.log('row updated'); //show that row was updated
                    res.redirect('/'); //redirect to root
            });

    conn.end();
})

app.use(express.static('static'))

//app listens at port 80, specified in the project
app.listen(80);