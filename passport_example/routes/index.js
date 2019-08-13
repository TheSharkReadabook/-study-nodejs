
var express = require('express');
var app = express();

app.get('/', (req, res) => {
  res.render('index');
  console.log('username: ',req.isAuthenticate);
  if(req.isAuthenticate){
    console.log('true');
  }else{
    console.log('false');
  }
})


app.get('/login', (req, res) => {
  res.render('login');
})



module.exports = app;