const Album = require('../models/album')
const Track = require('../models/track')
const Cart = require('../models/cart')
const check = require('../../utils/checkQuery')
const toNumber = require('../../utils/toNumber')
const {toInstanceForce, toInstanceForceArray} = require('../../utils/serializer')
const mysql = require('../../mysql/utils')
const moment = require('moment');
const genUID = require('../../utils/genUID');
const path = require('path');
const fs = require('fs');
const formidable = require('formidable');
const storagePath = path.resolve(path.dirname(__dirname), '../storage');
const thumbnailStoragePath = path.resolve(storagePath, './thumbnail');

albumModel = new Album()
trackModel = new Track()
cartModel = new Cart()

module.exports = new class {
    async insertAlbum(album) {
        const result = await mysql.insert(`INSERT INTO \`album\`(thumbnail, title, artist, label) VALUES(?, ?, ?, ?)`, [album.thumbnail, album.title, album.artist, album.label]);

        console.log(result)
        if (result) {
            album.id = result.insertId;

            return album;
        } else {
            return false;
        }
    }

    async addAlbum(req, res) {
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
            let album = new Album(null, thumbnailName, fields.title, fields.artist, fields.label);
            let result = await this.insertAlbum(album);

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

                    fs.writeFile(path.resolve(thumbnailStoragePath, thumbnailName), data, function (err) {
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

    async browseAlbums(req, res, next) {
        const page = toNumber(req.query.page, 1)
        const albumList = await albumModel.getAlbums(page-1, false)
        if (albumList.length === 0) res.status(302).redirect('/browse/albums')
        res.render('albums', {
            title: 'Browse Album | Mue',
            albums: albumList,
            curr: page,
            total: Math.ceil(await albumModel.getAlbumsCount() / 12),
            pathPrefix: '/browse/albums?page='
        })
    }

    async browseAdminAlbums(req, res, next) {
        const page = toNumber(req.query.page, 1)
        const albumList = await albumModel.getAlbums(page-1, true)
        if (albumList.length === 0) res.status(302).redirect('/admin/product')
        res.render('admin/product', {
            title: 'Browse Album | Mue',
            albums: albumList,
            curr: page,
            total: Math.ceil(await albumModel.getAlbumsCount() / 12),
            pathPrefix: '/admin/product?page='
        })
    }


    async browseAlbum(req, res, next) {
        const data = await albumModel.getAlbum(toNumber(req.params.id, 0))
        if (!data) res.status(404).redirect('/error')
        res.render('album', {
            title: 'Browse Album | Mue',
            album: data,
            totalPrice: albumModel.getTotalPrice(data.tracks),
            moment: moment
        })
    }

    async getAlbumThumbnail(req, res, next) {
        let thumbnailName = req.params.filename
        if(!thumbnailName)
            return res.status(400).end()
        return res.sendFile(path.resolve(thumbnailStoragePath, thumbnailName))
    }

    async addToCart(req, res, next){
        if (!req.session.user) {
            res.redirect('/login')
        }

        const albumId = req.params.album
        const trackId = req.params.track

        const addTarget = []

        if (trackId === 'ALL') {
            const tracks = await trackModel.getTracks(albumId)
            for (const item of tracks) {
                addTarget.push(item.id)
            }
        } else {
            addTarget.push(trackId)
        }

        for (const item of addTarget){
            console.log(req.session.user.id, albumId, item)
            await cartModel.addItem(req.session.user.id, albumId, item)
        }

        res.render('purchase/addToCart', {title: 'Added To Cart | Mue', totalItem: addTarget.length})

    }

    async getCartItems(req, res, next){

    }

}()
