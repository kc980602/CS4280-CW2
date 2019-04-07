const pool = require('../../mysql/mysql')
let User = require('../models/user')
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
                        let user = new User(rows[0].id, rows[0].username, rows[0].password, rows[0].point, rows[0].role, rows[0].status, rows[0].created)

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
    get_purchased_collection() {
        return new Promise((resolve) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    connection.release();
                    resolve(null)
                    return
                }

                const sql = `SELECT * FROM album;`

                connection.query(sql, (err, rows) => {
                    connection.release();
                    console.log(err)
                    if (err) {
                        resolve(null)
                        return
                    }

                    console.log(rows)
                    resolve(rows)
                    return
                });
                connection.on('error', (err) => {
                    resolve(null)
                });
            });
        })
    }
}()

module.exports = dbController