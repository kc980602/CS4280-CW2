var express = require('express');
var router = express.Router();
const albumController = require('../controllers/album')
const adminRoute = require('../middlewares/adminRoute')

router.get('/', adminRoute, (req, res) => {
    res.render('admin/index', {
        title: 'Browse Albums | Mue'
    })
})

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