const mysql = require('../../mysql/utils')
const {toInstanceForce, toInstanceForceArray} = require('../../utils/serializer')

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
    async getItems(userId) {
        const result = await mysql.query(`SELECT * FROM cart WHERE user_id = ?`, userId)
        return toInstanceForceArray(new Cart(), result)
    }

    async addItem(userId, albumId, trackId) {
        //  Get Album
        const result = await mysql.query(`INSERT IGNORE INTO cart(user_id, album_id, track_id)VALUES (?, ?, ?)`, [userId, albumId, trackId])
        if (result.affectedRows === 1)
            return true
        return false
    }

    // getTotalPrice(tracks) {
    //     let total = 0
    //     if (tracks.length !== 0)
    //         for (const item of tracks)
    //             total += item.price
    //     return total
    // }

}

module.exports = Cart
