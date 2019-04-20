const express = require('express');
const router = express.Router();
const AlbumController = require('../controllers/album')
const protectedRoute = require('../middlewares/protectedRoute')

router.get('/browse/albums', albumController.browseAlbums)

router.get('/album/:id', albumController.browseAlbum)

router.get('/cart', protectedRoute, (req, res, next) => {
    res.render('cart', {
        title: 'Cart | Mue',
        isLogin: req.login,
    })
})

router.get('/checkout', protectedRoute, (req, res, next) => {
    res.render('checkout', {
        title: 'Checkout | Mue',
        isLogin: req.login,
    })
})


router.get('/album/thumbnail/:filename', albumController.getAlbumThumbnail)

module.exports = router;
