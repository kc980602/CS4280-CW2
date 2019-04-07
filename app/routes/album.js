const express = require('express');
const router = express.Router();
const AlbumController = require('../controllers/album');

router.get('/browse/albums', (req, res) => {
    AlbumController.view_all_album(req.res)
});

router.get('/album/:id', (req, res) => {
    AlbumController.view_album(req.res)
});


module.exports = router;