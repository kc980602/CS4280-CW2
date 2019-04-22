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
const orderController = require('./order')


const profile = new class {
    async view_collection(req, res) {
        let user = req.session.user
        let collection = await orderController.getCollection(user);

        if (collection) {
            res.render('profile', {
                title: 'Your Library | Mue',
                collection: collection,
                tab: 'COLLECTION'
            })
        } else {
            res.status(500).end()
        }
    }
}()

module.exports = profile
