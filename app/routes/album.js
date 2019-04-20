const express = require('express');
const router = express.Router();
const albumController = require('../controllers/album');

router.get('/browse/albums', async (req, res) => {
    const albums = await albumController.getAlbums(req, res)
    if (albums.length === 0) res.status(302).redirect('/browse/albums')
    res.render('albums', {
        title: 'Browse Album | Mue',
        albums: albums
    })
})

router.get('/album/:id', (req, res) => {
    // AlbumController.view_album(req,res)
    res.render('album', {
        title: 'A Album | Mue',
        isLogin: req.login,
    })
})

module.exports = router;
