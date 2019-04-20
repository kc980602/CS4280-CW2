const dbController = require('./dbController')
const Album = require('../models/album')
const check = require('../../utils/checkQuery')
const toNumber = require('../../utils/toNumber')
const {toInstanceForce, toInstanceForceArray} = require('../../utils/serializer')
const mysql = require('../../mysql/utils')

album = new Album()

async function get_all_album() {

}

async function addAlbum(req, res) {
    let albumId = req.query.id
    let album = await dbController.get_album_by_album_id(albumId)
    let hasPurchased = false

    if (req.login) {
        let user = req.session.user

        hasPurchased = await dbController.check_album_has_purchased(albumId, user.id)
    }

    if (album) {
        res.render('album', {
            title: 'Browse Album | Mue',
            isLogin: req.login,
            album: album,
            hasPurchased: hasPurchased
        })
    } else {
        res.status(500).end()
    }
}

module.exports = class AlbumController {
    async browseAlbums(req, res, next) {
        const albums = await album.getAlbums(toNumber(req.query.page, 0))
        if (albums.length === 0) res.status(302).redirect('/browse/albums')
        res.render('albums', {
            title: 'Browse Album | Mue',
            albums: albums,
            curr: req.query.page,
            total: await album.getAlbumsCount()
        })
    }
}
