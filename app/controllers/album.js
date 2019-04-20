const Album = require('../models/album')
const check = require('../../utils/checkQuery')
const toNumber = require('../../utils/toNumber')
const {
    toInstanceForce,
    toInstanceForceArray
} = require('../../utils/serializer')
const mysql = require('../../mysql/utils')
const moment = require('moment');
const genUID = require('../../utils/genUID');
const path = require('path');
const fs = require('fs');
const formidable = require('formidable');
const storagePath = path.resolve(path.dirname(__dirname), '..');

album = new Album()

async function insertAlbum(album) {
    const result = await mysql.insert(`INSERT INTO \`album\`(thumbnail, title, artist, label) VALUES(?, ?, ?, ?)`, [album.thumbnail, album.title, album.artist, album.label]);

    console.log(result)
    if (result) {
        album.id = result.insertId;

        return album;
    } else {
        return false;
    }
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

        let thumbnailName = genUID() + path.extname(files.thumbnail.name);
        let thumbnailPath = path.resolve('./storage/thumbnail', thumbnailName);
        let album = new Album(null, thumbnailName, fields.title, fields.artist, fields.label);
        let result = await insertAlbum(album);

        if (result) {
            console.log(files)

            fs.readFile(files.thumbnail.path, function (err, data) {
                if (err) {
                    return res.render('admin/product-add', {
                        title: 'Add Albums | Mue',
                        code: 500,
                        message: 'Add album fail, please try again later.'
                    })
                }

                fs.writeFile(path.resolve(storagePath, thumbnailPath), data, function (err) {
                    if (err) {
                        return res.render('admin/product-add', {
                            title: 'Add Albums | Mue',
                            code: 500,
                            message: 'Add album fail, please try again later.'
                        })
                    }

                    return res.status(302).redirect('/admin/product');
                });
            });
        } else {
            console.log(3)
            res.render('admin/product-add', {
                title: 'Add Albums | Mue',
                code: 500,
                message: 'Add album fail, please try again later.'
            })
        }
    })
}

module.exports = class AlbumController {
    async browseAlbums(req, res, next) {
        const page = toNumber(req.query.page, 1)
        const albumList = await album.getAlbums(page-1)
        if (albumList.length === 0) res.status(302).redirect('/browse/albums')
        res.render('albums', {
            title: 'Browse Album | Mue',
            albums: albumList,
            curr: page,
            total: Math.ceil(await album.getAlbumsCount() / 12),
            pathPrefix: '/browse/albums?page='
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
