var express = require('express');
var app = express.Router();
var mysql = require('mysql'); //mysql 모듈을 로딩.
var bodyParser = require('body-parser');
var crypto = require('crypto');
// var cookie = require('cookie');
var cookieSession = require('cookie-session');
var flash = require('connect-flash');
var session = require('express-session');
var FileStore = require('session-file-store')(session)

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

var dbconfig = require('../db_connect.js');
var connection = mysql.createConnection(dbconfig);

connection.connect();

app.get('/', () => {
  res.render('member/member')
})

app.get('/join', function(req, res) {
  res.render('member/join');
})

app.post('/join', (req, res, next) => {
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

app.post('/members', function(req,res){
 console.log(req);
 res.render('members');
});

app.get('/login', function(req, res) {
  res.render('member/login');
});

var authdata = {
  email:'asd@asd.asd',
  password: 'asd',
  nickname: 'asd'
}

var passport = require('passport') //passport module add
  , LocalStrategy = require('passport-local').Strategy;

  // fetch('/api/foo', {credentials: 'include'})

  app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
  }))

  
  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());  

  passport.serializeUser(function(user, done) {
    console.log('serializeUser', user);
    done(null, user.email);

  });
  
  passport.deserializeUser(function(id, done) {
    console.log('deserializeUser', id);
    done(null, authdata);
  });

  passport.use(new LocalStrategy({
    usernameField: 'id',
    passwordField: 'password'
  },
    function(username, password, done) {
      console.log('localStrategy', username, password);
      if(username == authdata.email){
        console.log(1);
        if(password == authdata.password){
          console.log(2);
          return done(null, authdata);
        } else { 
          console.log(3);
          return done(null, false, {
            message : 'Incorrect password'
          })
        }

      }else {
        console.log(4);
        return done(null, false, {
          message : 'Incorrect username'
        })
      }

    }
  ));


app.post('/login',
  passport.authenticate('local', { 
    successRedirect: '/',
    failureRedirect: '/member/login' }));

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


// router.post('/login', (req, res) =>{
  
//   var body = req.body;
//   var id = req.body.id;
//   var password = req.body.password;

//   connection.beginTransaction( (err) => {
//     if(err) console.log(err);
//     connection.query('SELECT `password` FROM `members` WHERE `id` = ?')
//     ,[id]
//     ,(err, db_password) => {
//       if(err){
//         console.log(err);
//         connection.rollback( () => {
//           console.err('rollback error1');
//         })
//       }
//       else{
//         var isOwner = authIsOwner(password);

//         console.log(isOwner);

//         var pw_cipher = crypto.createCipher('aes256','hash password');
//         pw_cipher.update(password, 'ascii','hex');
//         var pw_cipher = pw_cipher.final('hex');

//         if(pw_cipher == db_password){
//           console.log('account matched');
//             res.writeHead(302, {
//               'Set-Cookie':[
//                 `id=${id}`,
//                 `password=${password}`
//               ],
//               Location:`/`
//             })

//         }else{
//           console.log('not matched')
//         }
//       }
//       connection.commit( (err) => {
//         if(err) console.log(err);
//         res.redirect('/');
//       })
//     }

//   }) 
// })


module.exports = app;