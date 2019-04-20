const Album = require('../models/album')
const dbController = require('./dbController')
const Album = require('../models/album')
const check = require('../../utils/checkQuery')
const toNumber = require('../../utils/toNumber')
const {toInstanceForce, toInstanceForceArray} = require('../../utils/serializer')
const mysql = require('../../mysql/utils')
const genUID = require('../../utils/genUID');
const path = require('path');
const fs = require('fs');
const formidable = require('formidable');
const storagePath = path.resolve(path.dirname(__dirname), '..');


async function insertAlbum(album) {
    const result = await mysql.insert(`INSERT INTO \`album\`(thumbnail, title, artist, label) VALUES(?, ?, ?, ?)`, [album.thumbnail, album.title, album.artist, album.label]);

    console.log(result)
    if (result) {
        album.id = result.insertId;
        
        return album;
    } else {
        return false;
    }
async function get_all_album() {

}

async function addAlbum(req, res) {
    let form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.render('/admin/product/add', {
                title: 'Add Albums | Mue',
                code: 303,
                message: 'Internal Server Error.'
            });
        }

        if (!fields.title || !fields.artist || !fields.label || !files.thumbnail) {
            return res.render('/admin/product/add', {
                title: 'Add Albums | Mue',
                code: 400,
                message: 'Missing parameters.'
            })
        }

        let thumbnailPath = path.resolve('./storage/thumbnail', genUID() + path.extname(files.thumbnail.name));
        let album = new Album(null, thumbnailPath, fields.title, fields.artist, fields.label);
        let result = await insertAlbum(album);

        if (result) {
            console.log(result)
            fs.writeFile(path.resolve(storagePath, thumbnailPath), files.thumbnail, (err) => {
                if (!err) {
                    res.status(302).redirect('/admin/product');
                } else {
                    res.render('admin/product-add', {
                        title: 'Add Albums | Mue',
                        code: 500,
                        message: 'Add album fail, please try again later.'
                    })
                }
            });
        } else {
            console.log(3)
            res.render('admin/product-add', {
                title: 'Add Albums | Mue',
                code: 500,
                message: 'Add album fail, please try again later.'
            })
        }
    });
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
