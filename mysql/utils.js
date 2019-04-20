const pool = require('./mysql')

async function insert() {
    
}

function query(query, fields) {
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

                connection.query(query, fields, function (err, results) {
                    connection.release();

                    if (err) {
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
    query
}