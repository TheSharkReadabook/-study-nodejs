
var express = require('express');
var app = express();



app.get('/', (req, res) => {
  var username = 'asd@asd.asd';
  // console.log('req', req);
  // console.log('req.session', req.session);

  res.render('index');
  console.log('username: ',username);
  if(username){
    console.log('true');
  }else{
    console.log('false');
  }
})


app.get('/login', (req, res) => {
  res.render('login');
})



module.exports = app;