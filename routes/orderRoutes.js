
const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController.JS');
router.post('/', orderController.createOrder);

router.get('/user/:userId', orderController.getUserOrders);

module.exports = router;