const express = require('express');
const router = express.Router();
const albumController = require('../controllers/album')
const protectedRoute = require('../middlewares/protectedRoute')

router.get('/browse/albums', albumController.browseAlbums)

router.get('/album/:id', albumController.browseAlbum)

router.get('/album/thumbnail/:filename', albumController.getAlbumThumbnail)

router.get('/album/full/:full_filename', albumController.getFullTrack)

router.get('/album/preview/:preview_filename', albumController.getTrackPreview)

router.get('/cart', protectedRoute, albumController.getCartItems)

router.post('/cart/:album/:track', protectedRoute, albumController.addToCart)

router.delete('/cart/:album/:track', protectedRoute, albumController.removeFromCart)

router.get('/checkout', protectedRoute, albumController.getCheckout)

router.post('/checkout', protectedRoute, albumController.confirmCheckout)

module.exports = router;
