const profile = new class {
    async view_collection(req, res) {
        let user = req.session.user
        let collection = await dbController.get_purchased_collection_by_user_id(user.id)

        if (collection) {
            res.render('collection', {
                isLogin: req.login,
                collection: collection
            })
        } else {
            res.status(500).end()
        }
    }
    async view_purchase(req, res) {
        let user = req.session.user
        let orders = await dbController.get_purchased_orders_by_user_id(user.id)

        if (orders) {
            res.render('purchase', {
                isLogin: req.login,
                collection: orders
            })
        } else {
            res.status(500).end()
        }
    }
}()

module.exports = profile
