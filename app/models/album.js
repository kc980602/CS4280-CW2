const mysql = require('../../mysql/utils')
const {toInstanceForce, toInstanceForceArray} = require('../../utils/serializer')


const Album = class {
    constructor(id, title, artist, label, release_date, status, created) {
        this.id = id
        this.title = title
        this.artist = artist
        this.label = label
        this.release_date = release_date
        this.status = status
        this.created = created
    }

    async getAlbums(page) {
        const result = await mysql.query(`SELECT * FROM album WHERE status = 0 LIMIT ?, 12`, page * 12)
        return toInstanceForceArray(new Album(), result)
    }

    async getAlbumsCount() {
        const result = await mysql.query(`SELECT COUNT(*) as total FROM album WHERE status = 0`)
        return result[0].total
    }
}

module.exports = Album;
