var express = require('express');
var router = express.Router();
// var controllerUser = require('../controllers/user')

router.get('/browse/albums', function(req, res, next) {
    res.render('albums', { title: 'Browse Albums | Mue' });
});

router.get('/album/:id', function(req, res, next) {
    res.render('albums', { title: 'Browse Albums | Mue' });
});


module.exports = router;
