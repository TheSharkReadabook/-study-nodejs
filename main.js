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
 


// app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");


app.use(express.static(path.join(__dirname, "public")));



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
