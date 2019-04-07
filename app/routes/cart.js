var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('cart', { title: 'Cart | Mue' });
});



module.exports = router;
