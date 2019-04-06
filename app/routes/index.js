var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Online Music Store | Mue' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login | Mue' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register | Mue' });
});


module.exports = router;
