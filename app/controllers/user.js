const dbController = require('./dbController')
const User = require('../models/user')
const check = require('../../utils/checkQuery');
const user = new class {
    async login(req, res) {
        if (check(req, [], ['username', 'password'])) {
            res.status(301).redirect('/login?err=true');
        }

        let username = req.body.username;
        let password = req.body.password;
        let user = await dbController.get_user_by_username(username)

        if (user) {
            if (user.validPassword(password)) {
                req.session.user = user;
                res.status(301).redirect('/');
            } else {
                res.status(301).render('login', {
                    title: 'Login | Mue',
                    err: true,
                    reason: 'Incorrect password.'
                });
            }
        } else {
            res.status(400).render('login', {
                title: 'Login | Mue',
                err: true,
                reason: 'User not found.'
            });
        }
    }
    async signup(req, res) {
        if (!req.body.username || !req.body.password) {
            res.status(400).render('register', {
                title: 'Register | Mue',
                err: true,
                reson: 'Missing username or password.'
            })
            return
        }

        let user = new User()
        user.username = req.body.username
        user.password = req.body.password
        let createdUser = await dbController.create_user(user)

        console.log(createdUser)
        if (createdUser) {
            req.session.user = createdUser;
            res.status(201).redirect('/')
        } else {
            res.status(500).render('register', {
                title: 'Register | Mue',
                err: true,
                reason: 'Failed to create user.'
            });
        }
    }
    logout(req, res) {
        if (req.session.user && req.cookies.user_sid) {
            res.clearCookie('user_sid');
            res.redirect('/');
        } else {
            res.redirect('/login');
        }
    }
}()

module.exports = user