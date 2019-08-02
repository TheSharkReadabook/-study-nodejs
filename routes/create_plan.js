var express = require('express');
var router = express.Router();


router.get('/create', (req, res) => {
  res.render('plan/create');
  // res.send('/create');
})

router.get('/plan', (req, res) => {
  res.render('plan/plan');
  // res.send('/plan');
});


module.exports = router;