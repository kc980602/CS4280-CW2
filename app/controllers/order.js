const Album = require('../models/album')
const Track = require('../models/track')
const Order = require('../models/order')
const OrderItem = require('../models/orderItem')
const User = require('../models/user')
const Cart = require('../models/cart')
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
const MediaSplit = require('media-split');

albumModel = new Album()
trackModel = new Track()
cartModel = new Cart()

module.exports = new class {
    async getOrderList(user) {
        const result = await mysql.insert(`SELECT *, a.id AS album_id, a.thumbnail, a.title AS album_title, o.id AS order_id, o.created AS order_created, oi.id AS oi_id, oi.refundable AS oi_refundable, oi.status AS oi_status
                                                , t.id AS track_id, t.title AS track_title, t.artist AS track_artist
                                                FROM \`album\` a, \`track\` t, \`order\` o, \`order_item\` oi 
                                                WHERE o.user_id = ? AND
                                                        o.id = oi.order_id AND
                                                        a.id = oi.album_id AND
                                                        t.id = oi.track_id 
                                                ORDER BY o.id`, [user.id]);

        if (result) {
            let orderList = {};
            for (let row of result) {
                if (!orderList[row.order_id]) {
                    let order = new Order(row.order_id, null, null, row.order_created);

                    order.order_item = {};
                    orderList[row.order_id] = order;
                }
                if(!orderList[row.order_id].order_item[row.oi_id]){
                    let orderItem = new OrderItem(row.oi_id);

                    orderItem.albums = {};
                    orderItem.refundable = row.refundable;
                    orderItem.status = row.oi_status;
                    orderList[row.order_id].order_item[row.oi_id] = orderItem;
                }
                if (!orderList[row.order_id].order_item[row.oi_id].albums[row.album_id]) {
                    let album = new Album(row.album_id, row.thumbnail, row.album_title);

                    album.tracks = {};
                    orderList[row.order_id].order_item[row.oi_id].albums[row.album_id] = album;
                }
                if (!orderList[row.order_id].order_item[row.oi_id].albums[row.album_id].tracks[row.track_id]) {
                    let track = new Track(row.track_id, null, row.track_title, row.track_artist, row.length, row.price, row.quantity, row.file, row.preview);

                    orderList[row.order_id].order_item[row.oi_id].albums[row.album_id].tracks[row.track_id] = track;
                }
            }

            console.log(orderList)
            return orderList;
        } else {
            return false;
        }
    }

    async requestRefundOrder(orderItem) {
        const result = await mysql.insert(`UPDATE \`order_item\` 
                                                SET status = 1 
                                                WHERE id = ? AND 
                                                        status = 0 AND 
                                                        refundable = 1`, [orderItem.id]);
        if (result) {
            return order_item;
        } else {
            return false;
        }
    }

    async updateOrder(req, res) {
        if (req.body.refund) {
            let orderItemId = req.body.order_item_id;
            let orderItem = new Order(orderItemId);

            let result = await this.requestRefundOrder(orderItem);

            if (result) {
                res.status(200).end();
            } else {
                res.status(500).end();
            }
        }
        return res.status(400).end();
    }

    async getPurchased(req, res) {
        let user = req.session.user;
        console.log(this)
        let orderList = await this.getOrderList(user);

        if(orderList) {
            res.json(orderList);
        }else {
            res.status(500).end();
        }
    }
}()