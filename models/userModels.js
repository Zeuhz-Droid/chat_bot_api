const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'User must input a username'],
  },
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;
