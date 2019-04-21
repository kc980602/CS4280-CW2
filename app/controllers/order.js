const Album = require('../models/album')
const Track = require('../models/track')
const Order = require('../models/order')
const Cart = require('../models/cart')
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
const MediaSplit = require('media-split');

albumModel = new Album()
trackModel = new Track()
cartModel = new Cart()

module.exports = new class {
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

            requestRefundOrder(orderItem);
        }
        return res.status(400).end();
    }
}()