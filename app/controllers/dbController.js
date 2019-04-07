const pool = require('../../mysql/mysql')
let User = require('../models/user')
const dbController = new class {
    get_user_by_username(username, callback) {
        pool.getConnection(function (err, connection) {
            if (err) {
                connection.release();
                throw err;
            }

            const sql = `SELECT * FROM user
                        WHERE username = ?
                        LIMIT 1;`

            connection.query(sql, [username], function (err, rows) {
                connection.release();

                let user = new User(rows[0].id, rows[0].username, rows[0].password, rows[0].point, rows[0].role, rows[0].status, rows[0].created)

                callback(err, user)
            });
            connection.on('error', function (err) {
                throw err;
            });
        });
    }
    create_user(user, callback) {
        pool.getConnection(function (err, connection) {
            if (err) {
                connection.release();
                throw err;
            }

            const sql = `INSERT INTO user(\`username\`, \`password\`) VALUES(?, ?);`

            connection.query(sql, [user.username, user.password], function (err, rows) {
                connection.release();
                callback(err, rows)
            });
            connection.on('error', function (err) {
                throw err;
            });
        });
    }
}()

module.exports = dbController