var express = require('express');
var router = express.Router();
const albumController = require('../controllers/album')
const orderController = require('../controllers/order')
const adminRoute = require('../middlewares/adminRoute')

router.get('/', orderController.sales)

router.get('/product', adminRoute, albumController.browseAdminAlbums)

router.get('/product/add', (req, res) => {
    res.render('admin/product-add', {
        title: 'Browse Albums | Mue',
        isLogin: req.login
    })
})

router.post('/product/add', adminRoute, (req, res) => {
    albumController.addAlbum(req, res);
})


router.get('/product/album/:id', adminRoute, (req, res) => {
    res.render('admin/index', {
        title: 'Browse Albums | Mue',
        isLogin: req.login,
    })

})

router.get('/product/refund', adminRoute, (req, res) => {
    res.render('admin/refund', {
        title: 'Browse Albums | Mue',
        isLogin: req.login,
    })
})

module.exports = router;
