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

app.post('/login', (req, res) => {
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

app.use(express.static('static'))

app.listen(800);