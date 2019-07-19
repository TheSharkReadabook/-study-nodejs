var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var path = require('path');
var sanitizeHtml = require('sanitize-html');
var mysql = require('mysql');
var express = require('express');
var app = express();

var dbconfig = require('./db_connect.js');
var db = mysql.createConnection(dbconfig);
db.connect();

// app.use(express.static('public'));

app.get('/', function (req, res) {

    db.query('SELECT view, tit, content FROM board', function(err, topics, fields) {
    if (!err)
        console.log('The database result: ', topics);

    else 
        console.log('Error while performing Query.', err);
    });

    db.end();

  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
