var express = require('express');
var router = express.Router();
const albumController = require('../controllers/album')
const adminRoute = require('../middlewares/adminRoute')

router.use('/', adminRoute, (req, res, next) =>{
    next()
})

//  Below is admin protected route, adminRoute is applied above

router.get('/', (req, res) => {
    res.render('admin/index', {
        title: 'Browse Albums | Mue',
        isLogin: req.login,
    })
})

router.get('/product', (req, res) => {
    res.render('admin/product', {
        title: 'Browse Albums | Mue',
        isLogin: req.login,
    })
})

router.get('/product/add', (req, res) => {
    res.render('admin/product-add', {
        title: 'Browse Albums | Mue',
        isLogin: req.login
    })
})

router.post('/product/add', (req, res) => {
    albumController.addAlbum(req, res);
})


router.get('/product/album/:id', (req, res) => {
    res.render('admin/index', {
        title: 'Browse Albums | Mue',
        isLogin: req.login,
    })

})

router.get('/product/refund', (req, res) => {
    res.render('admin/refund', {
        title: 'Browse Albums | Mue',
        isLogin: req.login,
    })
})

module.exports = router;
