var express = require('express');
var router = express.Router();

router.get('/', () => {
  res.render('member/member')
})

router.get('/join', function(req, res) {
  res.render('member/join');
});

router.post('/members', function(req,res){
 console.log(req);
 res.render('members');
});

router.get('/login', function(req, res) {
  res.render('member/login');
});


module.exports = router;