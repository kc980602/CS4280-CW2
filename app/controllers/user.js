const dbController = require('./dbController')
const User = require('../models/user')
const check = require('../../utils/checkQuery');
const mysql = require('../../mysql/utils')

async function getUserById(id) {
    const result = await mysql.query( `SELECT * FROM user WHERE id = ? AND status = 0`, id)
    if (result.length === 1) {
        return new User(...Object.values(result[0]))
    } else {
        return false
    }
}

async function getUserByName(name) {
    const result = await mysql.query( `SELECT * FROM user WHERE username = ? AND status = 0`, name)
    if (result.length === 1) {
        return new User(...Object.values(result[0]))
    } else {
        return false
    }
}

async function validateUsername(username) {
    const result = await mysql.query( `SELECT * FROM user WHERE username = ?`, username)
    return result.length === 0
}

async function login(req, res) {
    if (check(req, [], ['username', 'password']))
        return {code: 400, message: 'Missing username or password.'}

    const user = await getUserByName(req.body.username)

    if (user) {
        if (user.validPassword(req.body.password)) {
            req.session.user = user
            return user
        } else {
            return {code: 400, message: 'Incorrect username or password.'}
        }
    } else {
        return {code: 400, message: 'User not found.'}
    }
}

async function register(req, res) {
    if (check(req, [], ['username', 'password']))
        return {code: 400, message: 'Missing username or password.'}

    const tmpUser = new User()
    tmpUser.username = req.body.username
    tmpUser.password = req.body.password

    if (!await validateUsername(tmpUser.username)){
        return {code: 400, message: 'Username is used.'}
    }

    const result = await mysql.query(`INSERT INTO user(\`username\`, \`password\`) VALUES(?, ?)`, [tmpUser.username, tmpUser.password])

    if (result.affectedRows === 1) {
        const user = await getUserById(result.insertId)
        if (user) {
            req.session.user = user;
            return user
        } else {
            return {code: 400, message: 'Fail to create user.'}
        }
    }
}
async function logout(req, res) {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie('user_sid');
        return true
    }
}

module.exports = {
    login,
    register,
    logout
}
