const dbController = require('./dbController')
const profile = new class {
    async view_collection(req, res) {
        let user = req.session.user
        let result = await dbController.get_purchased_collection()
        
        res.send(result)
    }
    async view_purchase(req, res) {
        res.end()
    }
}()

module.exports = profile