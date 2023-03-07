const Items = require('../models/itemModels');
const Users = require('../models/userModels');
const Orders = require('../models/orderModels');
const { sendSuccessData } = require('../utilities/helperFunc');

exports.getUserInfo = async (req, res, next) => {
  const randomNum = `${Math.random()}`;
  const addedNumtoUsername = randomNum.slice(-5);
  req.body.username += addedNumtoUsername;
  await Users.create({ username: req.body.username });
  next();
};

exports.getInfoAboutChatbot = async (req, res, next) => {
  try {
    req.session.authenticated = true;
    req.session.username = req.body.username;

    res.status(200).json({
      status: 'success',
      message: 'Welcome to chatbot',
      data: {
        instructions: [
          {
            option: 'a',
            instruction: 'Select 1 to Place an order',
          },
          {
            option: 'b',
            instruction: 'Select 99 to checkout order',
          },
          {
            option: 'c',
            instruction: 'Select 98 to see order history',
          },
          {
            option: 'd',
            instruction: 'Select 97 to see current order',
          },
          {
            option: 'e',
            instruction: 'Select 0 to cancel order',
          },
        ],
      },
    });
  } catch (error) {
    next(new Error(`Try accessing this page at a later time ${error}`));
  }
};

exports.placeOrder = async (req, res, next) => {
  try {
    if (req.session.init) {
      res.status(412).json({
        status: 'Pre condition Failed',
        message: `Please select 99 to checkout your pending order.`,
      });
      return;
    }

    // 1.) count documents and create ID for order placed
    const count = await Orders.countDocuments();
    let orderId = count + 1;

    req.session.init = true;
    req.session.orderId = orderId;
    console.log(req.session);

    await Orders.create({
      id: orderId,
      merchant: req.session.username,
    });

    res.status(200).json({
      status: 'success',
      message: 'Started an Order',
      data: {
        Items,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.checkoutOrder = async (req, res, next) => {
  try {
    // 1.) check if an order is opened.
    if (!req.session.init) {
      res.status(206).json({
        status: 'partial content',
        message: `You have no open order, Select 1 to place an order.`,
      });
    }

    // 2.) Find the total order and amount
    const order = await Orders.findOne({ id: req.session.orderId });

    // 3.) check If any item is selected, and retun message
    if (!order.items.length)
      res.status(206).json({
        status: 'success',
        message: 'No order placed, Please select an item.',
      });

    // 4.) if items exists, destroy the initialized order and render the order pleced for payment
    let fulfilledOrder;
    if (order.items.length) {
      fulfilledOrder = await Orders.findOneAndUpdate(
        { id: req.session.orderId },
        { fulfilled: true },
        {
          new: true,
        }
      );
      req.session.init = false;
    }
    // if (order.items.length) req.session.destroy();

    res.status(200).json({
      status: 'success',
      message: 'Order checkout successful',
      data: {
        order: fulfilledOrder,
      },
    });
  } catch (error) {}
};
