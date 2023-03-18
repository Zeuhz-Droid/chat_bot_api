const express = require('express');
const orderController = require('../controllers/orderController');

const router = express.Router();

// Reforming the router and the router handlers, where should we put the handlers
// should we access the client replies via the request params or body?
router
  .route('/')
  .post(orderController.getInfoAboutChatbot)
  .get(orderController.getInfoAboutChatbot);

router.route('/1').get(orderController.placeOrder);
router.route('/99').get(orderController.checkoutOrder);
router.route('/98').get(orderController.orderHistory);
router.route('/97').get(orderController.currentOrder);
router.route('/0').get(orderController.cancelOrder);

router.route('/1/:id').get(orderController.selectItem);

module.exports = router;
