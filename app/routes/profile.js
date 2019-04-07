const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers/profile');
const ProtectedRoute = require('../middlewares/ProtectedRoute')

router.route('/').get(ProtectedRoute, (req, res) => {
    res.redirect('/profile/collection')
})
router.route('/collection').get((req, res) => {
    ProfileController.view_collection(req, res)
})
router.route('/purchase').get(ProtectedRoute, (req, res, next) => {
    ProfileController.view_purchase(req, res)
})

module.exports = router;