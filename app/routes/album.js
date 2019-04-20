const express = require('express');
const router = express.Router();
const albumController = require('../controllers/album');

router.get('/browse/albums', albumController.browseAlbums)

router.get('/album/:id', albumController.browseAlbum)

router.get('/album/thumbnail/:filename', albumController.getAlbumThumbnail)

module.exports = router;
