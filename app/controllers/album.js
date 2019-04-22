const User = require('../models/user')
const Album = require('../models/album')
const Track = require('../models/track')
const Cart = require('../models/cart')
const Order = require('../models/order')
const OrderItem = require('../models/orderItem')
const check = require('../../utils/checkQuery')
const toNumber = require('../../utils/toNumber')
const {toInstanceForce, toInstanceForceArray} = require('../../utils/serializer')
const mysql = require('../../mysql/utils')
const moment = require('moment');
const genUID = require('../../utils/genUID');
const path = require('path');
const fs = require('fs');
const formidable = require('formidable');
const MediaSplit = require('media-split');
const storagePath = path.resolve(path.dirname(__dirname), '../storage');
const thumbnailStoragePath = path.resolve(storagePath, './thumbnail');
const trackStoragePath = path.resolve(storagePath, './track');
const fullStoragePath = path.resolve(trackStoragePath, './full');
const previewStoragePath = path.resolve(trackStoragePath, './preview');

userModel = new User()
albumModel = new Album()
trackModel = new Track()
cartModel = new Cart()
orderModel = new Order()

module.exports = new class {
    async insertTrack(track) {
        const result = await mysql.insert(`INSERT INTO \`track\`(album_id, title, artist, length, price, quantity, file, file_preview) VALUES(?, ?, ?, ?, ?, ?, ?, ?)`, [track.album_id, track.title, track.artist, track.length, track.price, track.quantity, track.file, track.file_preview]);

        console.log(result)
        if (result) {
            track.id = result.insertId;

            return track;
        } else {
            return false;
        }
    }

    async insertAlbum(album) {
        const result = await mysql.insert(`INSERT INTO \`album\`(thumbnail, title, artist, label, release_date) VALUES(?, ?, ?, ?, ?)`, [album.thumbnail, album.title, album.artist, album.label, album.release_date]);

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
                return res.render('admin/product-add', {
                    title: 'Add Albums | Mue',
                    code: 500,
                    message: 'Internal Server Error.'
                });
            }

            console.log(fields)
            if (!fields.title || !fields.artist || !fields.label || !fields.release_date || !fields.track_length || !files.thumbnail) {
                return res.render('admin/product-add', {
                    title: 'Add Albums | Mue',
                    code: 400,
                    message: 'Missing parameters.'
                })
            }

            if (fields.track_length == 0) {
                console.log(0)
                return res.render('admin/product-add', {
                    title: 'Add Albums | Mue',
                    code: 400,
                    message: 'An album must contain at least one track.'
                });
            }

            let thumbnailName = genUID() + path.extname(files.thumbnail.name);
            let album = new Album(null, thumbnailName, fields.title, fields.artist, fields.label, fields.release_date);
            let result = await this.insertAlbum(album);

            if (result) {
                fs.readFile(files.thumbnail.path, (err, data) => {
                    if (err) {
                        return res.render('admin/product-add', {
                            title: 'Add Albums | Mue',
                            code: 500,
                            message: 'Uploading album thumbnail fail, please try again later.'
                        }).end();
                    }

                    fs.writeFile(path.resolve(thumbnailStoragePath, thumbnailName), data, (err) => {
                        if (err) {
                            return res.render('admin/product-add', {
                                title: 'Add Albums | Mue',
                                code: 500,
                                message: 'Saving album thumbnail fail, please try again later.'
                            }).end();
                        }
                    });
                });

                for (let i = 0; i < fields.track_length; i++) {
                    let title = fields[`trackList[${i}].title`];
                    let artist = fields[`trackList[${i}].artist`];
                    let length = fields[`trackList[${i}].length`];
                    let price = fields[`trackList[${i}].price`];
                    let quantity = fields[`trackList[${i}].quantity`];
                    let file = files[`trackList[${i}].file`];

                    if (title && artist && length && price && quantity && file) {
                        let fullTrackName = genUID() + path.extname(file.name);
                        let previewTrackName = genUID() + path.extname(file.name);

                        let split = new MediaSplit({
                            input: file.path,
                            output: 'storage/track/preview',
                            sections: [`[00:00 - 00:30] ${path.basename(previewTrackName, path.extname(file.name))}`]
                        });
                        split.parse().then((sections) => {

                        });
                        fs.readFile(file.path, (err, data) => {
                            if (err) {
                                return res.render('admin/product-add', {
                                    title: 'Add Albums | Mue',
                                    code: 500,
                                    message: 'Uploading track fail, please try again later.'
                                }).end();
                            }

                            fs.writeFile(path.resolve(fullStoragePath, fullTrackName), data, (err) => {
                                if (err) {
                                    return res.render('admin/product-add', {
                                        title: 'Add Albums | Mue',
                                        code: 500,
                                        message: 'Saving track fail, please try again later.'
                                    }).end();
                                }
                            });
                        });

                        let track = new Track(null, album.id, title, artist, length, price, quantity, fullTrackName, previewTrackName);
                        let result = await this.insertTrack(track);

                        if (!result) {
                            return res.render('admin/product-add', {
                                title: 'Add Albums | Mue',
                                code: 500,
                                message: 'Error occurred when adding track, please try again later.'
                            }).end();
                        }
                    }
                }
                console.log('done');
                return res.redirect('/admin/product');
            } else {
                res.render('admin/product-add', {
                    title: 'Add Albums | Mue',
                    code: 301,
                    message: 'Add album fail, please try again later.'
                })
            }
        })
    }

    async browseAlbums(req, res, next) {
        const page = toNumber(req.query.page, 1)
        const albumList = await albumModel.getAlbums(page - 1, false)
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
        const albumList = await albumModel.getAlbums(page - 1, true)
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
        if (req.session.user) {

        }

        res.render('album', {
            title: 'Browse Album | Mue',
            album: data,
            totalPrice: albumModel.getTotalPrice(data.tracks),
            moment: moment
        })
    }

    async getTrackPreview(req, res) {
        let previewFilename = req.params.preview_filename;

        if (!previewFilename)
            return res.status(400).end()
        return res.sendFile(path.resolve(previewStoragePath, previewFilename))
    }

    async getFullTrack(req, res) {
        let fullFilename = req.params.full_filename;

        if (!fullFilename)
            return res.status(400).end()
        return res.sendFile(path.resolve(fullStoragePath, fullFilename))
    }

    async getAlbumThumbnail(req, res, next) {
        let thumbnailName = req.params.filename

        if (!thumbnailName)
            return res.status(400).end()
        return res.sendFile(path.resolve(thumbnailStoragePath, thumbnailName))
    }

    async addToCart(req, res, next) {
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

        for (const item of addTarget) {
            await cartModel.addItem(req.session.user.id, albumId, item)
        }

        res.render('purchase/addToCart', {title: 'Added To Cart | Mue', totalItem: addTarget.length})
    }

    async removeFromCart(req, res, next) {
        const albumId = req.params.album
        const trackId = req.params.track

        const removeTarget = []

        if (trackId === 'ALL') {
            const tracks = await trackModel.getTracks(albumId)
            for (const item of tracks) {
                removeTarget.push(item.id)
            }
        } else {
            removeTarget.push(trackId)
        }

        for (const item of removeTarget) {
            await cartModel.removeItem(req.session.user.id, albumId, item)
        }

        res.end()
    }


    async getCartItems(req, res, next) {
        const data = await cartModel.getAlbumTrackItems(req.session.user.id)
        res.render('purchase/cart', {
            title: 'Cart | Mue',
            albums: data.albumList,
            totalPrice: data.totalPrice,
            moment: moment
        })
    }

    async getCheckout(req, res, next) {
        const user = await userModel.getUserById(req.session.user.id)
        const albumList = await cartModel.getAlbumTrackItems(user.id)
        res.render('purchase/checkout', {
            title: 'Checkout | Mue',
            totalPrice: albumList.totalPrice,
            point: user.point
        })
    }

    async confirmCheckout(req, res, next) {
        const userId = req.session.user.id
        const orderItems = await cartModel.getTrackItems(userId)

        let point = toNumber(req.body.point,  0)
        let tmpPoint = toNumber(req.body.point,  0)

        const order = new Order()
        order.user_id = userId

        //  add all order item into the order
        for (const item of orderItems) {
            const oi = new OrderItem()
            oi.album_id = item.album_id
            oi.track_id = item.id
            oi.price = item.price
            oi.refundable = 1
            order.order_item.push(oi)
        }

        //  set order item not refundable if using point
        let i = 0
        while (tmpPoint !== 0) {
            if (order.order_item[i].price >= tmpPoint) {
                order.order_item[i].refundable = 0
                order.order_item[i].price -= tmpPoint
                tmpPoint = 0
            } else {
                order.order_item[i].refundable = 0
                tmpPoint -= order.order_item[i].price
                order.order_item[i].price = 0
            }
            i++
        }

        await order.createOrder(order, point)

        res.redirect('/profile/purchase')
    }

}()
