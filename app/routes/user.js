const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const ProfileController = require('../controllers/profile')
const notLoginRoute = require('../middlewares/notLoginRoute')
const protectedRoute = require('../middlewares/protectedRoute')

//  Redirect if login
router.get('/login', notLoginRoute, (req, res, next) => {
    res.render('login', {title: 'Login | Mue', isLogin: req.login})
})

router.post('/login', notLoginRoute, userController.login)

router.get('/register', notLoginRoute, (req, res, next) => {
    res.render('register', {title: 'Register | Mue', isLogin: req.login})
})

router.post('/register', notLoginRoute, userController.register)

router.get('/logout', protectedRoute, userController.logout)

router.get('/profile', protectedRoute, async (req, res, next) => {
    res.redirect('/profile/collection')
})

router.route('/profile/collection', protectedRoute).get((req, res) => {
    res.render('profile', {
        title: 'Your Library | Mue',
        isLogin: req.login,
        tab: 'COLLECTION'
    })
    // ProfileController.view_collection(req, res)
})

router.route('/profile/purchase', protectedRoute).get((req, res, next) => {
    res.render('profile', {
        title: 'Purchase History | Mue',
        isLogin: req.login,
        tab: 'PURCHASE'
    });
    // ProfileController.view_purchase(req, res)
})
module.exports = router;
