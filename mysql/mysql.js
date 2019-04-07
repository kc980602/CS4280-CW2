const mysql = require("mysql");
const pool = mysql.createPool({
    "host": "cs4280-cw2.cvnekcb5vorc.us-east-2.rds.amazonaws.com",
    "port": 3306,
    "user": "admin",
    "password": "UT56WbfuPRZTG89",
    "database": "Mue",
    "connectionLimit": 3,
});

module.exports = pool;
