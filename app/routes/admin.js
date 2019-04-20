var express = require('express');
var router = express.Router();
const AlbumController = require('../controllers/album')
const adminRoute = require('../middlewares/adminRoute')

albumController = new AlbumController()

router.use('/', adminRoute, (req, res, next) =>{
    next()
})

//  Below is admin protected route, adminRoute is applied above

router.get('/', (req, res) => {
    res.render('admin/index', {
        title: 'Browse Albums | Mue',
        isLogin: req.login,
    })
})

router.get('/product', albumController.browseAdminAlbums)

router.get('/product/add', (req, res) => {
    res.render('admin/product-add', {
        title: 'Browse Albums | Mue',
        isLogin: req.login
    })
})

router.post('/product/add', (req, res) => {
    albumController.addAlbum(req, res);
})


router.get('/product/album/:id', (req, res) => {
    res.render('admin/index', {
        title: 'Browse Albums | Mue',
        isLogin: req.login,
    })

})

router.get('/product/refund', (req, res) => {
    res.render('admin/refund', {
        title: 'Browse Albums | Mue',
        isLogin: req.login,
    })
})

module.exports = router;
