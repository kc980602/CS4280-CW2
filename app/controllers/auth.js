const dbController = require('./dbController')
const User = require('../models/user')
const check = require('../../utils/checkQuery');
const auth = new class {

    login(req, res) {
        if (check(req, [], ['username', 'password'])) res.status(301).redirect('/login?err=true');

        const username = req.body.username;
        const password = req.body.password;

        dbController.get_user_by_username(username, (err, user) => {
            if (err) {
                res.status(500).json({
                    reason: 'User not found'
                });
            }
            console.log(user, user.validPassword(password))
            if (!user.validPassword(password)) {
                res.status(301).redirect('/login');
            } else {
                req.session.user = user;
                res.status(301).redirect('/');
            }
        })
    }
    signup(req, res) {
        if (!req.body.username || !req.body.password) {
            res.status(400).json({
                reson: 'Missing username or password.'
            })
            return
        }

        let user = new User()
        user.username = req.body.username
        user.password = req.body.password

        dbController.create_user(user, (err, rows) => {
            if (err) {
                res.status(500).json({
                    reason: 'Failed to create user.'
                });
                return
            }
            if (rows.affectedRows === 1) {
                dbController.get_user_by_username(user.username, (err, createdUser) => {
                    console.log(err)
                    if (err) {
                        res.status(500).json({
                            reason: 'Failed to login.'
                        });
                        return
                    }
                    req.session.user = createdUser;
                    res.status(201).end()
                })
            }
        })
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

module.exports = auth
