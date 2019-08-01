var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));

var dbconfig = require('../db_connect.js');
var connection = mysql.createConnection(dbconfig);

connection.connect();
 
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
      connection.query('SELECT idx, title, writer, content FROM board WHERE idx=?',[idx], function(err,rows){
       if(err){
         console.log(err);
         connection.rollback(function(){
           console.error('rollback error1');
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


router.post('/update',function (req,res,next) {
  var body = req.body;
  var idx = req.body.idx;
  var title = req.body.title;
  var content = req.body.content;
  var writer = req.body.writer;
  connection.beginTransaction(function(err) {
    if(err) console.log(err);
    connection.query('UPDATE board SET title=?, content=?, writer=? WHERE idx = ? '
        ,[title, content, writer, idx]
        ,function (err) {
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
                res.redirect('/board/read/'+idx);
              })
            }
      })
  })
})

router.get('/delete/:idx', function(req, res, next){
  var idx = req.params.idx;
  connection.beginTransaction(function(err){
    if(err) console.log(err);
      connection.query('DELETE FROM board WHERE idx = ? '
      ,[idx]
      , function(err,rows){
       if(err){
         console.log(err);
         connection.rollback(function(){
           console.error('rollback error1');
         })
       }
       else {
        connection.commit(function (err) {
          if(err) console.log(err);
          res.redirect('/board');
        })
          }
      });
  });
});



module.exports = router;














