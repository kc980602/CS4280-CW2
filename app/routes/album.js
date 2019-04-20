const express = require('express');
const router = express.Router();
const AlbumController = require('../controllers/album');

albumController = new AlbumController()

// router.get('/browse/albums', async (req, res) => {
//     const albums = await albumController.getAlbums(req, res)
//     if (albums.length === 0) res.status(302).redirect('/browse/albums')
//     res.render('albums', {
//         title: 'Browse Album | Mue',
//         albums: albums,
//         curr: req.query.page,
//         total: await albumController.getAlbumsCount()
//     })
// })

router.get('/browse/albums', albumController.browseAlbums)

router.get('/album/:id', (req, res) => {
    // AlbumController.view_album(req,res)
    res.render('album', {
        title: 'A Album | Mue',
        isLogin: req.login,
    })
})

module.exports = router;
