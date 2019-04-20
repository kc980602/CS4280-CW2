var express = require('express');
var router = express.Router();
const albumController = require('../controllers/album')

router.get('/', (req, res, next) => {
    res.render('admin/index', {
        title: 'Browse Albums | Mue',
        isLogin: req.login,
    })
})

router.get('/product', (req, res, next) => {
    res.render('admin/product', {
        title: 'Browse Albums | Mue',
        isLogin: req.login,
    })
})

router.get('/product/add', (req, res, next) => {
    res.render('admin/product-add', {title: 'Browse Albums | Mue', isLogin: req.login})
})

router.post('/product/add', (req, res, next) => {

})

router.get('/product/add', (req, res, next) => {
    res.render('admin/product-add', {title: 'Browse Albums | Mue', isLogin: req.login})
})


router.get('/product/album/:id', (req, res, next) => {
    res.render('admin/index', {
        title: 'Browse Albums | Mue',
        isLogin: req.login,
    })

})

router.get('/product/refund', (req, res, next) => {
    res.render('admin/refund', {
        title: 'Browse Albums | Mue',
        isLogin: req.login,
    })
})


module.exports = router;
