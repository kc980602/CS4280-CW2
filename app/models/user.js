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

        this._password = bcrypt.hashSync(password, salt);
    }
    validPassword(password) {
        return bcrypt.compareSync(password, this.password);
    }
}

module.exports = User;