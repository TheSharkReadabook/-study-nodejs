var express = require('express');
var router = express.Router();
var mysql = require('mysql'); //mysql 모듈을 로딩.
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: false}));

var dbconfig = require('../db_connect.js');
var connection = mysql.createConnection(dbconfig);

connection.connect();
 

router.get('/', () => {
  res.render('member/member')
})

router.get('/join', function(req, res) {
  res.render('member/join');
});

router.post('/join', (req, res, next) => {
  var body = req.body;
  var id = req.body.id;
  var password = req.body.password;
  var name = req.body.name;
  var email = req.body.email;

  connection.beginTransaction( (err) => {
    if(err) console.log(err);
    connection.query('INSERT INTO `members`(`id`,`password`,`name`,`email`) VALUES (?,?,?,?)'
    ,[id, password, name, email]
    , (err) =>{
      if(err){
        console.log(err);
        connection.rollback( () => {
          console.error('rollback error1');
        })
      }
      connection.commit( (err) => {
        if(err) console.log(err);
        res.redirect('/member/login/');
      })
    }
    
    )
  })
})

router.post('/members', function(req,res){
 console.log(req);
 res.render('members');
});

router.get('/login', function(req, res) {
  res.render('member/login');
});


module.exports = router;