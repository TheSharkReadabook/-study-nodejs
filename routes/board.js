var express = require('express');
var router = express.Router();
var mysql = require('mysql'); //mysql 모듈을 로딩.
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
/*
 로딩된 mysql 객체로부터 커넥션을 하나 생성합니다. 이때 실제적인 DB와의 연결은 이루어지지 않습니다.
 이후 query문이 실행될 때 이 커넥션을 통해 DB와 연결됩니다.
 */
var dbconfig = require('../db_connect.js');
var connection = mysql.createConnection(dbconfig);

connection.connect();
 
// router.get('/list',function (req,res,next) {
//   res.redirect('/board/1')
// })
// router.get('/list/:page', function(req, res, next) {
//   var query = connection.query('SELECT idx,title,writer,hit,DATE_FORMAT(moddate, "%Y/%m/%d %T") AS moddate FROM board',function(err,rows){
//     if(err) console.log(err)       
//     console.log('rows :' +  rows);
//     res.render('list', { title:'hello',rows: rows }); // view 디렉토리에 있는 list 파일로 이동합니다.
//   });
// });

router.get('/', function(req, res, next) {
  connection.query('SELECT idx,title,writer,hit,DATE_FORMAT(moddate, "%Y/%m/%d %T") AS moddate FROM board', function(err, rows, fields) {
    if (err) throw err;
    res.render('board/list', {title: 'hello', rows:rows});
  });
 
 });
 
 
 router.get('/read/:idx', function(req, res, next){
   var idx = req.params.idx;
  //  console.log("idx : "+idx);
   connection.beginTransaction(function(err){
     if(err) console.log(err);
     connection.query('UPDATE board SET hit=hit+1 WHERE idx=?', [idx], function(err){
       if(err){
         /* when error occured cancle query job and rollback*/
         console.log(err);
         connection.rollback(function(){
           console.error('rollback error1');
         })
       }
       connection.query('SELECT idx, title, content, writer, hit, DATE_FORMAT(moddate, "%Y/%m/%d %T")'+
       'AS moddate, DATE_FORMAT(regdate, "%Y-%m-%d %T") AS regdate FROM board WHERE idx=?',[idx], function(err,rows){
        
        if(err){
          console.log(err);
          connection.rollback(function(){
            console.error('rollback error2');
          })
        }
        else {
          connection.commit(function(err){
            if(err) console.log(err);
            console.log("row :"+rows);
            res.render('board/read', {title:rows[0].title, rows:rows});
          })
        }
        
       });
     });
   });
 });
 
 router.get('/write', function(req, res, next){
   res.render('board/write', {title: 'write page'})
 });

 router.post('/write',function (req,res,next) {
  var body = req.body;
  var writer = req.body.writer;
  var title = req.body.title;
  var content = req.body.content;
  var password = req.body.password;
  connection.beginTransaction(function(err) {
    if(err) console.log(err);
    connection.query('INSERT INTO board(title,writer,content,password) VALUES(?,?,?,?)'
        ,[title,writer,content,password]
        ,function (err) {
          if(err) {
            console.log(err);
            connection.rollback(function () {
              console.error('rollback error1');
            })
          }
          connection.query('SELECT LAST_INSERT_ID() as idx',function (err,rows) {
            if(err) {
              console.log(err);
              connection.rollback(function () {
                console.error('rollback error1');
              })
            }
            else
            {
              connection.commit(function (err) {
                if(err) console.log(err);
                console.log("row : " + rows);
                var idx = rows[0].idx;
                res.redirect('/board/read/'+idx);
              })
            }
          })
    })
  })
})


router.get('/update/:idx', function(req, res, next){
  var idx = req.params.idx;
 //  console.log("idx : "+idx);
  connection.beginTransaction(function(err){
    if(err) console.log(err);
      connection.query('SELECT idx, title, content, writer FROM board WHERE idx=?',[idx], function(err,rows){
       if(err){
         console.log(err);
         connection.rollback(function(){
           console.error('rollback error2');
         })
       }
       else {
         connection.commit(function(err){
           if(err) console.log(err);
           console.log("row :"+rows);
           res.render('board/update', {title:rows[0].title, rows:rows});
         })
       }
       
      });
    });
  });


module.exports = router;