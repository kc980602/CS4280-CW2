const pool = require('./mysql')

async function insert() {

}

async function query(query, field) {
    try {
        const result = await pool.query(query, field)
        return result
    } catch(err) {
        throw new Error(err)
    }
}

module.exports = {
    query
}
