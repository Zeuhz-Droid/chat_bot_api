const Users = require('../models/userModels');

exports.getAllUsers = async (req, res, next) => {
  const users = await Users.find();
  res.status(200).json({
    status: 'success',
    message: 'users list compiled',
    data: {
      users,
    },
  });
};
