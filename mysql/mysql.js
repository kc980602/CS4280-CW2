const mysql = require('mysql');
const util = require('util')

let pool = mysql.createPool({
    'host': 'cs4280-cw2.cvnekcb5vorc.us-east-2.rds.amazonaws.com',
    'port': 3306,
    'user': 'admin',
    'password': 'UT56WbfuPRZTG89',
    'database': 'Mue',
    'connectionLimit': 3,
});

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }
    if (connection) connection.release()
    return
})

pool.query = util.promisify(pool.query)

module.exports = pool
