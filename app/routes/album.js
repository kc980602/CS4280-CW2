const express = require('express');
const router = express.Router();
const AlbumController = require('../controllers/album');

albumController = new AlbumController()

router.get('/browse/albums', albumController.browseAlbums)

router.get('/album/:id', albumController.browseAlbum)

module.exports = router;
