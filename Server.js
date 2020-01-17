require('dotenv').config();
var express = require("express");
var app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
const mysql = require('mysql');
let db = require('./tools/db.js');

app.get('/ios-api',function(req,res) {
  res.send({"result": "ios-api base"});
})

app.post('/ios-api/addmsg',function(req,res) {
  var params = {userID: req.body.userID,
                messageTitle: req.body.messageTitle,
                message: req.body.message,
                posted: Date.now()}
  console.log(params);
  
  db.addMessage(params,function(err,results) {
    if(err) { res.status(500).send("Server error"); return; } 
    res.json({"results": results});
  });
  
})

app.get('/ios-api/allmessages',function(req,res) {
  db.getAllMessages(function(err,results) {
    if(err) { res.status(500).send("Server error"); return; } 
    res.json({"results": results});
  });
})

app.get('/ios-api/msg/:userId',function(req,res) {
  var params = {user: req.params.userId};

  db.getMessagesByUser(params,function(err,results) {
    if(err) { res.status(500).send("Server error"); return; } 
    res.json({"results": results});
  });
})

app.get('/ios-api/board/:boardName',function(req,res) {
  var params = {boardName: req.params.boardName};

  db.getMessagesByBoard(params,function(err,results) {
    if(err) { res.status(500).send("Server error"); return; } 
    res.json({"results": results});
  });
})

app.get('/ios-api/testjson',function(req,res) {
  res.json({"test_response": "successful call to testjson"});
})

app.get('/ios-api/testdb',function(req,res) {
  db.getDataFromDb(function(err,results) {
    if(err) { res.status(500).send("Server error"); return; } 
    res.json(results);
  });
})

app.use('/ios-api/*',function(req, res){
  res.send('Error 404: Not Found in ios-api');
});

app.listen(8082,function(){
  console.log("Server running at Port 8082");
});
