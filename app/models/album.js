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
}

module.exports = Album;