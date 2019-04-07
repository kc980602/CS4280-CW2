const pool = require('../../mysql/mysql')
let User = require('../models/user')
let Album = require('../models/album')
const dbController = new class {
    get_user_by_username(username) {
        return new Promise((resolve) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    connection.release();
                    resolve(null)
                    return
                }

                const sql = `SELECT * FROM user
                        WHERE username = ? AND status = 0
                        LIMIT 1;`

                connection.query(sql, [username], (err, rows) => {
                    connection.release();
                    if (err) {
                        resolve(null)
                        return
                    }
                    if (rows.length === 1) {
                        let user = new User(...Object.values(rows[0]))

                        resolve(user)
                        return
                    }
                    resolve(null)
                });
                connection.on('error', (err) => {
                    resolve(null)
                });
            });
        })
    }
    create_user(user, callback) {
        return new Promise((resolve) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    connection.release();
                    resolve(null)
                    return
                }

                const sql = `INSERT INTO user(\`username\`, \`password\`)
                                VALUES(?, ?);`

                connection.query(sql, [user.username, user.password], (err, result) => {
                    if (err) {
                        resolve(null)
                        return
                    }
                    if (result.affectedRows === 1) {
                        resolve(this.get_user_by_username(user.username))
                    }
                    resolve(null)
                });
                connection.on('error', function (err) {
                    resolve(null)
                });
            });
        })
    }
    get_purchased_collection_by_user_id(userId) {
        return new Promise((resolve) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    connection.release();
                    resolve(null)
                    return
                }

                const sql = `SELECT a.*
                                FROM \`album\` a, \`order_item\` oi, \`order\` o
                                WHERE oi.album_id = a.id AND
                                    oi.order_id = o.id AND
                                    o.user_id = ?
                                GROUP BY a.id;`

                connection.query(sql, [userId], (err, rows) => {
                    connection.release();
                    if (err) {
                        resolve(null)
                        return
                    }

                    let result = []
                    for (let row of rows) {
                        let album = new Album(...Object.values(row))

                        result.push(album)
                    }
                    resolve(result)
                    return
                });
                connection.on('error', (err) => {
                    resolve(null)
                });
            });
        })
    }
    get_purchased_orders_by_user_id(userId) {
        return new Promise((resolve) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    connection.release();
                    resolve(null)
                    return
                }

                const sql = `SELECT o.*, a.*, o.* 
                                FROM \`album\` a, \`track\` t, \`order_item\` oi, \`order\` o
                                WHERE oi.album_id = a.id AND
                                    oi.order_id = o.id AND
                                    o.user_id = '?' AND
                                    t.album_id = a.id
                                GROUP BY o.id;`

                connection.query(sql, [userId], (err, rows) => {
                    connection.release();
                    if (err) {
                        resolve(null)
                        return
                    }

                    let result = []
                    // for (let row of rows) {
                    //     let album = new Album(...Object.values(row))

                    //     result.push(album)
                    // }
                    resolve(result)
                    return
                });
                connection.on('error', (err) => {
                    resolve(null)
                });
            });
        })
    }
    get_album_by_album_id(albumId) {
        return new Promise((resolve) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    connection.release();
                    resolve(null)
                    return
                }

                const sql = `SELECT a.*, t.* 
                                FROM \`album\` a, \`track\` t
                                WHERE t.album_id = a.id AND
                                    a.id = ?
                                GROUP BY a.id
                                ORDER BY a.title ASC;`

                connection.query(sql, [albumId], (err, rows) => {
                    connection.release();
                    if (err) {
                        resolve(null)
                        return
                    }

                    if (rows.length >= 1) {
                        let album = new Album(...Object.values(rows[0]))

                        resolve(album)
                        return
                    }
                    resolve(null)
                });
                connection.on('error', (err) => {
                    resolve(null)
                });
            });
        })
    }
    check_album_has_purchased(albumId, userId) {
        return new Promise(async (resolve) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    connection.release();
                    resolve(null)
                    return
                }

                const sql = `SELECT *
                                FROM \`album\`
                                WHERE id = ? AND
                                    id in (
                                        SELECT oi.album_id
                                        FROM \`order_item\` oi, \`order\` o
                                        WHERE oi.order_id = o.id AND
                                            o.user_id = ?
                                    )`

                connection.query(sql, [albumId, userId], (err, rows) => {
                    connection.release();
                    if (err) {
                        resolve(null)
                        return
                    }

                    if (rows.length >= 1) {
                        resolve(true)
                        return
                    }
                    resolve(false)
                });
                connection.on('error', (err) => {
                    resolve(null)
                });
            });
        })
    }
    get_all_album() {
        return new Promise(async (resolve) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    connection.release();
                    resolve(null)
                    return
                }

                const sql = `SELECT *
                                FROM \`album\``

                connection.query(sql, (err, rows) => {
                    connection.release();
                    if (err) {
                        resolve(null)
                        return
                    }

                    if (rows.length >= 1) {
                        let result = []

                        for(let row of rows){
                            let album = new Album(...Object.values(row))

                            result.push(album)
                        }
                        resolve(result)
                        return
                    }
                    resolve(false)
                });
                connection.on('error', (err) => {
                    resolve(null)
                });
            });
        })
    }
}()

module.exports = dbController