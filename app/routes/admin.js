var express = require('express');
var router = express.Router();
// var controllerUser = require('../controllers/user')

router.get('/product', (req, res, next) => {
    res.render('albums', {
        title: 'Browse Albums | Mue',
        isLogin: req.login,
    });
});

router.get('/product/album/:id', (req, res, next) => {
    res.render('album', {
        title: 'Browse Albums | Mue',
        isLogin: req.login,
    });
});

router.get('/product/album/add', (req, res, next) => {
    res.render('album', {
        title: 'Browse Albums | Mue',
        isLogin: req.login,
    });
});

router.get('/product/refund', (req, res, next) => {
    res.render('album', {
        title: 'Browse Albums | Mue',
        isLogin: req.login,
    });
});


module.exports = router;