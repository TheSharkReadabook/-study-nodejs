var express = require('express');
var app = express.Router();

app.get('/', (req, res) => {
  var username = req.isAuthenticated();
  // console.log('req', req);
  console.log('@@@username@@@', username);
    res.render('index')
  })

module.exports = app;

