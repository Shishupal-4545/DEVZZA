const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/place', orderController.placeOrder);
router.post('/cancel', orderController.cancelOrder);

module.exports = router;
