const express = require('express');
const orderController = require('../controllers/orderController');

const router = express.Router();

// Reforming the router and the router handlers, where should we put the handlers
// should we access the client replies via the request params or body?
router
  .route('/')
  .get(orderController.getUserInfo, orderController.getInfoAboutChatbot);

router.route('/1').post(orderController.placeOrder);
router.route('/99').post(orderController.checkoutOrder);
router.route('/98').get(orderController.orderHistory);
router.route('/97').get(orderController.currentOrder);
router.route('/0').get(orderController.cancelOrder);

router.route('/1/:id').post(orderController.selectItem);

module.exports = router;
