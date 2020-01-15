var express = require("express");
var app = express();

app.get('/',function(req,res) {
  res.send("hello from server 2 home page");
})

app.get('/ios-api',function(req,res) {
  res.send("hello from ios-api server");
})

app.get('/ios-api/testjson',function(req,res) {
  res.json({"test response": "successful"});
})

app.use('/ios-api/*',function(req, res){
  res.send('Error 404: Not Found in ios-api');
});

app.listen(8082,function(){
  console.log("Server running at Port 8082");
});
