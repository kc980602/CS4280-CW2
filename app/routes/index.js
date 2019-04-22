var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Online Music Store | Mue'
    });
});

router.get('/documentation', function (req, res, next) {
    res.render('documentation', {
        title: 'Documentation | Mue'
    });
});


module.exports = router;
