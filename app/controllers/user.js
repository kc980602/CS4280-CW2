const User = require('../models/user')
const check = require('../../utils/checkQuery');
const mysql = require('../../mysql/utils')

userModel = new User()

module.exports = new class {
    async register(req, res, next) {
        const base = {title: 'Register | Mue', isLogin: req.login}
        if (check(req, [], ['username', 'password']))
            res.render('register', Object.assign(base, {code: 400, message: 'Missing username or password.'}))

        const tmpUser = new User()
        tmpUser.username = req.body.username
        tmpUser.password = req.body.password

        if (!await userModel.validateUsername(tmpUser.username))
            res.render('register', Object.assign(base, {code: 400, message: 'Username is used.'}))

        const user_id = await userModel.addUser(tmpUser)

        if (user_id) {
            const newUser = await userModel.getUserById(user_id)
            if (newUser) {
                req.session.user = newUser;
                res.status(302).redirect('/')
            } else {
                res.render('register', Object.assign(base, {code: 400, message: 'Fail to create user.'}))
            }
        }
    }

    async login(req, res, next) {
        const base = {title: 'Login | Mue', isLogin: req.login}
        if (check(req, [], ['username', 'password']))
            res.render('login', Object.assign(base, {code: 400, message: 'Missing username or password.'}))

        const user = await userModel.getUserByName(req.body.username)
        if (user) {
            if (user.validPassword(req.body.password)) {
                req.session.user = user
                res.status(302).redirect('/')
            } else {
                res.render('login', Object.assign(base, {code: 400, message: 'Incorrect username or password.'}))
            }
        } else {
            res.render('login', Object.assign(base, {code: 400, message: 'User not found.'}))
        }
    }

    async logout(req, res, next) {
        if (req.session.user && req.cookies.user_sid) {
            res.clearCookie('user_sid');
            res.status(302).redirect('/')
        }
    }
}()
