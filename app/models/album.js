const Album = class {
    constructor(id, thumbnail, title, artist, label, release_date, status, created) {
        this.id = id
        this.thumbnail = thumbnail;
        this.title = title
        this.artist = artist
        this.label = label
        this.release_date = release_date
        this.status = status
        this.created = created
    }
}

module.exports = Album;