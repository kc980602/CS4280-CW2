const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order')
const protectedRoute = require('../middlewares/protectedRoute')

router.patch('/order', protectedRoute, orderController.updateOrder);

module.exports = router;