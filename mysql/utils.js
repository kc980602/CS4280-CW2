const pool = require('./mysql')

async function insert(sql, fields) {
    return query(sql, fields).then((results) => {

        if (results) {
            if (results.affectedRows === 0) {
                return Promise.resolve(null);
            }
        }
        return Promise.resolve(results);
    });
}

function query(sql, fields) {
    return new Promise((resolve) => {
        try {
            pool.getConnection((err, connection) => {
                if (err) {
                    switch (err.code) {
                        case 'PROTOCOL_CONNECTION_LOST':
                            console.error('Database connection was closed.')
                        case 'ER_CON_COUNT_ERROR':
                            console.error('Database has too many connections.')
                        case 'ECONNREFUSED':
                            console.error('Database connection was refused.')
                        default:
                            console.error(err);
                    }
                    connection.release();

                    resolve(null);
                }

                connection.query(sql, fields, function (err, results) {
                    connection.release();

                    if (err) {
                        console.error(err);

                        resolve(null);
                    }

                    resolve(results);
                });
            })
        } catch (err) {
            throw new Error(err)
        }
    });
}

module.exports = {
    insert,
    query
}