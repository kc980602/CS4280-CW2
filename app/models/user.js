const mysql = require('../../mysql/utils')
const {toInstanceForce} = require('../../utils/serializer')
const bcrypt = require('bcrypt');

const User = class {
    constructor(id, username, password, point, role, status, created) {
        this.id = id
        this.username = username
        this._password = password
        this.point = point
        this.role = role
        this.status = status
        this.created = created
    }

    get password() {
        return this._password
    }

    set password(password) {
        const salt = bcrypt.genSaltSync();
        this._password = bcrypt.hashSync(password, salt)
    }

    validPassword(password) {
        return bcrypt.compareSync(password, this.password);
    }

    async getUserById(id) {
        const result = await mysql.query(`SELECT * FROM user WHERE id = ? AND status = 0`, id)
        if (result.length === 1) {
            return new User(...Object.values(result[0]))
        } else {
            return false
        }
    }

    async getUserByName(name) {
        const result = await mysql.query(`SELECT * FROM user WHERE username = ? AND status = 0`, name)
        if (result.length === 1) {
            return new User(...Object.values(result[0]))
        } else {
            return false
        }
    }

    async validateUsername(username) {
        const result = await mysql.query(`SELECT * FROM user WHERE username = ?`, username)
        return result.length === 0
    }

    async addUser(user) {
        const result = await mysql.query(`INSERT INTO user(\`username\`, \`password\`) VALUES(?, ?)`, [user.username, user.password])
        if (result.affectedRows === 1)
            return result.insertId
        return false
    }

    async deductPoint(userId, amount) {
        const user = await this.getUserById(userId)
        const result = await mysql.query(`UPDATE \`user\` SET \`point\` = ? WHERE \`id\` = ?`, [user.point + amount, userId])
        if (result.affectedRows === 1)
            return true
        return false
    }

    async isAdmin(id) {
        const user = await this.getUserById(id)
        return user.role === 'ADMIN'
    }

}

module.exports = User;
