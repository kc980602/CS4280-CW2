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

albumModel = new Album()
trackModel = new Track()
cartModel = new Cart()
orderModel = new Order()

module.exports = new class {
    async getCollection(user) {
        const result = await mysql.query(`SELECT a.*, sum(t.price) AS total 
                                                FROM \`album\` a, \`track\` t, \`order\` o, \`order_item\` oi 
                                                WHERE o.user_id = ? AND
                                                        o.id = oi.order_id AND
                                                        a.id = oi.album_id AND
                                                        t.id = oi.track_id AND
                                                        (o.created BETWEEN NOW() - INTERVAL 3 DAY AND NOW()) 
                                                GROUP BY a.id 
                                                ORDER BY a.title`, [user.id]);
        console.log(result)
        if (result) {
            let albumList = [];

            for (let row of result) {
                let album = new Album(...Object.values(row));

                album.total = row.total;
                albumList.push(album);
            }

            return albumList;
        } else
            return false;
    }

    async getRefundOrderList() {
        const result = await mysql.query(`SELECT *, a.id AS album_id, a.thumbnail, a.title AS album_title, o.id AS order_id, o.created AS order_created, oi.id AS oi_id, oi.refundable AS oi_refundable, oi.status AS oi_status
                                                , t.id AS track_id, t.title AS track_title, t.artist AS track_artist, IF(o.created BETWEEN NOW() - INTERVAL 3 DAY AND NOW(), True, False) AS refund_ava
                                                FROM \`album\` a, \`track\` t, \`order\` o, \`order_item\` oi 
                                                WHERE o.id = oi.order_id AND
                                                        a.id = oi.album_id AND
                                                        t.id = oi.track_id  AND
                                                        oi.status = 1
                                                ORDER BY o.id`);

        if (result) {
            let orderList = {};
            for (let row of result) {
                if (!orderList[row.order_id]) {
                    let order = new Order(row.order_id, null, null, row.order_created);

                    order.order_item = {};
                    order.refund_ava = row.refund_ava;
                    orderList[row.order_id] = order;
                }
                if (!orderList[row.order_id].order_item[row.oi_id]) {
                    let orderItem = new OrderItem(row.oi_id);

                    orderItem.albums = {};
                    orderItem.refundable = row.refundable;
                    orderItem.status = row.oi_status;
                    orderList[row.order_id].order_item[row.oi_id] = orderItem;
                }
                if (!orderList[row.order_id].order_item[row.oi_id].albums[row.album_id]) {
                    let album = new Album(row.album_id, row.album_title);

                    album.tracks = {};
                    album.thumbnail = row.thumbnail;
                    orderList[row.order_id].order_item[row.oi_id].albums[row.album_id] = album;
                }
                if (!orderList[row.order_id].order_item[row.oi_id].albums[row.album_id].tracks[row.track_id]) {
                    let track = new Track(row.track_id, null, row.track_title, row.track_artist, row.length, row.price, row.quantity, row.file, row.preview);

                    orderList[row.order_id].order_item[row.oi_id].albums[row.album_id].tracks[row.track_id] = track;
                }
            }

            return orderList;
        } else {
            return false;
        }
    }

    async getOrderList(user) {
        const result = await mysql.query(`SELECT *, a.id AS album_id, a.thumbnail, a.title AS album_title, o.id AS order_id, o.created AS order_created, oi.id AS oi_id, oi.refundable AS oi_refundable, oi.status AS oi_status
                                                , t.id AS track_id, t.title AS track_title, t.artist AS track_artist, IF(o.created BETWEEN NOW() - INTERVAL 3 DAY AND NOW(), True, False) AS refund_ava
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
                    order.refund_ava = row.refund_ava;
                    orderList[row.order_id] = order;
                }
                if (!orderList[row.order_id].order_item[row.oi_id]) {
                    let orderItem = new OrderItem(row.oi_id);

                    orderItem.albums = {};
                    orderItem.refundable = row.refundable;
                    orderItem.status = row.oi_status;
                    orderList[row.order_id].order_item[row.oi_id] = orderItem;
                }
                if (!orderList[row.order_id].order_item[row.oi_id].albums[row.album_id]) {
                    let album = new Album(row.album_id, row.album_title);

                    album.tracks = {};
                    album.thumbnail = row.thumbnail;
                    orderList[row.order_id].order_item[row.oi_id].albums[row.album_id] = album;
                }
                if (!orderList[row.order_id].order_item[row.oi_id].albums[row.album_id].tracks[row.track_id]) {
                    let track = new Track(row.track_id, null, row.track_title, row.track_artist, row.length, row.price, row.quantity, row.file, row.preview);

                    orderList[row.order_id].order_item[row.oi_id].albums[row.album_id].tracks[row.track_id] = track;
                }
            }

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
            return orderItem;
        } else {
            return false;
        }
    }

    async acceptRefundOrder(orderItem) {
        const result = await mysql.insert(`UPDATE \`order_item\` 
                                                SET status = 2 
                                                WHERE id = ? AND 
                                                        status = 1 AND 
                                                        refundable = 1`, [orderItem.id]);
        if (result) {
            return orderItem;
        } else {
            return false;
        }
    }

    async declineRefundOrder(orderItem) {
        const result = await mysql.insert(`UPDATE \`order_item\` 
                                                SET status = 3 
                                                WHERE id = ? AND 
                                                        status = 1 AND 
                                                        refundable = 1`, [orderItem.id]);
        if (result) {
            return orderItem;
        } else {
            return false;
        }
    }

    async updateOrder(req, res) {
        if (req.body.refund) {
            let orderItemId = req.body.order_item_id;
            let orderItem = new Order(orderItemId);

            let result = await this.requestRefundOrder(orderItem);

            console.log(result);
            if (result) {
                return res.status(200).end();
            } else {
                return res.status(500).end();
            }
        }
        if (req.body.accept_refund != undefined) {
            let orderItemId = req.body.order_item_id;
            let orderItem = new Order(orderItemId);

            let result;
            if (req.body.accept_refund) {
                result = await this.acceptRefundOrder(orderItem);
            } else {
                result = await this.declineRefundOrder(orderItem);
            }

            if (result) {
                return res.status(200).end();
            } else {
                return res.status(500).end();
            }
        }
        return res.status(400).end();
    }

    async getPurchased(req, res) {
        let user = req.session.user;
        let orderList = await this.getOrderList(user);

        if (orderList) {
            res.json(orderList);
        } else {
            return res.status(500).end();
        }
    }

    async getRequestedRefund(req, res) {
        let orderList = await this.getRefundOrderList();

        if (orderList) {
            res.json(orderList);
        } else {
            return res.status(500).end();
        }
    }

    async sales(req, res, next) {
        const data = await orderModel.getDailySales()

        const dateLabel = []
        const orders = []
        const sales = []
        const point = []

        for (const item of data) {
            dateLabel.push(moment(item.date).add(1, 'days').utc().format('YYYY-MM-DD'))
            orders.push(item.orders)
            sales.push(item.sales)
            point.push(item.point)
        }
        console.log(dateLabel, orders, sales)
        res.render('admin/index', {
            title: 'Admin Page | Mue',
            dateLabel: dateLabel,
            orders: orders,
            sales: sales,
            point:point
        })
    }
}()
