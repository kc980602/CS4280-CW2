var express = require('express');
var router = express.Router();
const albumController = require('../controllers/album')
const orderController = require('../controllers/order')
const adminRoute = require('../middlewares/adminRoute')

router.get('/', adminRoute, orderController.sales)

router.get('/product', adminRoute, albumController.browseAdminAlbums)

router.get('/product/add', (req, res) => {
    res.render('admin/product-add', {
        title: 'Browse Albums | Mue'
    })
})

router.post('/product/add', adminRoute, (req, res) => {
    albumController.addAlbum(req, res);
})

router.post('/product/management', adminRoute, (req, res) => {
    albumController.editAlbum(req, res);
})

router.get('/product/management/:album_id', adminRoute, (req, res) => {
    res.render('admin/product-edit', {
        title: 'Edit Albums | Mue',
        album_id: req.params.album_id
    })
})

router.get('/product/:album_id', adminRoute, (req, res) => {
    albumController.getAllAlbumInfo(req, res);
})

router.get('/refund', adminRoute, (req, res) => {
    res.render('admin/refund', {
        title: 'Refund Order | Mue'
    })
})

router.get('/refund-request', adminRoute, (req, res) => {
    orderController.getRequestedRefund(req, res);
})

module.exports = router;
