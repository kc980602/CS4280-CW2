const express = require('express');
const router = express.Router();
const AlbumController = require('../controllers/album');

router.get('/browse/albums', (req, res) => {
    res.render('albums', {
        title: 'Browse Album | Mue',
        isLogin: req.login,
    })
    // AlbumController.view_all_album(req, res)
});

router.get('/album/:id', (req, res) => {
    // AlbumController.view_album(req,res)
    res.render('album', {
        title: 'A Album | Mue',
        isLogin: req.login,
    })
});

module.exports = router;
