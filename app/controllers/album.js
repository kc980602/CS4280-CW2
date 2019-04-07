const dbController = require('./dbController')
const profile = new class {
    async view_album(req, res) {
        let albumId = req.query.id
        let album = await dbController.get_album_by_album_id(albumId)
        let hasPurchased = false

        if(req.login){
            let user = req.session.user
            
            hasPurchased = await dbController.check_album_has_purchased(albumId, user.id)
        }

        if (album) {
            res.render('album', {
                isLogin: req.login,
                album: album,
                hasPurchased: hasPurchased
            })
        } else {
            res.res(500).end()
        }
    }
}()

module.exports = profile