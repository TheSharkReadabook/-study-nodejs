var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var path = require('path');
var sanitizeHtml = require('sanitize-html');
var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var dbconfig = require('./db_connect.js');
var db = mysql.createConnection(dbconfig);

db.connect();

db.once("open", function(){
  console.log("db connted");
});
db.on("error", function(err){
  console.log("db error", err);
});

// app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");


app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());



var postSchema = mysql.Schema({
  num: {type:String, require:true},
  tit: {type:String, require:true},
  writer: {type:String, require:true}
});

app.get('/posts', function(req, res){
  Post.find({}, function(err, posts){
    if(err) return res.json({success:false, message:err});
    res.json({success:true, data:posts});
  });
});

app.get('/posts', function(req, res){
  Post.create(req.body.post, function(err, post){
    if(err) return res.json({success:false, message:err});
    res.json({success:true, data:post});
  });
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
