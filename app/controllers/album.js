const dbController = require('./dbController')
const Album = require('../models/album')
const check = require('../../utils/checkQuery')
const toNumber = require('../../utils/toNumber')
const {toInstanceForce, toInstanceForceArray} = require('../../utils/serializer')
const mysql = require('../../mysql/utils')

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

async function getAlbums(req, res) {
    const page = toNumber(req.query.page, 0)
    const result = await mysql.query(`SELECT * FROM album WHERE status = 0 LIMIT ?, 12`, page * 12)
    return toInstanceForceArray(new Album(), result)
}

async function view_album(req, res) {
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

async function view_all_album(req, res) {
    let albumList = await dbController.get_all_album()

    if (albumList) {
        res.render('albums', {
            title: 'Browse Albums | Mue',
            isLogin: req.login,
            albumList: albumList,
        })
    } else {
        res.status(500).end()
    }
}

module.exports = {
    addAlbum,
    getAlbums,
    view_album,
    view_all_album
}
