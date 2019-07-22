var express = require('express');
var router = express.Router();
var mysql = require('mysql'); //mysql 모듈을 로딩.


/*
 로딩된 mysql 객체로부터 커넥션을 하나 생성합니다. 이때 실제적인 DB와의 연결은 이루어지지 않습니다.
 이후 query문이 실행될 때 이 커넥션을 통해 DB와 연결됩니다.
 */
var connection = mysql.createConnection({
  host: 'localhost', // DB가 위치한 IP주소
  port: 3306,          // DB와 연결할 포트번호
  user: 'choi',        // 계정이름
  password: '1234',    // 계정 비밀번호
  database: 'board01'    // 데이터베이스 이름
});

/* GET List Page. */
router.get('/list',function (req,res,next) {
  res.redirect('/board/1')// /board로 접속요청이 들어왔을 때 1페이지로 자동으로 이동하도록 리다이렉트 해줍니다.
})
router.get('/list/:page', function(req, res, next) {

  var query = connection.query('select idx,title,writer,hit,DATE_FORMAT(moddate, "%Y/%m/%d %T") as moddate from board',function(err,rows){
    if(err) console.log(err)        // 만약 에러값이 존재한다면 로그에 표시합니다.
    console.log('rows :' +  rows);
    res.render('list', { title:'Board List',rows: rows }); // view 디렉토리에 있는 list 파일로 이동합니다.
  });
});

module.exports = router;