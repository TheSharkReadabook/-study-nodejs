var passport = require('passport') //passport module add
  , LocalStrategy = require('passport-local').Strategy;
var cookieSession = require('cookie-session');
var flash = require('connect-flash');
var express = require('express');
var app = express();
var path = require('path');




var index = require('./routes/index');
app.use(flash());

app.use('/', index);

app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


app.use(cookieSession({ cookie: { maxAge: 60000 }, 
                  secret: 'woot',
                  resave: false, 
                  saveUninitialized: false}));