var express = require('express');
var router = express.Router();

router.get('/cart', function (req, res, next) {
    res.render('cart', {
        title: 'Cart | Mue',
        isLogin: req.login,
    });
});

router.get('/checkout', function (req, res, next) {
    res.render('checkout', {
        title: 'Checkout | Mue',
        isLogin: req.login,
    });
});

module.exports = router;