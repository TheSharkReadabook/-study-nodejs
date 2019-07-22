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
 

connection.query('SELECT num, tit, writer, content FROM board',
function (error, results, fields) {
  if (error) throw error;

  console.log('The solution is: ', results[0].num);
});
connection.end(); 



/* GET List Page. */
router.get('/board_list',function (req,res,next) {
  res.render('board/board_list');
})
router.get('/board/board_list', function(req, res, next) {

  var query = connection.query('SELECT num, tit, writer, content FROM board',
  function(err,rows){
    if(err) console.log(err)        // 만약 에러값이 존재한다면 로그에 표시합니다.
    console.log('rows :' +  rows);
    res.render('board_list', { title:'Board List',rows: rows }); 
  });
});

module.exports = router;