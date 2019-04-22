const mysql = require('../../mysql/utils')
const {toInstanceForce, toInstanceForceArray} = require('../../utils/serializer')
const Album = require('../models/album')
const Track = require('../models/track')

albumModel = new Album()
trackModel = new Track()

const Cart = class {
    constructor(id, user_id, album_id, created) {
        this.id = id
        this.user_id = user_id;
        this.album_id = album_id
        this.created = created
    }


    // getReleaseDateYear() {
    //     return this.release_date.getFullYear()
    // }
    //
    // async getAlbumsCount() {
    //     const result = await mysql.query(`SELECT COUNT(*) as total FROM album WHERE status = 0`)
    //     return result[0].total
    // }
    //
    async getAlbumTrackItems(userId) {
        const result = await mysql.query(`SELECT a.*, GROUP_CONCAT(DISTINCT t.id ORDER BY c.track_id) as tracks FROM \`cart\` AS c, \`album\` AS a, \`track\` AS t WHERE c.user_id = ? AND c.album_id = a.id AND c.track_id = t.id GROUP BY c.album_id`, userId)
        const albumList = toInstanceForceArray(new Album(), result)

        let totalPrice = 0
        for (const item of albumList) {
            const result = await trackModel.getTracksWithArray(item.tracks)
            const trackList = toInstanceForceArray(new Track(), result)
            item.tracks = trackList
            item.price = albumModel.getTotalPrice(trackList)
            totalPrice += item.price
        }

        return {
            albumList: albumList,
            totalPrice: totalPrice
        }
    }

    async getTrackItems(userId) {
        const result = await mysql.query(`SELECT t.* FROM cart AS c, track AS t WHERE user_id = ? AND c.track_id = t.id`, userId)
        return toInstanceForceArray(new Track(), result)
    }

    async addItem(userId, albumId, trackId) {
        const result = await mysql.query(`INSERT IGNORE INTO cart(user_id, album_id, track_id)VALUES (?, ?, ?)`, [userId, albumId, trackId])
        if (result.affectedRows === 1)
            return true
        return false
    }

    async removeItem(userId, albumId, trackId) {
        const result = await mysql.query(`DELETE FROM cart WHERE user_id = ? AND album_id = ? AND track_id = ?`, [userId, albumId, trackId])
        if (result.affectedRows === 1)
            return true
        return false
    }

    async clearCart(userId){
        const result = await mysql.query(`DELETE FROM cart WHERE user_id = ?`, [userId])
        if (result.affectedRows > 1)
            return true
        return false
    }

    async checkInCart(userId, albumId) {
        const result = await mysql.query(`SELECT track_id FROM \`cart\` WHERE user_id = ? AND album_id = ?`, [userId, albumId])
        return result
    }

}

module.exports = Cart
