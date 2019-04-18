const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const ProfileController = require('../controllers/profile');
const ProtectedRoute = require('../middlewares/ProtectedRoute')

router.route('/login')
    .get(async (req, res) => {
        res.render('login', {title: 'Login | Mue', isLogin: req.login})
        res.end();
    })
    .post(async (req, res) => {
        const base = {title: 'Login | Mue', isLogin: req.login}
        const json = await userController.login(req, res)
        if (json.code) {
            res.render('login', Object.assign(base, json))
            res.end()
        } else {
            res.status(302).redirect('/')
        }
    });

router.route('/register')
    .get(async (req, res) => {
        res.render('register', {title: 'Register | Mue', isLogin: req.login})
        res.end()
    })
    .post(async (req, res) => {
        const base = {title: 'Register | Mue', isLogin: req.login}
        const json = await userController.register(req, res)
        if (json.code) {
            res.render('register', Object.assign(base, json))
            res.end()
        } else {
            res.status(302).redirect('/')
        }
    });


router.get('/logout', async (req, res, next) => {
    await userController.logout(req, res)
    res.status(302).redirect('/')
})

router.get('/profile', ProtectedRoute, async (req, res, next) => {
    res.redirect('/profile/collection')
})

router.route('/profile/collection').get(ProtectedRoute, (req, res) => {
    res.render('profile', {
        title: 'Your Library | Mue',
        isLogin: req.login,
        tab: 'COLLECTION'
    });
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
