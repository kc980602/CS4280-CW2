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
    // async getAlbums(page, isAdmin) {
    //     let sql = 'SELECT * FROM album WHERE status = 0 LIMIT ?, 12'
    //     if (isAdmin) {
    //         sql = 'SELECT * FROM album LIMIT ?, 12'
    //     }
    //     const result = await mysql.query(sql, page * 12)
    //     return toInstanceForceArray(new Album(), result)
    // }
    //
    // async getAlbum(id) {
    //     //  Get Album
    //     let result = await mysql.query(`SELECT * FROM album WHERE id = ? AND status = 0`, id)
    //     if (result.length === 0) return false
    //     const data = toInstanceForce(new Album(), result[0])
    //     //  Get all tracks of the album
    //     result = await mysql.query(`SELECT * FROM track WHERE album_id = ? AND status = 0`, id)
    //     data.tracks = toInstanceForceArray(new Track(), result)
    //     return data
    // }
    //
    // getTotalPrice(tracks) {
    //     let total = 0
    //     if (tracks.length !== 0)
    //         for (const item of tracks)
    //             total += item.price
    //     return total
    // }

}

module.exports = Cart
