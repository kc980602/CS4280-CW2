var express = require('express');
var router = express.Router();
var controllerUser = require('../controllers/user')

router.get('/', function(req, res, next) {
    res.render('cart', { title: 'Express' });
});



module.exports = router;
