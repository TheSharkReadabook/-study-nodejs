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


//  app.use(express.static('public')); // show static files

app.set('view engine','ejs');  // view engine으로 ejs를 사용하겠다는 의미
app.set('views','./views'); //views folder

db.connect();

    db.query('SELECT num, tit, writer, content FROM board;', function(err, board_list_result, fields) {
      if (!err){
          console.log('The database result: ', board_list_result);
          // console.log('filelds : ',fields);          
      }
      else {
          console.log('Error while performing Query.', err);
      }

    });

 


app.get('/',function(req,res){
  res.render('index');
});

app.get('/board_list',function(req,res){
  res.render('board_list', {title: 'hello'});
});
    
db.end();

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
