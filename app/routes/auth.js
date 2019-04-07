const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth');
const ProtectedRoute = require('../middlewares/ProtectedRoute')

router.route('/login')
    .get(function (req, res, next) {
        res.render('login', {title: 'Login | Mue'});
        res.end();
    })
    .post((req, res) => {
        AuthController.login(req, res)
    });

router.route('/signup')
    .get((req, res) => {
        // res.sendFile(__dirname + '/public/signup.html');
        res.end();
    })
    .post((req, res) => {
        AuthController.signup(req, res)
    });

router.route('/protected')
    .get(ProtectedRoute, (req, res) => {
        console.log(req.cookies.user_sid)
        res.end()
    })

router.route('/logout')
    .get((req, res) => {
        AuthController.logout(req, res)
    });


module.exports = router;
