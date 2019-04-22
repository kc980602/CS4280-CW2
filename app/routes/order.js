const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order')
const protectedRoute = require('../middlewares/protectedRoute')

router.patch('/order', protectedRoute, (req, res) => {
    orderController.updateOrder(req, res);
});

router.get('/order/purchased', protectedRoute, (req, res) => {
    orderController.getPurchased(req, res);
});

module.exports = router;