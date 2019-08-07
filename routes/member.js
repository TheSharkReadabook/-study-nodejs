var express = require('express');
var router = express.Router();
var mysql = require('mysql'); //mysql 모듈을 로딩.
var bodyParser = require('body-parser');
var crypto = require('crypto');
var cookie = require('cookie');

router.use(bodyParser.urlencoded({extended: false}));

var dbconfig = require('../db_connect.js');
var connection = mysql.createConnection(dbconfig);

connection.connect();

function authIsOwner(req, res){
  var isOwner = false;
  var cookies = {};
  if (req.headers.cookie){
    cookies = cookie.parse(req.headers.cookie);
  }
  if(cookies.password == db_password){
    isOwner = ture;
  }
  return isOwner;
}


 

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

var pw_cipher = crypto.createCipher('aes256','hash password');
pw_cipher.update(password, 'ascii','hex');
var pw_cipher = pw_cipher.final('hex');

  connection.beginTransaction( (err) => {
    if(err) console.log(err);
    connection.query('INSERT INTO `members`(`id`,`password`,`name`,`email`) VALUES (?,?,?,?)'
    ,[id, pw_cipher, name, email]
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


router.post('/login', (req, res) =>{
  
  var body = req.body;
  var id = req.body.id;
  var password = req.body.password;

  connection.beginTransaction( (err) => {
    if(err) console.log(err);
    connection.query('SELECT `password` FROM `members` WHERE `id` = ?')
    ,[id]
    ,(err, db_password) => {
      if(err){
        console.log(err);
        connection.rollback( () => {
          console.err('rollback error1');
        })
      }
      else{
        var isOwner = authIsOwner(password);

        console.log(isOwner);

        var pw_cipher = crypto.createCipher('aes256','hash password');
        pw_cipher.update(password, 'ascii','hex');
        var pw_cipher = pw_cipher.final('hex');

        if(pw_cipher == db_password){
          console.log('account matched');
            res.writeHead(302, {
              'Set-Cookie':[
                `id=${id}`,
                `password=${password}`
              ],
              Location:`/`
            })

        }else{
          console.log('not matched')
        }
      }
      connection.commit( (err) => {
        if(err) console.log(err);
        res.redirect('/');
      })
    }

  }) 
})


module.exports = router;