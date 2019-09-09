var cookieSession = require('cookie-session');
var flash = require('connect-flash');
var express = require('express');
var app = express();
var path = require('path');
var session = require('express-session');
var FileStore = require('session-file-store')(session)
var bodyParser = require('body-parser');


// if you use to req.user you have to define middleware like this order :
// app.use(express.static('public'));
// app.use(express.cookieParser());
// app.use(express.bodyParser());
// app.use(express.session({ secret: 'keyboard cat' }));
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(app.router);



var authdata = {
  email:'asd@asd.asd',
  password: 'asd',
  nickname: 'asd'
}

var passport = require('passport') //passport module add
  , LocalStrategy = require('passport-local').Strategy;
  app.use(bodyParser.urlencoded({extended:false}));
  app.use(bodyParser.json());
  
  app.use(session({
    secret: 'anything',
    resave: false,
    saveUninitialized: true,
    store: new FileStore(),
    cookie:{
      secure:false
    }
  }))
  
  app.use(passport.initialize());
  app.use(passport.session());  

  app.use(flash());
  app.get('/flash', function(req, res){
    // Set a flash message by passing the key, followed by the value, to req.flash().
    req.flash('msg', 'Flash is back!!')  
    res.send('flash');
  });
  
  app.get('/flash-display', function(req, res){
    // Get an array of flash messages by passing the key to req.flash()
    var fmsg =  req.flash();
    console.log(fmsg);
    res.send(fmsg);
    // res.render('index', { messages: req.flash('info') });
  });

  
// app.get('/login', (req, res) => {
//   var flash_msg = req.flash().error[0];
//   var flash_msg = req.flash().succes[0];
//   console.log(flash_msg);
//   res.render('login',{flash_msg});
// })



  passport.serializeUser(function(user, done) {
    console.log('serializeUser', user);
    done(null, user.email);

  });
  
  passport.deserializeUser(function(id, done) {
    console.log('deserializeUser', id);
    done(null, authdata);
  });

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'passwd'
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
    failureRedirect: '/login',
    failureFlash: true,
    successFlash: true
    }));

var index = require('./routes/index');

app.use('/', index);

app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});