const express = require('express');
const router = express.Router();
const albumController = require('../controllers/album')
const protectedRoute = require('../middlewares/protectedRoute')

router.get('/browse/albums', albumController.browseAlbums)

router.get('/album/:id', albumController.browseAlbum)

router.get('/album/thumbnail/:filename', albumController.getAlbumThumbnail)

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


module.exports = router;
