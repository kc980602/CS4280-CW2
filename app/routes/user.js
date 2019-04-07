const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/user');
const ProfileController = require('../controllers/profile');
const ProtectedRoute = require('../middlewares/ProtectedRoute')

router.route('/login').get((req, res) => {
    res.render('login', {
        title: 'Login | Mue'
    });
    res.end();
}).post((req, res) => {
    AuthController.login(req, res)
});

router.route('/signup').get((req, res) => {
    // res.sendFile(__dirname + '/public/signup.html');
    res.end();
}).post((req, res) => {
    AuthController.signup(req, res)
});

router.route('/logout').get((req, res) => {
    AuthController.logout(req, res)
});

router.route('/profile/').get(ProtectedRoute, (req, res) => {
    res.redirect('/profile/collection')
})

router.route('/profile/collection').get((req, res) => {
    res.render('profile', {
        title: 'Your Library | Mue',
        tab: 'COLLECTION'
    });
    // ProfileController.view_collection(req, res)
})

router.route('/profile/purchase').get((req, res, next) => {
    res.render('profile', {
        title: 'Purchase History | Mue',
        tab: 'PURCHASE'
    });
    ProfileController.view_purchase(req, res)
})


module.exports = router;
