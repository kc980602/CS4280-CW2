var express = require('express');
var router = express.Router();
// var controllerUser = require('../controllers/user')

router.get('/albums', function(req, res, next) {
    res.render('albums', { title: 'Browse Albums | Mue' });
});

module.exports = router;
