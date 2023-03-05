const express = require('express');
const orderController = require('../controllers/orderController');

const router = express.Router();

router
  .route('/')
  .get(orderController.getInfoAboutChatbot)
  .post(orderController.placeOrder, orderController.checkoutOrder);

// router.route('/');

router.route('/:id').post(orderController.selectItem);

module.exports = router;
