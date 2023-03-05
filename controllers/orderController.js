const Items = require('../models/itemModels');
const Orders = require('../models/orderModels');

exports.getInfoAboutChatbot = async (req, res, next) => {
  try {
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
    const option = req.body.option;
    if (option !== 1) next();

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
    const option = req.body.option;
    if (option !== 99) next();

    res.status(200).json({
      status: 'success',
      message: 'Order checkout successful',
      // data: {
      //   orders,
      // },
    });
  } catch (error) {}
};

exports.selectItem = async (req, res, next) => {
  const itemNumber = req.body.id;
  Items.forEach((entry) => {
    if (itemNumber == entry.id) {
      console.log(req.body);
    }
  });
};
