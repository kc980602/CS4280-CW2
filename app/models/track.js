const mysql = require('../../mysql/utils')
const {toInstanceForce, toInstanceForceArray} = require('../../utils/serializer')

const Track = class {
    constructor(id, album_id, title, artist, length, price, quantity, file, file_preview, status, created) {
        this.id = id
        this.album_id = album_id
        this.title = title
        this.artist = artist
        this.length = length
        this.price = price
        this.quantity = quantity
        this.file = file
        this.file_preview = file_preview
        this.status = status
        this.created = created
        this.owned = false
    }

    async getTrack(id) {
        const result = await mysql.query(`SELECT * FROM track WHERE id = ?`, id)
        return toInstanceForce(new Track(), result[0])
    }

    async getTracks(id) {
        const result = await mysql.query(`SELECT * FROM track WHERE album_id = ? AND status = 0`, id)
        return toInstanceForceArray(new Track(), result)
    }

    async getTracksWithArray(ids) {
        const result = await mysql.query(`SELECT * FROM track WHERE id IN (${ids}) AND status = 0`)
        return toInstanceForceArray(new Track(), result)
    }

    async deductTrackQuantity(trackId) {
        const track = await this.getTrack(trackId)
        const result = await mysql.query(`UPDATE \`track\` SET \`quantity\` = ? WHERE \`id\` = ?`, [track.quantity - 1, trackId])
        if (result.affectedRows === 1)
            return true
        return false
    }

}

module.exports = Track;
