var express = require('express');
var router = express.Router();
var mysql = require('mysql'); //mysql 모듈을 로딩.

/*
 로딩된 mysql 객체로부터 커넥션을 하나 생성합니다. 이때 실제적인 DB와의 연결은 이루어지지 않습니다.
 이후 query문이 실행될 때 이 커넥션을 통해 DB와 연결됩니다.
 */
var dbconfig = require('../db_connect.js');
var connection = mysql.createConnection(dbconfig);

connection.connect();
 


router.get('/', function(req, res, next) {
  connection.query('SELECT num, tit, writer, content FROM board;', function(err, rows, fields) {
    if (err) throw err;
    res.render('board/board_list', {title: 'hello', rows:rows});
  });
 
 });
 


module.exports = router;