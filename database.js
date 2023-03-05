const mongoose = require('mongoose');

require('dotenv').config();

const DB = process.env.DATABASE_URL.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

const connectToDatabase = () => {
  mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log(`Successfully connected to the database`))
    .catch((error) => console.log(`Connection Error, check this: ${error}`));
};

module.exports = connectToDatabase;
