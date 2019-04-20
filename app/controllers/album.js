const dbController = require('./dbController')
const Album = require('../models/album')
const check = require('../../utils/checkQuery')
const toNumber = require('../../utils/toNumber')
const {toInstanceForce, toInstanceForceArray} = require('../../utils/serializer')
const mysql = require('../../mysql/utils')
const moment = require('moment');

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
        const albumList = await album.getAlbums(toNumber(req.query.page, 0))
        if (albumList.length === 0) res.status(302).redirect('/browse/albums')
        res.render('albums', {
            title: 'Browse Album | Mue',
            albums: albumList,
            curr: req.query.page,
            total: Math.round(await album.getAlbumsCount() / 12)
        })
    }

    async browseAlbum(req, res, next) {
        const data = await album.getAlbum(toNumber(req.params.id, 0))
        if (!data) res.status(404).redirect('/error')
        res.render('album', {
            title: 'Browse Album | Mue',
            album: data,
            totalPrice: album.getTotalPrice(data.tracks),
            moment: moment
        })
    }
}
