const OrderItem = class {
    constructor(id, order_id, album_id, track_id, price, refundable, status) {
        this.id = id
        this.order_id = order_id
        this.album_id = album_id
        this.track_id = track_id
        this.albums = null;
        this.price = price
        this.refundable = refundable
        this.status = status
    }

}

module.exports = OrderItem;
