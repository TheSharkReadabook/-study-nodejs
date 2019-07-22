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

// var index = require('./routes/index');
var member = require('./routes/member');
var board = require('./routes/board');


// app.use('/', index);
app.use('/member', member);
app.use('/board', board);


app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");



// var dbconfig = require('./db_connect.js');
// var db = mysql.createConnection(dbconfig);

// db.connect();
 

// app.use(express.static(path.join(__dirname, "public")));

// db.query('SELECT num, tit, writer, content FROM board',
// function (error, results, fields) {
//   if (error) throw error;

//   console.log('The solution is: ', results[0].num);
// });
// db.end(); 



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});