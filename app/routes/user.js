const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const ProfileController = require('../controllers/profile')
const notLoginRoute = require('../middlewares/notLoginRoute')
const protectedRoute = require('../middlewares/protectedRoute')

userController = new UserController()

//  Redirect if login
router.get('/login', notLoginRoute, (req, res, next) => {
    res.render('login', {title: 'Login | Mue', isLogin: req.login})
})

router.post('/login', userController.login)

router.get('/register', notLoginRoute, (req, res, next) => {
    res.render('register', {title: 'Register | Mue', isLogin: req.login})
})

router.post('/register', userController.register)

//  Protected route
router.use('/', protectedRoute, (req, res, next) => {
    next()
})
//  Below is protected route, protectedRoute is applied above

router.get('/logout', userController.logout)

router.get('/profile', async (req, res, next) => {
    res.redirect('/profile/collection')
})

router.route('/profile/collection').get((req, res) => {
    res.render('profile', {
        title: 'Your Library | Mue',
        isLogin: req.login,
        tab: 'COLLECTION'
    })
    // ProfileController.view_collection(req, res)
})

router.route('/profile/purchase').get((req, res, next) => {
    res.render('profile', {
        title: 'Purchase History | Mue',
        isLogin: req.login,
        tab: 'PURCHASE'
    });
    // ProfileController.view_purchase(req, res)
})
module.exports = router;
