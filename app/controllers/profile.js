const dbController = require('./dbController')
const profile = new class {
    async view_collection(req, res) {
        let user = req.session.user
        let collection = await dbController.get_purchased_collection_by_user_id(user.id)

        if (collection) {
            res.render('collection', {
                collection: collection
            })
        } else {
            res.res(500).end()
        }
    }
    async view_purchase(req, res) {
        let user = req.session.user
        let orders = await dbController.get_purchased_orders_by_user_id(user.id)

        if (orders) {
            res.render('purchase', {
                collection: orders
            })
        } else {
            res.res(500).end()
        }
    }
}()

module.exports = profile