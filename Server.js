var express = require("express");
var app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false}));
const mysql = require('mysql');
let db = require('./tools/db.js');

app.get('/',function(req,res) {
  res.send("hello from server 2 home page");
})

app.get('/ios-api',function(req,res) {
  res.send({"result": "ios-api base"});
})

app.get('/ios-api/testjson',function(req,res) {
  //res.json({"test response": "successful call to testjson"});
  db.getDataFromDb(function(err,results) {
    if(err) { res.status(500).send("Server error"); return; } 
    res.json(results);
  });
})

app.get('/ios-api/testdb'),function(req,res) {
  console.log('received call to testdb');
  db.getDataFromDb(function(err,results) {
    if(err) { res.send(500,"Server error"); return; } 
    res.json(results);
  });
}

app.use('/ios-api/*',function(req, res){
  res.send('Error 404: Not Found in ios-api');
});

app.listen(8082,function(){
  console.log("Server running at Port 8082");
});
