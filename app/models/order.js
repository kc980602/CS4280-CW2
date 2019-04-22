const mysql = require('../../mysql/utils')
const {toInstanceForce} = require('../../utils/serializer')
const Track = require('../models/track')
const Cart = require('../models/cart')
const User = require('../models/user')

trackModel = new Track()
cartModel = new Cart()
userModel = new User()

const Order = class {
    constructor(id, user_id, status, created) {
        this.id = id
        this.user_id = user_id
        this.order_item = []
        this.status = status
        this.created = created
    }

    async createOrder(order, point) {
        let result = await mysql.query(`INSERT INTO \`order\`(\`user_id\`) VALUES(?)`, order.user_id)

        const orderId = result.insertId
        const orderItem = []
        let totalPrice = 0
        for (const item of order.order_item) {
            orderItem.push([orderId, item.album_id, item.track_id, item.price, item.refundable])
            totalPrice += item.price
        }
        result = await mysql.query(`INSERT INTO \`order_item\`(\`order_id\`, \`album_id\`, \`track_id\`, \`price\`, \`refundable\`) VALUES ?`, [orderItem])
        if (result.affectedRows === order.order_item.length) {
            await cartModel.clearCart(order.user_id)
            await userModel.deductPoint(order.user_id, -point + totalPrice / 2)
            for (const item of order.order_item) {
                await trackModel.deductTrackQuantity(item.track_id)
            }
            return true
        }

        return false
    }

    async checkPurchased(userId, albumId) {
        const result = await mysql.query(`SELECT GROUP_CONCAT(DISTINCT oi.track_id ORDER BY oi.track_id) as tracks FROM order_item AS oi WHERE oi.user_id = ? AND oi.album_id = ?`, [userId, albumId])
        return result[0].tracks
    }
}

module.exports = Order;
