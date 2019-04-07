var express = require('express');
var router = express.Router();

router.get('/cart', function(req, res, next) {
    res.render('cart', { title: 'Cart | Mue' });
});

router.get('/checkout', function(req, res, next) {
    res.render('checkout', { title: 'Checkout | Mue' });
});

module.exports = router;
