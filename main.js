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
var connection = mysql.createConnection(dbconfig);

// app.use(express.static('public'));

app.get('/', function (req, res) {
    connection.connect();

    connection.query('SELECT view, tit, content FROM board', function(err, rows, fields) {
    if (!err)
        console.log('The solution is: ', rows);
    else
        console.log('Error while performing Query.', err);
    });

    connection.end();

  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
